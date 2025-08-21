# Audiologic Rehab of America — Website Plan

> Source of truth for information architecture, requirements, scope, and implementation notes. Keep this file updated as we build.

## 1. Goals
- Provide a professional web presence for Audiologic Rehab of America.
- Offer membership-based experiences (groups, forum, file share, bookings, subscriptions).
- Enable easy booking of services and paid plans/subscriptions.
- Publish articles and updates via a blog.
- Centralize member self-service (profile, bookings, subscriptions, notifications).
- Be maintainable, secure, and SEO-friendly.

## 2. Audience
- Prospects seeking hearing health services and education.
- Existing members/patients who need to book, access files/resources, and interact with groups.
- Staff/admins managing services, content, and members.

## 3. Information Architecture (Sitemap)
The following mirrors the current Wix structure and adds recommended marketing pages. The exact URLs can be refined, but this is the baseline for routing and navigation.

Public (Marketing)
- `/` — Home
- `/about` — About (recommended)
- `/services` — Services overview (recommended)
  - `/services/[serviceSlug]` — Service detail (recommended)
- `/blog` — Blog index
  - `/blog/[slug]` — Blog post
- `/forum` — Forum index (read-only for guests)
  - `/forum/[threadId]` — Thread detail
- `/groups` — Public groups directory (read-only preview)
  - `/groups/[groupSlug]` — Group landing/preview
- `/pricing` — Plans & Pricing
- `/contact` — Contact (recommended)
- `/legal/privacy` — Privacy Policy (recommended)
- `/legal/terms` — Terms of Service (recommended)

Auth
- `/auth/signup` — Member Signup
- `/auth/login` — Member Login
- `/auth/callback/*` — Provider callbacks (internal)

Bookings (MVP via Cal.com embed; Phase 2: native)
- `/book` — Book Online (services + entry point)
- `/book/service/[serviceId]` — Service page (booking CTA)
- `/book/calendar` — Calendar step (native Phase 2) or embedded Cal.com
- `/book/form` — Intake form (Phase 2 if native)
- `/cart` — Cart (if bundling services; optional)
- `/checkout` — Checkout (Stripe)
- `/thank-you` — Thank You / Confirmation

Members Area (authenticated)
- `/account` — Dashboard
- `/account/notifications`
- `/account/settings`
- `/account/profile`
- `/account/groups`
- `/account/bookings`
- `/account/subscriptions`
- `/account/files` — File Share (member library)
- `/account/followers` — Followers / Following (optional page, can also be a modal)

Admin (role-based; protected)
- `/admin` — Overview
- `/admin/content` — Blog, pages, assets
- `/admin/members` — Users, groups, roles
- `/admin/services` — Services, availability
- `/admin/files` — File assets
- `/admin/orders` — Orders / subscriptions

Redirects/Utilities
- `/pricing/checkout` → `/checkout?plan=...`
- `/blog/rss.xml` — Feed (Phase 2)

## 4. Navigation & IA
- Top nav: Home, Services, Blog, Forum, Groups, Pricing, Book Online, Contact, Login/Account.
- Footer: About, Privacy, Terms, Contact, Blog, Forum, Groups, Pricing.
- Members sidebar (within `/account/*`): Dashboard, Bookings, Files, Groups, Subscriptions, Notifications, Settings.

## 5. Access Control Matrix
- Public: Home, About, Services, Blog index/post, Pricing, Contact, Forum index/thread (read-only), Groups directory (read-only preview).
- Authenticated members: Account area, File Share, participate in Groups/Forum, Bookings history.
- Subscribers (active plan): Access gated files, premium groups, premium forum categories.
- Admin: Content management, services, availability, assets, orders.

## 6. Features by Section

Bookings
- MVP: Cal.com (or Calendly) embedded scheduling, webhooks to update user bookings.
- Phase 2: Native service/availability, intake form, reschedules/cancellations, email notifications.

Pricing & Subscriptions
- Stripe products/prices, customer portal, webhooks to sync subscription state.
- Paywall rules to gate premium content/files/groups.

Blog
- Content authored as MDX (local) or via headless CMS (optional). MVP: MDX + Contentlayer.
- SEO metadata, OG images, RSS in Phase 2.

