'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  DollarSign,
  Percent,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  fee: string;
}

export function PaymentsView() {
  const { toast } = useToast();
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'mercadopago',
      name: 'Mercado Pago (PIX)',
      description: 'Pagamentos instantaneos via PIX com Mercado Pago',
      icon: '/mercadopago-icon.svg',
      enabled: true,
      fee: '0.99%',
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Cartoes de credito e debito internacionais',
      icon: '/stripe-icon.svg',
      enabled: false,
      fee: '2.9% + R$0.30',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pagamentos internacionais via PayPal',
      icon: '/paypal-icon.svg',
      enabled: false,
      fee: '4.99% + R$0.60',
    },
  ]);

  const handleTogglePayment = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === id 
          ? { ...method, enabled: !method.enabled }
          : method
      )
    );

    const method = paymentMethods.find(m => m.id === id);
    const newState = !method?.enabled;
    
    toast({
      title: newState ? 'Metodo ativado' : 'Metodo desativado',
      description: `${method?.name} foi ${newState ? 'ativado' : 'desativado'} com sucesso.`,
    });
  };

  const enabledCount = paymentMethods.filter(m => m.enabled).length;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium tracking-tight text-white">Pagamentos & Loja</h1>
        <p className="mt-2 text-zinc-400">
          Configure os metodos de pagamento aceitos na sua loja
        </p>
      </div>

      {/* Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-zinc-800 bg-[#0A0A0A] p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
              <CreditCard className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Status dos Pagamentos</h3>
              <p className="text-sm text-zinc-500">
                {enabledCount} de {paymentMethods.length} metodos ativos
              </p>
            </div>
          </div>
          <Badge 
            className={`${
              enabledCount > 0 
                ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400' 
                : 'border border-amber-500/20 bg-amber-500/10 text-amber-400'
            }`}
          >
            {enabledCount > 0 ? 'Operacional' : 'Nenhum Ativo'}
          </Badge>
        </div>
      </motion.div>

      {/* Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-lg border border-zinc-800 bg-[#0A0A0A]"
      >
        <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-4">
          <DollarSign className="h-5 w-5 text-zinc-500" />
          <h2 className="font-medium text-white">Metodos de Pagamento</h2>
        </div>
        
        <div className="divide-y divide-zinc-800">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
              className="flex items-center justify-between p-6"
            >
              <div className="flex items-center gap-4">
                {/* Icon placeholder */}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  method.enabled ? 'bg-zinc-800' : 'bg-zinc-900'
                }`}>
                  {method.id === 'mercadopago' && (
                    <span className="text-lg font-bold text-blue-400">MP</span>
                  )}
                  {method.id === 'stripe' && (
                    <span className="text-lg font-bold text-purple-400">S</span>
                  )}
                  {method.id === 'paypal' && (
                    <span className="text-lg font-bold text-blue-500">PP</span>
                  )}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{method.name}</h3>
                    {method.enabled && (
                      <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-[10px] text-emerald-400">
                        Ativo
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500">{method.description}</p>
                  <div className="flex items-center gap-1 text-xs text-zinc-600">
                    <Percent className="h-3 w-3" />
                    Taxa: {method.fee}
                  </div>
                </div>
              </div>
              
              {/* Toggle Switch */}
              <button
                onClick={() => handleTogglePayment(method.id)}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  method.enabled ? 'bg-emerald-600' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                    method.enabled ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-start gap-4 rounded-lg border border-zinc-800 bg-zinc-900/30 p-4"
      >
        <AlertCircle className="h-5 w-5 shrink-0 text-zinc-500" />
        <div className="space-y-1">
          <p className="text-sm text-zinc-300">
            As integracoes de pagamento requerem configuracao adicional.
          </p>
          <p className="text-xs text-zinc-500">
            Acesse a documentacao de cada provedor para obter suas credenciais de API.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
