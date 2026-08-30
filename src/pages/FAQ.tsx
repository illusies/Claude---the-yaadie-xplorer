import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { id: 1, category: 'Bookings', question: 'How do I book a tour?', answer: 'Browse our Tours & Experiences page, select a tour you love, and click "Book Now". Fill in your details and proceed to secure payment. You\'ll receive a confirmation email with your booking details.' },
  { id: 2, category: 'Bookings', question: 'Can I modify my booking after confirming?', answer: 'Yes! Contact us at 876-326-3354 or theyaadiexplorer@gmail.com as soon as possible. We\'ll do our best to accommodate changes if the tour hasn\'t started yet.' },
  { id: 3, category: 'Bookings', question: 'Do you offer group discounts?', answer: 'Absolutely! Groups of 8 or more qualify for special rates. Contact us directly at 876-326-3354 to discuss your group booking and receive a customized quote.' },
  { id: 4, category: 'Payment', question: 'What payment methods do you accept?', answer: 'We accept credit/debit cards and PayPal. For large group bookings, we also offer bank transfer options. WhatsApp or call 876-326-3354 for bank details.' },
  { id: 5, category: 'Payment', question: 'Is there a deposit required?', answer: 'Yes, we require a 30% non-refundable booking deposit to secure your tour. The remaining balance is due 7 days before your tour date.' },
  { id: 6, category: 'Tours', question: 'What should I bring on a tour?', answer: 'We recommend bringing: sunscreen, insect repellent, water shoes, a change of clothes, towel, camera, and valid ID. Check specific tour details for specialized gear needed (e.g., hiking boots for mountain tours).' },
  { id: 7, category: 'Tours', question: 'Are tours suitable for children and families?', answer: 'Most tours are family-friendly! However, some adventures (zipline, ATV) have age/height restrictions. Contact us at 876-326-3354 to confirm suitability for your family.' },
  { id: 8, category: 'Tours', question: "What's included in the tour price?", answer: 'Most tours include transportation, tour guide, entry fees, and complimentary refreshments (rum punch, red stripe beer, water, coconut water) on selected tours. See individual tour descriptions for specifics.' },
  { id: 9, category: 'Health', question: 'Are there health or safety concerns?', answer: 'Jamaica is generally safe for tourists. All our guides are trained in first aid. Inform us of any medical conditions beforehand. We recommend travel insurance. Check government travel advisories for current health guidance.' },
  { id: 10, category: 'Health', question: 'Do you accommodate dietary restrictions?', answer: 'Yes! Let us know about any dietary requirements (vegetarian, vegan, allergies) when booking or calling 876-326-3354. We\'ll arrange appropriate meal options.' },
]

const categories = Array.from(new Set(faqs.map((f) => f.category)))

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(categories[0])
  const [openId, setOpenId] = useState<number | null>(null)

  const visibleFaqs = faqs.filter((f) => f.category === activeCategory)

  return (
    <>
      <section id="faq-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FAQ & Policies</h1>
          <p className="text-lg text-gray-100">Everything you need to know before your adventure</p>
        </div>
      </section>

      <div className="section-container py-12">
        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-8">Find answers to common questions about our tours and bookings</p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat)
                  setOpenId(null)
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeCategory === cat ? 'bg-primary text-white' : 'bg-gray-200 text-foreground hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQs Accordion */}
          <div className="space-y-4">
            {visibleFaqs.map((faq) => {
              const isOpen = openId === faq.id
              return (
                <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-border">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-foreground text-left">{faq.question}</h3>
                    <ChevronDown
                      size={20}
                      className={`text-primary flex-shrink-0 ml-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4">
                      <p className="text-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Cancellation Policies */}
        <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-secondary">
          <h2 className="text-3xl font-bold text-primary mb-8">Cancellation & Refund Policies</h2>

          {/* Standard Tours */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Standard Tours</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-3 font-semibold">Notice Period</th>
                    <th className="px-4 py-3 font-semibold">Refund</th>
                    <th className="px-4 py-3 font-semibold">Cancellation Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">4+ days notice</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">100%</td>
                    <td className="px-4 py-3">$0</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">3 days notice</td>
                    <td className="px-4 py-3 text-orange-600 font-semibold">75%</td>
                    <td className="px-4 py-3">25%</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">2 days notice</td>
                    <td className="px-4 py-3 text-orange-600 font-semibold">50%</td>
                    <td className="px-4 py-3">50%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">1 day or less</td>
                    <td className="px-4 py-3 text-red-600 font-semibold">0%</td>
                    <td className="px-4 py-3">100% Fee</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Custom Tours & Charters */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Customized Tours & Private Charters</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-3 font-semibold">Notice Period</th>
                    <th className="px-4 py-3 font-semibold">Refund</th>
                    <th className="px-4 py-3 font-semibold">Cancellation Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">60+ days notice</td>
                    <td className="px-4 py-3 text-green-600 font-semibold">100%</td>
                    <td className="px-4 py-3">$0</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">59 to 44 days notice</td>
                    <td className="px-4 py-3 text-orange-600 font-semibold">50%</td>
                    <td className="px-4 py-3">50%</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">45 to 30 days notice</td>
                    <td className="px-4 py-3 text-orange-600 font-semibold">25%</td>
                    <td className="px-4 py-3">75%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">Less than 30 days notice</td>
                    <td className="px-4 py-3 text-red-600 font-semibold">0%</td>
                    <td className="px-4 py-3">100% Fee</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              ℹ️ <strong>Note:</strong> Cancellations must be submitted in writing via email
              (theyaadiexplorer@gmail.com) or WhatsApp (876-326-3354). Refunds are processed within 5–7 business
              days. No-shows without 24-hour notice receive no refund.
            </p>
          </div>
        </div>

        {/* Additional Policies */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border-l-4 border-primary rounded-lg p-6">
            <h4 className="font-bold text-primary mb-3">⚠️ Weather & Natural Events</h4>
            <p className="text-sm text-foreground">
              Tours may be rescheduled or cancelled due to severe weather, hurricanes, or natural events. Full refund
              or alternative date will be offered at no extra cost.
            </p>
          </div>
          <div className="bg-green-50 border-l-4 border-secondary rounded-lg p-6">
            <h4 className="font-bold text-primary mb-3">✓ No-Show Policy</h4>
            <p className="text-sm text-foreground">
              If you don't arrive for your tour without 24-hour notice, no refund will be issued. Contact us
              immediately if you're running late.
            </p>
          </div>
          <div className="bg-purple-50 border-l-4 border-primary rounded-lg p-6">
            <h4 className="font-bold text-primary mb-3">🏥 Medical Issues</h4>
            <p className="text-sm text-foreground">
              Cancellations due to medical emergencies (with documentation) may qualify for a full refund or credit
              toward future tours.
            </p>
          </div>
          <div className="bg-orange-50 border-l-4 border-secondary rounded-lg p-6">
            <h4 className="font-bold text-primary mb-3">📝 Terms & Conditions</h4>
            <p className="text-sm text-foreground">
              By booking, you agree to our full terms and acknowledge the inherent risks associated with adventure
              activities.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-primary text-white py-12 mt-12">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg text-gray-100 mb-6">Our team is here to help!</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="tel:876-326-3354" className="btn-secondary">Call 876-326-3354</a>
            <a href="/contact" className="btn-outline text-white border-white hover:bg-white hover:text-primary">Email Us</a>
          </div>
        </div>
      </section>
    </>
  )
}
