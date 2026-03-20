'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScriptsTable } from './scripts-table';

export function AdminProducts() {
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
            <Package className="mr-1.5 h-3.5 w-3.5" />
            Catalogo
          </Badge>
          <h1 className="text-3xl font-bold text-white">Produtos</h1>
          <p className="mt-2 text-zinc-400">Gerencie os scripts e produtos da loja</p>
        </div>
        <Button className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ScriptsTable />
      </motion.div>
    </div>
  );
}
