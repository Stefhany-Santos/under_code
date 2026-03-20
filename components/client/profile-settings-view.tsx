'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Shield, 
  Bell,
  Save,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

export function ProfileSettingsView() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Form state
  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name?.split(' ').slice(1).join(' ') || '');
  const [email, setEmail] = useState(user?.email || '');
  
  // 2FA state
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  
  // Preferences state
  const [receiveUpdates, setReceiveUpdates] = useState(true);
  const [receivePromos, setReceivePromos] = useState(false);

  const handleSaveProfile = () => {
    toast({
      title: 'Perfil atualizado',
      description: 'Suas informacoes foram salvas com sucesso.',
    });
  };

  const handleToggle2FA = () => {
    setIs2FAEnabled(!is2FAEnabled);
    toast({
      title: is2FAEnabled ? '2FA Desativado' : '2FA Ativado',
      description: is2FAEnabled 
        ? 'A autenticacao de 2 fatores foi desativada.' 
        : 'A autenticacao de 2 fatores foi ativada com sucesso.',
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium tracking-tight text-white">Meu Perfil</h1>
        <p className="mt-2 text-zinc-400">
          Gerencie suas informacoes pessoais e seguranca
        </p>
      </div>

      {/* Personal Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-zinc-800 bg-[#0A0A0A]"
      >
        <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-4">
          <User className="h-5 w-5 text-zinc-500" />
          <h2 className="font-medium text-white">Informacoes Pessoais</h2>
        </div>
        
        <div className="p-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* First Name */}
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-zinc-300">
                Nome
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-white placeholder-zinc-500 outline-none transition-all focus:border-zinc-700 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Seu nome"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-zinc-300">
                Sobrenome
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-white placeholder-zinc-500 outline-none transition-all focus:border-zinc-700 focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Seu sobrenome"
              />
            </div>

            {/* Email */}
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/50 py-2.5 pl-11 pr-4 text-white placeholder-zinc-500 outline-none transition-all focus:border-zinc-700 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleSaveProfile}
              className="gap-2 bg-white text-black hover:bg-zinc-200"
            >
              <Save className="h-4 w-4" />
              Salvar Alteracoes
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Security Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-lg border border-zinc-800 bg-[#0A0A0A]"
      >
        <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-4">
          <Shield className="h-5 w-5 text-zinc-500" />
          <h2 className="font-medium text-white">Seguranca da Conta</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-white">Autenticacao de 2 Fatores (2FA)</h3>
                <Badge 
                  className={`text-[10px] ${
                    is2FAEnabled 
                      ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400' 
                      : 'border border-zinc-700 bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {is2FAEnabled ? 'Ativado' : 'Desativado'}
                </Badge>
              </div>
              <p className="text-sm text-zinc-500">
                Adicione uma camada extra de seguranca a sua conta
              </p>
            </div>
            
            {/* Toggle Switch */}
            <button
              onClick={handleToggle2FA}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                is2FAEnabled ? 'bg-emerald-600' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                  is2FAEnabled ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Preferences Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-lg border border-zinc-800 bg-[#0A0A0A]"
      >
        <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-4">
          <Bell className="h-5 w-5 text-zinc-500" />
          <h2 className="font-medium text-white">Preferencias</h2>
        </div>
        
        <div className="divide-y divide-zinc-800">
          {/* Updates Checkbox */}
          <div className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <h3 className="font-medium text-white">Atualizacoes de Scripts</h3>
              <p className="text-sm text-zinc-500">
                Receber emails quando seus scripts receberem atualizacoes
              </p>
            </div>
            <button
              onClick={() => setReceiveUpdates(!receiveUpdates)}
              className={`flex h-6 w-6 items-center justify-center rounded border transition-all ${
                receiveUpdates 
                  ? 'border-emerald-500 bg-emerald-600' 
                  : 'border-zinc-700 bg-zinc-800'
              }`}
            >
              {receiveUpdates && <Check className="h-4 w-4 text-white" />}
            </button>
          </div>

          {/* Promos Checkbox */}
          <div className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <h3 className="font-medium text-white">Ofertas Promocionais</h3>
              <p className="text-sm text-zinc-500">
                Receber emails sobre promocoes e descontos exclusivos
              </p>
            </div>
            <button
              onClick={() => setReceivePromos(!receivePromos)}
              className={`flex h-6 w-6 items-center justify-center rounded border transition-all ${
                receivePromos 
                  ? 'border-emerald-500 bg-emerald-600' 
                  : 'border-zinc-700 bg-zinc-800'
              }`}
            >
              {receivePromos && <Check className="h-4 w-4 text-white" />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
