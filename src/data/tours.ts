// The Yaadie Xplorer — full tour catalog.
// This is the single source of truth for both the frontend catalog display
// and the Supabase seed data (see scripts/generate-seed-sql.mjs, which reads
// this file and emits supabase/migrations/..._seed_tours.sql).
//
// Business rules encoded here (see prompt section 12):
//  - flatRate tours charge a flat amount instead of per-person pricing.
//  - perVehicle (Jet Car only) is priced per vehicle, not per person or flat.
//  - tourType 'charter' tours (Private Yacht Charter) are flat-rate for a whole group.
//  - minGuests flags a minimum group size required to book/confirm.
//  - perks tours show the complimentary rum punch / Red Stripe / water / coconut water badge.

export type TourCategory =
  | 'Water'
  | 'Adventure'
  | 'Nature'
  | 'Extreme'
  | 'Relaxation'
  | 'Combined'
  | 'Entertainment'
  | 'Premium'
  | 'Leisure'
  | 'Cultural'
  | 'Marine'
  | 'Beach'
  | 'Transfers'

export interface TourCatalogItem {
  /** Stable slug used as the seed id and as the React key. */
  slug: string
  name: string
  description: string
  category: TourCategory
  /** Human-readable price string shown on cards, preserves all the pricing nuance (transfers, private rates, etc). */
  priceDetails: string
  /** Base numeric price used for sorting/filtering — per-person unless flatRate or perVehicle is true. */
  price: number
  flatRate: boolean
  perVehicle: boolean
  tourType: 'standard' | 'charter' | 'private'
  minGuests: number | null
  maxCapacity: number | null
  rating: number
  perks: boolean
}

