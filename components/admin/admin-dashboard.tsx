'use client';

import { useState } from 'react';
import { BarChart3, Package, CreditCard, User, ChevronRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { KPICards } from './kpi-cards';
import { SalesChart } from './sales-chart';
import { ScriptsTable } from './scripts-table';
import { PaymentsView } from './payments-view';
import { AdminProfileView } from './admin-profile-view';

type AdminView = 'overview' | 'scripts' | 'payments' | 'profile';

interface SidebarLink {
  id: AdminView;
  label: string;
  icon: typeof BarChart3;
}

const sidebarLinks: SidebarLink[] = [
  { id: 'overview', label: 'Visao Geral', icon: BarChart3 },
  { id: 'scripts', label: 'Gerenciar Scripts', icon: Package },
  { id: 'payments', label: 'Pagamentos & Loja', icon: CreditCard },
  { id: 'profile', label: 'Meu Perfil', icon: User },
];

export function AdminDashboard() {
  const [activeView, setActiveView] = useState<AdminView>('overview');

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-medium tracking-tight text-white">Visao Geral</h1>
              <p className="mt-2 text-zinc-400">
                Acompanhe as metricas de desempenho da sua loja
              </p>
            </div>
            <KPICards />
            <SalesChart />
          </div>
        );
      case 'scripts':
        return (
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-medium tracking-tight text-white">Gerenciar Scripts</h1>
              <p className="mt-2 text-zinc-400">
                Adicione, edite e gerencie os scripts da sua loja
              </p>
            </div>
            <ScriptsTable />
          </div>
        );
      case 'payments':
        return <PaymentsView />;
      case 'profile':
        return <AdminProfileView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 border-r border-zinc-800 bg-black md:block">
          <div className="flex h-full flex-col">
            {/* Sidebar Header */}
            <div className="border-b border-zinc-800 px-6 py-5">
              <div className="flex items-center gap-2">
                <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-xs text-emerald-400">
                  <Shield className="mr-1 h-3 w-3" />
                  Admin
                </Badge>
              </div>
              <h2 className="mt-3 text-sm font-semibold text-white">Central do Admin</h2>
              <p className="mt-1 text-xs text-zinc-500">Gerencie sua loja</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {sidebarLinks.map((link) => {
                  const isActive = activeView === link.id;
                  return (
                    <li key={link.id}>
                      <button
                        onClick={() => setActiveView(link.id)}
                        className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                          isActive
                            ? 'bg-zinc-900 text-white'
                            : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
                        }`}
                      >
                        <link.icon className={`h-4 w-4 transition-colors ${isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                        <span className="flex-1 text-left">{link.label}</span>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 text-emerald-400" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="border-t border-zinc-800 p-4">
              <div className="rounded-lg bg-zinc-900/50 p-4">
                <p className="text-xs text-zinc-500">Versao</p>
                <p className="mt-1 text-sm text-zinc-300">UnderCode Admin v1.0</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="fixed left-0 right-0 top-16 z-40 border-b border-zinc-800 bg-black/95 backdrop-blur-sm md:hidden">
          <div className="flex gap-1 overflow-x-auto p-2">
            {sidebarLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveView(link.id)}
                  className={`flex shrink-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                    isActive
                      ? 'bg-zinc-900 text-white'
                      : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
                  }`}
                >
                  <link.icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />
                  <span className="hidden sm:inline">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="min-h-screen w-full pt-12 md:ml-64 md:pt-0">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-8"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
