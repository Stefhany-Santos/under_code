'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const mockOrders = [
  { id: 'ORD-001', customer: 'Joao Silva', date: '2024-01-15', total: 'R$ 149,90', status: 'Concluido' },
  { id: 'ORD-002', customer: 'Maria Santos', date: '2024-01-14', total: 'R$ 89,90', status: 'Concluido' },
  { id: 'ORD-003', customer: 'Pedro Costa', date: '2024-01-14', total: 'R$ 249,90', status: 'Pendente' },
  { id: 'ORD-004', customer: 'Ana Oliveira', date: '2024-01-13', total: 'R$ 179,90', status: 'Concluido' },
  { id: 'ORD-005', customer: 'Carlos Lima', date: '2024-01-12', total: 'R$ 99,90', status: 'Cancelado' },
];

const statusColors: Record<string, string> = {
  'Concluido': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Pendente': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Cancelado': 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function AdminOrders() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">
          <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
          Vendas
        </Badge>
        <h1 className="text-3xl font-bold text-white">Pedidos</h1>
        <p className="mt-2 text-zinc-400">Acompanhe e gerencie os pedidos da loja</p>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-white">Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Pedido</TableHead>
                  <TableHead className="text-zinc-400">Cliente</TableHead>
                  <TableHead className="text-zinc-400">Data</TableHead>
                  <TableHead className="text-zinc-400">Total</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id} className="border-zinc-800 hover:bg-zinc-800/50">
                    <TableCell className="font-medium text-white">{order.id}</TableCell>
                    <TableCell className="text-zinc-300">{order.customer}</TableCell>
                    <TableCell className="text-zinc-400">{order.date}</TableCell>
                    <TableCell className="text-zinc-300">{order.total}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[order.status]}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
