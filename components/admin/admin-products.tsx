'use client';

import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProductsTable } from './products-table';

export function AdminProducts() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge variant="outline" className="mb-4 border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <Package className="mr-1.5 h-3.5 w-3.5" />
          Catalogo
        </Badge>
        <h1 className="text-3xl font-bold text-white">Produtos</h1>
        <p className="mt-2 text-zinc-400">Gerencie o catalogo de produtos da loja</p>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ProductsTable />
      </motion.div>
    </div>
  );
}
