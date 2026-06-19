import type { TikTokEventName, TikTokTrackRequestBody, TikTokEventProperties } from './types';

const getCurrentUrl = (): string =>
  typeof window === 'undefined' ? '' : window.location.href;

const getReferrer = (): string | undefined =>
  typeof document === 'undefined' || !document.referrer ? undefined : document.referrer;

const getUserAgent = (): string =>
  typeof navigator === 'undefined' ? 'unknown' : navigator.userAgent;

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

export async function trackEvent(
  eventName: TikTokEventName,
  params: TikTokEventProperties = {},
): Promise<void> {
  if (typeof window === 'undefined') return;

  const body: TikTokTrackRequestBody = {
    event: eventName,
    url: getCurrentUrl(),
    user_agent: getUserAgent(),
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
    }
  } catch (error) {
    console.warn('[TikTok] Event tracking failed without blocking UX.', error);
  }
}
