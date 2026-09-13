import { supabase } from './supabase'

/**
 * Lightweight form-submission helpers.
 *
 * These helpers validate obvious abuse before sending data to Supabase. Full spam
 * prevention still requires a backend CAPTCHA check or a rate-limited edge function.
 */

function assertField(value: string | undefined, field: string, minLength: number, maxLength: number) {
  const trimmed = (value ?? '').trim()
  if (trimmed.length < minLength || trimmed.length > maxLength) {
   throw new Error(`${field} must be between ${minLength} and ${maxLength} characters.`)
  }
  return trimmed
}

function assertEmail(value: string | undefined) {
  const trimmed = assertField(value, 'Email', 5, 254)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
   throw new Error('Please enter a valid email address.')
  }
  return trimmed
}

export async function submitContactMessage(data: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  const payload = {
   name: assertField(data.name, 'Name', 2, 200),
   email: assertEmail(data.email),
   phone: assertField(data.phone, 'Phone', 6, 40),
   subject: assertField(data.subject, 'Subject', 2, 200),
   message: assertField(data.message, 'Message', 10, 2000),
  }

  const { error } = await supabase.from('contact_messages').insert(payload)
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
  const payload = {
   full_name: assertField(data.full_name, 'Full name', 2, 200),
   email_address: assertEmail(data.email_address),
   phone_number: assertField(data.phone_number, 'Phone number', 6, 40),
   desired_destinations: assertField(data.desired_destinations, 'Desired destinations', 5, 1000),
   group_size: Number.isFinite(data.group_size) ? Math.max(1, Math.min(data.group_size, 1000)) : 1,
   preferred_dates: assertField(data.preferred_dates, 'Preferred dates', 3, 200),
   transport_preference: assertField(data.transport_preference, 'Transport preference', 2, 200),
   itinerary_notes: data.itinerary_notes ? assertField(data.itinerary_notes, 'Itinerary notes', 0, 2000) : null,
   special_requirements: data.special_requirements ? assertField(data.special_requirements, 'Special requirements', 0, 1000) : null,
   budget_range: data.budget_range ? assertField(data.budget_range, 'Budget range', 1, 100) : null,
  }

  const { error } = await supabase.from('custom_tour_requests').insert(payload)
  if (error) throw error
}

export async function submitNewsletterSignup(email: string) {
  const normalizedEmail = assertEmail(email)
  const { error } = await supabase.from('newsletter_subscribers').insert({ email: normalizedEmail })
  if (error) throw error
}

export async function submitReview(data: {
  visitor_name: string
  tour_name: string
  rating: number
  comment: string
}) {
  const payload = {
   visitor_name: assertField(data.visitor_name, 'Visitor name', 2, 200),
   tour_name: assertField(data.tour_name, 'Tour name', 2, 200),
   rating: Math.max(1, Math.min(Number(data.rating) || 1, 5)),
   comment: assertField(data.comment, 'Comment', 10, 2000),
  }

  const { error } = await supabase.from('reviews').insert(payload)
  if (error) throw error
}
