# The Yaadie Xplorer

Vacation and excursion booking site for **The Yaadie Xplorer Tours and Transfers** (Montego Bay, Jamaica).

This is a migration of the original B12-generated Astro site to a plain **Vite + React 19 + TypeScript +
Tailwind v4 + Supabase** stack, so the project can be hosted anywhere (Bolt.new, Lovable, Replit, Vercel,
Netlify, or your own server) instead of being tied to the B12 platform.

## Stack

- **Vite + React 19 + TypeScript** — no framework lock-in, plain SPA with `react-router-dom`
- **Tailwind CSS v4** + **shadcn/ui** (already installed under `src/components/ui`)
- **Supabase** — auth, database (tours/customers/bookings/payments/admins), and form submissions

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your Supabase project URL + anon key
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Setting up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run the migrations in `supabase/migrations/` **in order**:
   - `2026072000000_create_booking_schema.sql` — core tables: `tours`, `customers`, `bookings`, `payments`, `admins`
   - `2026072000001_create_site_forms.sql` — `contact_messages`, `custom_tour_requests`, `newsletter_subscribers`, `reviews`
   - `2026072000002_seed_tours.sql` — seeds the 43-tour catalog (auto-generated, see below)
3. In **Authentication → Providers**, enable Email, and optionally Google/Apple OAuth (the sign-in/sign-up
   forms already call `supabase.auth.signInWithOAuth` for both — just add your client IDs in Supabase).
4. Copy your project's **Settings → API → Project URL** and **anon public key** into `.env`:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
5. The `admins` table is seeded with `theyaadiexplorer@gmail.com` as the initial admin — that email needs to
   sign up through `/signup` once so a matching `auth.users` row exists, after which `/admin/dashboard` will
   recognize it.

### Keeping the tour catalog in sync

`src/data/tours.ts` is the single source of truth for the 43 tours (used by the `/tours` page, the homepage
preview, and the review form's tour dropdown). If you edit it, regenerate the seed SQL:

```bash
node scripts/generate-seed-sql.mjs
```

This rewrites `supabase/migrations/2026072000002_seed_tours.sql` — re-run it in the Supabase SQL editor (it's
`on conflict do nothing`, so it's safe to run more than once).

## What's still a placeholder / TODO

This migration focused on structure, business logic, and content — a few things are intentionally left as
clearly-marked placeholders for you to swap in:

- **Logo & favicon** — currently a plain "YX" wordmark (`src/components/Header.tsx`, `public/favicon.svg`).
- **Photography** — every image uses a labeled placeholder from `placehold.co` (`src/lib/placeholder-image.ts`)
  instead of hotlinking the old B12 CDN URLs, which are tied to that platform account. Swap in real photos of
  the catamaran, Dunn's River Falls, the yacht, beaches, etc.
- **Payments** — the checkout flow has working card/bank-transfer UI and calculates the 30/70 deposit split,
  but isn't wired to a live payment processor yet. The `payments` table already has `stripe_payment_intent_id`
  / `stripe_charge_id` columns ready — Stripe is the natural fit; add your keys and a webhook handler when
  you're ready to take real payments.
- **Spam protection** — no reCAPTCHA/hCaptcha is configured on the public forms (contact, custom tour,
  newsletter, reviews). Add your own site key if you start seeing spam.
- **Review moderation** — guest-submitted reviews (`reviews` table) are inserted with `is_approved = false`
  and aren't shown on `/reviews` yet (that page currently displays a static curated list). Build a small
  admin view to approve/reject submissions when you're ready to go live with guest content.

## Project structure

```
src/
  components/       Shared components (Header, Footer, WhatsAppButton, forms, dashboards)
  components/ui/    shadcn/ui primitives
  pages/            One file per route
  data/tours.ts     The 43-tour catalog (source of truth)
  lib/              Supabase client, form-submission helpers, placeholder-image helper
supabase/migrations/  SQL migrations, run in order
scripts/              Codegen script for the tour seed SQL
```

## Available scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production (output in `dist/`)
- `npm run preview` — preview the production build locally
