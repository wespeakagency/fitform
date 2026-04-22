import React from 'react';

export const Schedule: React.FC = () => {
  return (
    <section id="schedule" className="py-32 bg-stone-100 dark:bg-stone-900 relative z-20 transition-colors duration-700">
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl text-stone-900 dark:text-white font-light mb-4 transition-colors duration-500">Agenda</h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm tracking-wide max-w-sm">
              Tu compromiso contigo misma comienza aquí.
            </p>
          </div>
        </div>

        {/* BSport Calendar Container */}
        <div className="glass-panel-dark rounded-3xl p-4 md:p-8 overflow-hidden shadow-2xl min-h-[600px] flex justify-center">
          <div id="fitcoCalendar" className="w-full h-full"></div>
        </div>
      </div>
    </section>
  );
};
