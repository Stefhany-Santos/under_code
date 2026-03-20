'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { KPICards } from './kpi-cards';
import { SalesChart } from './sales-chart';
import { ScriptsTable } from './scripts-table';
import { AdminSettings } from './admin-settings';
import { BarChart3, Package, Settings, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-grid p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
            <Shield className="mr-1.5 h-3.5 w-3.5" />
            Painel Administrativo
          </Badge>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Admin</h1>
          <p className="mt-2 text-muted-foreground">Gerencie sua loja e acompanhe métricas de desempenho</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TabsList className="glass mb-8 border border-border/30 bg-transparent p-1.5">
              <TabsTrigger 
                value="overview" 
                className="gap-2 transition-all data-[state=active]:glow-primary-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BarChart3 className="h-4 w-4" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger 
                value="scripts"
                className="gap-2 transition-all data-[state=active]:glow-primary-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Package className="h-4 w-4" />
                Scripts
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="gap-2 transition-all data-[state=active]:glow-primary-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Settings className="h-4 w-4" />
                Configurações
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="overview" className="space-y-6">
            <KPICards />
            <SalesChart />
          </TabsContent>

          <TabsContent value="scripts">
            <ScriptsTable />
          </TabsContent>

          <TabsContent value="settings">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
