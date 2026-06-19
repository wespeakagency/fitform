import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildTikTokPayload } from '../lib/tiktok/buildPayload';
import type { TikTokTrackRequestBody } from '../lib/tiktok/types';

const TIKTOK_TRACK_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

const getRequestIp = (headerValue: string | string[] | undefined): string | undefined => {
  if (Array.isArray(headerValue)) {
    return headerValue[0]?.split(',')[0]?.trim() || undefined;
  }

  return headerValue?.split(',')[0]?.trim() || undefined;
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

const parseJsonSafely = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;
  const pixelId = process.env.TIKTOK_PIXEL_ID;
  const testEventCode = process.env.TIKTOK_TEST_EVENT_CODE;

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

  const { event, url, user_agent, ip: bodyIp, referrer, ttclid, event_id, email, phone_number, external_id, ...params } =
    body;

  if (!event || !url || !user_agent) {
    return res.status(400).json({
      ok: false,
      error: 'Missing required fields: event, url, and user_agent are required.',
    });
  }

  const ip = bodyIp || getRequestIp(req.headers['x-forwarded-for']);

  const payload = buildTikTokPayload({
    pixelId,
    event,
    url,
    user_agent,
    ip,
    referrer,
    ttclid,
    event_id,
    email,
    phone_number,
    external_id,
    params,
    test_event_code: testEventCode,
  });

  try {
    const tiktokResponse = await fetch(TIKTOK_TRACK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
      },
      body: JSON.stringify(payload),
    });

    const rawResponse = await tiktokResponse.text();
    const parsedResponse = parseJsonSafely(rawResponse);
    const hasTikTokError =
      typeof parsedResponse === 'object' &&
      parsedResponse !== null &&
      'code' in parsedResponse &&
      parsedResponse.code !== 0;

    if (!tiktokResponse.ok || hasTikTokError) {
      console.error('[TikTok] Events API error', {
        status: tiktokResponse.status,
        payload,
        response: parsedResponse,
      });

      return res.status(502).json({
        ok: false,
        error: 'TikTok Events API rejected the event.',
        status: tiktokResponse.status,
        tiktok: parsedResponse,
      });
    }

    return res.status(200).json({
      ok: true,
      tiktok: parsedResponse,
    });
  } catch (error) {
    console.error('[TikTok] Events API request failed', error);

    return res.status(500).json({
      ok: false,
      error: 'Failed to send event to TikTok Events API.',
    });
  }
}
