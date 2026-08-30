import { Link } from 'react-router-dom'
import { Users, Zap, Award, Clock } from 'lucide-react'

const benefits = [
  { icon: Users, title: 'Expert Coordination', text: 'Dedicated team handles logistics, timing, and special requests for seamless experiences.' },
  { icon: Zap, title: 'Competitive Pricing', text: 'Special group discounts and flexible payment options for organizations of all sizes.' },
  { icon: Award, title: 'Customization', text: "Tailor itineraries to your group's interests, pace, and any special requirements." },
  { icon: Clock, title: 'Flexibility', text: 'Flexible dates, scalable groups, and accommodations for all fitness levels.' },
]

const packages = [
  {
    title: 'Adventure & Thrill',
    audience: 'Team building, youth groups, adventure seekers',
    items: ['ATV safari & zipline adventure', 'Mountain hiking expeditions', 'Catamaran with water sports', 'Jet car & adrenaline activities'],
    price: '$85',
    unit: 'per person',
    note: 'Groups 8+',
  },
  {
    title: 'Relaxation & Culture',
    audience: 'Luxury retreats, wellness groups, cultural enthusiasts',
    items: ['Bamboo rafting with massage', 'Cultural heritage tours', 'Sunset beach experiences', 'Local cuisine & shopping'],
    price: '$65',
    unit: 'per person',
    note: 'Groups 8+',
  },
  {
    title: 'Private Yacht Charter',
    audience: 'Executive events, celebrations, intimate groups',
    items: ['Luxury yacht rental (3 hours)', 'Complimentary finger food & open bar', 'Professional crew & captain', 'Up to 18 guests'],
    price: '$2,160',
    unit: 'flat, for 3 hours',
    note: 'Max 18 people',
  },
  {
    title: 'Custom Multi-Day Retreat',
    audience: 'Executive retreats, incentive trips, customized experiences',
    items: ['Multi-day itinerary design', 'Accommodation partnerships', 'Meals & dining coordination', 'Team-building activities'],
    price: 'Call for pricing',
    unit: '',
    note: 'Any group size',
  },
]

export default function GroupPackages() {
  return (
    <>
      <section id="group-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Group Packages & Corporate Events</h1>
          <p className="text-lg text-gray-100">Unforgettable team experiences and group adventures in Jamaica</p>
        </div>
      </section>

      <div className="section-container py-12">
        {/* Group Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Why Choose Group Tours with The Yaadie Xplorer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div key={b.title} className={`bg-white rounded-lg shadow-md p-6 border-t-4 ${i % 2 === 0 ? 'border-secondary' : 'border-primary'}`}>
                <b.icon className={i % 2 === 0 ? 'text-secondary mb-3' : 'text-primary mb-3'} size={32} />
                <h3 className="font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Package Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Our Group Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.title} className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-secondary">
                <div className="bg-primary text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                  <p className="text-gray-100">Perfect for: {pkg.audience}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-secondary">✓</span>
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">{pkg.unit ? 'Starting from' : 'Custom quote'}</p>
                    <p className="text-2xl font-bold text-primary">
                      {pkg.price} {pkg.unit && <span className="text-lg font-normal">{pkg.unit}</span>}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">{pkg.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Group Features */}
        <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-primary mb-6">Group Tour Inclusions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-foreground mb-3">Standard Inclusions</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>✓ Professional guide per 12-15 people</li>
                <li>✓ All transportation</li>
                <li>✓ Entry fees</li>
                <li>✓ Complimentary drinks & snacks</li>
                <li>✓ First aid kit & safety equipment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-3">Optional Add-ons</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>✓ Photography/videography service</li>
                <li>✓ Souvenir t-shirts</li>
                <li>✓ Group meals & dinner</li>
                <li>✓ Travel insurance coordination</li>
                <li>✓ Pre-tour briefing & planning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Plan Your Group Adventure?</h3>
          <p className="text-gray-100 mb-6">Contact our group coordinator for a custom quote and detailed planning.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/custom-tour" className="btn-secondary">Request Group Quote</Link>
            <a href="tel:876-326-3354" className="btn-outline text-white border-white hover:bg-white hover:text-primary">Call 876-326-3354</a>
          </div>
        </div>
      </div>
    </>
  )
}
