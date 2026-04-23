import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const CAROUSEL_IMAGES = [
  "/images/carousel/1.webp",
  "/images/carousel/2.webp",
  "/images/carousel/3.webp",
];

export const About: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    const next = !isVideoMuted;
    videoRef.current.muted = next;
    if (!next && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
    setIsVideoMuted(next);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 4000); // Auto change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const getSlideStyles = (index: number) => {
    // Calculate position relative to active index
    const total = CAROUSEL_IMAGES.length;
    const offset = (index - activeIndex + total) % total;

    // Active Slide (Front & Center)
    if (offset === 0) {
      return "z-30 opacity-100 scale-100 translate-x-0 rotate-0 grayscale-0 shadow-2xl";
    }
    // Next Slide (Right Fan)
    if (offset === 1) {
      return "z-20 opacity-60 scale-90 translate-x-[15%] rotate-6 blur-[2px] grayscale-[50%]";
    }
    // Previous Slide (Left Fan - logically the last item in the modulo cycle)
    if (offset === total - 1) {
      return "z-20 opacity-60 scale-90 -translate-x-[15%] -rotate-6 blur-[2px] grayscale-[50%]";
    }
    // Others (Hidden/Stacked back)
    return "z-10 opacity-0 scale-75 translate-y-4 blur-xl";
  };

  return (
    <section id="about" className="relative bg-white dark:bg-stone-950 py-32 z-10 rounded-t-[3rem] -mt-10 border-t border-stone-200 dark:border-white/5 shadow-[0_-20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_60px_rgba(0,0,0,0.5)] transition-colors duration-700">
      <div className="container mx-auto px-6">
        
        {/* Concept Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="relative z-10">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 mb-6">El Concepto</h2>
            <h3 className="text-4xl md:text-6xl text-stone-900 dark:text-white font-light leading-tight mb-8 transition-colors duration-500">
              No es solo ejercicio.<br />
              <span className="font-bold">Es un ritual.</span>
            </h3>
            <p className="text-stone-600 dark:text-stone-400 leading-loose font-light mb-8 max-w-md text-justify transition-colors duration-500">
              FitForm nace de la necesidad de elevar el estándar. Rompemos la monotonía del gimnasio tradicional introduciendo una atmósfera inmersiva donde la luz, el sonido y el movimiento se sincronizan.
              <br /><br />
              Nuestro método <strong>"Strong Pilates"</strong> desafía la gravedad y tu resistencia. 50 minutos diseñados para desafiar tu fuerza y reconectar contigo mismo.
            </p>
          </div>
          
          {/* Fan Carousel Container (Now in Concept) */}
          <div className="relative h-[500px] flex items-center justify-center perspective-1000">
             <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-blue-200 dark:from-purple-500/20 dark:to-blue-500/20 blur-[60px] rounded-full opacity-60 transition-colors duration-700"></div>
             
             {CAROUSEL_IMAGES.map((img, index) => (
                <div 
                  key={index}
                  className={`
                    absolute w-[80%] max-w-[400px] aspect-[4/5] rounded-2xl overflow-hidden border-4 border-white/20 dark:border-white/5 
                    transition-all duration-700 ease-in-out origin-bottom
                    ${getSlideStyles(index)}
                  `}
                >
                   <img
                     src={img}
                     alt={`FitForm Concept ${index + 1}`}
                     loading="lazy"
                     decoding="async"
                     className="w-full h-full object-cover"
                   />
                   {/* Overlay gradient for depth */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
             ))}

             {/* Carousel Indicators */}
             <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex gap-2">
                {CAROUSEL_IMAGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx === activeIndex 
                        ? "w-8 bg-stone-900 dark:bg-white" 
                        : "w-2 bg-stone-300 dark:bg-white/20 hover:bg-stone-500"
                    }`}
                  />
                ))}
             </div>
          </div>
        </div>

        {/* Philosophy/Space Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Single Image (Now in Space - using the original Concept image) */}
          <div className="order-2 lg:order-1 relative group perspective-1000">
             <div className="absolute inset-0 bg-gradient-to-tr from-stone-200 to-stone-300 dark:from-stone-500/20 dark:to-white/10 blur-[80px] rounded-full opacity-40 transition-colors duration-700 pointer-events-none"></div>
             <div className="relative aspect-[3/4] overflow-hidden rounded-2xl glass-panel-dark border-0 transform transition-transform duration-700 group-hover:rotate-y-2">
                <video
                  ref={videoRef}
                  src="/videos/el-espacio.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="FitForm Space"
                  className="w-full h-full object-cover opacity-90 dark:opacity-80 group-hover:scale-105 transition-all duration-1000 grayscale hover:grayscale-0"
                />
                <button
                  type="button"
                  onClick={toggleVideoMute}
                  aria-label={isVideoMuted ? 'Activar sonido' : 'Silenciar'}
                  className="absolute bottom-4 right-4 z-10 p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-colors"
                >
                  {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
             </div>
          </div>

          <div className="order-1 lg:order-2">
             <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 mb-6">El Espacio</h2>
             <h3 className="text-3xl md:text-5xl text-stone-900 dark:text-white font-light leading-tight mb-8 transition-colors duration-500">
               Diseñado para <br/>
               <span className="font-bold">el enfoque total.</span>
             </h3>
             <ul className="space-y-6">
                {[
                  { title: "Bajo Impacto", desc: "Protege tus articulaciones mientras construyes fuerza real." },
                  { title: "Alta Intensidad", desc: "Activamos fibras musculares que otros entrenamientos no alcanzan, generando temblor, fuerza real y resultados visibles." }
                ].map((item, i) => (
                  <li key={i} className="glass-panel p-6 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-all duration-300">
                    <h4 className="text-stone-900 dark:text-white font-bold uppercase tracking-wider text-sm mb-2">{item.title}</h4>
                    <p className="text-stone-600 dark:text-stone-400 text-sm font-light">{item.desc}</p>
                  </li>
                ))}
             </ul>
          </div>
        </div>

      </div>
    </section>
  );
};