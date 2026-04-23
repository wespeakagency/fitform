import React, { useEffect } from 'react';

declare global {
  interface Window {
    BsportWidget?: {
      mount: (config: Record<string, any>) => void;
    };
  }
}

interface BSportPackagesWidgetProps {
  containerId: string;
  className?: string;
}

export const BSportPackagesWidget: React.FC<BSportPackagesWidgetProps> = ({
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
        console.warn(`[BSportPackagesWidget] Widget did not load after 50 attempts for ${containerId}`);
        return;
      }

      if (!window.BsportWidget) {
        mountTimeout = setTimeout(() => mountWidget(repeat + 1), 100);
        return;
      }

      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`[BSportPackagesWidget] Container ${containerId} not found`);
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
          widgetType: 'pass',
          showFab: false,
          fullScreenPopup: false,
          config: {
            pass: {},
          },
        });
      } catch (error) {
        console.error(`[BSportPackagesWidget] Mount error on ${containerId}:`, error);
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
