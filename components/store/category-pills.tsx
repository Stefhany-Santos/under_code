'use client';

import { motion } from 'framer-motion';

interface CategoryPillsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryPills({ categories, selected, onSelect }: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          onClick={() => onSelect(category)}
          className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
            selected === category
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
              : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-300'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
