import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    const scrollToElement = () => {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }
  };
  return (
    <footer className="bg-stone-950 text-stone-500 py-24 text-[10px] uppercase tracking-[0.1em] relative z-50 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-b border-white/10 pb-20">
          <div className="col-span-1 md:col-span-2 flex flex-col justify-between items-center text-center">
            <img
              src="https://i.postimg.cc/bwBqCCY7/Logo-fitform-png-(2).png"
              alt="FitForm Logo"
              loading="lazy"
              decoding="async"
              className="h-16 w-auto object-contain mb-6"
            />
            <p className="max-w-xs leading-relaxed normal-case text-xs text-stone-400 font-light">
              Desafiando los límites de tu cuerpo y mente. Una comunidad dedicada a la fuerza, el equilibrio y el bienestar integral.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-8">Navegación</h3>
            <ul className="space-y-4">
              <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-white transition-colors">Concepto</a></li>
              <li><a href="#team" onClick={(e) => handleNavClick(e, '#team')} className="hover:text-white transition-colors">Instructores</a></li>
              <li><a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="hover:text-white transition-colors">Clases</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
                 <h3 className="text-white font-bold mb-8">Social</h3>
                 <div className="flex space-x-6">
                  <a href="https://www.instagram.com/fitform.mx/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 border border-white/10 rounded-full hover:bg-white hover:text-black hover:border-white cursor-pointer"><Instagram className="w-4 h-4" /></a>
                  <a href="https://www.facebook.com/profile.php?id=61574696534973" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 border border-white/10 rounded-full hover:bg-white hover:text-black hover:border-white cursor-pointer"><Facebook className="w-4 h-4" /></a>
                </div>
            </div>
            {/* 
              NOTA: Enlaces de descarga de apps temporalmente ocultos.
              Motivo: Nos dieron de baja de las tiendas de aplicaciones (App Store y Google Play) temporalmente.
              Fecha de ocultamiento: 20/04/2026
              Se restaurarán cuando se resuelva la situación con las tiendas.
            */}
            {/* 
            <div className="mt-8 md:mt-0">
                 <a href="https://apps.apple.com/us/app/fitform/id6743446999" target="_blank" rel="noopener noreferrer" className="block w-full text-center border border-white/20 py-3 rounded-full hover:bg-white hover:text-black transition-all mb-3">Download iOS</a>
                 <a href="https://play.google.com/store/apps/details?id=fitform.android.fitcoapp.net%20%EF%BF%BC" target="_blank" rel="noopener noreferrer" className="block w-full text-center border border-white/20 py-3 rounded-full hover:bg-white hover:text-black transition-all">Download Android</a>
            </div>
            */}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-stone-600">
          <p>&copy; {new Date().getFullYear()} FitForm Studio.</p>
          <div className="flex space-x-8">
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors text-left">Aviso de Privacidad</button>
            <button onClick={onOpenTerms} className="hover:text-white transition-colors text-left">Términos y Condiciones</button>
          </div>
        </div>
      </div>
    </footer>
  );
};