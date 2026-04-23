const DEFAULT_NAVBAR_OFFSET = 100;

export function scrollToSection(id: string, offset = DEFAULT_NAVBAR_OFFSET): void {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
