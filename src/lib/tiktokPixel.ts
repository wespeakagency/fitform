const TIKTOK_PIXEL_ID = 'D8OOND3C77U3A282CH70';
const TIKTOK_PIXEL_SCRIPT_ID = 'tiktok-pixel-script';
const TIKTOK_PIXEL_SCRIPT_SRC =
  'https://analytics.tiktok.com/i18n/pixel/events.js';
const TTQ_METHODS = [
  'page',
  'track',
  'identify',
  'instances',
  'debug',
  'on',
  'off',
  'once',
  'ready',
  'alias',
  'group',
  'enableCookie',
  'disableCookie',
  'holdConsent',
  'revokeConsent',
  'grantConsent',
] as const;
type TikTokMethod = (typeof TTQ_METHODS)[number];

type TikTokEventProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

interface TikTokQueue extends Array<unknown> {
  page: (...args: unknown[]) => void;
  track: (event: string, properties?: TikTokEventProperties) => void;
  identify: (...args: unknown[]) => void;
  instances: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
  on: (...args: unknown[]) => void;
  off: (...args: unknown[]) => void;
  once: (...args: unknown[]) => void;
  ready: (...args: unknown[]) => void;
  alias: (...args: unknown[]) => void;
  group: (...args: unknown[]) => void;
  enableCookie: (...args: unknown[]) => void;
  disableCookie: (...args: unknown[]) => void;
  holdConsent: (...args: unknown[]) => void;
  revokeConsent: (...args: unknown[]) => void;
  grantConsent: (...args: unknown[]) => void;
  load: (pixelId: string, options?: Record<string, unknown>) => void;
  instance: (pixelId: string) => TikTokQueue;
  methods?: TikTokMethod[];
  setAndDefer?: (target: TikTokQueue, method: TikTokMethod) => void;
  _i?: Record<string, TikTokQueue>;
  _o?: Record<string, Record<string, unknown>>;
  _t?: Record<string, number>;
  _u?: string;
}

declare global {
  interface Window {
    TiktokAnalyticsObject?: string;
    ttq?: TikTokQueue;
  }
}

let lastTrackedPageView: { route: string; timestamp: number } | null = null;

const getOrCreateTTQ = (): TikTokQueue => {
  if (window.ttq?.load) return window.ttq;

  const ttq = (window.ttq ?? []) as TikTokQueue;
  ttq.methods = [...TTQ_METHODS];
  ttq.setAndDefer = (target, method) => {
    target[method] = ((...args: unknown[]) => {
      target.push([method, ...args]);
    }) as TikTokQueue[typeof method];
  };

  TTQ_METHODS.forEach((method) => ttq.setAndDefer?.(ttq, method));

  ttq.instance = (pixelId: string) => {
    ttq._i = ttq._i || {};
    const pixelQueue = (ttq._i[pixelId] ?? []) as TikTokQueue;
    TTQ_METHODS.forEach((method) => {
      if (!pixelQueue[method]) {
        ttq.setAndDefer?.(pixelQueue, method);
      }
    });
    ttq._i[pixelId] = pixelQueue;
    return pixelQueue;
  };

  ttq.load = (pixelId: string, options: Record<string, unknown> = {}) => {
    ttq._t = ttq._t || {};
    if (ttq._t[pixelId]) return;

    const pixelQueue = ttq.instance(pixelId);
    pixelQueue._u = TIKTOK_PIXEL_SCRIPT_SRC;

    ttq._t[pixelId] = Date.now();
    ttq._o = ttq._o || {};
    ttq._o[pixelId] = options;

    if (document.getElementById(TIKTOK_PIXEL_SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = TIKTOK_PIXEL_SCRIPT_ID;
    script.type = 'text/javascript';
    script.async = true;
    script.src = `${TIKTOK_PIXEL_SCRIPT_SRC}?sdkid=${pixelId}&lib=ttq`;

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
      return;
    }

    document.head.appendChild(script);
  };

  window.TiktokAnalyticsObject = 'ttq';
  window.ttq = ttq;

  return ttq;
};

export const initTikTokPixel = (): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const ttq = getOrCreateTTQ();
  ttq.load(TIKTOK_PIXEL_ID);
};

export const trackTikTokPageView = (route: string): void => {
  initTikTokPixel();

  const ttq = window.ttq;
  if (!ttq?.page) return;

  const now = Date.now();
  if (
    lastTrackedPageView &&
    lastTrackedPageView.route === route &&
    now - lastTrackedPageView.timestamp < 1000
  ) {
    return;
  }

  ttq.page();
  lastTrackedPageView = { route, timestamp: now };
};

export const trackTikTokEvent = (
  event: string,
  properties?: TikTokEventProperties,
): void => {
  initTikTokPixel();
  window.ttq?.track(event, properties);
};
