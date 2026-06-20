// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://emilybackes.design',
  integrations: [mdx(), sitemap()],
  output: 'static',
});
