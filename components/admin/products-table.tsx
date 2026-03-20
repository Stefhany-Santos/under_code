'use client';

import { useState } from 'react';
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
import { Plus, Pencil, Trash2, Download, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ProductsTable() {
  const [products, setProducts] = useState<Script[]>(mockScripts);
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Script | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Script | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
    const newProduct: Script = {
      id: String(Date.now()),
      name: 'Novo Produto',
      slug: 'novo-produto',
      description: 'Descricao do novo produto',
      longDescription: 'Descricao completa do novo produto',
      price: 99.90,
      framework: 'QBox',
      category: 'misc',
      status: 'draft',
      imageUrl: '/placeholder.svg',
      galleryUrls: [],
      features: ['Feature 1', 'Feature 2'],
      requirements: [],
      version: '1.0.0',
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
    setEditingProduct(newProduct);
    toast({
      title: 'Produto criado',
      description: 'Novo produto adicionado. Edite os detalhes.',
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                      <span className="text-lg font-bold text-emerald-400">
                        {product.name.charAt(0)}
                      </span>
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
        <DialogContent className="max-w-lg border-zinc-800 bg-zinc-950">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Produto</DialogTitle>
            <DialogDescription className="text-zinc-400">Faca as alteracoes necessarias no produto.</DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
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
      <AlertDialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <AlertDialogContent className="border-zinc-800 bg-zinc-950">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Adicionar Novo Produto</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Sera criado um novo produto com valores padrao. Voce podera editar os detalhes em seguida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddNew} className="bg-emerald-600 hover:bg-emerald-700">
              Criar Produto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
