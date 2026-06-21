import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    number: z.string(),
    tags: z.array(z.string()),
    excerpt: z.string(),
    coverImage: z.string().optional(),
    hasRotateWarning: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    /** Optional ≤60-char override for the SEO <title>/OG title when `title` is too long for SERPs. */
    seoTitle: z.string().optional(),
    date: z.coerce.date(),
    /** Optional "last updated" date; defaults to `date` (publish date) when absent. Used for BlogPosting.dateModified freshness signal. */
    dateModified: z.coerce.date().optional(),
    category: z.string(),
    coverImage: z.string(),
    excerpt: z.string(),
    coverImageAlt: z.string().optional(),
    podcastEmbedUrl: z.string().optional(),
  }),
});

export const collections = { 'case-studies': caseStudies, posts };
