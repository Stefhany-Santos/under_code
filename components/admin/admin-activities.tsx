'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, DollarSign, User, Download, Package, ShoppingCart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ActivityItem {
  id: string;
  type: 'sale' | 'new_customer' | 'download' | 'product_update' | 'order';
  title: string;
  description: string;
  user: string;
  timestamp: string;
  metadata?: {
    product?: string;
    amount?: number;
  };
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'sale',
    title: 'Nova Venda',
    description: 'comprou o UC Police MDT',
    user: 'Lucas M.',
    timestamp: '2024-01-15T14:32:00',
    metadata: { product: 'UC Police MDT', amount: 149.90 },
  },
  {
    id: '2',
    type: 'new_customer',
    title: 'Novo Cliente',
    description: 'se cadastrou na plataforma',
    user: 'Maria Silva',
    timestamp: '2024-01-15T13:45:00',
  },
  {
    id: '3',
    type: 'download',
    title: 'Download',
    description: 'baixou o UC Garage System',
    user: 'Pedro Henrique',
    timestamp: '2024-01-15T12:20:00',
    metadata: { product: 'UC Garage System' },
  },
  {
    id: '4',
    type: 'sale',
    title: 'Nova Venda',
    description: 'comprou o UC Banking',
    user: 'Ana Costa',
    timestamp: '2024-01-15T11:15:00',
    metadata: { product: 'UC Banking', amount: 199.90 },
  },
  {
    id: '5',
    type: 'product_update',
    title: 'Atualizacao',
    description: 'UC HUD foi atualizado para v2.1.0',
    user: 'Sistema',
    timestamp: '2024-01-15T10:00:00',
    metadata: { product: 'UC HUD' },
  },
  {
    id: '6',
    type: 'new_customer',
    title: 'Novo Cliente',
    description: 'se cadastrou na plataforma',
    user: 'Rafael Santos',
    timestamp: '2024-01-15T09:30:00',
  },
  {
    id: '7',
    type: 'download',
    title: 'Download',
    description: 'baixou o UC Police MDT',
    user: 'Lucas M.',
    timestamp: '2024-01-15T09:00:00',
    metadata: { product: 'UC Police MDT' },
  },
  {
    id: '8',
    type: 'order',
    title: 'Pedido Concluido',
    description: 'finalizou o pedido #1234',
    user: 'Julia Fernandes',
    timestamp: '2024-01-14T18:45:00',
    metadata: { amount: 349.80 },
  },
  {
    id: '9',
    type: 'sale',
    title: 'Nova Venda',
    description: 'comprou o UC Inventory',
    user: 'Carlos Oliveira',
    timestamp: '2024-01-14T17:20:00',
    metadata: { product: 'UC Inventory', amount: 129.90 },
  },
  {
    id: '10',
    type: 'download',
    title: 'Download',
    description: 'baixou o UC Banking',
    user: 'Ana Costa',
    timestamp: '2024-01-14T16:10:00',
    metadata: { product: 'UC Banking' },
  },
];

function getActivityIcon(type: ActivityItem['type']) {
  switch (type) {
    case 'sale':
      return { icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    case 'new_customer':
      return { icon: User, color: 'text-blue-400', bg: 'bg-blue-500/10' };
    case 'download':
      return { icon: Download, color: 'text-purple-400', bg: 'bg-purple-500/10' };
    case 'product_update':
      return { icon: Package, color: 'text-orange-400', bg: 'bg-orange-500/10' };
    case 'order':
      return { icon: ShoppingCart, color: 'text-cyan-400', bg: 'bg-cyan-500/10' };
    default:
      return { icon: Activity, color: 'text-zinc-400', bg: 'bg-zinc-500/10' };
  }
}

function formatRelativeTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'agora mesmo';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min atras`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h atras`;
  if (diffInSeconds < 172800) return 'ontem';
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

export function AdminActivities() {
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
            <Activity className="mr-1.5 h-3.5 w-3.5" />
            Historico
          </Badge>
          <h1 className="text-3xl font-bold text-white">Atividades</h1>
          <p className="mt-2 text-zinc-400">Acompanhe tudo que acontece na plataforma em tempo real</p>
        </div>
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <DollarSign className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Vendas Hoje</p>
              <p className="text-xl font-bold text-white">12</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <User className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Novos Clientes</p>
              <p className="text-xl font-bold text-white">5</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Download className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Downloads</p>
              <p className="text-xl font-bold text-white">28</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
              <ShoppingCart className="h-5 w-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Pedidos</p>
              <p className="text-xl font-bold text-white">8</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="h-5 w-5 text-zinc-400" />
              Timeline de Atividades
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-zinc-800">
              {mockActivities.map((activity, index) => {
                const { icon: Icon, color, bg } = getActivityIcon(activity.type);
                
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.03 }}
                    className="flex items-start gap-4 p-4 transition-colors hover:bg-zinc-800/30"
                  >
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${bg}`}>
                      <Icon className={`h-5 w-5 ${color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{activity.user}</span>
                        <span className="text-zinc-400">{activity.description}</span>
                      </div>
                      {activity.metadata?.amount && (
                        <span className="mt-1 inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                          R$ {activity.metadata.amount.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <span className="text-sm text-zinc-500">{formatRelativeTime(activity.timestamp)}</span>
                      <span className="text-xs text-zinc-600">{formatTime(activity.timestamp)}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
