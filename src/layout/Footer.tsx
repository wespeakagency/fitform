import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { useNavHandler } from '@/hooks/useNavHandler';
import { MAIN_LINKS, RIGHT_GROUP_LINKS } from './Navbar/routes';

const FOOTER_LINKS = [...MAIN_LINKS, ...RIGHT_GROUP_LINKS];
const SOCIAL_LINK_CLASSES =
  'p-2 border border-white/10 rounded-full text-stone-500 transition-colors hover:bg-white hover:text-fitform-obsidian hover:border-white cursor-pointer';

const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
  </svg>
);

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms }) => {
  const handleNavClick = useNavHandler();
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
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
                 <h3 className="text-white font-bold mb-8">Social</h3>
                 <div className="flex space-x-6">
                  <a href="https://www.instagram.com/fitform.mx/" target="_blank" rel="noopener noreferrer" className={SOCIAL_LINK_CLASSES}><Instagram className="w-4 h-4" /></a>
                  <a href="https://www.facebook.com/profile.php?id=61574696534973" target="_blank" rel="noopener noreferrer" className={SOCIAL_LINK_CLASSES}><Facebook className="w-4 h-4" /></a>
                  <a href="https://www.tiktok.com/@fitformpilates?_r=1&_t=ZS-95jpzpdEGd2" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className={SOCIAL_LINK_CLASSES}><TikTokIcon className="w-4 h-4" /></a>
                </div>
            </div>
            <div className="mt-8 md:mt-0">
                 <a href="https://apps.apple.com/us/app/fitform/id6765679829" target="_blank" rel="noopener noreferrer" className="block w-full text-center border border-white/20 py-3 rounded-full hover:bg-white hover:text-black transition-all mb-3">Download iOS</a>
                 {/* <a href="https://play.google.com/store/apps/details?id=fitform.android.fitcoapp.net%20%EF%BF%BC" target="_blank" rel="noopener noreferrer" className="block w-full text-center border border-white/20 py-3 rounded-full hover:bg-white hover:text-black transition-all">Download Android</a> */}
            </div>
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
