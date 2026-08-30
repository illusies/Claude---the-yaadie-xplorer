import { useState } from 'react'
import { Loader, CheckCircle2, AlertCircle } from 'lucide-react'
import { submitCustomTourRequest } from '@/lib/forms'

export default function CustomTour() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await submitCustomTourRequest({
        full_name: String(data.get('full_name') || ''),
        email_address: String(data.get('email_address') || ''),
        phone_number: String(data.get('phone_number') || ''),
        desired_destinations: String(data.get('desired_destinations') || ''),
        group_size: Number(data.get('group_size') || 1),
        preferred_dates: String(data.get('preferred_dates') || ''),
        transport_preference: String(data.get('transport_preference') || ''),
        itinerary_notes: String(data.get('itinerary_notes') || ''),
        special_requirements: String(data.get('special_requirements') || ''),
        budget_range: String(data.get('budget_range') || ''),
      })
      setSubmitted(true)
      form.reset()
    } catch (err: any) {
      setError(err.message || 'Something went wrong submitting your request. Please try again or contact us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section id="custom-tour-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Your Custom Dream Tour</h1>
          <p className="text-lg text-gray-100">Tell us about your perfect Caribbean adventure and we'll craft it for you</p>
        </div>
      </section>

      <div className="section-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">Request Received!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thanks for sharing your dream tour with us. Our team will reach out within 24 hours to start
                    building your itinerary.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-outline"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* Personal Information */}
                  <div className="border-b pb-6">
                    <h3 className="text-xl font-bold text-primary mb-4">1. Your Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="full_name" className="block text-sm font-semibold text-foreground mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="full_name"
                          name="full_name"
                          required
                          disabled={submitting}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label htmlFor="email_address" className="block text-sm font-semibold text-foreground mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email_address"
                          name="email_address"
                          required
                          disabled={submitting}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="phone_number" className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        required
                        disabled={submitting}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Tour Details */}
                  <div className="border-b pb-6">
                    <h3 className="text-xl font-bold text-primary mb-4">2. Tour Details</h3>
                    <div className="mb-4">
                      <label htmlFor="desired_destinations" className="block text-sm font-semibold text-foreground mb-2">
                        Desired Destinations <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="desired_destinations"
                        name="desired_destinations"
                        required
                        rows={3}
                        disabled={submitting}
                        placeholder="e.g., Dunn's River Falls, Montego Bay, Blue Hole, Negril Beach..."
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="group_size" className="block text-sm font-semibold text-foreground mb-2">
                          Group Size <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          id="group_size"
                          name="group_size"
                          min={1}
                          required
                          disabled={submitting}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label htmlFor="preferred_dates" className="block text-sm font-semibold text-foreground mb-2">
                          Preferred Travel Dates <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="preferred_dates"
                          name="preferred_dates"
                          placeholder="e.g., July 20-25, 2027"
                          required
                          disabled={submitting}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor="transport_preference" className="block text-sm font-semibold text-foreground mb-2">
                        Transport Preference <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="transport_preference"
                        name="transport_preference"
                        required
                        disabled={submitting}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        defaultValue=""
                      >
                        <option value="" disabled>Select transport option</option>
                        <option value="Van">Van</option>
                        <option value="SUV">SUV</option>
                        <option value="Coach/Bus">Coach/Bus</option>
                        <option value="No preference">No preference</option>
                      </select>
                    </div>
                  </div>

                  {/* Special Requirements */}
                  <div className="border-b pb-6">
                    <h3 className="text-xl font-bold text-primary mb-4">3. Additional Information</h3>
                    <div className="mb-4">
                      <label htmlFor="itinerary_notes" className="block text-sm font-semibold text-foreground mb-2">
                        Custom Itinerary Notes
                      </label>
                      <textarea
                        id="itinerary_notes"
                        name="itinerary_notes"
                        rows={3}
                        disabled={submitting}
                        placeholder="Share any specific activities, pacing preferences, or special interests..."
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="special_requirements" className="block text-sm font-semibold text-foreground mb-2">
                        Special Requirements
                      </label>
                      <textarea
                        id="special_requirements"
                        name="special_requirements"
                        rows={3}
                        disabled={submitting}
                        placeholder="e.g., accessibility needs, dietary restrictions, child seating, etc..."
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="budget_range" className="block text-sm font-semibold text-foreground mb-2">
                        Approximate Budget Range <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="budget_range"
                        name="budget_range"
                        required
                        disabled={submitting}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                        defaultValue=""
                      >
                        <option value="" disabled>Select budget range</option>
                        <option value="Under $500">Under $500</option>
                        <option value="$500 - $1,000">$500 - $1,000</option>
                        <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                        <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                        <option value="$5,000+">$5,000+</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-secondary text-black py-3 px-6 rounded-lg font-semibold hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      'Submit Custom Tour Request'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-primary text-white rounded-xl p-8 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Why Go Custom?</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-secondary text-lg">✓</span>
                  <span>Tailored to your interests & pace</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary text-lg">✓</span>
                  <span>Flexible dates & group sizes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary text-lg">✓</span>
                  <span>Special accommodations welcome</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary text-lg">✓</span>
                  <span>Competitive group pricing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary text-lg">✓</span>
                  <span>Direct coordination with our team</span>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-green-700">
                <h4 className="font-semibold mb-3">Quick Contact</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Phone:</span>
                    <br />
                    876-326-3354
                  </p>
                  <p>
                    <span className="font-semibold">WhatsApp:</span>
                    <br />
                    876-326-3354
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>
                    <br />
                    theyaadiexplorer@gmail.com
                  </p>
                  <p>
                    <span className="font-semibold">Hours:</span>
                    <br />
                    9am - 6pm EST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
