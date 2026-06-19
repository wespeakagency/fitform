import { useEffect, useRef } from 'react';
import { trackEvent } from '@tiktok/trackEvent';

const SEARCH_INPUT_SELECTOR = [
  '[id*="bsport-widget"] input[type="search"]',
  '[id*="bsport-widget"] .bs-search__container input',
  '[id*="bsport-widget"] .bs-calendar-search__container input',
].join(', ');

const normalizeQuery = (value: string): string => value.trim().replace(/\s+/g, ' ');

export function useTikTokBsportSearchTracking(): void {
  const lastSearchRef = useRef<string>('');

  useEffect(() => {
    const maybeTrackSearch = (target: EventTarget | null) => {
      if (!(target instanceof HTMLInputElement)) return;
      if (!target.matches(SEARCH_INPUT_SELECTOR)) return;

      const query = normalizeQuery(target.value);
      if (query.length < 2 || query === lastSearchRef.current) return;

      lastSearchRef.current = query;
      const widgetContainer = target.closest('[id*="bsport-widget"]');
      const pageSection = widgetContainer?.closest('section')?.id;

      void trackEvent('Search', {
        query,
        content_name: 'BSport widget search',
        content_type: 'widget_search',
        page_section: pageSection,
      });
    };

    const handleChange = (event: Event) => maybeTrackSearch(event.target);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      maybeTrackSearch(event.target);
    };

    document.addEventListener('change', handleChange, true);
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('change', handleChange, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);
}
