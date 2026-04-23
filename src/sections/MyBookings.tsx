import React from 'react';
import { BSportWidget } from '@/features/bsport/BSportWidget';

export const MyBookings: React.FC = () => {
  return (
    <section
      id="my-bookings"
      className="scroll-mt-28 py-32 bg-stone-100 relative z-30"
    >
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-5xl font-light text-stone-900 mb-6 text-center">
            Mis Reservas
          </h2>
          <p className="text-stone-600 text-sm font-light uppercase tracking-widest text-center max-w-md">
            Consulta y gestiona tus clases
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl min-h-[400px] md:min-h-[600px] text-stone-900 [color-scheme:light] overscroll-contain isolate">
            <BSportWidget
              containerId="bsport-widget-897615"
              variant="consumerSpace"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