Forum & Groups
- MVP: Lightweight discussion (threads, posts, mentions, basic moderation), groups with membership.
- Phase 2: Categories, rich editor, search, reporting, admin tools, notifications.

File Share
- Member-accessible library with role/plan-based permissions.
- Secure S3/Supabase storage with signed URLs and audit logs.

Members Area
- Dashboard snapshot (upcoming booking, recent files, forum mentions).
- Profile/settings, notifications preferences, subscription management (Stripe portal).

## 7. Tech Stack & Integrations
- Framework: Next.js 15 (App Router, RSC), React 19.
- Styling: Tailwind CSS v4; Radix UI + shadcn/ui for components.
- Forms & Validation: React Hook Form + Zod.
- Auth: NextAuth.js v5 (Auth.js) with Email/Password + OAuth (optional).
- DB: PostgreSQL (Neon/Supabase) with Prisma ORM.
- Payments: Stripe (Checkout + Billing Portal + Webhooks).
- File Storage: AWS S3 or Supabase Storage (signed URLs).
- Scheduling: Cal.com (MVP) via embed + webhooks; Phase 2 native.
- Email: Resend/Sendgrid for transactional emails.
- Analytics: Vercel Analytics + Plausible (optional).
- SEO: next-seo or custom helpers; sitemap.xml/robots.txt.

## 8. Data Model (high level)
- `User` — id, email, name, role, createdAt, updatedAt
- `Profile` — userId(FK), avatarUrl, bio, socials
- `Notification` — userId(FK), type, payload, readAt
- `Group` — id, slug, name, description, visibility, ownerId
- `GroupMembership` — groupId, userId, role, status
- `ForumCategory` — id, slug, name, visibility
- `ForumThread` — id, categoryId, authorId, title, content, status
- `ForumPost` — id, threadId, authorId, content, parentPostId
- `Service` — id, slug, name, description, duration, price, active
- `Booking` — id, userId, serviceId, start, end, status, externalId
- `Plan` — id, stripeProductId, stripePriceId, name, description, accessRules
- `Subscription` — id, userId, planId, status, currentPeriodEnd, stripeCustomerId, stripeSubId
- `Order` — id, userId, subtotal, total, status, stripePaymentIntentId
- `FileAsset` — id, title, path, size, visibility, accessRule, uploadedBy
- `BlogPost` — id/slug, title, excerpt, body/MDX, tags, authorId, publishedAt
- `Tag` — id, slug, name
- `AuditLog` — actorId, action, entity, entityId, meta, createdAt

Note: Initial schema will be defined in Prisma with migrations and evolve as needed.

## 9. Pages → Route Handlers mapping
- Marketing pages: Static RSC pages with metadata.
- Blog: MDX files + dynamic `[slug]` route; ISR.
- Forum/Groups: Server Actions for mutations; RSC for listings; client for editors.
- Account area: Nested layouts under `/account`.
- API: `/api/*` for webhooks (Stripe, Cal.com) and auth callbacks.

## 10. Security & Compliance
- Auth-required server actions gated by session + role checks.
- Signed URLs for file downloads.
- Stripe webhook signing + idempotency keys.
- Rate limiting on post/create endpoints.
- CSP headers, secure cookies, HTTPS-only, no PII in logs.

## 11. Performance & SEO
- Image optimization via `next/image`.
- Route-level metadata, Open Graph images.
- Incremental static regeneration where applicable.
- Structured data (JSON-LD) for services/posts (Phase 2).

## 12. Testing & Quality Gates
- TypeScript strict mode.
- ESLint + Prettier.
- Vitest/Playwright (Phase 2) for key flows.
- CI: Lint + type check on push; preview deploys.

## 13. Deployment
- Vercel (preview + prod). Secrets managed via Vercel env.

## 14. Phased Roadmap

MVP (Phase 1)
- Marketing pages (Home, About, Services, Pricing, Contact).
- Blog via MDX + Contentlayer.
- Auth (NextAuth) + Account shell with Dashboard.
- Pricing + Stripe Checkout + Billing Portal; basic paywall.
- Book Online page with Cal.com embed; webhook sync for `Booking`.
- File Share (basic) — upload via admin only; member read with signed URLs.
- Forum & Groups (lightweight): create/read/update/delete threads/posts for members.

