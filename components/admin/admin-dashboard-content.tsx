'use client';

import { Badge } from '@/components/ui/badge';
import { KPICards } from './kpi-cards';
import { SalesChart } from './sales-chart';
import { RecentActivity } from './recent-activity';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function AdminDashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge variant="outline" className="mb-4 border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <Shield className="mr-1.5 h-3.5 w-3.5" />
          Painel Administrativo
        </Badge>
        <h1 className="text-3xl font-bold text-white">Visao Geral</h1>
        <p className="mt-2 text-zinc-400">Acompanhe metricas e gerencie sua loja</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <KPICards />
      </motion.div>

      {/* Charts and Activity Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sales Chart - Takes 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <SalesChart />
        </motion.div>

        {/* Recent Activity - Takes 1 column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RecentActivity />
        </motion.div>
      </div>
    </div>
  );
}
