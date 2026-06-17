"use client";

import { categories } from "@/data/attraction";
import type { AttractionCategory } from "@/types";

interface CategoryFilterProps {
  selectedCategory: AttractionCategory;
  onCategoryChange: (category: AttractionCategory) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-3" aria-label="Attraction categories">
      {categories.map((category) => {
        const active = category === selectedCategory;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`min-h-12 whitespace-nowrap rounded-full border px-5 text-sm font-bold transition ${
              active
                ? "border-blue-700 bg-blue-700 text-white shadow-lg shadow-blue-700/20"
                : "border-blue-200 bg-blue-100 text-slate-700 hover:bg-blue-200"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