Phase 2
- Native bookings (availability, intake, reschedule/cancel, email notices).
- Admin suite UI (content, services, files, orders).
- Advanced forum (categories, search, moderation tools).
- RSS feed, JSON-LD, advanced SEO.
- Notifications center (digest emails, in-app toasts, settings).
- Public API for integrations.

## 15. Open Questions
- Exact services list and booking rules?
- Which assets/files are public vs member-only vs subscriber-only?
- Brand palette and typography preferences (to be defined next).
- Do we migrate any historical forum/group content?

## 16. Next Steps
1. Confirm sitemap above.
2. Lock integrations: Stripe, Cal.com, DB provider.
3. Initialize Prisma, NextAuth, Stripe config scaffolding.
4. Stub page routes and layouts; add navigation.
5. Implement Blog (MDX) and Pricing pages.
6. Implement Account shell and File Share MVP.
7. Forum/Groups MVP. 

## 17. Brand Assets & Usage
Assets available in `public/assets/`:
- `fulllogo_transparent.png` — primary lockup (stacked logotype + mark)
- `grayscale_transparent.png` — monochrome variant for low-contrast surfaces
- `grayscale_transparent_nobuffer.png` — monochrome without padding
- `icononly_nobuffer.png` — circular people-mark only

Usage notes
- Prefer the full lockup on the Home hero and About page.
- Use the icon-only mark in nav, favicon, and small contexts (cards, footers).
- Maintain clear space equal to the mark’s inner-circle radius.
- Do not skew, outline, or recolor outside the specified palette.
- For dark-on-light compositions, use the full-color original; for low-contrast backgrounds, use grayscale variant.

Favicon & PWA
- Favicon: derive from `icononly_nobuffer.png` at 32×32 and 64×64.
- App icons and manifest (Phase 2): generate from the icon mark at sizes 192, 512.

## 18. Design Directions (light theme options)
Below are three complete visual directions. We can mix-and-match elements, but choose one as the “base.”

### Direction A — Care Circle (Gradient Teal)
- Intent: Modern clinical, friendly, with gradients echoing the circular logo.
- Palette
  - Primary: `#1187A9` (teal), `#34D0C2` (aqua)
  - Neutrals: `#0F172A` (slate-900 text), `#334155` (slate-700), `#E2E8F0` (slate-200), `#F8FAFC` (slate-50)
  - Accent: `#3B82F6` (blue-500) for links/active states
  - Gradients: `linear(#1187A9 → #34D0C2)` for CTAs/hero ribbons
- Typography
  - Headings: Geist (weight 600–700), tracking-tight
  - Body: Geist (400–500), 1.6–1.75 line-height
- Components
  - Buttons: pill-shaped, subtle inner-shadow, gradient fill; hover lift + glow
  - Cards: soft border `#E2E8F0`, 12–16px radius, subtle shadow on hover
  - Sections: generous whitespace, curved dividers using SVG waves referencing the logo’s curvature
- Imagery
  - Use the circular mark in faint, oversized background watermark on hero and section headers
- Motion
  - Soft gradient shimmer on primary CTAs; scroll-reveal (fade-up 12–16px); parallax logo watermark at 8–12px offset

### Direction B — Quiet Precision (Teal + Slate)
- Intent: Minimalist, high-legibility, clinical precision.
- Palette
  - Primary: `#0E7490` (cyan-700)
  - Neutrals: `#111827` (zinc-900), `#6B7280` (zinc-500), `#F3F4F6` (zinc-100), `#FFFFFF`
  - Accent: `#06B6D4` (cyan-500) for active states
- Typography
  - Headings: Inter or Geist with slightly larger x-height; uppercase section labels
  - Body: Inter/Geist regular, generous spacing for clinical clarity
- Components
  - Buttons: rectangular with 8px radius; outlined default, solid primary
  - Cards: flat with 1px hairline borders; hover border-accent + subtle translateY
- Motion
  - Minimal micro-interactions; underline slide on links; content fade without parallax

