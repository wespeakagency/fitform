import React from 'react';
import { Button } from '@/components/Button';
import { scrollToSection } from '@/lib/scroll';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden lg:sticky lg:top-0 z-0 bg-fitform-bone dark:bg-fitform-obsidian transition-colors duration-700">
      {/* Background with animated gradients - Brand Colors */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-fitform-teal/30 dark:bg-fitform-teal/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 animate-blob transition-colors duration-700"></div>
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] bg-fitform-stone/40 dark:bg-fitform-navy/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-40 animate-blob animation-delay-2000 transition-colors duration-700"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-blue-200/30 dark:bg-fitform-teal/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-4000 transition-colors duration-700"></div>
        
        {/* Subtle Image Overlay */}
        <div className="absolute inset-0 opacity-10 dark:opacity-30 mix-blend-overlay transition-opacity duration-700">
             <img
                src="/images/home.webp"
                alt="FitForm Studio Hero"
                {...{ fetchpriority: 'high' }}
                decoding="async"
                className="w-full h-full object-cover grayscale"
             />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fitform-bone/50 dark:via-fitform-obsidian/50 to-fitform-bone dark:to-fitform-obsidian transition-colors duration-700"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl mt-20 flex flex-col items-center">
        
        <h1 className="text-5xl md:text-8xl lg:text-9xl text-stone-900 dark:text-white font-display font-light tracking-tight mb-8 animate-fade-up opacity-0 leading-[0.9] transition-colors duration-500" style={{ animationDelay: '0.4s' }}>
          STRONG <br />
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-fitform-navy via-stone-600 to-fitform-stone dark:from-white dark:via-fitform-stone dark:to-fitform-greige">PILATES</span>
        </h1>
        
        <p className="text-stone-600 dark:text-stone-300 text-sm md:text-lg max-w-lg mx-auto mb-12 leading-relaxed font-light tracking-wide animate-fade-up opacity-0 transition-colors duration-500" style={{ animationDelay: '0.6s' }}>
          Una experiencia sensorial que fusiona la precisión del control con la fuerza bruta. 
          <span className="block mt-2 italic text-fitform-teal/80 dark:text-fitform-teal">Esculpe cuerpo. Libera mente.</span>
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center animate-fade-up opacity-0" style={{ animationDelay: '0.8s' }}>
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('pricing');
            }}
          >
            <Button>Reservar Clase</Button>
          </a>
          <Button variant="outline" onClick={() => scrollToSection('about')}>
            Descubre Más
          </Button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse opacity-50">
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-fitform-navy dark:via-fitform-teal to-transparent transition-colors duration-500"></div>
      </div>
    </section>
  );
};