import React from 'react';
import { Link } from 'react-router-dom';

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-32 bg-stone-50 dark:bg-stone-950 relative z-30 transition-colors duration-700">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16">
                <div>
                    <h2 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] mb-4">Comunidad</h2>
                    <h3 className="text-4xl text-stone-900 dark:text-white font-light transition-colors duration-500">Nuestros Instructores</h3>
                </div>
                <Link to="/instructors" className="text-[10px] uppercase tracking-[0.2em] text-stone-900 dark:text-white border-b border-stone-300 dark:border-white/30 pb-1 mt-6 md:mt-0 hover:border-stone-900 dark:hover:border-white transition-colors">
                    Ver todo el equipo
                </Link>
            </div>
            
            <Link to="/instructors" className="block relative w-full h-[60vh] rounded-3xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-stone-200 dark:bg-stone-900 animate-pulse z-0 transition-colors duration-700"></div>
                <img
                    src="https://github.com/wespeakagency/imagenesweb_fitform/blob/main/coaches%20completos%203.png?raw=true"
                    alt="FitForm Team"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0 z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent z-20 opacity-80"></div>
                
                <div className="absolute bottom-10 left-10 z-30">
                    <p className="text-white text-lg font-light italic">"La fuerza no viene de la capacidad corporal,<br/>sino de la voluntad del alma."</p>
                </div>
            </Link>
        </div>
    </section>
  )
}