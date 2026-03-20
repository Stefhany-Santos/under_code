'use client';

import { useRef, useState, useEffect } from 'react';

interface CategoryPillsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryPills({ categories, selected, onSelect }: CategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const checkScroll = () => {
      setShowLeftGradient(container.scrollLeft > 0);
      setShowRightGradient(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    };

    checkScroll();
    container.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    
    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <div className="relative">
      {/* Left gradient fade */}
      {showLeftGradient && (
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-black to-transparent" />
      )}
      
      {/* Right gradient fade */}
      {showRightGradient && (
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-black to-transparent" />
      )}

      {/* Scrollable container */}
      <div 
        ref={scrollRef}
        className="scrollbar-hide flex items-center gap-2 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`shrink-0 whitespace-nowrap rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
              selected === category
                ? 'border-zinc-700 bg-zinc-900 text-zinc-50'
                : 'border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'
            }`}
          >
            <span className="flex items-center gap-1.5">
              {selected === category && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              )}
              {category}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