### Direction C — Warm Clarity (Aqua + Soft Sand)
- Intent: Friendly and approachable; maintains clinical trust with warmth.
- Palette
  - Primary: `#12A09A` (teal-aqua)
  - Secondary: `#F2EDE9` (warm sand background section)
  - Neutrals: `#0B1220`, `#475569`, `#CBD5E1`, `#FFFFFF`
  - Accent: `#0EA5E9` (sky-500) for highlights
- Typography
  - Headings: Outfit or Geist (600), rounded geometric feel
  - Body: Source Sans 3 or Geist (400–500)
- Components
  - Buttons: rounded; subtle outer glow on focus to signal accessibility
  - Cards: soft shadows, small color chips/badges for categories
- Motion
  - Gentle entrance reveals; emphasized focus rings; section cross-fades between sand/white backgrounds

Decision guidance
- A best matches the current multi-teal logo gradients and feels most ownable.
- B is the most conservative and content-first.
- C introduces warmth while staying professional.

## 19. Layout, Grid, and Spacing
- Grid: 12-column responsive; max content width 1200–1280px; side gutters 24–32px.
- Spacing scale (Tailwind): `4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80`.
- Radii: `sm=8px`, `md=12px`, `lg=16px`, `xl=24px`.
- Shadows: low-elevation cards on hover only; dialogs use medium shadow with 10–12px blur.

## 20. Interaction & Motion System
- Library: Framer Motion (small, targeted usage) + CSS transitions.
- Patterns
  - Page load: fade-in base layout (100–150ms delay) then section reveals on scroll
  - Buttons: scale 1.02 on hover, 0.98 on press, shadow intensifies subtly
  - Nav: underline slide-in from left on hover; active route pill
  - Cards: translateY(4–6px) and shadow step on hover
  - Reduced motion: respect `prefers-reduced-motion` and disable transforms

## 21. Component Library (initial set)
- App Shell: top nav (logo at left, primary CTAs at right), footer with utility links
- Buttons: primary, secondary, subtle, destructive; sizes sm/md/lg
- Inputs: text, select, textarea, checkbox/toggle; validation messaging
- Cards: default, media, pricing, service
- Banners: info/success/warn/error
- Tabs, Accordion, Breadcrumbs
- Dialog/Sheet: for booking confirmation, file preview
- Data: Table (bookings), Empty states, Pagination
- Content: Prose styling for MDX, Callouts, Quote

## 22. Page-by-Page Content Structure

Home `/`
- Hero: logo mark watermark, headline “Hearing Health for You”, subtext about Communication • Support • Technology, CTAs [Book Online] [View Plans]
- Trust: partner logos or credential badges (placeholder)
- Services: 3–6 cards with quick actions (Book)
- Membership benefits: 3-column list (groups, file share, forum)
- Testimonials (Phase 2)
- Latest from the Blog: 3 posts
- CTA band: gradient ribbon with booking CTA

About `/about`
- Mission + story; team section (Phase 2 for team bios)
- Image/illustration using logo motif

Services `/services`
- Service grid; each card shows duration, price, and CTA
- Detail `/services/[serviceSlug]`: hero, what-to-expect, outcomes, FAQs, related services

Pricing `/pricing`
- Plans table (Free/Member/Premium) with feature matrix (files, forum, groups, discounts)
- FAQ; secure payment badges; CTA → `/checkout`

Book Online `/book`
- Embed Cal.com for primary services
- For each Service page, provide deep-link to Cal.com event type
- Confirmation routes to `/thank-you`

Blog `/blog`, `/blog/[slug]`
- Categories/tags; search (Phase 2)
- Reading progress bar; author card; related posts

Forum `/forum`, `/forum/[threadId]`
- Categories (e.g., General, Tips, Tech)
- Thread list with filters; thread detail with replies and composer

Groups `/groups`, `/groups/[groupSlug]`
- Public directory with preview; join gated groups via plan

Contact `/contact`
- Form (name, email, message, topic), map (optional), success state

Members `/account/*`
- Dashboard: next booking, recent files, latest forum mentions, plan status
- Files: filterable list; download via signed URLs
- Bookings: upcoming/past with action buttons
- Subscriptions: manage via Stripe portal
- Notifications: preferences + inbox
- Settings/Profile: avatar, bio, accessibility preferences

