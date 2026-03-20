'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from './product-card';
import { CategoryPills } from './category-pills';
import { mockScripts, Script, scriptCategories } from '@/lib/mock-data';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

interface ProductGridProps {
  onAddToCart: (script: Script) => void;
  onViewDetails: (script: Script) => void;
}

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'newest';

export function ProductGrid({ onAddToCart, onViewDetails }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const categories = useMemo(() => {
    const cats = scriptCategories.map(c => c.label);
    return ['Todos', ...cats];
  }, []);

  const filteredScripts = useMemo(() => {
    let scripts = mockScripts;
    
    // Filter by category
    if (selectedCategory !== 'Todos') {
      const categoryValue = scriptCategories.find(c => c.label === selectedCategory)?.value;
      scripts = scripts.filter(script => script.category === categoryValue);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      scripts = scripts.filter(script => 
        script.name.toLowerCase().includes(query) ||
        script.description.toLowerCase().includes(query)
      );
    }
    
    // Sort
    switch (sortBy) {
      case 'price-asc':
        scripts = [...scripts].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        scripts = [...scripts].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        scripts = [...scripts].sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      case 'popular':
      default:
        scripts = [...scripts].sort((a, b) => b.downloads - a.downloads);
        break;
    }
    
    return scripts;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="store" className="bg-black py-24">
      {/* Top border */}
      <div className="mx-auto max-w-7xl border-t border-zinc-900" />
      
      <div className="mx-auto max-w-7xl px-6 pt-24">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-emerald-500">
            Catalogo
          </span>
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-white text-balance">
            Catalogo de Scripts
          </h2>
          <p className="mx-auto max-w-lg text-zinc-400">
            {mockScripts.length} scripts disponiveis para transformar seu servidor.
          </p>
        </div>

        {/* Catalog Toolbar */}
        <div className="mt-8">
          {/* Row 1: Search & Sort - Aligned Right */}
          <div className="mb-6 flex w-full flex-col items-center justify-end gap-4 sm:flex-row">
            {/* Search Input */}
            <div className="group relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar scripts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-zinc-700 focus:bg-zinc-900/60"
              />
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-zinc-800 bg-zinc-900/40 pl-4 pr-10 text-sm text-zinc-300 outline-none transition-all focus:border-zinc-700 focus:bg-zinc-900/60 sm:w-auto sm:min-w-[160px]"
              >
                <option value="popular">Mais Populares</option>
                <option value="price-asc">Menor Preco</option>
                <option value="price-desc">Maior Preco</option>
                <option value="newest">Mais Recentes</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            </div>
          </div>

          {/* Row 2: Categories - Centered */}
          <div className="mb-10 flex w-full justify-center">
            <CategoryPills
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
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
