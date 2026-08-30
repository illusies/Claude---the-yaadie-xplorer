import TourBrowser from '@/components/TourBrowser'
import { placeholderImage } from '@/lib/placeholder-image'

const heroImage = placeholderImage('Catamaran on Turquoise Water', { w: 1600, h: 700 })

const previewTours = [
  { id: 1, name: 'Catamaran Cruise', image: placeholderImage('Catamaran Cruise'), location: 'Montego Bay', price: 110, rating: 4.8, reviews: 156, category: 'Water Sports', amenities: ['drink', 'food', 'transfer'] },
  { id: 2, name: "Dunn's River & Blue Hole", image: placeholderImage("Dunn's River Falls"), location: 'Ocho Rios', price: 120, rating: 4.9, reviews: 203, category: 'Adventure', amenities: ['drink', 'food', 'transfer'] },
  { id: 3, name: 'Blue Mountain Tour', image: placeholderImage('Blue Mountain'), location: 'Kingston', price: 700, rating: 4.7, reviews: 89, category: 'Cultural', amenities: ['drink', 'food'] },
  { id: 4, name: 'Private Yacht Charter', image: placeholderImage('Private Yacht'), location: 'Montego Bay', price: 2160, rating: 5.0, reviews: 42, category: 'Water Sports', amenities: ['drink', 'food'] },
  { id: 5, name: 'Beach Day Adventure', image: placeholderImage('Beach Scene'), location: 'Negril', price: 55, rating: 4.6, reviews: 127, category: 'Beach', amenities: ['drink', 'food', 'transfer'] },
  { id: 6, name: 'Eco Adventure Park', image: placeholderImage('Eco Adventure Park'), location: 'Falmouth', price: 209, rating: 4.8, reviews: 184, category: 'Adventure', amenities: ['food', 'transfer'] },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="relative h-96 md:h-[450px] overflow-hidden">
        <img
          src={heroImage}
          alt="Beautiful catamaran on turquoise Caribbean waters"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, #007A33 0%, #FFC72C 100%)' }}
          >
            The Yaadie Xplorer
          </h1>
          <div className="max-w-2xl mb-3">
            <p className="text-sm md:text-base text-white leading-relaxed">
              The Yaadie Xplorer connects travelers with the authentic side of Jamaica.
              <br />
              We curate local tours, food experiences, events, and cultural stories that go beyond the resorts.
              <br />
              Our mission: showcase Jamaica's people, places, and pride — the way yaadies see it.
              <br />
              Discover Jamaica. The Yaadie Way.
            </p>
          </div>
        </div>
      </section>

      {/* Tour Browser Component */}
      <TourBrowser tours={previewTours} />
    </>
  )
}
