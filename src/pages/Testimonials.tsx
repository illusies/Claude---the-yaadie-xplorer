import { Link } from 'react-router-dom'
import { Star, MessageSquare } from 'lucide-react'
import { placeholderImage } from '@/lib/placeholder-image'

const testimonials = [
  { id: 1, name: 'The Johnson Family', location: 'Toronto, Canada', type: 'Family Vacation', quote: 'Our family will never forget the magical experience at Luminous Lagoon. Our children learned so much about Jamaica, and every moment was perfectly organized. The team made us feel like family!', tour: 'Luminous Lagoon + Bamboo Rafting' },
  { id: 2, name: 'TechFlow Solutions', location: 'New York, USA', type: 'Corporate Retreat', quote: 'We brought 25 team members for a 3-day retreat. The coordination was flawless, the activities were thrilling, and our team bonded like never before. The Yaadie Xplorer exceeded every expectation.', tour: 'Multi-Day Custom Corporate Package' },
  { id: 3, name: 'Sarah & Michael', location: 'London, UK', type: 'Honeymoon', quote: "Our private yacht charter was the highlight of our honeymoon. The sunset, the food, the service—everything was absolutely perfect. We couldn't have asked for a better celebration of our marriage.", tour: 'Private Yacht Charter' },
  { id: 4, name: 'The Adventure Club', location: 'Miami, USA', type: 'Group Adventure', quote: "From ATV adventures to ziplines to Dunn's River, every moment was adrenaline-pumping. The guides were incredibly professional and made sure everyone felt safe and empowered. Highly recommend!", tour: 'ATV & Zipline Safari' },
  { id: 5, name: 'Dr. Patricia Chen', location: 'San Francisco, USA', type: 'Solo Traveler', quote: 'As a solo traveler, I was nervous about group tours. The Yaadie Xplorer made me feel completely safe and welcomed. I made friends from around the world and experienced Jamaica authentically. Unforgettable!', tour: 'Comprehensive Jamaica Experience' },
  { id: 6, name: 'Corporate Events Plus', location: 'Chicago, USA', type: 'Team Building', quote: "We've used The Yaadie Xplorer for three consecutive years for our annual retreat. Their ability to customize experiences and manage logistics for 50+ people is unmatched in the industry.", tour: 'Annual Team Building Retreat' },
]

export default function Testimonials() {
  return (
    <>
      <section id="testimonials-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Guest Testimonials & Case Studies</h1>
          <p className="text-lg text-gray-100">Real stories from travelers who've experienced Jamaica with The Yaadie Xplorer</p>
        </div>
      </section>

      <div className="section-container py-12">
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-secondary text-secondary" />)}
              </div>
              <p className="text-foreground italic mb-4 leading-relaxed">"{t.quote}"</p>
              <div className="bg-gray-50 rounded p-3 mb-4 text-sm">
                <p className="font-semibold text-primary">Tour: {t.tour}</p>
                <p className="text-muted-foreground text-xs">Experience Type: {t.type}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <MessageSquare className="text-secondary" size={24} />
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Featured Case Study</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <img src={placeholderImage('TechFlow Solutions Team', { w: 800, h: 700 })} alt="TechFlow Solutions team" className="w-full h-96 object-cover" />
              <div className="p-8 flex flex-col justify-center">
                <span className="inline-block bg-secondary text-black px-3 py-1 rounded-full text-sm font-semibold mb-4 w-fit">Case Study</span>
                <h3 className="text-2xl font-bold text-primary mb-4">TechFlow Solutions: 3-Day Corporate Retreat</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">The Challenge</h4>
                    <p className="text-muted-foreground">A 25-person tech team needed a meaningful retreat that would foster team bonding while providing opportunities for adventure, relaxation, and cultural immersion.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Our Solution</h4>
                    <p className="text-muted-foreground">We designed a custom 3-day itinerary blending high-energy activities (ATV safari, zipline), relaxation (spa treatment, beach day), and cultural experiences (local village visit, cooking class).</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">The Results</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• 98% satisfaction rating from participants</li>
                      <li>• Team reported improved collaboration post-retreat</li>
                      <li>• Three consecutive years of bookings secured</li>
                      <li>• Company expanded to annual team events</li>
                    </ul>
                  </div>
                </div>
                <blockquote className="border-l-4 border-secondary pl-4 mb-6 italic text-foreground">
                  "The Yaadie Xplorer transformed our retreat into a career-defining experience. Our team bonded in ways we never expected, and the professionalism was outstanding."
                  <p className="font-semibold text-primary mt-2">— Robert Williams, CEO TechFlow Solutions</p>
                </blockquote>
                <Link to="/group-packages" className="btn-primary inline-block w-fit">Explore Group Packages</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-primary text-white rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">2,500+</div>
              <p className="text-gray-100">Happy Guests</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">4.9★</div>
              <p className="text-gray-100">Average Rating</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">98%</div>
              <p className="text-gray-100">Would Recommend</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">15+</div>
              <p className="text-gray-100">Years Experience</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Ready to Create Your Story?</h3>
          <p className="text-foreground mb-6">Join thousands of satisfied travelers who've experienced Jamaica with The Yaadie Xplorer.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/tours" className="btn-primary">Browse Tours</Link>
            <Link to="/custom-tour" className="btn-secondary">Plan Custom Experience</Link>
          </div>
        </div>
      </div>
    </>
  )
}
