// Case Catalog — homepage section data.
//
// This is a 1:1 port of the production (emilybackes.design) Case Catalog and is
// intentionally decoupled from the case-study content collection: it holds the
// prod-verbatim card copy plus presentation-only fields (titleHighlights, cta)
// so the case-study MDX frontmatter and detail pages stay untouched.
//
// `slug` maps to the existing /case-study/<slug> route. `gif` is the card cover
// image path. `titleHighlights` are the phrases rendered in the pink accent
// color inside the title.

export interface CaseCatalogEntry {
  number: string;
  slug: string;
  gif: string;
  tags: string[];
  title: string;
  titleHighlights: string[];
  cta: string;
  body: string;
}

export const caseCatalog: CaseCatalogEntry[] = [
  {
    number: '.01',
    slug: 'sage-designing-an-ai-powered-chatbot',
    gif: '/assets/images/cs-sage.webp',
    tags: ['ux-ui', 'UX Research', 'product design', 'AI / LLM'],
    title: 'Designing an AI Powered Chatbot for a Better CX Experience',
    titleHighlights: ['AI Powered'],
    cta: 'explore case study',
    body: 'Sage is an AI (LLM) powered chatbot that I designed that was so good, we ended up getting rid of ZenDesk. The goal was to improve our customer experience in app and letting the AI handle the most common questions, accuractely.',
  },
  {
    number: '.02',
    slug: 'folsom-psychology',
    gif: '/assets/images/cs-folsom.webp',
    tags: ['ux-ui', 'UX Research', 'product design'],
    title: 'How I Helped Reduce Patient Scheduling Times In Half',
    titleHighlights: ['Helped', 'Half'],
    cta: 'explore case study',
    body: 'Folsom Psychology came with a complex workflow. While they had several existing tools, information was scattered across 6 separate spreadsheets, leading to manual updates and potential inconsistencies',
  },
  {
    number: '.03',
    slug: 'subscription-cancellation',
    gif: '/assets/images/cs-sub-cancel.webp',
    tags: ['ux-ui', 'UX Research', 'product design', 'saas subscriptions'],
    title: "Breaking up with a SaaS doesn't have to be hard, or illegal",
    titleHighlights: [],
    cta: 'explore case study',
    body: 'There are laws and policies on how difficult companies can make cancelling subscriptions can be. But when designed, your users might actually come back. This case study is how I make the company about $100k a year in returning customers.',
  },
  {
    number: '.04',
    slug: 'lago',
    gif: '/assets/images/cs-lago.webp',
    tags: ['Leadership', 'agile', 'product strategy'],
    title: 'Herding Cats Around The World in 6 Weeks',
    titleHighlights: ['Cats'],
    cta: 'herd cats with me',
    body: 'I worked with Tech Fleet, a passionate community of UX/UI designers, researchers, and developers who volunteer their expertise on pro-bono projects, primarily for non-profits.',
  },
  {
    number: '.05',
    slug: 'sprocket-app',
    gif: '/assets/images/cs-sprocket.webp',
    tags: ['UX-UI', 'mobile', 'design', 'research'],
    title: 'How I doubled expected registration and app sign up in 3 months',
    titleHighlights: ['doubled'],
    cta: 'find some bikes',
    body: 'Delivered a platform empowering people with a fighting chance of recovering their stolen bicycles through a mobile device right at their fingertips. Sprocket provides a social platform to mitigate bike theft before it happens.',
  },
];
