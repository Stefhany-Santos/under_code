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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { mockScripts, Script, formatPrice, formatDate } from '@/lib/mock-data';
import { Plus, Pencil, Trash2, Download, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ScriptsTable() {
  const [scripts, setScripts] = useState<Script[]>(mockScripts);
  const [search, setSearch] = useState('');
  const [editingScript, setEditingScript] = useState<Script | null>(null);
  const [deletingScript, setDeletingScript] = useState<Script | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredScripts = scripts.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (script: Script) => {
    setScripts(scripts.filter(s => s.id !== script.id));
    setDeletingScript(null);
    toast({
      title: 'Script excluído',
      description: `"${script.name}" foi removido com sucesso.`,
    });
  };

  const handleSaveEdit = () => {
    if (!editingScript) return;
    setScripts(scripts.map(s => s.id === editingScript.id ? editingScript : s));
    setEditingScript(null);
    toast({
      title: 'Script atualizado',
      description: 'As alterações foram salvas com sucesso.',
    });
  };

  const handleAddNew = () => {
    const newScript: Script = {
      id: String(Date.now()),
      name: 'Novo Script',
      slug: 'novo-script',
      description: 'Descrição do novo script',
      longDescription: 'Descrição completa do novo script',
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
    setScripts([...scripts, newScript]);
    setIsAddModalOpen(false);
    setEditingScript(newScript);
    toast({
      title: 'Script criado',
      description: 'Novo script adicionado. Edite os detalhes.',
    });
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Gerenciamento de Scripts</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar scripts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Script
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-secondary/50">
                <TableHead>Script</TableHead>
                <TableHead>Framework</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Atualizado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScripts.map((script) => (
                <TableRow key={script.id} className="border-border hover:bg-secondary/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <span className="text-lg font-bold text-primary">
                          {script.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{script.name}</p>
                        <p className="text-xs text-muted-foreground">v{script.version}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={script.framework === 'QBox' ? 'default' : 'secondary'}
                      className={script.framework === 'QBox' ? 'bg-primary text-primary-foreground' : ''}
                    >
                      {script.framework}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{script.category}</TableCell>
                  <TableCell className="font-medium text-primary">{formatPrice(script.price)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Download className="h-3 w-3" />
                      {script.downloads}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(script.updatedAt)}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditingScript(script)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => setDeletingScript(script)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Mostrando {filteredScripts.length} de {scripts.length} scripts
        </p>
      </CardContent>

      {/* Edit Modal */}
      <Dialog open={!!editingScript} onOpenChange={() => setEditingScript(null)}>
        <DialogContent className="max-w-lg bg-card">
          <DialogHeader>
            <DialogTitle>Editar Script</DialogTitle>
            <DialogDescription>Faça as alterações necessárias no script.</DialogDescription>
          </DialogHeader>
          {editingScript && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={editingScript.name}
                  onChange={(e) => setEditingScript({ ...editingScript, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={editingScript.description}
                  onChange={(e) => setEditingScript({ ...editingScript, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={editingScript.price}
                    onChange={(e) => setEditingScript({ ...editingScript, price: parseFloat(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">Versão</Label>
                  <Input
                    id="version"
                    value={editingScript.version}
                    onChange={(e) => setEditingScript({ ...editingScript, version: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="framework">Framework</Label>
                  <select
                    id="framework"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
                    value={editingScript.framework}
                    onChange={(e) => setEditingScript({ ...editingScript, framework: e.target.value as 'QBox' | 'QBCore' | 'Standalone' })}
                  >
                    <option value="QBox">QBox</option>
                    <option value="QBCore">QBCore</option>
                    <option value="Standalone">Standalone</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={editingScript.category}
                    onChange={(e) => setEditingScript({ ...editingScript, category: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingScript(null)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingScript} onOpenChange={() => setDeletingScript(null)}>
        <AlertDialogContent className="bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Script</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir "{deletingScript?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deletingScript && handleDelete(deletingScript)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Modal */}
      <AlertDialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <AlertDialogContent className="bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Adicionar Novo Script</AlertDialogTitle>
            <AlertDialogDescription>
              Será criado um novo script com valores padrão. Você poderá editar os detalhes em seguida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddNew}>Criar Script</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
