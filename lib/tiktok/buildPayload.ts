import { sha256Lowercase } from './hash';
import type {
  BuildTikTokPayloadInput,
  TikTokEventPayload,
  TikTokEventProperties,
  TikTokEventValue,
} from './types';

const RESERVED_KEYS = new Set([
  'event',
  'url',
  'user_agent',
  'ip',
  'referrer',
  'ttclid',
  'event_id',
  'email',
  'phone_number',
  'external_id',
  'test_event_code',
]);

const SHA256_PATTERN = /^[a-f0-9]{64}$/i;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const normalizePhoneNumber = (value: string): string =>
  value.replace(/\D/g, '');

const maybeHash = (value: string, normalizer?: (raw: string) => string): string => {
  const normalized = (normalizer ? normalizer(value) : value.trim().toLowerCase()).trim();

  if (!normalized) return normalized;
  if (SHA256_PATTERN.test(normalized)) return normalized.toLowerCase();

  return sha256Lowercase(normalized);
};

const sanitizeValue = (value: TikTokEventValue | undefined): TikTokEventValue | undefined => {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) {
    const sanitizedArray = value
      .map((entry) => sanitizeValue(entry))
      .filter((entry): entry is TikTokEventValue => entry !== undefined);

    return sanitizedArray;
  }

  if (isRecord(value)) {
    const sanitizedObject = Object.entries(value).reduce<TikTokEventProperties>(
      (accumulator, [key, entry]) => {
        const sanitizedEntry = sanitizeValue(entry as TikTokEventValue | undefined);
        if (sanitizedEntry !== undefined) {
          accumulator[key] = sanitizedEntry;
        }
        return accumulator;
      },
      {},
    );

    return Object.keys(sanitizedObject).length > 0 ? sanitizedObject : undefined;
  }

  return value;
};

const buildCustomData = (value: TikTokEventValue | undefined, pixelId: string): TikTokEventProperties => {
  if (isRecord(value)) {
    return {
      ...value,
      pixel_code: pixelId,
    };
  }

  return {
    pixel_code: pixelId,
  };
};

const buildProperties = (
  eventName: BuildTikTokPayloadInput['event'],
  pixelId: string,
  params: TikTokEventProperties = {},
): TikTokEventProperties | undefined => {
  const normalizedPixelId = pixelId.trim();
  const properties = Object.entries(params).reduce<TikTokEventProperties>(
    (accumulator, [key, value]) => {
      if (RESERVED_KEYS.has(key)) return accumulator;

      const sanitizedValue = sanitizeValue(value);
      if (sanitizedValue !== undefined) {
        accumulator[key] = sanitizedValue;
      }

      return accumulator;
    },
    {},
  );

  if (eventName === 'ViewContent') {
    properties.content_type = properties.content_type ?? 'section';
  }

  if (eventName === 'ClickButton') {
    properties.content_type = properties.content_type ?? 'button';
  }

  if (eventName === 'Search') {
    properties.query = properties.query ?? properties.search_string ?? properties.content_name;
  }

  properties.custom_data = buildCustomData(properties.custom_data, normalizedPixelId);

  return Object.keys(properties).length > 0 ? properties : undefined;
};

export function buildTikTokPayload({
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
  params = {},
  test_event_code,
}: BuildTikTokPayloadInput): TikTokEventPayload {
  const normalizedPixelId = pixelId.trim();
  const normalizedTestEventCode = test_event_code?.trim();
  const properties = buildProperties(event, normalizedPixelId, params);

  const payload = {
    event_source: 'web' as const,
    event_source_id: normalizedPixelId,
    ...(normalizedTestEventCode ? { test_event_code: normalizedTestEventCode } : {}),
    data: [
      {
        event,
        event_id: event_id ?? crypto.randomUUID(),
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website' as const,
        context: {
          page: {
            url,
            ...(referrer ? { referrer } : {}),
          },
          user: {
            user_agent,
            ...(ip ? { ip } : {}),
            ...(email ? { email: maybeHash(email) } : {}),
            ...(phone_number
              ? { phone_number: maybeHash(phone_number, normalizePhoneNumber) }
              : {}),
            ...(external_id ? { external_id: maybeHash(external_id) } : {}),
          },
          ...(ttclid
            ? {
                ad: {
                  callback: ttclid,
                },
              }
            : {}),
        },
        ...(properties ? { properties } : {}),
      },
    ],
  };

  return payload;
}
