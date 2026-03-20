'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { FolderTree, Plus, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

const initialCategories: Category[] = [
  { id: '1', name: 'FiveM Scripts', slug: 'fivem-scripts', description: 'Scripts para servidores FiveM', count: 24 },
  { id: '2', name: 'RedM Scripts', slug: 'redm-scripts', description: 'Scripts para servidores RedM', count: 8 },
  { id: '3', name: 'Sistemas de UI', slug: 'sistemas-de-ui', description: 'Interfaces e HUDs', count: 12 },
  { id: '4', name: 'Veiculos', slug: 'veiculos', description: 'Scripts de veiculos e garagens', count: 15 },
  { id: '5', name: 'Empregos', slug: 'empregos', description: 'Sistemas de trabalho e profissoes', count: 18 },
];

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
  });
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({ name: '', slug: '', description: '' });
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
    });
    setEditingCategory(category);
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  const handleAddCategory = () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Erro',
        description: 'O nome da categoria e obrigatorio.',
        variant: 'destructive',
      });
      return;
    }

    const newCategory: Category = {
      id: String(Date.now()),
      name: formData.name,
      slug: formData.slug || generateSlug(formData.name),
      description: formData.description,
      count: 0,
    };

    setCategories([...categories, newCategory]);
    setIsAddModalOpen(false);
    resetForm();
    toast({
      title: 'Categoria criada',
      description: `"${newCategory.name}" foi adicionada com sucesso.`,
    });
  };

  const handleSaveEdit = () => {
    if (!editingCategory || !formData.name.trim()) {
      toast({
        title: 'Erro',
        description: 'O nome da categoria e obrigatorio.',
        variant: 'destructive',
      });
      return;
    }

    setCategories(categories.map(c => 
      c.id === editingCategory.id 
        ? { ...c, name: formData.name, slug: formData.slug, description: formData.description }
        : c
    ));
    setEditingCategory(null);
    resetForm();
    toast({
      title: 'Categoria atualizada',
      description: 'As alteracoes foram salvas com sucesso.',
    });
  };

  const handleDelete = () => {
    if (!deletingCategory) return;
    
    setCategories(categories.filter(c => c.id !== deletingCategory.id));
    setDeletingCategory(null);
    toast({
      title: 'Categoria excluida',
      description: `"${deletingCategory.name}" foi removida com sucesso.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">
            <FolderTree className="mr-1.5 h-3.5 w-3.5" />
            Gerenciamento
          </Badge>
          <h1 className="text-3xl font-bold text-white">Categorias</h1>
          <p className="mt-2 text-zinc-400">Gerencie as categorias de produtos da loja</p>
        </div>
        <Button 
          onClick={handleOpenAdd}
          className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" />
          Nova Categoria
        </Button>
      </motion.div>

      {/* Categories Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader className="p-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-lg text-white">{category.name}</CardTitle>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      onClick={() => handleOpenEdit(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
                      onClick={() => setDeletingCategory(category)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-zinc-400">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <code className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                      /{category.slug}
                    </code>
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                      {category.count} produtos
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={(open) => { setIsAddModalOpen(open); if (!open) resetForm(); }}>
        <DialogContent className="max-h-[85vh] max-w-md overflow-y-auto border-zinc-800 bg-zinc-950">
          <DialogHeader>
            <DialogTitle className="text-white">Nova Categoria</DialogTitle>
            <DialogDescription className="text-zinc-400">Preencha as informacoes da nova categoria.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-name" className="text-zinc-300">Nome da Categoria *</Label>
              <Input
                id="add-name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: FiveM Scripts"
                className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-slug" className="text-zinc-300">Slug (URL amigavel)</Label>
              <Input
                id="add-slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="fivem-scripts"
                className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
              />
              <p className="text-xs text-zinc-500">Gerado automaticamente a partir do nome</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-description" className="text-zinc-300">Descricao Breve</Label>
              <Textarea
                id="add-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Uma breve descricao da categoria"
                className="min-h-[80px] border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => { setIsAddModalOpen(false); resetForm(); }} 
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancelar
            </Button>
            <Button onClick={handleAddCategory} className="bg-emerald-600 hover:bg-emerald-700">
              Criar Categoria
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!editingCategory} onOpenChange={(open) => { if (!open) { setEditingCategory(null); resetForm(); } }}>
        <DialogContent className="max-h-[85vh] max-w-md overflow-y-auto border-zinc-800 bg-zinc-950">
          <DialogHeader>
            <DialogTitle className="text-white">Editar Categoria</DialogTitle>
            <DialogDescription className="text-zinc-400">Faca as alteracoes necessarias na categoria.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-zinc-300">Nome da Categoria *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: FiveM Scripts"
                className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-slug" className="text-zinc-300">Slug (URL amigavel)</Label>
              <Input
                id="edit-slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="fivem-scripts"
                className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
              />
              <p className="text-xs text-zinc-500">Gerado automaticamente a partir do nome</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description" className="text-zinc-300">Descricao Breve</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Uma breve descricao da categoria"
                className="min-h-[80px] border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => { setEditingCategory(null); resetForm(); }} 
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} className="bg-emerald-600 hover:bg-emerald-700">
              Salvar Alteracoes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingCategory} onOpenChange={() => setDeletingCategory(null)}>
        <AlertDialogContent className="border-zinc-800 bg-zinc-950">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Excluir Categoria</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              Tem certeza que deseja excluir &quot;{deletingCategory?.name}&quot;? 
              {deletingCategory && deletingCategory.count > 0 && (
                <span className="mt-2 block text-yellow-400">
                  Atencao: Esta categoria possui {deletingCategory.count} produtos associados.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={handleDelete}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