export const tours: TourCatalogItem[] = [
  { slug: 'catamaran-cruise', name: 'Catamaran Cruise', category: 'Water', priceDetails: '$110/person (shared transfer), $130/person (private, 4+ guests)', price: 110, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.8, perks: true, description: 'Sail on crystal clear waters' },
  { slug: 'dunns-river-blue-hole', name: "Dunn's River & Blue Hole", category: 'Adventure', priceDetails: '$120/person (private, 4+ guests)', price: 120, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: 4, maxCapacity: null, rating: 4.9, perks: true, description: 'Twin waterfall experience with natural swimming pools' },
  { slug: 'dunns-river-falls-only', name: "Dunn's River Falls Only", category: 'Nature', priceDetails: '$87.50/person', price: 87.5, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.7, perks: false, description: 'Iconic cascading waterfalls with limestone terraces' },
  { slug: 'blue-hole-only', name: 'Blue Hole Only', category: 'Adventure', priceDetails: '$90/person (private, 4+ guests)', price: 90, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: 4, maxCapacity: null, rating: 4.6, perks: false, description: 'Cenote swimming in lush jungle surroundings' },
  { slug: 'atv-zipline-horseback-catamaran-jeep', name: 'ATV, Zipline, Horseback, Catamaran & Jeep Safari', category: 'Extreme', priceDetails: '$165/person (public), $195/person (private)', price: 165, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.9, perks: true, description: 'High-octane adventure through mountains and forests' },
  { slug: 'atv-zipline-horseback-ricks-cafe', name: "ATV, Zipline, Horseback & Rick's Cafe Negril", category: 'Extreme', priceDetails: '$189/person, $210/person (private transfer)', price: 189, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.8, perks: true, description: 'Adventure and dining experience in Negril' },
  { slug: 'atv-zipline', name: 'ATV & Zipline', category: 'Extreme', priceDetails: '$169/person', price: 169, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.8, perks: false, description: 'Combine two thrilling activities' },
  { slug: 'atv-horseback', name: 'ATV & Horseback', category: 'Extreme', priceDetails: '$169/person', price: 169, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.7, perks: false, description: 'Off-road adventure combined with horseback riding' },
  { slug: 'eco-adventure-park', name: 'Eco Adventure Park', category: 'Adventure', priceDetails: '$209/person (private transfer extra)', price: 209, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.8, perks: false, description: 'Dune buggy, zipline, river rafting, tubing, e-bike' },
  { slug: 'luminous-lagoon', name: 'Luminous Lagoon', category: 'Nature', priceDetails: '$55/person', price: 55, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.8, perks: false, description: 'Swim in glowing bioluminescent waters at night' },
  { slug: 'bamboo-rafting-great-river', name: 'Bamboo Rafting, Great River', category: 'Relaxation', priceDetails: '$70/person (includes limestone massage)', price: 70, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.7, perks: false, description: 'Scenic bamboo raft with limestone massage' },
  { slug: 'martha-brae-rafting', name: 'Martha Brae Rafting', category: 'Relaxation', priceDetails: '$90/person', price: 90, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.6, perks: false, description: 'Scenic bamboo raft journey down historic river' },
  { slug: 'river-tubing', name: 'River Tubing', category: 'Adventure', priceDetails: '$55/person (no transfer), $93/person (with transfer)', price: 55, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.7, perks: false, description: 'Thrilling tubing adventure down tropical river' },
  { slug: 'negril-day-tour-shopping-ricks-cafe', name: "Negril Day Tour, Shopping & Rick's Cafe", category: 'Combined', priceDetails: '$60/person', price: 60, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.7, perks: false, description: 'Beach, shopping, and dining experience' },
  { slug: 'atv-only', name: 'ATV Only', category: 'Extreme', priceDetails: '$140/person', price: 140, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.8, perks: false, description: 'Solo all-terrain vehicle adventure' },
  { slug: 'clear-kayak', name: 'Clear Kayak', category: 'Water', priceDetails: '$180/person (includes transfer)', price: 180, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.5, perks: false, description: 'Glass kayak for viewing coral reefs and marine life' },
  { slug: 'jet-car', name: 'Jet Car', category: 'Extreme', priceDetails: '$250 per vehicle', price: 250, flatRate: false, perVehicle: true, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.9, perks: false, description: 'High-speed jet car adventure — priced per vehicle, not per person' },
  { slug: 'jet-ski', name: 'Jet Ski', category: 'Water', priceDetails: '$100/person (transfer +$15, min 4 guests)', price: 100, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: 4, maxCapacity: null, rating: 4.8, perks: false, description: 'Fast-paced water adventure' },
  { slug: 'nightlife', name: 'Nightlife', category: 'Entertainment', priceDetails: '$25/person (min 4 guests)', price: 25, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: 4, maxCapacity: null, rating: 4.6, perks: false, description: "Experience Jamaica's vibrant nightlife" },
  { slug: 'private-yacht-charter', name: 'Private Yacht Charter', category: 'Premium', priceDetails: '$2,160 flat (3 hrs, up to 18 guests, food & open bar, transfer included)', price: 2160, flatRate: true, perVehicle: false, tourType: 'charter', minGuests: null, maxCapacity: 18, rating: 5.0, perks: true, description: 'Luxury 3-hour yacht charter for up to 18 guests, including food and open bar' },
  { slug: 'shopping', name: 'Shopping', category: 'Leisure', priceDetails: '$20/person', price: 20, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.5, perks: false, description: 'Guided shopping experience' },
  { slug: 'sightseeing-shopping', name: 'Sightseeing & Shopping', category: 'Combined', priceDetails: '$50/person', price: 50, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.6, perks: false, description: "Explore and shop Jamaica's best spots" },
  { slug: 'bob-marley-house-tour', name: 'Bob Marley House Tour', category: 'Cultural', priceDetails: '$120/person', price: 120, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.7, perks: false, description: 'Historic home of the legendary reggae icon' },
  { slug: 'bob-marley-dunns-river', name: "Bob Marley & Dunn's River", category: 'Combined', priceDetails: '$150/person', price: 150, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.8, perks: false, description: 'Culture and nature in one unforgettable day' },
  { slug: 'weed-farm-shopping', name: 'Weed Farm & Shopping', category: 'Cultural', priceDetails: '$60/person (transfer included)', price: 60, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.5, perks: false, description: 'Unique cultural and agricultural experience' },
  { slug: 'hiking-experience', name: 'Hiking Experience', category: 'Nature', priceDetails: '$70/person (min 4 guests)', price: 70, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: 4, maxCapacity: null, rating: 4.7, perks: false, description: "Trek Jamaica's lush mountain trails" },
  { slug: 'kingston-highlights', name: 'Kingston Highlights', category: 'Cultural', priceDetails: '$550 flat (1–4 guests)', price: 550, flatRate: true, perVehicle: false, tourType: 'private', minGuests: null, maxCapacity: 4, rating: 4.7, perks: false, description: 'Bob Marley Museum, Emancipation Park, Devon House' },
  { slug: 'appleton-estate-ys-falls', name: 'Appleton Estate & YS Falls', category: 'Combined', priceDetails: '$160/person (4+ guests)', price: 160, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: 4, maxCapacity: null, rating: 4.8, perks: true, description: 'Rum tour and waterfall adventure' },
  { slug: 'appleton-estate-only', name: 'Appleton Estate Only', category: 'Cultural', priceDetails: '$120/person', price: 120, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.7, perks: false, description: 'Historic rum distillery tour' },
  { slug: 'ys-falls-only', name: 'YS Falls Only', category: 'Nature', priceDetails: '$120/person', price: 120, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.7, perks: false, description: 'Majestic waterfall experience' },
  { slug: 'rose-hall-day-tour', name: 'Rose Hall Great House Day Tour', category: 'Cultural', priceDetails: '$45/person', price: 45, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.6, perks: false, description: 'Historic plantation mansion with legendary tales' },
  { slug: 'rose-hall-night-tour', name: 'Rose Hall Great House Night Tour', category: 'Cultural', priceDetails: '$50/person', price: 50, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.6, perks: false, description: 'Evening tour of historic mansion' },
  { slug: 'rose-hall-shopping', name: 'Rose Hall Great House & Shopping', category: 'Combined', priceDetails: '$55/person', price: 55, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.6, perks: false, description: 'History and shopping experience' },
  { slug: 'dolphin-encounter-lucea', name: 'Dolphin Encounter Lucea', category: 'Marine', priceDetails: '$150/person (transfer +$30)', price: 150, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.9, perks: true, description: 'Meet and interact with dolphins' },
  { slug: 'dolphin-swim', name: 'Dolphin Swim', category: 'Marine', priceDetails: '$180/person (transfer +$30)', price: 180, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.9, perks: true, description: 'Swim and play with friendly dolphins' },
  { slug: 'dolphin-ultimate-swim', name: 'Dolphin Ultimate Swim', category: 'Marine', priceDetails: '$220/person (transfer +$30)', price: 220, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 5.0, perks: true, description: 'Premium dolphin swimming experience' },
  { slug: 'doctors-cave-beach', name: "Doctor's Cave Beach", category: 'Beach', priceDetails: '$20/person (min 4 guests)', price: 20, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: 4, maxCapacity: null, rating: 4.5, perks: false, description: 'Beautiful beach day experience' },
  { slug: 'rockland-bird-sanctuary', name: 'Rockland Bird Sanctuary', category: 'Nature', priceDetails: '$73/person (min 4 guests)', price: 73, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: 4, maxCapacity: null, rating: 4.7, perks: false, description: 'Bird watching in natural habitat' },
  { slug: 'blue-mountain-tour', name: 'Blue Mountain Tour', category: 'Nature', priceDetails: '$700 flat (1–4 guests)', price: 700, flatRate: true, perVehicle: false, tourType: 'private', minGuests: null, maxCapacity: 4, rating: 4.7, perks: false, description: "Hike Jamaica's most famous mountain peak" },
  { slug: 'airport-transfer-mobay', name: 'Airport Transfer – Montego Bay Hotel', category: 'Transfers', priceDetails: '$40 flat (1–4 guests)', price: 40, flatRate: true, perVehicle: false, tourType: 'private', minGuests: null, maxCapacity: 4, rating: 4.8, perks: false, description: 'Convenient airport transportation' },
  { slug: 'airport-transfer-negril', name: 'Airport Transfer – Negril', category: 'Transfers', priceDetails: '$120 flat (1–4 guests)', price: 120, flatRate: true, perVehicle: false, tourType: 'private', minGuests: null, maxCapacity: 4, rating: 4.8, perks: false, description: 'Direct airport to Negril transfer' },
  { slug: 'airport-transfer-ocho-rios', name: 'Airport Transfer – Ocho Rios', category: 'Transfers', priceDetails: '$120 flat (1–4 guests)', price: 120, flatRate: true, perVehicle: false, tourType: 'private', minGuests: null, maxCapacity: 4, rating: 4.8, perks: false, description: 'Direct airport to Ocho Rios transfer' },
  { slug: 'airport-transfer-south-coast', name: 'Airport Transfer – South Coast', category: 'Transfers', priceDetails: '$50/person', price: 50, flatRate: false, perVehicle: false, tourType: 'standard', minGuests: null, maxCapacity: null, rating: 4.8, perks: false, description: 'Direct airport to South Coast transfer' },
]

export const tourCategories: string[] = Array.from(new Set(tours.map((t) => t.category)))
