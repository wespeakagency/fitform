export interface NavRoute {
  name: string;
  href: string;
}

// Order matches the HomePage DOM order so navbar clicks always scroll down
// (or up) in a predictable direction — no jumps "above an item that was
// already behind you in the menu".
export const MAIN_LINKS: NavRoute[] = [
  { name: 'Concepto', href: '#about' },
  { name: 'Equipo', href: '#team' },
  { name: 'Precios', href: '#packages' },
  { name: 'Membresías', href: '#memberships' },
  { name: 'Clases', href: '#pricing' },
  { name: 'Contacto', href: '#contact' },
];

export const BOOKINGS_LINK: NavRoute = { name: 'Mis Reservas', href: '#my-bookings' };
export const SHOP_LINK: NavRoute = { name: 'Tienda', href: '#shop' };

// Links grouped on the right-side of the desktop separator (account / transactional).
export const RIGHT_GROUP_LINKS: NavRoute[] = [BOOKINGS_LINK, SHOP_LINK];

export const ALL_SECTION_IDS = [
  ...MAIN_LINKS.map((l) => l.href.replace('#', '')),
  ...RIGHT_GROUP_LINKS.map((l) => l.href.replace('#', '')),
];

export const LOGIN_WIDGET_CLASSES =
  'bsport-login-wrapper min-w-[120px] min-h-[40px] flex items-center justify-center relative z-50 [&_*]:!uppercase [&_*]:!tracking-[0.2em] transition-all cursor-pointer';
