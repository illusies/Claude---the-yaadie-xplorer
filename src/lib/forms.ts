import { supabase } from './supabase'

/**
 * Lightweight form-submission helpers.
 *
 * The original B12 export posted every form to `https://b12.io/contact/send/`,
 * which only works inside a B12-hosted site. This replaces that with direct
 * inserts into Supabase tables (see supabase/migrations/2026072000001_create_site_forms.sql),
 * so the Contact form, Custom Dream Tour form, Newsletter form, and Review form
 * all work independently of any site builder.
 *
 * TODO: if you want spam protection, wire up your own reCAPTCHA/hCaptcha site key
 * and pass the token through here — none is configured out of the box.
 */

export async function submitContactMessage(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  const { error } = await supabase.from('contact_messages').insert(data)
  if (error) throw error
}

export async function submitCustomTourRequest(data: {
  full_name: string
  email_address: string
  phone_number: string
  desired_destinations: string
  group_size: number
  preferred_dates: string
  transport_preference: string
  itinerary_notes?: string
  special_requirements?: string
  budget_range?: string
}) {
  const { error } = await supabase.from('custom_tour_requests').insert(data)
  if (error) throw error
}

export async function submitNewsletterSignup(email: string) {
  const { error } = await supabase.from('newsletter_subscribers').insert({ email })
  if (error) throw error
}

export async function submitReview(data: {
  visitor_name: string
  tour_name: string
  rating: number
  comment: string
}) {
  const { error } = await supabase.from('reviews').insert(data)
  if (error) throw error
}
