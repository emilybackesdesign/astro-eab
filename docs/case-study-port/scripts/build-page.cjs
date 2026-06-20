#!/usr/bin/env node
// Build a self-contained Astro page that ports a Webflow case-study body 1:1.
// Emits the .astro file and prints the list of CDN assets to download.
//
// Usage: node build-page.cjs <slug> <html> <css> <outAstro> <contentStartMarker> <title> <description> <ogImage> [extraJs1,extraJs2]

const fs = require('fs');
const [, , slug, htmlPath, cssPath, outPath, contentStartMarker, title, description, ogImage, extraJsCsv] = process.argv;

let html = fs.readFileSync(htmlPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. slice the body: from <body ...> to the first trailing external script (jquery).
//    NB: Webflow bodies can carry classes (<body class="...">), so match with a regex.
const bodyMatch = html.match(/<body[^>]*>/);
const bodyOpen = bodyMatch ? bodyMatch.index + bodyMatch[0].length : 0;
let endMarker = html.indexOf('<script src="https://d3e54v103j8qbb.cloudfront.net');
if (endMarker === -1) endMarker = html.indexOf('</body>');
let slice = html.slice(bodyOpen, endMarker);

// 2. drop the Webflow navbar: from its opening to the real content start
const navStart = slice.indexOf('<div data-animation="default"');
const contentStart = slice.indexOf(contentStartMarker);
if (navStart !== -1 && contentStart !== -1 && contentStart > navStart) {
  slice = slice.slice(0, navStart) + slice.slice(contentStart);
} else {
  console.error('WARN: navbar markers not found; navbar NOT removed');
}

// 3. collect + localize CDN assets
const CDN = 'https://cdn.prod.website-files.com/654d00bcd3f29e5fc1116b3a/';
const assets = new Set();
for (const m of slice.matchAll(/https:\/\/cdn\.prod\.website-files\.com\/654d00bcd3f29e5fc1116b3a\/([^"'\s)]+)/g)) {
  assets.add(m[1]);
}
slice = slice.split(CDN).join(`/assets/cs/${slug}/`);

// 4. strip Webflow/analytics external scripts (we supply our own anim scripts),
//    then mark remaining inline scripts (chart/animation IIFEs) is:inline.
slice = slice.replace(/<script\b[^>]*\bsrc=[^>]*>\s*<\/script>/g, '');
// drop the google first-party tag IIFE if present
slice = slice.replace(/<script>\(function\(w,i,g\)[\s\S]*?<\/script>/g, '');
slice = slice.replace(/<script>/g, '<script is:inline>');

// 4d. Webflow IX2 runtime is absent in the port, so any element it would have
//     revealed is stuck at its initial hidden state (inline opacity:0 + a
//     translate3d offset). Strip those init-state style attrs so content shows
//     in its natural resting position. (Gated to pages that need it.)
if (process.env.STRIP_IX2) {
  slice = slice.replace(/\s*style="[^"]*opacity:0[^"]*"/g, '');
}

// 4e. decode %20 (and friends) inside localized asset paths so the file the
//     dev/static server resolves matches what's on disk.
slice = slice.replace(/(\/assets\/cs\/[^"'\s)]*)/g, (m) => m.replace(/%20/g, ' '));

// 4f. recolor low-contrast fills INSIDE <text> elements only (WCAG on authored
//     SVG diagram labels) — leaves identical colors on <rect>/<path> shapes alone.
//     SVG_TEXT_RECOLOR is a JSON array of [fromFill, toFill] pairs.
if (process.env.SVG_TEXT_RECOLOR) {
  for (const [from, to] of JSON.parse(process.env.SVG_TEXT_RECOLOR)) {
    const esc = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    slice = slice.replace(new RegExp(`(<text\\b[^>]*?\\bfill=")${esc}(")`, 'g'), `$1${to}$2`);
  }
}

// 4b. optional footer drop: cut everything from a footer marker onward
if (process.env.DROP_FROM) {
  const idx = slice.indexOf(process.env.DROP_FROM);
  if (idx !== -1) slice = slice.slice(0, idx);
  else console.error('WARN: DROP_FROM marker not found');
}

// 4c. optional wrapper so :root vars can be scoped to a page-level element
if (process.env.WRAP) {
  slice = `<div class="cs-port-root">\n${slice.trim()}\n</div>`;
}

// 5. extra JS appended as inline scripts
let extra = '';
if (extraJsCsv) {
  for (const p of extraJsCsv.split(',')) {
    if (!p.trim()) continue;
    const js = fs.readFileSync(p.trim(), 'utf8');
    extra += `\n<script is:inline>${js}</script>`;
  }
}

// 6. scope the :root vars to the page wrapper so they can't touch Nav/Footer
const rootScope = process.env.ROOTSCOPE || `.${slug}-main-wrapper`;
css = css.replace(/:root\{/g, `${rootScope}{`);

// 6b. Webflow exported font-family:var(...) wrapped in literal quotes (invalid).
//     Unquote so the variable resolves. Also define the display font (a latent
//     prod bug left --font-display undefined; the page's H1 hardcodes Josefin Sans).
css = css.split('"var(--font-display)"').join('var(--font-display)');
slice = slice.split('"var(--font-display)"').join('var(--font-display)');
if (process.env.DISPLAY_FONT) {
  css = `${rootScope}{--font-display:${process.env.DISPLAY_FONT};}\n` + css;
}
// page background (some ports rely on the Webflow <body> bg, which we don't pull globally)
if (process.env.PAGE_BG) {
  css = `${rootScope}{background:${process.env.PAGE_BG};}\n` + css;
}
// per-page CSS overrides appended last (highest source-order priority)
if (process.env.CSS_APPEND) {
  css = css + '\n' + process.env.CSS_APPEND;
}
// global color replacements (e.g. darkening a body-text color to meet WCAG AA).
// RECOLOR is a JSON array of [from, to] string pairs applied to the page CSS.
if (process.env.RECOLOR) {
  for (const [from, to] of JSON.parse(process.env.RECOLOR)) {
    css = css.split(from).join(to);
  }
}

// optional Lottie initializer (Webflow IX2 engine absent; use bundled lottie-web)
const lottieScript = process.env.LOTTIE ? `
<script>
  import lottie from 'lottie-web';
  const init = () => {
    document.querySelectorAll('[data-animation-type="lottie"]').forEach((el) => {
      if (el.dataset.lottieInit) return;
      const path = el.getAttribute('data-src');
      if (!path) return;
      el.dataset.lottieInit = '1';
      lottie.loadAnimation({
        container: el,
        renderer: el.getAttribute('data-renderer') || 'svg',
        loop: el.getAttribute('data-loop') !== '0',
        autoplay: el.getAttribute('data-autoplay') !== '0',
        path,
      });
    });
  };
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
</script>` : '';

const astro = `---
import PageLayout from '../../layouts/PageLayout.astro';
---
<PageLayout title=${JSON.stringify(title)} description=${JSON.stringify(description)} ogImage=${JSON.stringify(ogImage)}${process.env.BODY_BG ? ` bodyBg=${JSON.stringify(process.env.BODY_BG)}` : ''}>
${slice.trim()}
${extra}
</PageLayout>

<style>
${css}
</style>
${lottieScript}
`;

fs.writeFileSync(outPath, astro);
console.error(`wrote ${outPath} (${astro.length} bytes)`);
console.log([...assets].join('\n'));
