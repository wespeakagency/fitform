import React from 'react';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { Button } from './Button';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-white dark:bg-stone-950 relative z-30 transition-colors duration-700">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.3em] mb-6">Contacto</h2>
            <h3 className="text-4xl md:text-5xl text-stone-900 dark:text-white font-light leading-tight mb-10 transition-colors duration-500">
              Estamos aquí para <br />
              <span className="font-bold">guiar tu proceso.</span>
            </h3>
            
            <div className="space-y-8 mb-12">
              <div className="group">
                <h4 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-stone-900 dark:text-white mb-2">
                  <MapPin className="w-4 h-4" /> Ubicación
                </h4>
                <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed pl-7">
                  P.º de los Tamarindos 90,<br />
                  Bosques de las Lomas, Cuajimalpa,<br />
                  05120 Ciudad de México, CDMX
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-stone-400 mt-2 pl-7 hover:text-stone-900 dark:hover:text-white transition-colors"
                >
                  Ver en Google Maps <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="group">
                <h4 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-stone-900 dark:text-white mb-2">
                  <Mail className="w-4 h-4" /> Correo
                </h4>
                <a href="mailto:contacto@fitform.mx" className="text-stone-600 dark:text-stone-400 font-light pl-7 hover:text-stone-900 dark:hover:text-white transition-colors">
                  contacto@fitform.mx
                </a>
              </div>

              <div className="group">
                <h4 className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-stone-900 dark:text-white mb-2">
                  <Phone className="w-4 h-4" /> Teléfono / WhatsApp
                </h4>
                <a href="tel:+525631372510" className="text-stone-600 dark:text-stone-400 font-light pl-7 hover:text-stone-900 dark:hover:text-white transition-colors">
                  +52 56 3137 2510
                </a>
              </div>
            </div>

            <Button onClick={() => window.open('https://wa.me/525631372510', '_blank')}>
              Enviar Mensaje
            </Button>
          </div>

          {/* Map / Image Visual */}
          <a 
            href="https://maps.app.goo.gl/Tttkd85dHZdpRxSZA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative h-[500px] lg:h-auto rounded-3xl overflow-hidden bg-stone-200 dark:bg-stone-900 block cursor-pointer group"
          >
            {/* Using a dark map style image placeholder or actual map iframe style */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.556730164627!2d-99.2458!3d19.3885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff3923900001%3A0x3635800000000000!2sP.%C2%BA%20de%20los%20Tamarindos%2090%2C%20Bosques%20de%20las%20Lomas%2C%20Cuajimalpa%2C%2005120%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1sen!2smx!4v1754200000000!5m2!1sen!2smx" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(100%) contrast(1.2)' }} 
              allowFullScreen={true} 
              loading="lazy"
              className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            ></iframe>
            
            <div className="absolute inset-0 pointer-events-none border border-stone-900/10 dark:border-white/10 rounded-3xl group-hover:border-stone-900/30 dark:group-hover:border-white/30 transition-colors duration-300"></div>
            
            {/* Overlay para indicar que es clickeable */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 rounded-3xl"></div>
          </a>

        </div>
      </div>
    </section>
  );
};