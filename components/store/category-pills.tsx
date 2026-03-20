'use client';

interface CategoryPillsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryPills({ categories, selected, onSelect }: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
            selected === category
              ? 'border-zinc-700 bg-zinc-800 text-zinc-50'
              : 'border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
          }`}
        >
          <span className="flex items-center gap-2">
            {selected === category && (
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            )}
            {category}
          </span>
        </button>
      ))}
    </div>
  );
}
