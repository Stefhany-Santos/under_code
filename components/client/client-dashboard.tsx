'use client';

import { useState } from 'react';
import { Package, Settings, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MyScriptsView } from './my-scripts-view';
import { ProfileSettingsView } from './profile-settings-view';

type ClientView = 'scripts' | 'settings';

interface SidebarLink {
  id: ClientView;
  label: string;
  icon: typeof Package;
}

const sidebarLinks: SidebarLink[] = [
  { id: 'scripts', label: 'Meus Scripts', icon: Package },
  { id: 'settings', label: 'Configuracoes de Perfil', icon: Settings },
];

export function ClientDashboard() {
  const [activeView, setActiveView] = useState<ClientView>('scripts');

  const renderContent = () => {
    switch (activeView) {
      case 'scripts':
        return <MyScriptsView />;
      case 'settings':
        return <ProfileSettingsView />;
      default:
        return <MyScriptsView />;
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
              <h2 className="text-sm font-semibold text-white">Painel do Cliente</h2>
              <p className="mt-1 text-xs text-zinc-500">Gerencie seus scripts</p>
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
                <p className="text-xs text-zinc-500">Precisa de ajuda?</p>
                <a href="#" className="mt-1 block text-sm text-emerald-400 hover:text-emerald-300">
                  Acessar Suporte
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="fixed left-0 right-0 top-16 z-40 border-b border-zinc-800 bg-black/95 backdrop-blur-sm md:hidden">
          <div className="flex gap-1 p-2">
            {sidebarLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveView(link.id)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
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
