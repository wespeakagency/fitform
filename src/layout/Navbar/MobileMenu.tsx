import React from 'react';
import { Sun, Moon, ShoppingBag } from 'lucide-react';
import { BSportWidget } from '@/features/bsport/BSportWidget';
import { useTheme } from '@/contexts/ThemeContext';
import { trackEvent, trackEventOncePerSession } from '@tiktok/trackEvent';
import { MAIN_LINKS, RIGHT_GROUP_LINKS, LOGIN_WIDGET_CLASSES } from './routes';

interface MobileMenuProps {
  isOpen: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onNavClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const navMainLinks = MAIN_LINKS.filter((link) => link.href !== '#about');
  const handleLeadClick = () => {
    void trackEventOncePerSession('lead:bsport-login', 'Lead', {
      content_name: 'BSport login',
      content_type: 'member_auth',
      page_section: 'mobile_menu',
      source_variant: 'mobile',
    });
  };

  const handleReserveClick = () => {
    void trackEvent('ClickButton', {
      content_name: 'Reservar',
      content_type: 'mobile_menu_cta',
      destination_url: '#pricing',
      page_section: 'mobile_menu',
    });
  };

  return (
    <div
      className={`fixed inset-0 z-[1400] bg-fitform-bone/95 dark:bg-fitform-obsidian/95 backdrop-blur-xl transform transition-transform duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex flex-col items-center justify-center h-screen gap-6">
        {navMainLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => onNavClick(e, link.href)}
            className="text-3xl font-display font-light tracking-tight text-fitform-navy dark:text-white hover:text-fitform-teal transition-colors"
          >
            {link.name}
          </a>
        ))}

        {RIGHT_GROUP_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => onNavClick(e, link.href)}
            aria-label={link.href === '#shop' ? link.name : undefined}
            title={link.href === '#shop' ? link.name : undefined}
            className="inline-flex items-center justify-center text-3xl font-display font-light tracking-tight text-fitform-navy dark:text-white hover:text-fitform-teal transition-colors"
          >
            {link.href === '#shop' ? (
              <>
                <ShoppingBag className="w-8 h-8" aria-hidden="true" />
                <span className="sr-only">{link.name}</span>
              </>
            ) : (
              link.name
            )}
          </a>
        ))}

        <a
          href="#pricing"
          onClick={(e) => {
            handleReserveClick();
            onNavClick(e, '#pricing');
          }}
          className="mt-4 bg-fitform-navy text-white dark:bg-white dark:text-fitform-obsidian px-10 py-4 text-xs uppercase tracking-[0.3em] font-bold rounded-full hover:bg-stone-700 dark:hover:bg-fitform-stone transition-colors font-display shadow-lg"
        >
          Reservar
        </a>

        <div className="flex justify-center w-full mt-2" onClick={handleLeadClick}>
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
