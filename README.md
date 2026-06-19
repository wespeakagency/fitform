<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1-FSuWlT8TpaWvPTONyOHnYHMNJ_lzFD-

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## TikTok Events API

This project sends server-side TikTok conversion events through `POST /api/track`.

### What `/api/track` does

- Receives frontend events from the Vite app
- Derives request IP + browser user agent from the serverless request headers
- Builds a TikTok Events API v1.3 payload
- Sends the payload to `https://business-api.tiktok.com/open_api/v1.3/event/track/`
- Returns TikTok's response and surfaces errors clearly

### Payload notes

- `event_source_id` is the canonical Pixel ID field sent to TikTok
- `properties.custom_data.pixel_code` is also mirrored in the payload for internal traceability
- `event_id` is generated per event and returned by `/api/track`

### Environment variables

The integration expects these variables:

- `TIKTOK_ACCESS_TOKEN`
- `TIKTOK_PIXEL_ID`
- `TIKTOK_TEST_EVENT_CODE` - optional, only for Test Events validation

Reference values live in `.env.example`. Real secrets must stay only in local/Vercel envs.

### Events currently instrumented

- `ViewContent`
  - `src/sections/Packages.tsx`
  - `src/sections/Memberships.tsx`
  - `src/sections/Pricing.tsx`
  - `src/sections/Shop.tsx`
  - Fires once per section per browser session when that section becomes visible
- `Search`
  - `src/hooks/useTikTokBsportSearchTracking.ts`
  - Best-effort tracking for BSport search inputs when the widget renders searchable inputs
- `Contact`
  - `src/sections/Contact.tsx`
  - Fires on email, phone, and WhatsApp contact intent (not form submission success)
- `ClickButton`
  - `src/sections/Hero.tsx`
  - `src/layout/Navbar/DesktopNav.tsx`
  - `src/layout/Navbar/MobileMenu.tsx`
  - `src/layout/Footer.tsx`
- `Lead`
  - `src/layout/Navbar/DesktopNav.tsx`
  - `src/layout/Navbar/MobileMenu.tsx`
  - Current implementation uses entry into the BSport auth funnel as the lead proxy because the site does not have a first-party lead form/newsletter yet
  - Deduplicated once per browser session

### Validation flow

1. Run the app with Vercel serverless locally, preferably with `vercel dev`
2. Set `TIKTOK_TEST_EVENT_CODE` temporarily
3. Trigger each event path and confirm TikTok responds successfully
4. Verify them inside TikTok Events Manager -> Test Events
5. Remove or unset `TIKTOK_TEST_EVENT_CODE` before production rollout
