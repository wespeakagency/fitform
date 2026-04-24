import { useEffect } from 'react';
import { bsportWidgetConfigs, type BSportWidgetVariant } from './widgetConfigs';
import { markWidgetMounted, markWidgetUnmounted } from './widgetMountRegistry';

declare global {
  interface Window {
    BsportWidget?: {
      mount: (config: Record<string, unknown>) => void;
    };
  }
}

const BSPORT_COMPANY_ID = 5741;
const BSPORT_SCRIPT_ID = 'bsport-widget-cdn';
const BSPORT_CDN_URL = 'https://cdn.bsport.io/scripts/widget.js';
const MAX_MOUNT_ATTEMPTS = 50;
const MOUNT_RETRY_MS = 100;

export function useBSportWidget(
  containerId: string,
  variant: BSportWidgetVariant,
): void {
  useEffect(() => {
    let isMounted = true;
    let mountTimeout: ReturnType<typeof setTimeout> | null = null;
    let observer: MutationObserver | null = null;

    const watchForCleanslate = (container: HTMLElement) => {
      if (container.querySelector('.cleanslate')) {
        markWidgetMounted(containerId);
        return;
      }
      observer = new MutationObserver(() => {
        if (!container.querySelector('.cleanslate')) return;
        markWidgetMounted(containerId);
        observer?.disconnect();
        observer = null;
      });
      observer.observe(container, { childList: true, subtree: true });
    };

    const injectScript = () => {
      if (document.getElementById(BSPORT_SCRIPT_ID)) return;
      const script = document.createElement('script');
      script.id = BSPORT_SCRIPT_ID;
      script.src = BSPORT_CDN_URL;
      script.async = true;
      document.head.appendChild(script);
    };

    const mountWidget = (attempt = 1): void => {
      if (!isMounted) return;

      if (attempt > MAX_MOUNT_ATTEMPTS) {
        console.warn(
          `[BSportWidget] '${variant}' did not load after ${MAX_MOUNT_ATTEMPTS} attempts for ${containerId}`,
        );
        return;
      }

      if (!window.BsportWidget) {
        mountTimeout = setTimeout(() => mountWidget(attempt + 1), MOUNT_RETRY_MS);
        return;
      }

      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`[BSportWidget] Container ${containerId} not found`);
        return;
      }

      // .cleanslate is the wrapper BSport injects on mount — its presence
      // means the widget is already mounted and we'd double-render under
      // React StrictMode without this guard.
      if (container.querySelector('.cleanslate')) {
        markWidgetMounted(containerId);
        return;
      }

      container.innerHTML = '';

      try {
        window.BsportWidget.mount({
          parentElement: containerId,
          companyId: BSPORT_COMPANY_ID,
          franchiseId: null,
          dialogMode: 1,
          showFab: false,
          ...bsportWidgetConfigs[variant],
        });
        watchForCleanslate(container);
      } catch (error) {
        console.error(
          `[BSportWidget] Mount error for '${variant}' on ${containerId}:`,
          error,
        );
      }
    };

    injectScript();
    mountWidget();

    return () => {
      isMounted = false;
      if (mountTimeout) clearTimeout(mountTimeout);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      markWidgetUnmounted(containerId);
      const container = document.getElementById(containerId);
      if (container) container.innerHTML = '';
    };
  }, [containerId, variant]);
}
