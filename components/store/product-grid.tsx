'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from './product-card';
import { CategoryPills } from './category-pills';
import { mockScripts, Script, scriptCategories } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGridProps {
  onAddToCart: (script: Script) => void;
  onViewDetails: (script: Script) => void;
}

export function ProductGrid({ onAddToCart, onViewDetails }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(() => {
    const cats = scriptCategories.map(c => c.label);
    return ['Todos', ...cats];
  }, []);

  const filteredScripts = useMemo(() => {
    if (selectedCategory === 'Todos') {
      return mockScripts;
    }
    const categoryValue = scriptCategories.find(c => c.label === selectedCategory)?.value;
    return mockScripts.filter(script => script.category === categoryValue);
  }, [selectedCategory]);

  return (
    <section id="store" className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            Nossa Loja
          </h2>
          <p className="text-zinc-500">
            {mockScripts.length} scripts disponiveis
          </p>
        </div>

        {/* Category Pills */}
        <div className="mb-10">
          <CategoryPills
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Results info */}
        <div className="mb-6">
          <p className="text-sm text-zinc-500">
            Mostrando {filteredScripts.length} {filteredScripts.length === 1 ? 'script' : 'scripts'}
          </p>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filteredScripts.length > 0 ? (
            <motion.div
              key="scripts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredScripts.map((script, index) => (
                <ProductCard
                  key={script.id}
                  product={script}
                  onAddToCart={onAddToCart}
                  onViewDetails={onViewDetails}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/30 py-20 text-center"
            >
              <p className="mb-2 text-zinc-400">Nenhum script encontrado</p>
              <button
                onClick={() => setSelectedCategory('Todos')}
                className="text-sm text-emerald-500 hover:text-emerald-400"
              >
                Ver todos os scripts
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
