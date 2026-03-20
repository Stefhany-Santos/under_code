'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, User } from 'lucide-react';
import { motion } from 'framer-motion';

const mockCustomers = [
  { id: '1', name: 'Joao Silva', email: 'joao@exemplo.com', orders: 5, totalSpent: 'R$ 649,50', since: '2023-08-15' },
  { id: '2', name: 'Maria Santos', email: 'maria@exemplo.com', orders: 3, totalSpent: 'R$ 389,70', since: '2023-09-20' },
  { id: '3', name: 'Pedro Costa', email: 'pedro@exemplo.com', orders: 8, totalSpent: 'R$ 1.249,20', since: '2023-06-10' },
  { id: '4', name: 'Ana Oliveira', email: 'ana@exemplo.com', orders: 2, totalSpent: 'R$ 179,80', since: '2024-01-05' },
  { id: '5', name: 'Carlos Lima', email: 'carlos@exemplo.com', orders: 4, totalSpent: 'R$ 499,60', since: '2023-11-22' },
];

export function AdminCustomers() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400">
          <Users className="mr-1.5 h-3.5 w-3.5" />
          Relacionamento
        </Badge>
        <h1 className="text-3xl font-bold text-white">Clientes</h1>
        <p className="mt-2 text-zinc-400">Visualize e gerencie sua base de clientes</p>
      </motion.div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-white">Todos os Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Cliente</TableHead>
                  <TableHead className="text-zinc-400">Email</TableHead>
                  <TableHead className="text-zinc-400">Pedidos</TableHead>
                  <TableHead className="text-zinc-400">Total Gasto</TableHead>
                  <TableHead className="text-zinc-400">Cliente desde</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCustomers.map((customer) => (
                  <TableRow key={customer.id} className="border-zinc-800 hover:bg-zinc-800/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-white">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-zinc-400">{customer.email}</TableCell>
                    <TableCell className="text-zinc-300">{customer.orders}</TableCell>
                    <TableCell className="text-emerald-400">{customer.totalSpent}</TableCell>
                    <TableCell className="text-zinc-400">{customer.since}</TableCell>
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
