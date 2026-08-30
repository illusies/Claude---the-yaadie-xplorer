import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { tours, tourCategories } from '@/data/tours'
import { placeholderImage } from '@/lib/placeholder-image'

const tourImage = placeholderImage('Jamaica Tour', { w: 800, h: 500 })

export default function Tours() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', ...tourCategories]
  const visibleTours = activeCategory === 'All' ? tours : tours.filter((t) => t.category === activeCategory)

  return (
    <>
      <section id="tours-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tours & Experiences</h1>
          <p className="text-lg text-gray-100">Discover 43+ curated tours showcasing Jamaica's best.</p>
        </div>
      </section>

      <div className="section-container py-12">
        {/* Filter Buttons */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-foreground hover:bg-secondary hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleTours.map((tour) => (
            <div key={tour.slug} className="tour-card group">
              <div className="relative overflow-hidden h-48 bg-gray-200">
                <img
                  src={tourImage}
                  alt={tour.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {tour.category}
                </div>
                {tour.perks && (
                  <div className="absolute top-3 right-3">
                    <span className="perks-badge">With Perks!</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-foreground mb-2">{tour.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tour.description}</p>
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(tour.rating) ? 'fill-secondary text-secondary' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{tour.rating}</span>
                </div>
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="text-primary font-bold text-sm">{tour.priceDetails}</div>
                  <Link
                    to="/signup"
                    className="w-full inline-block text-center bg-secondary text-black py-2 px-4 rounded-md font-semibold hover:bg-amber-300 transition-colors"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Tours & Perks Note */}
        <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-lg p-6 mb-8 border-l-4 border-primary">
          <p className="text-foreground text-center">
            <strong>Custom tours available upon request.</strong> Complimentary rum punch, Red Stripe, water, and
            coconut water included on selected tours.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-secondary text-black py-12">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find Your Dream Tour?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Create a custom itinerary tailored to your interests and group size
          </p>
          <Link to="/custom-tour" className="btn-primary">
            Create Custom Tour
          </Link>
        </div>
      </section>
    </>
  )
}