Admin `/admin/*` (Phase 2 UI)
- Content, members, services, files, orders

## 23. Accessibility & Inclusive Design
- Color contrast ≥ 4.5:1 for text; test CTAs on gradients.
- Focus visible on all interactive elements; target size ≥ 44×44.
- Forms with labels/help text; validation announced to screen readers.
- Motion reduced when `prefers-reduced-motion`.

## 24. SEO & Content Guidelines
- Title structures per page: `Page • Audiologic Rehab of America`.
- Meta descriptions tailored to services and hearing health.
- JSON-LD (Phase 2): Organization, Service, and BlogPosting.
- Keywords (starter): hearing health, audiologic rehab, communication strategies, hearing technology, support groups.
- Slugs: lowercase, hyphenated; avoid dates for evergreen content.

## 25. Asset Art Direction
- Prefer real patient-care imagery where possible; otherwise use abstract circular motifs echoing the logo.
- Background marks: place `icononly_nobuffer.png` at 8–12% opacity behind section headers.
- Avoid heavy stock photography; prioritize illustrations and real clinic photos (Phase 2 content shoot).

## 26. Chosen Direction — Direction B (Quiet Precision)
We will implement the minimalist, content-first, high-legibility light theme.

Design tokens (locked)
- Colors
  - Primary: `#0E7490` (cyan-700)
  - Accent: `#06B6D4` (cyan-500)
  - Foreground: `#111827` (zinc-900)
  - Background: `#FFFFFF`
  - Muted bg: `#F3F4F6` (zinc-100)
  - Border: `#E5E7EB` (zinc-200)
  - Card: `#FFFFFF`; Card fg: `#111827`
- Radii: sm 8px, md 12px, lg 16px, xl 24px
- Shadows: low-elevation only on interactive hovers; dialogs medium (10–12px blur)
- Typography: Geist for headings and body (600/700 for headings, 400/500 for body)
- Motion: minimal micro-interactions (underline slide, subtle translateY on cards)

