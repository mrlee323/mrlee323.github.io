'use client';

import { CATEGORIES } from '@/lib/categories';

interface CategoryTabsProps {
  active: string;
  onChange: (category: string) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="category-tabs">
      <button
        className={`category-tab${active === 'all' ? ' active' : ''}`}
        data-category="all"
        onClick={() => onChange('all')}
      >
        All
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.slug}
          className={`category-tab${active === cat.slug ? ' active' : ''}`}
          data-category={cat.slug}
          onClick={() => onChange(cat.slug)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
