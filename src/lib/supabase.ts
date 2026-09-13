import { createClient } from '@supabase/supabase-js'

// Fail fast instead of silently creating a client with placeholder credentials.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
   'Supabase credentials are missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a .env file before starting the app.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export const isSupabaseConfigured = true
