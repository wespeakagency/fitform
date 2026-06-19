import { useEffect, useRef } from 'react';
import { trackEventOncePerSession } from '@tiktok/trackEvent';

interface UseTikTokViewContentOptions {
  contentName: string;
  sectionId: string;
  contentType?: string;
}

export function useTikTokViewContent({
  contentName,
  sectionId,
  contentType = 'section',
}: UseTikTokViewContentOptions) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasTrackedRef.current || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasTrackedRef.current) return;

        hasTrackedRef.current = true;
        void trackEventOncePerSession(`view-content:home:${sectionId}`, 'ViewContent', {
          content_name: contentName,
          content_type: contentType,
          page_section: sectionId,
        });
        observer.disconnect();
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [contentName, contentType, sectionId]);

  return sectionRef;
}
