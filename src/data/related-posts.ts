import type { CollectionEntry } from 'astro:content';

/**
 * Curated "related reading" map keyed by post id (slug). Each entry lists three
 * sibling slugs in priority order, chosen for topical overlap — the same threads
 * the inline cross-links in the post bodies follow. Posts not listed here fall
 * back to same-category siblings, then most-recent, in `getRelatedPosts`.
 */
const RELATED: Record<string, string[]> = {
  'my-ux-ui-journey': [
    'how-to-conduct-effective-ux-interviews',
    'the-productivity-hack-that-recruiting-gurus-on-linkedin-wont-give-you',
    'how-to-apply-for-jobs-in-a-tough-market',
  ],
  'how-to-conduct-effective-ux-interviews': [
    'how-to-collect-free-ux-survey-responses-in-24-hours',
    'how-relevant-are-user-personas-a-personal-story',
    'my-ux-ui-journey',
  ],
  'how-to-think-about-accessibility-as-a-ux-designer': [
    'how-relevant-are-user-personas-a-personal-story',
    'omg-is-ai-going-to-take-our-jobs-yes-no-maybe',
    'my-ux-ui-journey',
  ],
  'how-relevant-are-user-personas-a-personal-story': [
    'how-to-think-about-accessibility-as-a-ux-designer',
    'how-to-conduct-effective-ux-interviews',
    'how-to-collect-free-ux-survey-responses-in-24-hours',
  ],
  'how-to-collect-free-ux-survey-responses-in-24-hours': [
    'how-to-conduct-effective-ux-interviews',
    'how-relevant-are-user-personas-a-personal-story',
    'the-productivity-hack-that-recruiting-gurus-on-linkedin-wont-give-you',
  ],
  'the-productivity-hack-that-recruiting-gurus-on-linkedin-wont-give-you': [
    'how-to-apply-for-jobs-in-a-tough-market',
    'beginner-friendly-advice-for-an-impactful-ux-portfolio',
    'my-ux-ui-journey',
  ],
  'how-to-apply-for-jobs-in-a-tough-market': [
    'the-productivity-hack-that-recruiting-gurus-on-linkedin-wont-give-you',
    'how-to-create-jr-ux-ui-portfolio-presentations',
    'beginner-friendly-advice-for-an-impactful-ux-portfolio',
  ],
  'omg-is-ai-going-to-take-our-jobs-yes-no-maybe': [
    'ai-chatbots-customer-service-guide',
    'how-to-think-about-accessibility-as-a-ux-designer',
    'how-to-apply-for-jobs-in-a-tough-market',
  ],
  'ai-chatbots-customer-service-guide': [
    'omg-is-ai-going-to-take-our-jobs-yes-no-maybe',
    'beginner-friendly-advice-for-an-impactful-ux-portfolio',
    'how-to-apply-for-jobs-in-a-tough-market',
  ],
  'beginner-friendly-advice-for-an-impactful-ux-portfolio': [
    'how-to-create-jr-ux-ui-portfolio-presentations',
    'how-to-apply-for-jobs-in-a-tough-market',
    'the-productivity-hack-that-recruiting-gurus-on-linkedin-wont-give-you',
  ],
  'how-to-create-jr-ux-ui-portfolio-presentations': [
    'beginner-friendly-advice-for-an-impactful-ux-portfolio',
    'how-to-apply-for-jobs-in-a-tough-market',
    'breaking-the-config-seal---my-first-time-at-the-figma-conference',
  ],
  'breaking-the-config-seal---my-first-time-at-the-figma-conference': [
    'the-productivity-hack-that-recruiting-gurus-on-linkedin-wont-give-you',
    'obsidian-claude-code-figma-design-workflow',
    'my-ux-ui-journey',
  ],
  'obsidian-claude-code-figma-design-workflow': [
    'how-to-conduct-effective-ux-interviews',
    'omg-is-ai-going-to-take-our-jobs-yes-no-maybe',
    'breaking-the-config-seal---my-first-time-at-the-figma-conference',
  ],
};

type Post = CollectionEntry<'posts'>;

/**
 * Returns up to three related posts for the given post. Uses the curated map
 * first, then backfills with same-category siblings and finally the most recent
 * posts, so every post — including future ones not in the map — gets a full set.
 */
export function getRelatedPosts(current: Post, allPosts: Post[], limit = 3): Post[] {
  const byId = new Map(allPosts.map((p) => [p.id, p]));
  const chosen: Post[] = [];
  const seen = new Set<string>([current.id]);

  const add = (post: Post | undefined) => {
    if (post && !seen.has(post.id) && chosen.length < limit) {
      seen.add(post.id);
      chosen.push(post);
    }
  };

  // 1. Curated picks.
  for (const slug of RELATED[current.id] ?? []) add(byId.get(slug));

  // 2. Backfill with same-category, most-recent-first.
  const rest = allPosts
    .filter((p) => !seen.has(p.id))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  for (const p of rest) {
    if (chosen.length >= limit) break;
    if (p.data.category === current.data.category) add(p);
  }

  // 3. Backfill with anything recent.
  for (const p of rest) add(p);

  return chosen;
}
