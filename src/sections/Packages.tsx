import React from 'react';
import { BSportPackagesWidget } from '@/features/bsport/BSportPackagesWidget';

export const Packages: React.FC = () => {
  return (
    <section
      id="packages"
      className="py-32 bg-stone-100 relative z-30"
    >
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light text-stone-900 mb-6 text-center">
            Precios
          </h2>
          <p className="text-stone-600 text-sm font-light uppercase tracking-widest text-center max-w-md">
            Elige el paquete ideal para tu entrenamiento
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl min-h-[600px] text-stone-900 [color-scheme:light]">
            <BSportPackagesWidget
              containerId="bsport-widget-pass"
              className="w-full min-h-[600px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
