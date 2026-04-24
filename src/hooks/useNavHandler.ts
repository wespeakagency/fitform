import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '@/lib/scroll';
import {
  SECTION_WIDGET_CONTAINERS,
  whenWidgetMounted,
} from '@/features/bsport/widgetMountRegistry';

const nextFrame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

export function useNavHandler(onAfterClick?: () => void) {
  const location = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (href.startsWith('http')) return;
      e.preventDefault();
      const id = href.replace('#', '');

      const performScroll = async () => {
        // Yield once so React has committed any pending render (either the
        // new route after navigate(), or the already-mounted home route)
        // before we query the target element.
        await nextFrame();

        const widgetContainer = SECTION_WIDGET_CONTAINERS[id];
        if (widgetContainer) {
          await whenWidgetMounted(widgetContainer);
          // One more frame so sibling widgets (which share the BSport script
          // and mount within the same polling cycle) settle their height
          // before we compute the scroll target.
          await nextFrame();
        }

        scrollToSection(id);
      };

      if (location.pathname !== '/') {
        navigate('/');
      }
      performScroll();

      onAfterClick?.();
    },
    [location.pathname, navigate, onAfterClick],
  );
}
