import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BSportLoginButton } from '@/features/bsport/BSportLoginButton';

interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Concepto', href: '#about' },
    { name: 'Precios', href: '#packages' },
    { name: 'Clases', href: '#pricing' },
    { name: 'Mis Reservas', href: '#my-bookings' },
    { name: 'Equipo', href: '#team' },
    { name: 'Contacto', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's an external link (starts with http), allow normal navigation
    if (href.startsWith('http')) {
      return;
    }
    
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    // Function to scroll to element
    const scrollToElement = () => {
      const element = document.getElementById(targetId);
      if (element) {
        // Offset for fixed header
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
      // Wait for navigation to complete before scrolling
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
        <nav 
          className={`transition-all duration-700 ease-out flex justify-between items-center px-8 py-4 rounded-full ${
            isScrolled || isMenuOpen || location.pathname !== '/'
              ? 'glass-panel-dark w-full max-w-5xl shadow-2xl' 
              : 'w-full max-w-7xl bg-transparent'
          }`}
        >
          <Link 
            to="/" 
            onClick={(e) => {
              setIsMenuOpen(false);
              // Si estamos en una página diferente a la principal, navegamos y luego hacemos scroll
              if (location.pathname !== '/') {
                e.preventDefault();
                navigate('/');
                // Esperamos a que la navegación complete antes de hacer scroll
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              } else {
                // Si ya estamos en la página principal, simplemente hacemos scroll suave al top
                e.preventDefault();
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors relative group cursor-pointer font-sans ${
                  isScrolled || location.pathname !== '/' ? 'text-stone-600 dark:text-white/70 hover:text-fitform-navy dark:hover:text-white' : 'text-stone-500 dark:text-white/70 hover:text-fitform-navy dark:hover:text-white'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-fitform-navy dark:bg-fitform-teal transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            
            <div className="flex items-center gap-4 border-l border-stone-200 dark:border-white/10 pl-6 ml-2">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-white/10 transition-colors text-fitform-navy dark:text-white"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* BSport Login Button - Desktop */}
              <BSportLoginButton 
                containerId="bsport-login-desktop"
                variant="desktop"
                className="bsport-login-desktop"
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

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden z-50">
            {/* Mobile Reservar Button */}
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, '#pricing')}
              className="bg-fitform-navy text-white dark:bg-white dark:text-fitform-obsidian px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-stone-700 dark:hover:bg-fitform-stone transition-colors font-display shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              Reservar
            </a>
            
            <button 
              className="text-fitform-navy dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-fitform-bone/95 dark:bg-fitform-obsidian/95 backdrop-blur-xl transform transition-transform duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center h-screen space-y-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-3xl font-display font-light tracking-tight text-fitform-navy dark:text-white hover:text-fitform-teal transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* BSport Login Button - Mobile Menu */}
          <div className="flex justify-center w-full my-4">
            <BSportLoginButton 
              containerId="bsport-login-mobile"
              variant="mobile-menu"
              className="bsport-login-mobile-menu text-fitform-navy dark:text-white"
            />
          </div>

          <div className="pt-8">
             <button
               onClick={toggleTheme}
               className="p-4 rounded-full bg-stone-100 dark:bg-white/5 text-fitform-navy dark:text-white"
             >
               {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </div>
    </>
  );
}
