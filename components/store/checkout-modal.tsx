'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Script, formatPrice } from '@/lib/mock-data';
import { 
  CreditCard, 
  QrCode, 
  Trash2, 
  ShoppingBag, 
  CheckCircle2,
  Copy,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: Script[];
  onRemoveFromCart: (scriptId: string) => void;
  onClearCart: () => void;
}

type PaymentMethod = 'pix' | 'cartao' | null;
type CheckoutStep = 'cart' | 'payment' | 'success';

export function CheckoutModal({ 
  open, 
  onOpenChange, 
  cart, 
  onRemoveFromCart,
  onClearCart 
}: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  const handlePayment = async () => {
    if (!paymentMethod) return;
    
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('success');
  };

  const handleClose = () => {
    if (step === 'success') {
      onClearCart();
      setStep('cart');
      setPaymentMethod(null);
    }
    onOpenChange(false);
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136undercode@pix.com.br5204000053039865802BR5925UNDER CODE SCRIPTS LTDA6009SAO PAULO62070503***6304ABCD');
    toast({
      title: 'Codigo copiado!',
      description: 'O codigo PIX foi copiado.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg border-zinc-800 bg-zinc-950">
        <AnimatePresence mode="wait">
          {step === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg text-zinc-50">
                  <ShoppingBag className="h-5 w-5 text-zinc-400" />
                  Carrinho
                </DialogTitle>
                <DialogDescription className="text-zinc-500">
                  {cart.length > 0 
                    ? `${cart.length} item(s) no carrinho`
                    : 'Seu carrinho esta vazio'}
                </DialogDescription>
              </DialogHeader>

              {cart.length > 0 ? (
                <div className="mt-6 space-y-4">
                  <div className="max-h-60 space-y-3 overflow-y-auto">
                    {cart.map((product, index) => (
                      <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">
                            <span className="text-sm font-medium text-zinc-400">
                              {product.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-zinc-200">{product.name}</span>
                              <Badge className="border border-zinc-700 bg-zinc-800 text-[10px] text-zinc-400">
                                {product.framework}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-zinc-200">{formatPrice(product.price)}</span>
                          <button 
                            className="text-zinc-500 transition-colors hover:text-red-400"
                            onClick={() => onRemoveFromCart(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                    <span className="text-zinc-400">Total</span>
                    <span className="text-xl font-semibold text-zinc-50">{formatPrice(total)}</span>
                  </div>

                  <Button 
                    className="w-full bg-white text-black hover:bg-zinc-200" 
                    onClick={() => setStep('payment')}
                  >
                    Continuar
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center py-12">
                  <ShoppingBag className="mb-4 h-12 w-12 text-zinc-700" />
                  <p className="text-zinc-500">Adicione produtos ao carrinho</p>
                </div>
              )}
            </motion.div>
          )}

          {step === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DialogHeader>
                <DialogTitle className="text-lg text-zinc-50">Pagamento</DialogTitle>
                <DialogDescription className="text-zinc-500">
                  Total: <span className="font-medium text-zinc-300">{formatPrice(total)}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-4">
                <div className="grid gap-3">
                  {[
                    { id: 'pix' as const, icon: QrCode, title: 'PIX', desc: 'Pagamento instantaneo', badge: '5% OFF' },
                    { id: 'cartao' as const, icon: CreditCard, title: 'Cartao de Credito', desc: 'Ate 12x sem juros' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      className={`flex items-center gap-4 rounded-lg border p-4 text-left transition-colors ${
                        paymentMethod === method.id 
                          ? 'border-emerald-500/30 bg-emerald-500/5' 
                          : 'border-zinc-800 hover:border-zinc-700'
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        paymentMethod === method.id ? 'bg-emerald-500/10' : 'bg-zinc-800'
                      }`}>
                        <method.icon className={`h-5 w-5 ${paymentMethod === method.id ? 'text-emerald-500' : 'text-zinc-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-zinc-200">{method.title}</span>
                          {method.badge && (
                            <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-[10px] text-emerald-400">
                              {method.badge}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-zinc-500">{method.desc}</span>
                      </div>
                      {paymentMethod === method.id && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      )}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {paymentMethod === 'pix' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                        <div className="mx-auto mb-4 flex aspect-square max-w-32 items-center justify-center rounded-lg bg-white p-3">
                          <QrCode className="h-full w-full text-black" />
                        </div>
                        <p className="mb-3 text-center text-xs text-zinc-500">
                          Escaneie o QR Code ou copie o codigo
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="w-full border-zinc-800 bg-transparent text-zinc-300 hover:bg-zinc-800" 
                          onClick={copyPixCode}
                        >
                          <Copy className="mr-2 h-3.5 w-3.5" />
                          Copiar Codigo
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === 'cartao' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                        <input
                          type="text"
                          placeholder="Numero do cartao"
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/AA"
                            className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Nome no cartao"
                          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-zinc-800 bg-transparent text-zinc-300 hover:bg-zinc-900"
                    onClick={() => setStep('cart')}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>
                  <Button 
                    className="flex-1 bg-white text-black hover:bg-zinc-200"
                    disabled={!paymentMethod || isProcessing}
                    onClick={handlePayment}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Confirmar'
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-8 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10"
              >
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              </motion.div>
              <h3 className="mb-2 text-xl font-semibold text-zinc-50">Pagamento Confirmado</h3>
              <p className="mb-8 max-w-sm text-sm text-zinc-500">
                Seus scripts estao disponiveis na area do cliente.
              </p>
              <Button 
                className="bg-white text-black hover:bg-zinc-200"
                onClick={handleClose}
              >
                Acessar Meus Scripts
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
