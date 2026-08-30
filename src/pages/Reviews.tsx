import { useState } from 'react'
import { Star, Loader, X } from 'lucide-react'
import { submitReview } from '@/lib/forms'
import { tours } from '@/data/tours'

const reviews = [
  { id: 1, name: 'Sarah Martinez', rating: 5, tour: 'Catamaran Cruise', comment: 'Absolutely amazing experience! The crew was professional, the food was delicious, and the views were breathtaking. Highly recommend!', date: '2026-06-15' },
  { id: 2, name: 'James Thompson', rating: 5, tour: "Dunn's River & Blue Hole", comment: "The best day trip we've had in Jamaica. Swimming in the waterfalls was incredible. Everything was well-organized.", date: '2026-06-10' },
  { id: 3, name: 'Amelia Richardson', rating: 4, tour: 'Blue Mountain Tour', comment: 'Great hiking experience with stunning views at the summit. The guide was knowledgeable. A bit strenuous but worth every step!', date: '2026-06-05' },
  { id: 4, name: 'Marcus Johnson', rating: 5, tour: 'Private Yacht Charter', comment: 'Luxury experience from start to finish. The finger food was gourmet, the bar was stocked, and the sunset cruise was romantic. Perfect for our anniversary!', date: '2026-05-28' },
  { id: 5, name: 'Priya Patel', rating: 5, tour: 'Bamboo Rafting in Great River', comment: 'So relaxing and peaceful. The limestone massage was therapeutic, and the raft captain was entertaining. Shopping after was a nice touch!', date: '2026-05-20' },
  { id: 6, name: 'David Chen', rating: 4, tour: 'ATV & Zipline Safari', comment: 'Adrenaline rush! The ATV trail was exciting, and the ziplines gave amazing views. Safety was prioritized. Loved it!', date: '2026-05-15' },
  { id: 7, name: 'Linda Gonzalez', rating: 5, tour: 'Luminous Lagoon', comment: 'Magical experience! Swimming in glowing water at night was surreal. Our kids will never forget this!', date: '2026-05-10' },
  { id: 8, name: 'Robert Wilson', rating: 5, tour: 'Dolphin Swim', comment: 'Unforgettable encounter with the dolphins. Professional handlers, beautiful facility, and the interaction was genuine and heartfelt.', date: '2026-05-05' },
]

const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
reviews.forEach((r) => { ratingCounts[r.rating] += 1 })

function ReviewModal({ onClose }: { onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const data = new FormData(e.currentTarget)
    const starLabel = String(data.get('star_rating') || '')
    const rating = parseInt(starLabel, 10) || 5

    try {
      await submitReview({
        visitor_name: String(data.get('visitor_name') || ''),
        tour_name: String(data.get('tour_name') || ''),
        rating,
        comment: String(data.get('review_comment') || ''),
      })
      setDone(true)
    } catch (err: any) {
      setError(err.message || 'There was an error submitting your review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {done ? (
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">Thank You!</h3>
            <p className="text-foreground mb-6">Your review has been submitted successfully. We appreciate your feedback!</p>
            <button onClick={onClose} className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700">Close</button>
          </div>
        ) : (
          <>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Share Your Review</h2>
              <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800">{error}</div>}

                <div>
                  <label htmlFor="visitor_name" className="block text-sm font-medium text-foreground mb-2">Your Name *</label>
                  <input type="text" id="visitor_name" name="visitor_name" required disabled={submitting} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50" />
                </div>

                <div>
                  <label htmlFor="tour_name" className="block text-sm font-medium text-foreground mb-2">Tour Name *</label>
                  <select id="tour_name" name="tour_name" required disabled={submitting} defaultValue="" className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
                    <option value="" disabled>Select a tour...</option>
                    {tours.map((t) => (
                      <option key={t.slug} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="star_rating" className="block text-sm font-medium text-foreground mb-2">Star Rating *</label>
                  <select id="star_rating" name="star_rating" required disabled={submitting} defaultValue="" className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50">
                    <option value="" disabled>Select a rating...</option>
                    <option value="5">5 Stars ★★★★★</option>
                    <option value="4">4 Stars ★★★★</option>
                    <option value="3">3 Stars ★★★</option>
                    <option value="2">2 Stars ★★</option>
                    <option value="1">1 Star ★</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="review_comment" className="block text-sm font-medium text-foreground mb-2">Your Review *</label>
                  <textarea id="review_comment" name="review_comment" required rows={5} disabled={submitting} className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50" />
                </div>

                <button type="submit" disabled={submitting} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                  {submitting ? <><Loader className="h-4 w-4 animate-spin" /> Submitting...</> : 'Submit Review'}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function Reviews() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section id="reviews-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Guest Reviews</h1>
          <p className="text-lg text-gray-100">See what travelers say about their Jamaican adventures with us</p>
          <div className="mt-8">
            <button type="button" onClick={() => setModalOpen(true)} className="bg-secondary text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors">
              Share Your Review
            </button>
          </div>
        </div>
      </section>

      {modalOpen && <ReviewModal onClose={() => setModalOpen(false)} />}

      <div className="section-container py-12">
        {/* Overall Rating Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border-b-4 border-secondary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">{averageRating}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className={i < Math.floor(Number(averageRating)) ? 'fill-secondary text-secondary' : 'text-gray-300'} />
                ))}
              </div>
              <p className="text-muted-foreground">Based on {reviews.length} reviews</p>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-bold text-foreground mb-4">Rating Breakdown</h3>
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating]
                const percentage = ((count / reviews.length) * 100).toFixed(0)
                return (
                  <div key={rating} className="flex items-center gap-3 mb-2">
                    <span className="w-8 text-sm font-semibold">{rating}★</span>
                    <div className="flex-grow bg-gray-200 rounded-full h-2 max-w-[300px]">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-12 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? 'fill-secondary text-secondary' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-primary">{review.rating}.0</span>
              </div>
              <h3 className="font-bold text-foreground mb-2">{review.tour}</h3>
              <p className="text-foreground text-sm mb-4 leading-relaxed">{review.comment}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border">
                <span className="font-semibold">{review.name}</span>
                <span>{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <section className="bg-primary text-white py-12 mt-12">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-4">Why Guests Trust The Yaadie Xplorer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">2000+</div>
              <p>Happy Travelers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">43+</div>
              <p>Unique Tours</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">4.8★</div>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
