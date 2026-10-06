import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bell, Calendar, Sparkles } from 'lucide-react';

const breakingNews = [
  "Neural Interfaces & Generative AI: Expanding Creative Expression in 2026",
  "Sustainable Eating in a Climate-Conscious World: The Micro-Farm Revolution",
  "Museums x Couture: Architectural Runway Collaborations Unveiled in Paris",
  "Canvas & Couture: Art-Inspired Designs Dominate Global Runways"
];

export default function TopTicker({ onOpenNewsletter }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % breakingNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-[#0C4137] text-white text-xs py-2 px-4 md:px-8 flex flex-wrap items-center justify-between border-b border-[#165e51]">
      <div className="flex items-center gap-3 overflow-hidden">
        <span className="bg-[#06D6A0] text-[#0C4137] font-extrabold uppercase px-2.5 py-0.5 rounded text-[10px] tracking-wider flex items-center gap-1 shrink-0 shadow-sm">
          <Sparkles className="w-3 h-3 animate-pulse" /> Insight Ticker
        </span>
        <p className="font-medium text-white/90 truncate max-w-xs md:max-w-md lg:max-w-xl transition-all duration-500">
          {breakingNews[index]}
        </p>
        <div className="hidden sm:flex items-center gap-1 shrink-0 ml-2">
          <button 
            onClick={() => setIndex((prev) => (prev - 1 + breakingNews.length) % breakingNews.length)}
            className="p-0.5 hover:text-[#06D6A0] transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={() => setIndex((prev) => (prev + 1) % breakingNews.length)}
            className="p-0.5 hover:text-[#06D6A0] transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 text-white/80 shrink-0">
        <button 
          onClick={onOpenNewsletter}
          className="hover:text-[#06D6A0] transition-colors flex items-center gap-1 font-medium"
        >
          <Bell className="w-3 h-3 text-[#06D6A0]" /> Join Weekly Journal
        </button>
        <span className="text-white/30">•</span>
        <div className="flex items-center gap-1.5 font-medium">
          <Calendar className="w-3 h-3 text-[#06D6A0]" />
          <span>{today}</span>
        </div>
      </div>
    </div>
  );
}
