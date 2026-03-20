'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { Script, formatPrice } from '@/lib/mock-data';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Script;
  onAddToCart: (product: Script) => void;
  onViewDetails: (product: Script) => void;
  index?: number;
}

export function ProductCard({ product, onAddToCart, onViewDetails, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div 
        className="cursor-pointer overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-[0_8px_30px_rgb(16,185,129,0.1)]"
        onClick={() => onViewDetails(product)}
      >
        {/* Image placeholder */}
        <div className="relative aspect-video bg-zinc-900/50">
          {/* Placeholder content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-zinc-800">{product.name.charAt(0)}</span>
          </div>
          
          {/* Framework badge */}
          <div className="absolute left-3 top-3">
            <Badge 
              className={`text-[10px] font-medium ${
                product.framework === 'QBox' 
                  ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400' 
                  : 'border border-zinc-700 bg-zinc-800 text-zinc-300'
              }`}
            >
              {product.framework}
            </Badge>
          </div>

          {/* New badge */}
          {product.isNew && (
            <div className="absolute right-3 top-3">
              <Badge className="border border-amber-500/20 bg-amber-500/10 text-[10px] font-medium text-amber-400">
                Novo
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-1 text-lg font-medium text-white">
            {product.name}
          </h3>
          
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {product.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-white">
              {formatPrice(product.price)}
            </span>
            <Button 
              size="sm" 
              className="h-8 bg-white px-3 text-xs font-medium text-black hover:bg-zinc-200"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            >
              <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
