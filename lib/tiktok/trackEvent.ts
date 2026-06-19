import type { TikTokEventName, TikTokTrackRequestBody, TikTokEventProperties } from './types';

const getCurrentUrl = (): string =>
  typeof window === 'undefined' ? '' : window.location.href;

const getReferrer = (): string | undefined =>
  typeof document === 'undefined' || !document.referrer ? undefined : document.referrer;

const getTtclid = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;

  const ttclid = new URLSearchParams(window.location.search).get('ttclid');
  return ttclid || undefined;
};

const createEventId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `tt-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const SESSION_EVENT_PREFIX = 'tiktok-session-event:';

const getSessionStorage = (): Storage | null => {
  if (typeof window === 'undefined') return null;

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

export async function trackEvent(
  eventName: TikTokEventName,
  params: TikTokEventProperties = {},
): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const body: TikTokTrackRequestBody = {
    event: eventName,
    url: getCurrentUrl(),
    referrer: getReferrer(),
    ttclid: getTtclid(),
    event_id: createEventId(),
    ...params,
  };

  try {
    const response = await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      keepalive: true,
    });

    if (!response.ok) {
      console.warn('[TikTok] /api/track responded with status', response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('[TikTok] Event tracking failed without blocking UX.', error);
    return false;
  }
}

export async function trackEventOncePerSession(
  sessionKey: string,
  eventName: TikTokEventName,
  params: TikTokEventProperties = {},
): Promise<boolean> {
  const storage = getSessionStorage();
  const storageKey = `${SESSION_EVENT_PREFIX}${sessionKey}`;

  if (storage?.getItem(storageKey) === '1') {
    return false;
  }

  const tracked = await trackEvent(eventName, params);

  if (tracked) {
    storage?.setItem(storageKey, '1');
  }

  return tracked;
}
