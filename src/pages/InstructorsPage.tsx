import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Instagram } from 'lucide-react';
import { Button } from '@/components/Button';
import { INSTRUCTORS } from '@/data/instructors';


export const InstructorsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-32 pb-20 px-6 container mx-auto relative z-10 min-h-screen">
       <div className="absolute inset-0 bg-stone-50 dark:bg-stone-950 -z-10"></div>
       
       <button 
        onClick={() => navigate('/')} 
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 dark:hover:text-white mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al Inicio
      </button>

      <div className="mb-20">
         <h1 className="text-4xl md:text-6xl text-stone-900 dark:text-white font-light mb-6">Nuestros Coaches</h1>
         <p className="text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed font-light">
            Un equipo de expertos dedicados a perfeccionar tu técnica. Cada instructor aporta una especialidad única de alto nivel.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {INSTRUCTORS.map((instructor) => (
            <div key={instructor.id} className="group relative">
               <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-stone-200 dark:bg-stone-900 mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent opacity-60 z-10 transition-opacity duration-500 group-hover:opacity-40"></div>
                  <img
                     src={instructor.image}
                     alt={instructor.name}
                     loading="lazy"
                     decoding="async"
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  
                  {/* Overlay Info on Image */}
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-2">{instructor.role}</p>
                     <h2 className="text-2xl text-white font-light mb-4">{instructor.name}</h2>
                     <div className="w-12 h-[1px] bg-white/50 group-hover:w-full transition-all duration-700"></div>
                  </div>
               </div>

               <div className="space-y-4">
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                     {instructor.bio}
                  </p>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};