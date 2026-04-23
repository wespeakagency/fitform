import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/faq';
import type { FAQItem } from '@/types';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const mid = Math.ceil(FAQ_ITEMS.length / 2);
  const leftColumn = FAQ_ITEMS.slice(0, mid);
  const rightColumn = FAQ_ITEMS.slice(mid);

  const renderItem = (faq: FAQItem, globalIndex: number) => {
    const isOpen = openIndex === globalIndex;
    return (
      <div key={globalIndex} className="glass-panel px-6 md:px-8 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-white/5">
        <button
          className="w-full py-6 flex justify-between items-center text-left gap-4"
          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
          aria-expanded={isOpen}
        >
          <span className={`text-sm font-medium tracking-wide transition-colors ${isOpen ? 'text-stone-900 dark:text-white' : 'text-stone-500 dark:text-stone-400'}`}>
            {faq.question}
          </span>
          <span className={`shrink-0 p-2 rounded-full border transition-all duration-300 ${
            isOpen
              ? 'bg-stone-900 text-white dark:bg-white dark:text-black border-stone-900 dark:border-white rotate-180'
              : 'text-stone-400 border-stone-300 dark:border-white/10'
          }`}>
            {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          </span>
        </button>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <p className={`text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light ${isOpen ? 'pb-8' : ''}`}>
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="faq" className="scroll-mt-28 py-32 bg-stone-100 dark:bg-stone-900 relative z-40 border-t border-stone-200 dark:border-white/5 transition-colors duration-700">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] text-center mb-4">Dudas</h2>
        <h2 className="text-3xl md:text-4xl text-center mb-16 text-stone-900 dark:text-white font-light transition-colors duration-500">Preguntas Frecuentes</h2>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6 items-start">
          <div className="space-y-4">
            {leftColumn.map((faq, i) => renderItem(faq, i))}
          </div>
          <div className="space-y-4">
            {rightColumn.map((faq, i) => renderItem(faq, mid + i))}
          </div>
        </div>
      </div>
    </section>
  );
};
