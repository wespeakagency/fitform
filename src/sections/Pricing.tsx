import React from 'react';
import { BSportWidget } from '@/features/bsport/BSportWidget';

export const Pricing: React.FC = () => {
  return (
    <section
      id="pricing"
      className="scroll-mt-28 py-32 bg-stone-50 dark:bg-stone-950 relative z-[48] transition-colors duration-700"
    >
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-3xl md:text-5xl font-light text-stone-900 dark:text-white mb-8 text-center transition-colors duration-500">
            Clases
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm font-light uppercase tracking-widest text-center">
            Selecciona el plan ideal para tu entrenamiento
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl min-h-[400px] md:min-h-[600px] overscroll-contain">
            <BSportWidget
              containerId="bsport-widget-395980"
              variant="calendar"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
