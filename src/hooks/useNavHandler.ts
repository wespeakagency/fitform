import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '@/lib/scroll';

const ROUTE_CHANGE_SCROLL_DELAY_MS = 300;

export function useNavHandler(onAfterClick?: () => void) {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('http')) return;
      e.preventDefault();
      const id = href.replace('#', '');

      if (location.pathname !== '/') {
        navigate('/');
        // React Router needs a tick to mount the home route before the
        // section id is queryable.
        setTimeout(() => scrollToSection(id), ROUTE_CHANGE_SCROLL_DELAY_MS);
      } else {
        scrollToSection(id);
      }

      onAfterClick?.();
    },
    [location.pathname, navigate, onAfterClick],
  );
}
