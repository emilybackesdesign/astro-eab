/**
 * Single source of truth for which routes render in the LIGHT (Toe Bean Pink /
 * Webflow-port) theme vs the dark-mode-first default. The shared Nav and Footer
 * read this to auto-pick their variant, so adding a newly-converted light page is
 * a one-line change here.
 *
 * Matches an exact route or any nested route under it (e.g. '/legal' → '/legal/credits').
 */
export type PageTheme = 'light' | 'dark';

export const LIGHT_ROUTES: string[] = [
  '/about',
  '/the-5-pillars-of-emily',
  '/case-study/sage-designing-an-ai-powered-chatbot', // light/cream case-study port
  '/case-study/lago', // light (#fafcfd) Webflow port
  '/case-study/sprocket-app', // light (#ebe9f0) Webflow port
  // Folsom & Subscription case studies are dark-themed, so they keep the dark nav.
  // When /resume and /legal/* are ported to the light Webflow design, add them here.
];

export function getPageTheme(pathname: string): PageTheme {
  const path = pathname.replace(/\/+$/, '') || '/';
  const isLight = LIGHT_ROUTES.some(
    (route) => path === route || path.startsWith(route + '/'),
  );
  return isLight ? 'light' : 'dark';
}
