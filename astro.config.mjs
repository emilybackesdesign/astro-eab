// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Add lazy-loading + async decoding to inline content images (markdown `![]()` in
 * MDX posts). Cuts off-screen image requests for a faster LCP/CWV. The cover image
 * lives in PostLayout (not MDX), so it keeps its `fetchpriority="high"` and isn't lazied.
 */
function rehypeLazyImages() {
  return (tree) => {
    const walk = (node) => {
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
  integrations: [mdx({ rehypePlugins: [rehypeLazyImages] }), sitemap()],
  output: 'static',
});
