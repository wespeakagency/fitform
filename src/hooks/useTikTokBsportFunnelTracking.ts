import { useEffect, useRef } from 'react';
import { trackEvent } from '@tiktok/trackEvent';

const WIDGET_CONTAINER_SELECTOR = '[id*="bsport-widget"]';

const ADD_TO_CART_SELECTORS = [
  '.bs-paymentpack-card__right-button',
  '.bs-subscription-card__right-button',
  '.bs-shop-card__right-button',
  '.bs-class-card__right-button',
].join(', ');

const CHECKOUT_CONTAINER_SELECTORS = [
  '.bsport-user-interaction-modal__container',
  '.bs-basket-page',
  '.bs-checkout-page',
  '.bs-payment-page',
].join(', ');

const WIDGET_VARIANT_BY_CONTAINER_ID: Record<string, string> = {
  'bsport-widget-pass': 'pass',
  'bsport-widget-subscription': 'subscription',
  'bsport-widget-395980': 'calendar',
  'bsport-widget-151352': 'shop',
  'bsport-widget-897615': 'consumerSpace',
};

const readWidgetVariant = (container: Element | null): string | undefined => {
  if (!container?.id) return undefined;
  return WIDGET_VARIANT_BY_CONTAINER_ID[container.id] ?? container.id;
};

const readPackTitle = (button: Element): string | undefined => {
  const card = button.closest('.bs-generic-card');
  const title = card?.querySelector(
    '.bs-paymentpack-card__title, .bs-subscription-card__title, [class*="__title"]',
  );
  const cardTitle = title?.textContent?.trim();
  if (cardTitle) return cardTitle;
  const buttonText = button.textContent?.trim();
  return buttonText && buttonText.toLowerCase() !== 'add to basket' ? buttonText : undefined;
};

export function useTikTokBsportFunnelTracking(): void {
  const dispatchedAddToCartRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    let checkoutOpen = false;
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const widgetContainer = target.closest(WIDGET_CONTAINER_SELECTOR);
      if (!widgetContainer) return;

      const actionButton = target.closest(ADD_TO_CART_SELECTORS);
      if (!(actionButton instanceof HTMLElement)) return;

      const variant = readWidgetVariant(widgetContainer);
      const packName = readPackTitle(actionButton);
      const dedupeKey = `${variant ?? 'unknown'}::${packName ?? actionButton.textContent?.trim() ?? ''}`;

      if (dispatchedAddToCartRef.current.has(dedupeKey)) return;
      dispatchedAddToCartRef.current.add(dedupeKey);
      window.setTimeout(() => {
        dispatchedAddToCartRef.current.delete(dedupeKey);
      }, 1500);

      void trackEvent('AddToCart', {
        content_name: packName,
        content_type: 'bsport_pack',
        widget_variant: variant,
        widget_container_id: widgetContainer.id,
      });
    };

    document.addEventListener('click', handleClick, true);

    const syncCheckoutState = (): void => {
      const checkoutNode = document.querySelector(CHECKOUT_CONTAINER_SELECTORS);
      if (checkoutNode) {
        if (checkoutOpen) return;
        checkoutOpen = true;
        const widgetContainer = checkoutNode.closest(WIDGET_CONTAINER_SELECTOR);
        const variant = readWidgetVariant(widgetContainer);
        void trackEvent('InitiateCheckout', {
          content_type: 'bsport_checkout',
          widget_variant: variant,
          widget_container_id: widgetContainer?.id,
        });
      } else if (checkoutOpen) {
        checkoutOpen = false;
      }
    };

    syncCheckoutState();

    const observer = new MutationObserver(syncCheckoutState);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('click', handleClick, true);
      observer.disconnect();
    };
  }, []);
}
