'use client';

import { formatPrice } from '@/lib/mock-data';
import { Package, User, CreditCard, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Activity {
  id: string;
  type: 'sale' | 'signup' | 'download';
  title: string;
  description: string;
  time: string;
  value?: number;
}

const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'sale',
    title: 'Nova Venda',
    description: 'Script Loja Virtual comprado por Lucas M.',
    time: 'Ha 5 min',
    value: 149.90,
  },
  {
    id: '2',
    type: 'signup',
    title: 'Novo Cliente',
    description: 'Amanda Silva criou uma conta',
    time: 'Ha 12 min',
  },
  {
    id: '3',
    type: 'sale',
    title: 'Nova Venda',
    description: 'Sistema Bancario comprado por Pedro H.',
    time: 'Ha 28 min',
    value: 199.90,
  },
  {
    id: '4',
    type: 'download',
    title: 'Download',
    description: 'Script Mecanica baixado por Carlos R.',
    time: 'Ha 45 min',
  },
  {
    id: '5',
    type: 'sale',
    title: 'Nova Venda',
    description: 'HUD Personalizado comprado por Joao P.',
    time: 'Ha 1h',
    value: 79.90,
  },
];

const activityIcons = {
  sale: CreditCard,
  signup: User,
  download: Package,
};

const activityColors = {
  sale: 'bg-emerald-500/10 text-emerald-400',
  signup: 'bg-blue-500/10 text-blue-400',
  download: 'bg-purple-500/10 text-purple-400',
};

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Atividade Recente</h3>
          <p className="text-sm text-zinc-500">Ultimas acoes na plataforma</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800">
          <Clock className="h-4 w-4 text-zinc-400" />
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {recentActivities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          const colorClass = activityColors[activity.type];
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{activity.title}</p>
                  {activity.value && (
                    <span className="shrink-0 text-sm font-semibold text-emerald-400">
                      +{formatPrice(activity.value)}
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-zinc-500">{activity.description}</p>
                <p className="mt-1 text-xs text-zinc-600">{activity.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <button className="mt-6 w-full rounded-lg border border-zinc-800 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white">
        Ver todas as atividades
      </button>
    </div>
  );
}
