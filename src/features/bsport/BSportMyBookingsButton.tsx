import React, { useEffect } from 'react';

declare global {
  interface Window {
    BsportWidget?: {
      mount: (config: Record<string, any>) => void;
    };
  }
}

interface BSportMyBookingsButtonProps {
  containerId: string;
  className?: string;
}

export const BSportMyBookingsButton: React.FC<BSportMyBookingsButtonProps> = ({
  containerId,
  className = '',
}) => {
  useEffect(() => {
    const scriptId = 'bsport-widget-cdn';
    let isMounted = true;
    let mountTimeout: NodeJS.Timeout | null = null;

    const injectScript = () => {
      if (document.getElementById(scriptId)) return;
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.bsport.io/scripts/widget.js';
      script.async = true;
      document.head.appendChild(script);
    };

    const mountWidget = (repeat = 1) => {
      if (!isMounted) return;
      if (repeat > 50) {
        console.warn(`[BSportMyBookingsButton] Widget did not load after 50 attempts for ${containerId}`);
        return;
      }

      if (!window.BsportWidget) {
        mountTimeout = setTimeout(() => mountWidget(repeat + 1), 100);
        return;
      }

      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`[BSportMyBookingsButton] Container ${containerId} not found`);
        return;
      }

      if (container.querySelector('.cleanslate')) return;
      container.innerHTML = '';

      try {
        window.BsportWidget.mount({
          parentElement: containerId,
          companyId: 5741,
          franchiseId: null,
          dialogMode: 1,
          widgetType: 'consumerSpace',
          showFab: false,
          fullScreenPopup: true,
          config: {
            consumerSpace: {
              loginSubtitle: '',
              loginTitle: 'Mi perfil',
              showSubtitle: false,
              showTitle: true,
              hideNavigation: false,
              defaultPage: 'consumerBooking',
            },
          },
        });
      } catch (error) {
        console.error(`[BSportMyBookingsButton] Mount error on ${containerId}:`, error);
      }
    };

    injectScript();
    mountWidget();

    return () => {
      isMounted = false;
      if (mountTimeout) clearTimeout(mountTimeout);
      const container = document.getElementById(containerId);
      if (container) container.innerHTML = '';
    };
  }, [containerId]);

  return <div id={containerId} className={className} />;
};
