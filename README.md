# Revosit — marketing site

Marketing site for Revosit, a B2B software house: full-stack solutions, Salesforce
solutions, AI integrations and staff augmentation.

Built as a static-first Next.js App Router site. Every page prerenders to HTML at
build time; the only server route is the contact endpoint.

## Stack

| Concern    | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 16 (App Router, React 19, Turbopack)         |
| Language   | TypeScript (strict)                                  |
| Styling    | Tailwind CSS v4 — tokens in `src/app/globals.css`    |
| Animation  | Motion (`motion/react`), reduced-motion aware        |
| Icons      | lucide-react                                         |
| Type       | Geist, Geist Mono, Instrument Serif via `next/font`  |
| Email      | SMTP via nodemailer (optional)                        |

The logo, favicon, social card and the fallback project covers are all
generated — SVG in the page, and `next/og` for `/icon` and `/opengraph-image`.
The only real image files are case study screenshots under `public/work/`.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional for local dev
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build + typecheck
npm start       # serve the production build
npm run lint    # eslint
```

## Where the content lives

All copy sits in `src/content/` — editing these files is enough to change the site.

| File                        | Controls                                                        |
| --------------------------- | --------------------------------------------------------------- |
| `src/content/site.ts`       | Company name, email, URL, socials, nav, engagement models, process phases, principles, capability lists |
| `src/content/services.ts`   | The four services: summary, outcomes, deliverables, tech        |
| `src/content/projects.ts`   | Case studies, including the `hue` that generates each cover      |

`site.ts` is also the source for metadata, JSON-LD and the sitemap, so changing
the name or URL there updates SEO everywhere.

## Routes

```
/                            Landing: hero, services, projects, process, engagements, why us, CTA
/services                    All four services in depth + engagement models
/projects                    Case study index
/projects/[slug]             Case study detail (statically generated per project)
/about                        Who we are, principles, capabilities
/contact                      Form + direct contact details
/api/contact                  POST endpoint for the form
/sitemap.xml /robots.txt /manifest.webmanifest /icon /opengraph-image
```

## SEO

Implemented:

- Per-page `title`, `description` and canonical URL via the Metadata API, with a
  `%s — Revosit` title template
- Open Graph + Twitter card metadata, backed by a generated 1200×630 image
- JSON-LD: `ProfessionalService` with an `OfferCatalog` of services, `WebSite`,
  `BreadcrumbList` on every subpage, `CollectionPage` on the index and
  `CaseStudy` per project
- `sitemap.xml` built from the content files, so new projects appear automatically
- `robots.txt` allowing everything except `/api/`
- One `<h1>` per page, semantic landmarks, a skip link, and `aria-current` on the
  active nav item
- Static prerendering for every page, which is what keeps LCP low

Still needs doing, because it can't be done from code:

- Point `NEXT_PUBLIC_SITE_URL` at the real domain before deploying
- Verify the domain in Google Search Console and submit `/sitemap.xml`
- Replace the placeholder social URLs in `site.ts`

## Contact form

`POST /api/contact` validates server-side (`src/lib/contact.ts`), drops honeypot
submissions silently, then hands off to `src/lib/mailer.ts`.

- **with** `SMTP_USER` and `SMTP_PASS` set — sends over SMTP to `CONTACT_TO`
  (default `support@revosit.com`), with the submitter as `Reply-To`
- **without** them — logs the enquiry and returns `{ ok: true, delivered: false }`,
  so the form works before the mailbox exists

Mail goes out through **Zoho SMTP**. `SMTP_PASS` is an **app password**, not an
account password — with 2FA enabled Zoho rejects the login password outright.
Generate one at Zoho Mail → My Account → Security → App Passwords.

Only `SMTP_USER` and `SMTP_PASS` are required. `SMTP_HOST` defaults to
`smtp.zoho.com`, `SMTP_PORT` to `465` (implicit TLS; use `587` only if you need
STARTTLS), and `CONTACT_FROM` to `Revosit <SMTP_USER>`.

`SMTP_HOST` is **region-specific** on Zoho — `smtp.zoho.eu`, `smtp.zoho.in` and
`smtp.zoho.com.au` for the EU, India and Australia datacentres. Pointing at the
wrong one fails as an authentication error, which sends you chasing the password
rather than the host.

Secrets reach the container through `env_file`, not `environment:` with `${...}`
interpolation — app passwords routinely contain `$`, which Compose would eat.
They are runtime-only, so editing `.env` and running `docker compose up -d`
applies them with no rebuild.

The client validates with the same module before submitting, so error messages
match on both sides.

## Design system

Tokens live in the `@theme` block of `src/app/globals.css` — colours in oklch, one
accent, hairline borders, three font families and the shared easing curve. Change
a token there and it propagates through the Tailwind utilities.

Animation is centralised in `src/lib/motion.ts` and applied through
`<Reveal>` / `<RevealGroup>` / `<RevealItem>`. A global
`prefers-reduced-motion` rule in `globals.css` disables transitions and animations
for users who ask for that.

## Before you launch

1. **Replace the case studies.** `src/content/projects.ts` is sample content —
   anonymised sector profiles, not real engagements. Get written client sign-off
   before naming a client or publishing a metric.
2. **Confirm `foundingYear`** in `site.ts` — it feeds the Organization schema.
3. **Fill in the social URLs** in `site.ts` or delete the ones you don't use.
4. **Set `NEXT_PUBLIC_SITE_URL`** to the production domain.
5. Decide whether you want a privacy policy page linked from the contact form
   note, if you operate under GDPR.

## Deploying

Vercel is the straightforward option: import the repo, set the environment
variables from `.env.example`, deploy. Any Node host works too —
`npm run build && npm start`.
