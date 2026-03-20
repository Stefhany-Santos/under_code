'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderTree, Plus, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const mockCategories = [
  { id: '1', name: 'FiveM Scripts', description: 'Scripts para servidores FiveM', count: 24 },
  { id: '2', name: 'RedM Scripts', description: 'Scripts para servidores RedM', count: 8 },
  { id: '3', name: 'Sistemas de UI', description: 'Interfaces e HUDs', count: 12 },
  { id: '4', name: 'Veiculos', description: 'Scripts de veiculos e garagens', count: 15 },
  { id: '5', name: 'Empregos', description: 'Sistemas de trabalho e profissoes', count: 18 },
];

export function AdminCategories() {
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
        <Button className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
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
        {mockCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-white">{category.name}</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-zinc-400">{category.description}</p>
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                  {category.count} produtos
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
