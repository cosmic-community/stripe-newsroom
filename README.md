# Stripe Newsroom

![App Preview](https://imgix.cosmicjs.com/c8657760-ad5e-11f1-88c6-910437611bfe-dashboard-logo-16-9.png?w=1200&h=630&fit=crop&auto=format,compress)

A press/newsroom website for Stripe built with Next.js and Cosmic, styled to closely match stripe.com's visual design language — angled gradient hero, blurple accents, rounded pill buttons, and layered card shadows.

## Features

- 🎨 Stripe-style skewed gradient hero (purple/red/cyan/gold mesh over navy)
- 🏠 Homepage with the most recent article featured plus a recent stories grid
- 📰 `/newsroom` — paginated index of all articles with a year filter
- 📄 `/newsroom/[slug]` — article detail with markdown rendering and related stories
- 🧭 Sticky nav that's transparent over the hero and solid on scroll
- 🔍 Per-page SEO metadata + Open Graph images from Cosmic content
- 🗺️ Auto-generated `sitemap.xml` and `robots.txt`
- ⚡ ISR-based data fetching for fast, fresh pages

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6aa320f1ce97abc122208cf7&clone_repository=6aa3243ece97abc122208db4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a Next.js application for a company website called "Stripe Newsroom". The content is managed in Cosmic CMS with the following object types: newsroom. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A newsroom / press site for Stripe, styled to closely match stripe.com's visual design language.
>
> CONTENT: The Cosmic bucket has one object type, "newsroom" (Newsrooms), with 98 published articles. Metafields: seo_title (text), seo_description (textarea), featured_image (file/image), published_at (date), content (rich-text markdown). Each object also has a top-level thumbnail image and slug.
>
> PAGES:
> 1. Home (/) — Stripe-style hero with the signature angled/skewed gradient banner (the diagonal color-mesh sweeping from top-left, blending #A960EE → #FF333D → #90E0FF → #FFCB57 / the classic Stripe blurple #635BFF into cyan/teal). Big tight-tracking headline like "Stripe Newsroom", short subhead, then a large featured story card (most recent article by published_at) and a grid of recent stories with images, date, and title.
> 2. /newsroom — full index of all 98 articles, paginated (12–15 per page) or load-more, sorted by published_at descending, with a year filter. Card grid with featured_image (fallback to thumbnail), formatted date, title, and SEO description excerpt.
> 3. /newsroom/[slug] — article detail page. Full-bleed or contained featured image, date, large headline, and the rich-text/markdown content rendered with clean typography (react-markdown + @tailwindcss/typography). Include a "Related / More news" section with 3 recent articles at the bottom, and a back link.
>
> DESIGN SYSTEM (match stripe.com closely):
> - Typography: system sans stack styled like Stripe's "sohne-var" — use Inter (or similar) with tight letter-spacing (-0.02em to -0.04em) on headings, weight 600–700, generous line-height on body. Body text color #425466, headings #0A2540.
> - Colors: deep navy #0A2540 for dark sections and headings, Stripe blurple #635BFF for links/buttons/accents, #425466 body text, #F6F9FC light section backgrounds, white cards.
> - The signature Stripe angled sections: sections whose top and bottom edges are skewed ~ -12deg (use transform: skewY(-12deg) on a background layer with the content un-skewed inside), with the gradient mesh behind the hero.
> - Buttons: fully rounded pill buttons, blurple background, white text, subtle hover lift and shadow. Secondary buttons are white with blurple text.
> - Cards: white, rounded-lg, soft layered shadows (0 2px 5px -1px rgba(50,50,93,.25), 0 1px 3px -1px rgba(0,0,0,.3)), lift slightly on hover with a smooth transition.
> - Nav: sticky, translucent/transparent over the hero gradient turning to solid white on scroll, with a wordmark on the left and links (Newsroom, About, Contact) on the right plus a blurple pill CTA.
> - Footer: dark navy #0A2540 with muted link columns, small print, and generous padding.
> - Overall feel: lots of whitespace, crisp gradients, smooth micro-animations, fully responsive mobile-first.
>
> TECH: Next.js App Router + TypeScript + Tailwind CSS, Cosmic SDK for data fetching with ISR, next/image for images (use imgix params like ?w=1200&auto=format,compress on cosmicjs imgix_urls), proper SEO metadata per page from seo_title/seo_description, Open Graph images from featured_image, sitemap and robots.txt.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS + `@tailwindcss/typography`
- [Cosmic](https://www.cosmicjs.com) headless CMS via `@cosmicjs/sdk`
- `react-markdown` + `remark-gfm` for rich content rendering

## Getting Started

### Prerequisites
- [Bun](https://bun.sh) installed
- A Cosmic account with this bucket connected

### Installation

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Cosmic SDK Examples

```typescript
// Fetch all newsroom articles, sorted by published date
import { getCosmic } from '@/lib/cosmic-preview'

const { cosmic, previewToken } = await getCosmic()
const query = cosmic.objects
  .find({ type: 'newsroom' })
  .props(['id', 'slug', 'title', 'metadata', 'thumbnail'])
  .depth(1)
const { objects } = previewToken ? await query.status('any') : await query
```

```typescript
// Fetch a single article by slug
const query = cosmic.objects
  .findOne({ type: 'newsroom', slug: 'stripe-launches-new-feature' })
  .depth(1)
const { object } = previewToken ? await query.status('any') : await query
```

## Cosmic CMS Integration

This app reads exclusively from the `newsroom` object type:

| Field | Type | Usage |
|---|---|---|
| `seo_title` | text | Page `<title>` and Open Graph title |
| `seo_description` | textarea | Meta description, card excerpts |
| `featured_image` | file | Hero/card images (falls back to `thumbnail`) |
| `published_at` | date | Sort order, formatted dates, year filter |
| `content` | markdown | Article body, rendered via `react-markdown` |

All reads go through the app's preview-aware Cosmic client so drafts render correctly in the dashboard's live preview, while public visitors only ever see published content.

## Deployment Options

### Vercel
1. Push this repo to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables below in the Vercel dashboard
4. Deploy

### Netlify
1. Push this repo to GitHub
2. Import the project into [Netlify](https://netlify.com)
3. Set the build command to `bun run build` and publish directory to `.next`
4. Add the environment variables below in the Netlify dashboard

### Environment Variables
Set these in your hosting platform (automatically provided by Cosmic when connected):
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
<!-- README_END -->