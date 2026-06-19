export type TikTokEventName =
  | 'ViewContent'
  | 'Search'
  | 'Contact'
  | 'ClickButton'
  | 'Lead';

export type TikTokEventPrimitive = string | number | boolean | null;
export type TikTokEventValue =
  | TikTokEventPrimitive
  | TikTokEventValue[]
  | { [key: string]: TikTokEventValue | undefined };

export type TikTokEventProperties = Record<string, TikTokEventValue | undefined>;

export interface TikTokTrackRequestBody extends TikTokEventProperties {
  event: TikTokEventName;
  url: string;
  user_agent: string;
  ip?: string;
  referrer?: string;
  ttclid?: string;
  event_id?: string;
  email?: string;
  phone_number?: string;
  external_id?: string;
  content_name?: string;
  content_type?: string;
  contents?: Array<Record<string, TikTokEventValue | undefined>>;
  query?: string;
  value?: number;
  currency?: string;
  description?: string;
}

export interface TikTokEventContextUser {
  email?: string;
  phone_number?: string;
  external_id?: string;
  ip?: string;
  user_agent: string;
}

export interface TikTokEventContextPage {
  url: string;
  referrer?: string;
}

export interface TikTokEventContextAd {
  callback?: string;
}

export interface TikTokEventData {
  event: TikTokEventName;
  event_id: string;
  event_time: number;
  action_source: 'website';
  context: {
    page: TikTokEventContextPage;
    user: TikTokEventContextUser;
    ad?: TikTokEventContextAd;
  };
  properties?: TikTokEventProperties;
}

export interface TikTokEventPayload {
  event_source: 'web';
  event_source_id: string;
  test_event_code?: string;
  data: TikTokEventData[];
}

export interface BuildTikTokPayloadInput {
  pixelId: string;
  event: TikTokEventName;
  url: string;
  user_agent: string;
  ip?: string;
  referrer?: string;
  ttclid?: string;
  event_id?: string;
  email?: string;
  phone_number?: string;
  external_id?: string;
  params?: TikTokEventProperties;
  test_event_code?: string;
}
