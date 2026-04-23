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
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        <nav
          className={`transition-all duration-700 ease-out flex justify-between items-center px-8 py-4 rounded-full ${
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

      <MobileMenu isOpen={isMenuOpen} onNavClick={handleNavClick} />
    </>
  );
};
