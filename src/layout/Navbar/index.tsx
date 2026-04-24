import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useNavHandler } from '@/hooks/useNavHandler';
import { useIsScrolled } from '@/hooks/useIsScrolled';
import { useActiveSection } from '@/hooks/useActiveSection';
import { DesktopNav } from './DesktopNav';
import { MobileMenu } from './MobileMenu';
import { ALL_SECTION_IDS } from './routes';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useIsScrolled();
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavClick = useNavHandler(() => setIsMenuOpen(false));

  const isOnHome = location.pathname === '/';
  const activeSection = useActiveSection(ALL_SECTION_IDS, { enabled: isOnHome });
  const isPillOpaque = isScrolled || isMenuOpen || !isOnHome;

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (!isOnHome) {
      navigate('/');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop: full pill navbar */}
      <div className="hidden lg:flex fixed top-6 left-0 w-full z-50 justify-center px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto transition-all duration-700 ease-out flex justify-between items-center px-8 py-4 rounded-full ${
            isPillOpaque
              ? 'glass-panel-dark w-full max-w-6xl shadow-2xl'
              : 'w-full max-w-7xl bg-transparent'
          }`}
        >
          <Link to="/" onClick={handleLogoClick} className="z-50 transition-colors duration-500 cursor-pointer">
            <img
              src="https://i.postimg.cc/bwBqCCY7/Logo-fitform-png-(2).png"
              alt="FitForm Logo"
              className="h-16 sm:h-14 md:h-16 lg:h-18 w-auto object-contain"
            />
          </Link>

          <DesktopNav
            activeSection={activeSection}
            isPillOpaque={isPillOpaque}
            onNavClick={handleNavClick}
          />
        </nav>
      </div>

      {/* Mobile: two small floating FABs — logo + hamburger.
          Each is its own fixed button so there's no full-width container
          intercepting touches between them. */}
      <Link
        to="/"
        onClick={handleLogoClick}
        aria-label="Inicio"
        className="lg:hidden fixed top-4 left-4 z-[1500] p-1.5 rounded-full bg-fitform-bone/80 dark:bg-fitform-obsidian/80 backdrop-blur-md shadow-lg cursor-pointer"
      >
        <img
          src="https://i.postimg.cc/bwBqCCY7/Logo-fitform-png-(2).png"
          alt="FitForm"
          className="h-9 w-auto object-contain"
        />
      </Link>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isMenuOpen}
        className="lg:hidden fixed top-4 right-4 z-[1500] p-3 rounded-full bg-fitform-bone/80 dark:bg-fitform-obsidian/80 backdrop-blur-md shadow-lg text-fitform-navy dark:text-white"
      >
        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <MobileMenu isOpen={isMenuOpen} onNavClick={handleNavClick} />
    </>
  );
};
