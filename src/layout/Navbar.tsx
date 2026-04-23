import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BSportWidget } from '@/features/bsport/BSportWidget';

const LOGIN_WIDGET_CLASSES =
  'bsport-login-wrapper min-w-[120px] min-h-[40px] flex items-center justify-center relative z-50 [&_*]:!uppercase [&_*]:!tracking-[0.2em] transition-all cursor-pointer';

interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
}

const MAIN_LINKS = [
  { name: 'Concepto', href: '#about' },
  { name: 'Precios', href: '#packages' },
  { name: 'Clases', href: '#pricing' },
  { name: 'Equipo', href: '#team' },
  { name: 'Contacto', href: '#contact' },
];

const BOOKINGS_LINK = { name: 'Mis Reservas', href: '#my-bookings' };

const ALL_SECTION_IDS = [
  ...MAIN_LINKS.map((l) => l.href.replace('#', '')),
  BOOKINGS_LINK.href.replace('#', ''),
];

export const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracker (only on home route)
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    ALL_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('http')) return;
    e.preventDefault();
    const targetId = href.replace('#', '');
    const scrollToElement = () => {
      const element = document.getElementById(targetId);
      if (element) {
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }
    setIsMenuOpen(false);
  };

  const isLinkActive = (href: string) => activeSection === href.replace('#', '');

  const renderDesktopLink = (link: { name: string; href: string }) => {
    const active = isLinkActive(link.href);
    const baseText = isScrolled || location.pathname !== '/'
      ? 'text-stone-700 dark:text-white/70'
      : 'text-stone-700 dark:text-white/70';
    const activeText = active ? 'text-fitform-navy dark:text-white' : baseText;
    return (
      <a
        key={link.name}
        href={link.href}
        onClick={(e) => handleNavClick(e, link.href)}
        aria-current={active ? 'page' : undefined}
        className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors relative group cursor-pointer font-sans whitespace-nowrap hover:text-fitform-navy dark:hover:text-white ${activeText}`}
      >
        {link.name}
        <span
          className={`absolute -bottom-2 left-0 w-full h-[1px] bg-fitform-navy dark:bg-fitform-teal origin-left transition-transform duration-300 ${
            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </a>
    );
  };

  return (
    <>
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        <nav
          className={`transition-all duration-700 ease-out flex justify-between items-center px-8 py-4 rounded-full ${
            isScrolled || isMenuOpen || location.pathname !== '/'
              ? 'glass-panel-dark w-full max-w-6xl shadow-2xl'
              : 'w-full max-w-7xl bg-transparent'
          }`}
        >
          <Link
            to="/"
            onClick={(e) => {
              setIsMenuOpen(false);
              e.preventDefault();
              if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="z-50 transition-colors duration-500 cursor-pointer"
          >
            <img
              src="https://i.postimg.cc/bwBqCCY7/Logo-fitform-png-(2).png"
              alt="FitForm Logo"
              className="h-16 sm:h-14 md:h-16 lg:h-18 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav — visible from lg (1024px) up so the 6-link navbar does not wrap on tablet */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {MAIN_LINKS.map(renderDesktopLink)}

            <div className="flex items-center gap-4 border-l border-stone-200 dark:border-white/10 pl-6">
              {renderDesktopLink(BOOKINGS_LINK)}

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
              onClick={(e) => handleNavClick(e, '#pricing')}
              className="bg-fitform-navy text-white dark:bg-white dark:text-fitform-obsidian px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-stone-700 dark:hover:bg-fitform-stone transition-colors font-display shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              Reservar
            </a>
          </div>

          {/* Mobile / tablet toggle (< lg) — only the hamburger, Reservar lives inside the overlay */}
          <div className="flex items-center lg:hidden z-50">
            <button
              className="text-fitform-navy dark:text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-fitform-bone/95 dark:bg-fitform-obsidian/95 backdrop-blur-xl transform transition-transform duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-screen gap-6">
          {MAIN_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-3xl font-display font-light tracking-tight text-fitform-navy dark:text-white hover:text-fitform-teal transition-colors"
            >
              {link.name}
            </a>
          ))}

          <a
            key={BOOKINGS_LINK.name}
            href={BOOKINGS_LINK.href}
            onClick={(e) => handleNavClick(e, BOOKINGS_LINK.href)}
            className="text-3xl font-display font-light tracking-tight text-fitform-navy dark:text-white hover:text-fitform-teal transition-colors"
          >
            {BOOKINGS_LINK.name}
          </a>

          {/* Primary CTA — prominent inside the overlay */}
          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, '#pricing')}
            className="mt-4 bg-fitform-navy text-white dark:bg-white dark:text-fitform-obsidian px-10 py-4 text-xs uppercase tracking-[0.3em] font-bold rounded-full hover:bg-stone-700 dark:hover:bg-fitform-stone transition-colors font-display shadow-lg"
          >
            Reservar
          </a>

          {/* BSport Login Button - Mobile Menu */}
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
    </>
  );
};
