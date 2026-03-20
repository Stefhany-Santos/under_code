'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockScripts, Script, formatPrice, formatDate } from '@/lib/mock-data';
import { Plus, Pencil, Trash2, Download, Search, UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  version: string;
  framework: 'QBox' | 'QBCore' | 'Standalone';
  category: string;
  imageUrl: string;
}

function ImageUploadArea({ 
  imageUrl, 
  onImageChange 
}: { 
  imageUrl: string; 
  onImageChange: (url: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      return;
    }
    const url = URL.createObjectURL(file);
    onImageChange(url);
  };

  const handleRemoveImage = () => {
    onImageChange('');
  };

  if (imageUrl && imageUrl !== '/placeholder.svg') {
    return (
      <div className="relative">
        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
          <Image
            src={imageUrl}
            alt="Preview"
            fill
            className="object-cover"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 bg-zinc-900/80 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all ${
        isDragging
          ? 'border-emerald-500 bg-emerald-500/10'
          : 'border-zinc-700 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900/50'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileInput}
        className="hidden"
      />
      <UploadCloud className={`mx-auto h-10 w-10 ${isDragging ? 'text-emerald-400' : 'text-zinc-400'}`} />
      <p className={`mt-3 text-sm font-medium ${isDragging ? 'text-emerald-400' : 'text-zinc-300'}`}>
        Arraste a imagem do script ou clique para fazer upload
      </p>
      <p className="mt-1 text-xs text-zinc-500">PNG, JPG ate 5MB</p>
    </div>
  );
}

export function ProductsTable() {
  const [products, setProducts] = useState<Script[]>(mockScripts);
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Script | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Script | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 99.90,
    version: '1.0.0',
    framework: 'QBox',
    category: '',
    imageUrl: '',
  });
  const { toast } = useToast();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (product: Script) => {
    setProducts(products.filter(p => p.id !== product.id));
    setDeletingProduct(null);
    toast({
      title: 'Produto excluido',
      description: `"${product.name}" foi removido com sucesso.`,
    });
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    toast({
      title: 'Produto atualizado',
      description: 'As alteracoes foram salvas com sucesso.',
    });
  };

  const handleAddNew = () => {
    if (!newProductData.name.trim()) {
      toast({
        title: 'Erro',
        description: 'O nome do produto e obrigatorio.',
        variant: 'destructive',
      });
      return;
    }

    const newProduct: Script = {
      id: String(Date.now()),
      name: newProductData.name,
      slug: newProductData.name.toLowerCase().replace(/\s+/g, '-'),
      description: newProductData.description,
      longDescription: newProductData.description,
      price: newProductData.price,
      framework: newProductData.framework,
      category: newProductData.category || 'misc',
      status: 'draft',
      imageUrl: newProductData.imageUrl || '/placeholder.svg',
      galleryUrls: [],
      features: [],
      requirements: [],
      version: newProductData.version,
      changelog: [],
      rating: 0,
      reviewCount: 0,
      downloads: 0,
      sales: 0,
      isFeatured: false,
      isNew: true,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProducts([...products, newProduct]);
    setIsAddModalOpen(false);
    setNewProductData({
      name: '',
      description: '',
      price: 99.90,
      version: '1.0.0',
      framework: 'QBox',
      category: '',
      imageUrl: '',
    });
    toast({
      title: 'Produto criado',
      description: `"${newProduct.name}" foi adicionado com sucesso.`,
    });
  };

  const resetAddModal = () => {
    setIsAddModalOpen(false);
    setNewProductData({
      name: '',
      description: '',
      price: 99.90,
      version: '1.0.0',
      framework: 'QBox',
      category: '',
      imageUrl: '',
    });
  };

  return (
    <>
      {/* Header with Search and Add Button */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Produtos</h2>
          <p className="text-sm text-zinc-400">Gerencie o catalogo de produtos</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 border-zinc-800 bg-zinc-900/50 pl-10 text-zinc-100 placeholder:text-zinc-500"
            />
          </div>
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
              <TableHead className="text-zinc-400">Produto</TableHead>
              <TableHead className="text-zinc-400">Framework</TableHead>
              <TableHead className="text-zinc-400">Categoria</TableHead>
              <TableHead className="text-zinc-400">Preco</TableHead>
              <TableHead className="text-zinc-400">Downloads</TableHead>
              <TableHead className="text-zinc-400">Atualizado</TableHead>
              <TableHead className="text-right text-zinc-400">Acoes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="border-zinc-800 hover:bg-zinc-800/30">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-emerald-500/10">
                      {product.imageUrl && product.imageUrl !== '/placeholder.svg' ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-emerald-400">
                          {product.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">{product.name}</p>
                      <p className="text-xs text-zinc-500">v{product.version}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={product.framework === 'QBox' 
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' 
                      : 'border-zinc-700 text-zinc-400'
                    }
                  >
                    {product.framework}
                  </Badge>
                </TableCell>
                <TableCell className="text-zinc-400">{product.category}</TableCell>
                <TableCell className="font-medium text-emerald-400">{formatPrice(product.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Download className="h-3 w-3" />
                    {product.downloads}
                  </div>
                </TableCell>
                <TableCell className="text-zinc-500">{formatDate(product.updatedAt)}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-8 w-8 p-0 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      onClick={() => setEditingProduct(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-8 w-8 p-0 text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
                      onClick={() => setDeletingProduct(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="border-t border-zinc-800 px-4 py-3">
          <p className="text-sm text-zinc-500">
            Mostrando {filteredProducts.length} de {products.length} produtos
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto border-zinc-800 bg-zinc-950">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Produto</DialogTitle>
            <DialogDescription className="text-zinc-400">Faca as alteracoes necessarias no produto.</DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-zinc-300">Imagem do Produto</Label>
                <ImageUploadArea 
                  imageUrl={editingProduct.imageUrl} 
                  onImageChange={(url) => setEditingProduct({ ...editingProduct, imageUrl: url || '/placeholder.svg' })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-300">Nome</Label>
                <Input
                  id="name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="border-zinc-800 bg-zinc-900 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-zinc-300">Descricao</Label>
                <Textarea
                  id="description"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="border-zinc-800 bg-zinc-900 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-zinc-300">Preco (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    className="border-zinc-800 bg-zinc-900 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version" className="text-zinc-300">Versao</Label>
                  <Input
                    id="version"
                    value={editingProduct.version}
                    onChange={(e) => setEditingProduct({ ...editingProduct, version: e.target.value })}
                    className="border-zinc-800 bg-zinc-900 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="framework" className="text-zinc-300">Framework</Label>
                  <select
                    id="framework"
                    className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white"
                    value={editingProduct.framework}
                    onChange={(e) => setEditingProduct({ ...editingProduct, framework: e.target.value as 'QBox' | 'QBCore' | 'Standalone' })}
                  >
                    <option value="QBox">QBox</option>
                    <option value="QBCore">QBCore</option>
                    <option value="Standalone">Standalone</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-zinc-300">Categoria</Label>
                  <Input
                    id="category"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="border-zinc-800 bg-zinc-900 text-white"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingProduct(null)} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} className="bg-emerald-600 hover:bg-emerald-700">
              Salvar Alteracoes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingProduct} onOpenChange={() => setDeletingProduct(null)}>
        <AlertDialogContent className="border-zinc-800 bg-zinc-950">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Excluir Produto</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Tem certeza que deseja excluir &quot;{deletingProduct?.name}&quot;? Esta acao nao pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => deletingProduct && handleDelete(deletingProduct)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={resetAddModal}>
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto border-zinc-800 bg-zinc-950">
          <DialogHeader>
            <DialogTitle className="text-white">Adicionar Novo Produto</DialogTitle>
            <DialogDescription className="text-zinc-400">Preencha as informacoes do novo produto.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-zinc-300">Imagem do Produto</Label>
              <ImageUploadArea 
                imageUrl={newProductData.imageUrl} 
                onImageChange={(url) => setNewProductData({ ...newProductData, imageUrl: url })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-name" className="text-zinc-300">Nome *</Label>
              <Input
                id="new-name"
                value={newProductData.name}
                onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                placeholder="Nome do produto"
                className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-description" className="text-zinc-300">Descricao</Label>
              <Textarea
                id="new-description"
                value={newProductData.description}
                onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                placeholder="Descricao do produto"
                className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-price" className="text-zinc-300">Preco (R$)</Label>
                <Input
                  id="new-price"
                  type="number"
                  step="0.01"
                  value={newProductData.price}
                  onChange={(e) => setNewProductData({ ...newProductData, price: parseFloat(e.target.value) || 0 })}
                  className="border-zinc-800 bg-zinc-900 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-version" className="text-zinc-300">Versao</Label>
                <Input
                  id="new-version"
                  value={newProductData.version}
                  onChange={(e) => setNewProductData({ ...newProductData, version: e.target.value })}
                  className="border-zinc-800 bg-zinc-900 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-framework" className="text-zinc-300">Framework</Label>
                <select
                  id="new-framework"
                  className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white"
                  value={newProductData.framework}
                  onChange={(e) => setNewProductData({ ...newProductData, framework: e.target.value as 'QBox' | 'QBCore' | 'Standalone' })}
                >
                  <option value="QBox">QBox</option>
                  <option value="QBCore">QBCore</option>
                  <option value="Standalone">Standalone</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-category" className="text-zinc-300">Categoria</Label>
                <Input
                  id="new-category"
                  value={newProductData.category}
                  onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                  placeholder="Ex: FiveM Scripts"
                  className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetAddModal} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Cancelar
            </Button>
            <Button onClick={handleAddNew} className="bg-emerald-600 hover:bg-emerald-700">
              Criar Produto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
