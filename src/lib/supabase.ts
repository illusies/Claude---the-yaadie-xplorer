import { createClient } from '@supabase/supabase-js'

// Vite exposes env vars prefixed with VITE_ to client code (set these in your .env file).
// NOTE: the original B12/Astro export used PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_KEY —
// if you're copying values over from that project, map them to the names below.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Supabase credentials not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a .env file — see .env.example. Backend features will be unavailable until then.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-anon-key'
)

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)
