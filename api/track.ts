import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildTikTokPayload } from '../lib/tiktok/buildPayload.js';
import {
  isTikTokEventName,
  type TikTokEventName,
  type TikTokTrackRequestBody,
} from '../lib/tiktok/types.js';

const TIKTOK_TRACK_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';
const TIKTOK_REQUEST_TIMEOUT_MS = 5_000;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const getHeaderValue = (headerValue: string | string[] | undefined): string | undefined => {
  if (Array.isArray(headerValue)) {
    return headerValue[0]?.trim() || undefined;
  }

  return headerValue?.trim() || undefined;
};

const getRequestIp = (headers: VercelRequest['headers']): string | undefined => {
  const forwardedFor = getHeaderValue(headers['x-forwarded-for']);
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || undefined;
  }

  return getHeaderValue(headers['x-real-ip']);
};

const parseBody = (body: unknown): TikTokTrackRequestBody | null => {
  if (!body) return null;

  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as TikTokTrackRequestBody;
    } catch {
      return null;
    }
  }

  if (typeof body === 'object') {
    return body as TikTokTrackRequestBody;
  }

  return null;
};

const parseJsonSafely = (value: string): unknown => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const sanitizeOptionalString = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;

const isValidHttpUrl = (value: string): boolean => {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

const getTikTokResponseSummary = (value: unknown): { code?: unknown; message?: unknown } | undefined => {
  if (!isRecord(value)) return undefined;

  return {
    code: value.code,
    message: value.message,
  };
};

const getSafeErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Unknown error';

const isAbortError = (error: unknown): boolean =>
  error instanceof Error && error.name === 'AbortError';

const getValidatedEventName = (value: unknown): TikTokEventName | null => {
  if (typeof value !== 'string') return null;
  return isTikTokEventName(value) ? value : null;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  const accessToken = process.env.TIKTOK_ACCESS_TOKEN?.trim();
  const pixelId = process.env.TIKTOK_PIXEL_ID?.trim();
  const testEventCode = process.env.TIKTOK_TEST_EVENT_CODE?.trim();

  if (!accessToken || !pixelId) {
    return res.status(500).json({
      ok: false,
      error:
        'Missing TikTok configuration. Expected TIKTOK_ACCESS_TOKEN and TIKTOK_PIXEL_ID.',
    });
  }

  const body = parseBody(req.body);
  if (!body) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid JSON body.',
    });
  }

  const {
    event: rawEvent,
    url: rawUrl,
    referrer: rawReferrer,
    ttclid: rawTtclid,
    event_id: rawEventId,
    email: rawEmail,
    phone_number: rawPhoneNumber,
    external_id: rawExternalId,
    ...params
  } = body;

  const event = getValidatedEventName(rawEvent);
  if (!event) {
    return res.status(400).json({
      ok: false,
      error: 'Invalid event name.',
    });
  }

  const url = sanitizeOptionalString(rawUrl);
  if (!url || !isValidHttpUrl(url)) {
    return res.status(400).json({
      ok: false,
      error: 'Missing or invalid url. Expected an absolute http/https URL.',
    });
  }

  const userAgent = getHeaderValue(req.headers['user-agent']);
  if (!userAgent) {
    return res.status(400).json({
      ok: false,
      error: 'Missing user-agent header.',
    });
  }

  const payload = buildTikTokPayload({
    pixelId,
    event,
    url,
    user_agent: userAgent,
    ip: getRequestIp(req.headers),
    referrer: sanitizeOptionalString(rawReferrer),
    ttclid: sanitizeOptionalString(rawTtclid),
    event_id: sanitizeOptionalString(rawEventId),
    email: sanitizeOptionalString(rawEmail),
    phone_number: sanitizeOptionalString(rawPhoneNumber),
    external_id: sanitizeOptionalString(rawExternalId),
    params,
    test_event_code: testEventCode,
  });

  const outboundEventId = payload.data[0]?.event_id;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIKTOK_REQUEST_TIMEOUT_MS);

  try {
    const tiktokResponse = await fetch(TIKTOK_TRACK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const rawResponse = await tiktokResponse.text();
    const parsedResponse = parseJsonSafely(rawResponse);
    const responseSummary = getTikTokResponseSummary(parsedResponse);
    const hasTikTokError =
      responseSummary?.code !== undefined &&
      responseSummary.code !== 0 &&
      responseSummary.code !== '0';

    if (!tiktokResponse.ok || hasTikTokError) {
      console.error('[TikTok] Events API error', {
        status: tiktokResponse.status,
        event,
        event_id: outboundEventId,
        tiktok_code: responseSummary?.code,
        tiktok_message: responseSummary?.message,
      });

      return res.status(502).json({
        ok: false,
        error: 'TikTok Events API rejected the event.',
        status: tiktokResponse.status,
        event_id: outboundEventId,
        tiktok: parsedResponse,
      });
    }

    return res.status(200).json({
      ok: true,
      event_id: outboundEventId,
      tiktok: parsedResponse,
    });
  } catch (error) {
    if (isAbortError(error)) {
      console.error('[TikTok] Events API timeout', {
        event,
        event_id: outboundEventId,
        timeout_ms: TIKTOK_REQUEST_TIMEOUT_MS,
      });

      return res.status(504).json({
        ok: false,
        error: 'TikTok Events API request timed out.',
        event_id: outboundEventId,
      });
    }

    console.error('[TikTok] Events API request failed', {
      event,
      event_id: outboundEventId,
      message: getSafeErrorMessage(error),
    });

    return res.status(500).json({
      ok: false,
      error: 'Failed to send event to TikTok Events API.',
      event_id: outboundEventId,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
