export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  // Uses the target section's `scroll-margin-top` to leave space for the
  // fixed navbar — no manual offset math needed.
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
