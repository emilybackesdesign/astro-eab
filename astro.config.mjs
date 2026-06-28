// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';

/**
 * Add lazy-loading + async decoding to inline content images (markdown `![]()` in
 * MDX posts). Cuts off-screen image requests for a faster LCP/CWV. The cover image
 * lives in PostLayout (not MDX), so it keeps its `fetchpriority="high"` and isn't lazied.
 */
function rehypeLazyImages() {
  return (/** @type {any} */ tree) => {
    const walk = (/** @type {any} */ node) => {
      if (node.type === 'element' && node.tagName === 'img') {
        node.properties = node.properties || {};
        if (node.properties.loading === undefined) node.properties.loading = 'lazy';
        if (node.properties.decoding === undefined) node.properties.decoding = 'async';
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://emilybackes.design',
  integrations: [mdx(), sitemap()],
  // Wire rehypeLazyImages via the unified() Markdown processor. MDX extends the
  // top-level `markdown` config and inherits a unified processor's rehypePlugins,
  // so the plugin still rewrites images in .mdx posts — without the deprecated
  // integration-level `mdx({ rehypePlugins })` option (removed in a future major).
  markdown: {
    processor: unified({ rehypePlugins: [rehypeLazyImages] }),
  },
  output: 'static',
  // Webflow used no trailing slash; emit canonical, no-trailing-slash URLs so CF
  // Pages doesn't serve both /about and /about/ (duplicate-content). See migration-audit.md §6.
  trailingSlash: 'never',
  // Prefetch internal links on hover for snappier navigation (zero cost on static).
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
