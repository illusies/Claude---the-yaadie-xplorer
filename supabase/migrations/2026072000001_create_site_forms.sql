-- Migration: Create site form tables
-- Affected tables: contact_messages (new), custom_tour_requests (new), newsletter_subscribers (new), reviews (new)
--
-- These back the Contact form, Custom Dream Tour form, Newsletter signup, and
-- Review submission form. The original B12 export posted these forms straight
-- to b12.io's hosted form endpoint; this migration gives them a real home so
-- the site works independently of any site builder (see src/lib/forms.ts).

-- ============================================================================
-- TABLE: contact_messages
-- ============================================================================
create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table contact_messages enable row level security;

-- policy: anyone (including anonymous site visitors) can submit a contact message
create policy "Anyone can submit contact messages"
  on contact_messages for insert
  to anon, authenticated
  with check (true);

-- policy: only admins can read submitted messages
create policy "Admins can view contact messages"
  on contact_messages for select
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from admins));

create policy "Admins can update contact messages"
  on contact_messages for update
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from admins))
  with check (auth.jwt() ->> 'email' in (select email from admins));

-- ============================================================================
-- TABLE: custom_tour_requests
-- ============================================================================
create table custom_tour_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email_address text not null,
  phone_number text not null,
  desired_destinations text not null,
  group_size integer not null check (group_size > 0),
  preferred_dates text not null,
  transport_preference text,
  itinerary_notes text,
  special_requirements text,
  budget_range text,
  status text default 'new', -- 'new', 'contacted', 'quoted', 'booked', 'closed'
  created_at timestamptz default now()
);

alter table custom_tour_requests enable row level security;

create policy "Anyone can submit custom tour requests"
  on custom_tour_requests for insert
  to anon, authenticated
  with check (true);

create policy "Admins can view custom tour requests"
  on custom_tour_requests for select
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from admins));

create policy "Admins can update custom tour requests"
  on custom_tour_requests for update
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from admins))
  with check (auth.jwt() ->> 'email' in (select email from admins));

-- ============================================================================
-- TABLE: newsletter_subscribers
-- ============================================================================
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  is_active boolean default true,
  subscribed_at timestamptz default now()
);

alter table newsletter_subscribers enable row level security;

create policy "Anyone can subscribe to the newsletter"
  on newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

create policy "Admins can view newsletter subscribers"
  on newsletter_subscribers for select
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from admins));

-- ============================================================================
-- TABLE: reviews
-- ============================================================================
-- Guest-submitted reviews from the "Share Your Review" form on /reviews.
-- Held for moderation (is_approved) before being shown publicly — the /reviews
-- page currently displays a static curated list; wire it up to query
-- `reviews where is_approved = true` once you're ready to go live with
-- guest-submitted content.
create table reviews (
  id uuid primary key default gen_random_uuid(),
  visitor_name text not null,
  tour_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  is_approved boolean default false,
  created_at timestamptz default now()
);

alter table reviews enable row level security;

create policy "Anyone can submit a review"
  on reviews for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can view approved reviews"
  on reviews for select
  to anon, authenticated
  using (is_approved = true);

create policy "Admins can view all reviews"
  on reviews for select
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from admins));

create policy "Admins can moderate reviews"
  on reviews for update
  to authenticated
  using (auth.jwt() ->> 'email' in (select email from admins))
  with check (auth.jwt() ->> 'email' in (select email from admins));
