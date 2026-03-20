'use client';

import { mockAnalytics, formatPrice } from '@/lib/mock-data';
// Auth-aware KPI component
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function KPICards() {
  const analytics = mockAnalytics;

  const kpis = [
    {
      title: 'MRR',
      value: formatPrice(analytics.mrr),
      icon: DollarSign,
      change: `+${analytics.mrrGrowth}%`,
      changeType: 'positive' as const,
      description: 'vs. mês anterior',
    },
    {
      title: 'Receita Total',
      value: formatPrice(analytics.totalRevenue),
      icon: ShoppingCart,
      change: '+8.2%',
      changeType: 'positive' as const,
      description: 'acumulado',
    },
    {
      title: 'Clientes Ativos',
      value: analytics.activeCustomers.toLocaleString('pt-BR'),
      icon: Users,
      change: '+5.1%',
      changeType: 'positive' as const,
      description: `de ${analytics.totalCustomers.toLocaleString('pt-BR')} total`,
    },
    {
      title: 'Taxa de Conversão',
      value: `${analytics.conversionRate}%`,
      icon: TrendingUp,
      change: '-0.3%',
      changeType: 'negative' as const,
      description: 'vs. mês anterior',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <motion.div
          key={kpi.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          className="glass-card rounded-2xl p-6 transition-all hover:glow-primary-sm"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
              <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-3">
              <kpi.icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className={`flex items-center gap-0.5 text-sm font-medium ${
              kpi.changeType === 'positive' ? 'text-emerald-500' : 'text-red-500'
            }`}>
              {kpi.changeType === 'positive' ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {kpi.change}
            </span>
            <span className="text-sm text-muted-foreground">{kpi.description}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
