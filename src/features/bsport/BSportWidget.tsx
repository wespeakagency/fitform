import React, { useEffect, useState } from 'react';
import { useBSportWidget } from './useBSportWidget';
import {
  isWidgetMounted,
  subscribeWidgetMount,
} from './widgetMountRegistry';
import type { BSportWidgetVariant } from './widgetConfigs';

interface BSportWidgetProps {
  containerId: string;
  variant: BSportWidgetVariant;
  className?: string;
}

// Variants that benefit from a loading skeleton — the heavy section widgets
// that take seconds to bootstrap. The login button renders almost instantly
// and is small enough that a skeleton flash would be visual noise.
const SKELETON_VARIANTS = new Set<BSportWidgetVariant>([
  'pass',
  'subscription',
  'calendar',
  'shop',
  'consumerSpace',
]);

const Skeleton: React.FC = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-md bg-stone-200/40 dark:bg-stone-800/40 animate-pulse"
  >
    <div className="w-8 h-8 border-2 border-stone-300 dark:border-stone-700 border-t-stone-500 dark:border-t-stone-400 rounded-full animate-spin" />
  </div>
);

export const BSportWidget: React.FC<BSportWidgetProps> = ({
  containerId,
  variant,
  className = '',
}) => {
  useBSportWidget(containerId, variant);

  const showSkeleton = SKELETON_VARIANTS.has(variant);

  const [mounted, setMounted] = useState<boolean>(() =>
    isWidgetMounted(containerId),
  );

  useEffect(() => {
    if (!showSkeleton) return;
    setMounted(isWidgetMounted(containerId));
    return subscribeWidgetMount(containerId, setMounted);
  }, [containerId, showSkeleton]);

  if (!showSkeleton) {
    return <div id={containerId} className={className} />;
  }

  // minHeight: 'inherit' lets the wrapper take the parent section's min-h
  // so the skeleton overlay has a real box to cover before BSport injects
  // any DOM. Inline style beats Tailwind class specificity for this prop.
  return (
    <div className={`relative ${className}`} style={{ minHeight: 'inherit' }}>
      <div id={containerId} className="w-full h-full" />
      {!mounted && <Skeleton />}
    </div>
  );
};
