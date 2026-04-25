import React from 'react';
import { Sun, Moon, ShoppingBag } from 'lucide-react';
import { BSportWidget } from '@/features/bsport/BSportWidget';
import { useTheme } from '@/contexts/ThemeContext';
import { MAIN_LINKS, RIGHT_GROUP_LINKS, LOGIN_WIDGET_CLASSES, type NavRoute } from './routes';

interface DesktopNavProps {
  activeSection: string | null;
  isPillOpaque: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({
  activeSection,
  isPillOpaque,
  onNavClick,
}) => {
  const { isDark, toggleTheme } = useTheme();
  const navMainLinks = MAIN_LINKS.filter((link) => link.href !== '#about');

  const isLinkActive = (href: string) => activeSection === href.replace('#', '');

  const renderLink = (link: NavRoute) => {
    const active = isLinkActive(link.href);
    const isShopLink = link.href === '#shop';
    const baseText = isPillOpaque ? 'text-stone-700 dark:text-white/70' : 'text-stone-700 dark:text-white/70';
    const activeText = active ? 'text-fitform-navy dark:text-white' : baseText;

    return (
      <a
        key={link.href}
        href={link.href}
        onClick={(e) => onNavClick(e, link.href)}
        aria-current={active ? 'page' : undefined}
        aria-label={isShopLink ? link.name : undefined}
        title={isShopLink ? link.name : undefined}
        className={`inline-flex items-center justify-center text-[10px] uppercase tracking-[0.2em] font-medium transition-colors relative group cursor-pointer font-sans whitespace-nowrap hover:text-fitform-navy dark:hover:text-white ${activeText}`}
      >
        {isShopLink ? (
          <>
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            <span className="sr-only">{link.name}</span>
          </>
        ) : (
          link.name
        )}
        <span
          className={`absolute -bottom-2 left-0 w-full h-[1px] bg-fitform-navy dark:bg-fitform-teal origin-left transition-transform duration-300 ${
            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </a>
    );
  };

  return (
    <div className="hidden xl:flex items-center space-x-6 2xl:space-x-8">
      {navMainLinks.map(renderLink)}

      <div className="flex items-center gap-4 border-l border-stone-200 dark:border-white/10 pl-6">
        {RIGHT_GROUP_LINKS.map(renderLink)}

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-colors text-fitform-navy dark:text-white"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <BSportWidget
          containerId="bsport-login-desktop"
          variant="loginButton"
          className={LOGIN_WIDGET_CLASSES}
        />
      </div>

      <a
        href="#pricing"
        onClick={(e) => onNavClick(e, '#pricing')}
        className="bg-fitform-navy text-white dark:bg-white dark:text-fitform-obsidian px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-stone-700 dark:hover:bg-fitform-stone transition-colors font-display shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      >
        Reservar
      </a>
    </div>
  );
};
