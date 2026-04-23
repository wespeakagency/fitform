import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/faq';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-stone-100 dark:bg-stone-900 relative z-40 border-t border-stone-200 dark:border-white/5 transition-colors duration-700">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] text-center mb-4">Dudas</h2>
        <h2 className="text-3xl md:text-4xl text-center mb-16 text-stone-900 dark:text-white font-light transition-colors duration-500">Preguntas Frecuentes</h2>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, index) => (
            <div key={index} className="glass-panel px-6 md:px-8 rounded-2xl transition-all duration-300 hover:bg-white dark:hover:bg-white/5">
              <button
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-sm font-medium tracking-wide transition-colors ${openIndex === index ? 'text-stone-900 dark:text-white' : 'text-stone-500 dark:text-stone-400'}`}>
                  {faq.question}
                </span>
                <span className={`p-2 rounded-full border transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-black border-stone-900 dark:border-white rotate-180'
                    : 'text-stone-400 border-stone-300 dark:border-white/10'
                }`}>
                  {openIndex === index ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  openIndex === index ? 'max-h-40 opacity-100 pb-8' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