Tailwind v4 token mapping (to be reflected in `src/app/globals.css`)
```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-accent: var(--accent);
  --color-muted: var(--muted);
  --color-border: var(--border);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

Navigation and components will use these tokens via Tailwind utility classes (e.g., `bg-primary`, `text-foreground`, `border-border`).

## 27. Implementation Checklist (Direction B)
- [ ] Define tokens in `globals.css` (primary, accent, muted, border, card) — Direction B
- [ ] Build App Shell: top nav (logo left, links), footer (utility links)
- [ ] Route stubs for sitemap with metadata
- [ ] Home + Pricing + Services scaffolds (Direction B components)
- [ ] Cal.com embed on `/book` + deep-links from service pages
- [ ] Stripe Checkout links and Billing Portal route
- [ ] MDX blog pipeline (Contentlayer) + 2 sample posts
- [ ] Account shell and Files (read-only) MVP
- [ ] Forum/Groups MVP (threads, posts, groups directory)
- [ ] Accessibility pass (focus states, contrast) per Direction B 

## 28. Home Page — Structure & Content (Direction B)
This section defines the exact structure, copy placeholders, and interactions for the Home page.

Hero (above the fold)
- Overline: “Communication • Support • Technology” (uppercase label, accent color)
- H1: “Hearing Health for You” (primary) — alternate variant: “Hearing Health, Tailored For You”
- Subtext: one short sentence on the organization’s mission
- CTAs: Primary “Book Online” → `/book`; Secondary “View Plans” → `/pricing`
- Visual: subtle oversized watermark of the circular mark (8–12% opacity) positioned to the right; no heavy imagery
- Accessibility: heading hierarchy h1 → supportive paragraph; CTAs keyboard-focusable with visible rings

Trust band (optional placeholder for now)
- Row of credential logos or text badges (can ship empty for MVP)

Services preview
- 3–6 service cards (title, short description, duration/price), each with a subtle “Book” action
- Link to `/services`

Membership benefits
- Three columns (Groups, File Share, Forum) with concise copy and icons (optional)
- CTA to `/pricing`

Latest from the Blog
- 3 recent posts (title, excerpt, date); link to `/blog`

CTA band
- Full-width band with concise call to action and a single primary button to `/book`

Footer
- Full logo `fulllogo_transparent.png` centered above utility links
- Utility links: About, Privacy, Terms, Contact, Blog, Forum, Groups, Pricing
- Copyright line

Interactions & Motion (Direction B)
- Link underline slide on hover
- Card translateY(4px) + border-accent on hover
- Reduced motion respected 

## 29. Services — Structure, Model, and Content

Page `/services`
- Hero: concise intro + CTA to Book
- Filters (Phase 2): category, duration, in-person/virtual
- Service cards (grid): title, short description (≤ 140 chars), duration, price, CTA [Book]
- SEO block: brief paragraph about hearing health services

Detail `/services/[serviceSlug]`
- Title, summary paragraph
- Key outcomes (3–6 bullets)
- What to expect (step list)
- Who it’s for / eligibility
- Duration, price, location (in-person/virtual)
- CTA [Book this service]
- FAQs (3–5)
- Related services

Proposed service catalog (draft — please confirm/edit)
- Comprehensive Hearing Assessment — 60–90 min, baseline evaluation
- Auditory Rehabilitation Therapy — 45–60 min, communication strategies training
- Tinnitus Counseling & Management — 45 min, evidence-based techniques
- Hearing Aid Fitting & Verification — 60–90 min, real-ear measurements
- Assistive Listening Technology Consult — 30–45 min, devices and setups
- Follow-up Optimization — 30 min, adjustment and review

Data model (UI-facing)
- `Service`: id, slug, title, summary, description, outcomes[], steps[], durationMinutes, priceCents, currency, mode["in-person"|"virtual"|"hybrid"], active, sort

Content needed from you
- Final service list (titles) and ordering
- Summary (1–2 sentences) per service
- Full description (3–6 sentences) per service
- Outcomes (3–6 bullets) per service
- Steps/what-to-expect (3–6 steps) per service
- Duration and price per service
- Mode (in-person/virtual) and any location notes
- 3–5 FAQs (Q/A) per service (optional)
- Any service-specific images (optional)

## 30. Pricing — Plans, Features, and Checkout

Page `/pricing`
- Plans table (3 columns): Free, Member, Premium (draft)
- Feature matrix; highlight differences
- Notes on billing and cancellation
- CTA: Subscribe (Stripe Checkout)

Draft plan structure (to confirm)
- Free: forum read-only, limited groups preview, newsletter
- Member: forum post/reply, join standard groups, file share access, booking discounts
- Premium: all Member features + premium groups, premium file library, priority support

Data model (UI-facing)
- `Plan`: slug, name, priceCents/month, features[], stripePriceId, badge (optional)
- `Feature`: label, tiers: { free: boolean, member: boolean, premium: boolean }

Stripe flow
- Buttons link to `/checkout?plan=member|premium` → Stripe Checkout session
- Billing Portal at `/account/subscriptions` for management

Content needed from you
- Final plan names and monthly prices (or annual)
- Feature list and which tier includes each
- Any promotional copy, guarantees, or disclaimers
- Legal copy for refunds/cancellations if applicable

## 31. Book Online — Scheduling and Intake

Page `/book`
- Intro paragraph and safety/eligibility notice
- Embedded Cal.com (MVP) with event types mapped to services
- Help text for rescheduling/cancellation
- Post-booking route: `/thank-you`

Service → Event mapping (draft)
- Hearing Assessment → cal.com/event/hearing-assessment
- Auditory Rehab Therapy → cal.com/event/auditory-rehab
- Tinnitus Counseling → cal.com/event/tinnitus
- Hearing Aid Fitting → cal.com/event/hearing-aid-fitting

Intake (Phase 2 native or Cal.com custom fields)
- Name, email, phone
- Preferred contact method
- Hearing goals (free text)
- Relevant medical history/notes
- Consent to policies

Webhooks
- Cal.com webhooks to persist `Booking` records with externalId

Content needed from you
- Cal.com (or Calendly) account/org link and event type URLs
- Any copy for pre-booking guidance (e.g., “bring prior audiograms”)
- Reschedule/cancel policy and contact info
- Intake form fields we should require or make optional 