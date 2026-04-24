import React from 'react';
import { BSportWidget } from '@/features/bsport/BSportWidget';

export const Memberships: React.FC = () => {
  return (
    <section
      id="memberships"
      className="scroll-mt-28 py-32 bg-stone-50 relative z-[48]"
    >
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light text-stone-900 mb-6 text-center">
            Membresías
          </h2>
          <p className="text-stone-600 text-sm font-light uppercase tracking-widest text-center max-w-md">
            Acceso continuo con tu plan mensual
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl min-h-[400px] md:min-h-[600px] text-stone-900 [color-scheme:light] overscroll-contain">
            <BSportWidget
              containerId="bsport-widget-subscription"
              variant="subscription"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
