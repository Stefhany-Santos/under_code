'use client';

import { LayoutDashboard, Zap } from 'lucide-react';

interface WelcomeHeaderProps {
  userName: string;
  onNavigateToDashboard: () => void;
}

export function WelcomeHeader({ userName, onNavigateToDashboard }: WelcomeHeaderProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 pt-24">
      {/* Welcome Row */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* Left - Greeting */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Bem-vindo de volta, {userName}!
          </h1>
          <p className="mt-2 text-zinc-400">
            Descubra novas ferramentas para o seu servidor ou gerencie suas licencas ativas.
          </p>
        </div>
        
        {/* Right - Dashboard Shortcut */}
        <button
          onClick={onNavigateToDashboard}
          className="flex shrink-0 items-center gap-2 rounded-lg border border-zinc-800 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-900 hover:text-white"
        >
          <LayoutDashboard className="h-4 w-4" />
          Ir para Meu Painel
        </button>
      </div>

      {/* Slim Promo Banner */}
      <div className="mb-10 flex w-full items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
        <Zap className="h-5 w-5 shrink-0 text-emerald-500" />
        <p className="text-sm text-zinc-300">
          <span className="font-medium text-emerald-400">Novidade:</span>{' '}
          O sistema UC Police MDT v2.0 acabou de receber uma grande atualizacao. Confira abaixo!
        </p>
      </div>
    </div>
  );
}
