import { useEffect, useState } from 'react';

interface UseActiveSectionOptions {
  rootMargin?: string;
  enabled?: boolean;
}

export function useActiveSection(
  ids: string[],
  { rootMargin = '-30% 0px -60% 0px', enabled = true }: UseActiveSectionOptions = {},
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Re-subscribe only when the set of ids changes.
  const idsKey = ids.join(',');

  useEffect(() => {
    if (!enabled) {
      setActiveId(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin, threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [idsKey, rootMargin, enabled]);

  return activeId;
}
