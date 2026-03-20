'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Script, formatPrice, formatDate } from '@/lib/mock-data';
import { ShoppingCart, Download, Check, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductDetailModalProps {
  product: Script | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: Script) => void;
}

export function ProductDetailModal({ 
  product, 
  open, 
  onOpenChange, 
  onAddToCart 
}: ProductDetailModalProps) {
  if (!product) return null;

  const metaItems = [
    { icon: Tag, label: 'Versao', value: product.version },
    { icon: Download, label: 'Downloads', value: product.downloads.toLocaleString('pt-BR') },
    { icon: Calendar, label: 'Atualizado', value: formatDate(product.updatedAt) },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-3xl flex-col overflow-hidden border-zinc-800 bg-zinc-950 p-0">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="flex items-center gap-3 text-xl text-zinc-50">
                    {product.name}
                  </DialogTitle>
                  <DialogDescription className="mt-2 flex items-center gap-2">
                    <Badge 
                      className={`text-xs ${
                        product.framework === 'QBox' 
                          ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400' 
                          : 'border border-zinc-700 bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {product.framework}
                    </Badge>
                    <span className="text-zinc-500">{product.category}</span>
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              {/* Image placeholder */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-video overflow-hidden rounded-lg bg-zinc-800/50"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-zinc-700">{product.name.charAt(0)}</span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="mb-2 font-medium text-zinc-200">Descricao</h4>
                <p className="leading-relaxed text-zinc-400">{product.description}</p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="mb-4 font-medium text-zinc-200">Recursos</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {product.features.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-center gap-3 text-sm text-zinc-400"
                    >
                      <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Meta info */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-4 border-t border-zinc-800 pt-6"
              >
                {metaItems.map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon className="mx-auto mb-2 h-4 w-4 text-zinc-500" />
                    <div className="text-xs text-zinc-500">{item.label}</div>
                    <div className="mt-1 text-sm font-medium text-zinc-300">{item.value}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 border-t border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500">Preco</div>
              <div className="text-2xl font-semibold text-zinc-50">{formatPrice(product.price)}</div>
            </div>
            <Button 
              className="bg-white text-black hover:bg-zinc-200"
              onClick={() => {
                onAddToCart(product);
                onOpenChange(false);
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
