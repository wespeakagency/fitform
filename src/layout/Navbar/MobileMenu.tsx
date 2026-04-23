import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { BSportWidget } from '@/features/bsport/BSportWidget';
import { useTheme } from '@/contexts/ThemeContext';
import { MAIN_LINKS, RIGHT_GROUP_LINKS, LOGIN_WIDGET_CLASSES } from './routes';

interface MobileMenuProps {
  isOpen: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onNavClick }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`fixed inset-0 z-40 bg-fitform-bone/95 dark:bg-fitform-obsidian/95 backdrop-blur-xl transform transition-transform duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        {MAIN_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => onNavClick(e, link.href)}
            className="text-3xl font-display font-light tracking-tight text-fitform-navy dark:text-white hover:text-fitform-teal transition-colors"
          >
            {link.name}
          </a>
        ))}

        {RIGHT_GROUP_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => onNavClick(e, link.href)}
            className="text-3xl font-display font-light tracking-tight text-fitform-navy dark:text-white hover:text-fitform-teal transition-colors"
          >
            {link.name}
          </a>
        ))}

        <a
          href="#pricing"
          onClick={(e) => onNavClick(e, '#pricing')}
          className="mt-4 bg-fitform-navy text-white dark:bg-white dark:text-fitform-obsidian px-10 py-4 text-xs uppercase tracking-[0.3em] font-bold rounded-full hover:bg-stone-700 dark:hover:bg-fitform-stone transition-colors font-display shadow-lg"
        >
          Reservar
        </a>

        <div className="flex justify-center w-full mt-2">
          <BSportWidget
            containerId="bsport-login-mobile"
            variant="loginButton"
            className={LOGIN_WIDGET_CLASSES}
          />
        </div>

        <div className="pt-6">
          <button
            onClick={toggleTheme}
            className="p-4 rounded-full bg-stone-100 dark:bg-white/5 text-fitform-navy dark:text-white"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};
