// Tracks BSport widget mount state per containerId so code outside the
// widget hook (e.g. nav handlers) can await a widget's real mount before
// acting on its section's position.
//
// The registry is intentionally module-scoped state: widgets register
// themselves on mount and unregister on cleanup.

const mountedContainers = new Set<string>();
const pendingResolvers = new Map<string, Array<() => void>>();
const subscribers = new Map<string, Set<(mounted: boolean) => void>>();

function notifySubscribers(containerId: string, mounted: boolean): void {
  const subs = subscribers.get(containerId);
  if (!subs) return;
  subs.forEach((cb) => cb(mounted));
}

export function markWidgetMounted(containerId: string): void {
  if (mountedContainers.has(containerId)) return;
  mountedContainers.add(containerId);
  const resolvers = pendingResolvers.get(containerId);
  if (resolvers) {
    pendingResolvers.delete(containerId);
    resolvers.forEach((resolve) => resolve());
  }
  notifySubscribers(containerId, true);
}

export function markWidgetUnmounted(containerId: string): void {
  const wasMounted = mountedContainers.delete(containerId);
  if (wasMounted) notifySubscribers(containerId, false);
}

export function isWidgetMounted(containerId: string): boolean {
  return mountedContainers.has(containerId);
}

// Subscribe to mount/unmount transitions for a container. Returns an
// unsubscribe function. Used by BSportWidget to render a skeleton overlay
// while the widget bootstraps.
export function subscribeWidgetMount(
  containerId: string,
  callback: (mounted: boolean) => void,
): () => void {
  let set = subscribers.get(containerId);
  if (!set) {
    set = new Set();
    subscribers.set(containerId, set);
  }
  set.add(callback);
  return () => {
    const current = subscribers.get(containerId);
    if (!current) return;
    current.delete(callback);
    if (current.size === 0) subscribers.delete(containerId);
  };
}

const DEFAULT_TIMEOUT_MS = 3000;

export function whenWidgetMounted(
  containerId: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<void> {
  if (mountedContainers.has(containerId)) return Promise.resolve();

  return new Promise<void>((resolve) => {
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    const resolvers = pendingResolvers.get(containerId) ?? [];
    resolvers.push(settle);
    pendingResolvers.set(containerId, resolvers);

    // Fallback: never leave a nav click hanging if BSport fails to load.
    setTimeout(settle, timeoutMs);
  });
}

// Maps a section's hash id (without '#') to its BSport container id.
// Sections without a widget are absent here — callers should treat the
// lookup as optional.
export const SECTION_WIDGET_CONTAINERS: Record<string, string> = {
  packages: 'bsport-widget-pass',
  memberships: 'bsport-widget-subscription',
  pricing: 'bsport-widget-395980',
  'my-bookings': 'bsport-widget-897615',
  shop: 'bsport-widget-151352',
};
