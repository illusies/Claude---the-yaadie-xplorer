import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Loader, CheckCircle2, AlertCircle } from 'lucide-react'
import { submitContactMessage } from '@/lib/forms'

export default function Contact() {
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
      await submitContactMessage({
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        phone: String(data.get('phone') || ''),
        subject: String(data.get('subject') || ''),
        message: String(data.get('message') || ''),
      })
      setSubmitted(true)
      form.reset()
    } catch (err: any) {
      setError(err.message || 'Something went wrong sending your message. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <section id="contact-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-100">Have questions? We're here to help plan your perfect Jamaican adventure</p>
        </div>
      </section>

      <div className="section-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Phone & WhatsApp</h3>
                  <a href="tel:876-326-3354" className="text-primary font-semibold hover:text-secondary">876-326-3354</a>
                  <p className="text-sm text-muted-foreground mt-1">Call or message anytime</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Email</h3>
                  <a href="mailto:theyaadiexplorer@gmail.com" className="text-primary font-semibold hover:text-secondary break-all">
                    theyaadiexplorer@gmail.com
                  </a>
                  <p className="text-sm text-muted-foreground mt-1">Response within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Location</h3>
                  <p className="text-sm text-foreground">Lot 1220 Porto Bello Meadows</p>
                  <p className="text-sm text-foreground">Montego Bay, St James, Jamaica</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white p-3 rounded-lg">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Business Hours</h3>
                  <p className="text-sm text-foreground">9am - 6pm EST</p>
                  <p className="text-sm text-foreground">7 Days a Week</p>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white rounded-lg p-6">
              <h3 className="font-bold mb-4">Follow Our Adventures</h3>
              <div className="flex flex-col gap-3">
                <a href="https://instagram.com/the.yaadie.xplorer" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors">
                  📸 @the.yaadie.xplorer
                </a>
                <a href="https://facebook.com/the.yaadie.xplorer" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors">
                  f the.yaadie.xplorer
                </a>
                <a href="https://tiktok.com/@the.yaadie.xplorer" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors">
                  🎬 @the.yaadie.xplorer
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>

              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">Thanks for reaching out — we typically respond within 24 hours.</p>
                  <button type="button" onClick={() => setSubmitted(false)} className="btn-outline">
                    Send Another Message
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

                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                      placeholder="876-XXX-XXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      disabled={submitting}
                      defaultValue=""
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="booking-inquiry">Booking Inquiry</option>
                      <option value="custom-tour">Custom Tour Request</option>
                      <option value="group-booking">Group Booking</option>
                      <option value="general-question">General Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      disabled={submitting}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full text-lg py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    We typically respond within 24 hours during business hours (9am - 6pm EST)
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="bg-gradient-to-r from-green-50 to-amber-50 py-12 mt-12">
        <div className="section-container">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">What Do You Need?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/tours" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-primary">
              <div className="text-4xl mb-3">🏖️</div>
              <h3 className="font-bold text-foreground mb-2">Browse Tours</h3>
              <p className="text-sm text-muted-foreground">Explore all 43+ experiences</p>
            </a>
            <a href="/custom-tour" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-secondary">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-bold text-foreground mb-2">Custom Tour</h3>
              <p className="text-sm text-muted-foreground">Create your dream itinerary</p>
            </a>
            <a href="/reviews" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-primary">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold text-foreground mb-2">See Reviews</h3>
              <p className="text-sm text-muted-foreground">What guests are saying</p>
            </a>
            <a href="/faq" className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border-t-4 border-secondary">
              <div className="text-4xl mb-3">❓</div>
              <h3 className="font-bold text-foreground mb-2">FAQ</h3>
              <p className="text-sm text-muted-foreground">Common questions answered</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
