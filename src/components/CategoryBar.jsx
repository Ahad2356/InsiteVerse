import React from 'react';

const categoriesList = [
  { name: 'All', count: null },
  { name: 'Fashion', count: 68 },
  { name: 'Artificial Intelligence', count: 116 },
  { name: 'Food and Drink', count: 78 },
  { name: 'Business', count: 25 },
  { name: 'Design', count: 25 },
  { name: 'Technology', count: 85 },
  { name: 'Science', count: 120 },
  { name: 'Innovation', count: 63 },
  { name: 'Lifestyle', count: 95 },
  { name: 'Art', count: 42 },
  { name: 'Sports', count: 35 },
];

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 scroll-smooth">
        {categoriesList.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                isSelected
                  ? 'bg-[#0C4137] text-white shadow-md shadow-[#0C4137]/20 scale-105'
                  : 'bg-white text-[#0C4137] border border-[#E6FBF6] hover:border-[#06D6A0] hover:bg-[#E6FBF6]/60'
              }`}
            >
              <span>{cat.name}</span>
              {cat.count !== null && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-[#06D6A0] text-[#0C4137]' : 'bg-[#E6FBF6] text-[#0C4137]/70'
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
