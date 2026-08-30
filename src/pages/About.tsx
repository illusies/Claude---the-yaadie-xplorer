import { Link } from 'react-router-dom'
import { Heart, Target, Users } from 'lucide-react'
import { placeholderImage } from '@/lib/placeholder-image'

const teamImage = placeholderImage('Team Member', { w: 400, h: 400 })

const team = [
  { name: 'Marcus Johnson', role: 'Founder & Operations Manager', specialty: 'Custom itineraries & group bookings' },
  { name: 'Amelia Brown', role: 'Senior Guide', specialty: 'Adventure tours & mountain expeditions' },
  { name: 'David Thompson', role: 'Water Sports Director', specialty: 'Catamaran & aquatic experiences' },
  { name: 'Sophia Grant', role: 'Cultural Experience Specialist', specialty: 'Heritage tours & local connections' },
]

export default function About() {
  return (
    <>
      <section id="about-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About The Yaadie Xplorer</h1>
          <p className="text-lg text-gray-100">Bringing Jamaica's wonders to the world, one adventure at a time</p>
        </div>
      </section>

      <div className="section-container py-12">
        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-foreground mb-4 leading-relaxed">
                The Yaadie Xplorer was born from a passion for sharing Jamaica's natural beauty and vibrant culture
                with travelers from around the world. What started as a small local operation has grown into a
                trusted name in Caribbean tourism, known for creating unforgettable experiences.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                Our name, "Yaadie," reflects the warmth and hospitality of Jamaican culture — a spirit we bring to
                every tour. We believe that travel isn't just about seeing destinations; it's about connecting with
                people, places, and experiences that transform you.
              </p>
              <p className="text-foreground leading-relaxed">
                From the cascading waters of Dunn's River to the bioluminescent magic of Luminous Lagoon, we've
                curated experiences that showcase the best of Jamaica while maintaining the highest standards of
                safety, quality, and sustainability.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-primary mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                {[
                  '15+ years of experience in Jamaican tourism',
                  '2,000+ satisfied travelers annually',
                  '4.8★ average guest rating',
                  'Professional, certified guides',
                  'Flexible & customizable tours',
                  'Commitment to sustainability',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-secondary text-lg">✓</span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-primary">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-primary" size={28} />
              <h3 className="text-xl font-bold text-primary">Our Mission</h3>
            </div>
            <p className="text-foreground">
              To create authentic, unforgettable Caribbean experiences that connect travelers with Jamaica's natural
              wonders, vibrant culture, and warm-hearted people while maintaining the highest standards of safety and
              sustainability.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-secondary">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-secondary" size={28} />
              <h3 className="text-xl font-bold text-primary">Our Values</h3>
            </div>
            <p className="text-foreground">
              Hospitality, integrity, adventure, sustainability, and excellence. We treat every guest like family and
              take pride in delivering experiences that exceed expectations while respecting Jamaica's environment
              and communities.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-primary">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-primary" size={28} />
              <h3 className="text-xl font-bold text-primary">Our Community</h3>
            </div>
            <p className="text-foreground">
              We're deeply rooted in Montego Bay and Jamaica. Our team of local guides and partners are passionate
              ambassadors who know every waterfall, trail, and hidden gem — and love sharing them with visitors.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6">Meet Our Team</h2>
          <p className="text-muted-foreground mb-8">Passionate Jamaicans dedicated to delivering world-class experiences</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow text-center">
                <img src={teamImage} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability */}
        <div className="bg-green-50 rounded-xl p-8 border-l-4 border-primary">
          <h2 className="text-2xl font-bold text-primary mb-4">Our Commitment to Sustainability</h2>
          <p className="text-foreground mb-4">
            We believe in protecting Jamaica's natural treasures for future generations. Our sustainability practices
            include:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Eco-friendly transportation and minimal plastic use on tours',
              'Supporting local communities and fair wages for all team members',
              'Wildlife and habitat protection on all nature tours',
              "Education about Jamaica's ecosystems and conservation needs",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <section className="bg-primary text-white py-12 mt-12">
        <div className="section-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Jamaica Like a Local?</h2>
          <p className="text-lg text-gray-100 mb-8">Start your adventure today</p>
          <Link to="/tours" className="btn-secondary text-lg">
            Browse Tours
          </Link>
        </div>
      </section>
    </>
  )
}
