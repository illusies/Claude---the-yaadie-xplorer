import { useState } from 'react'
import { Calendar, User, ArrowRight, Loader } from 'lucide-react'
import { placeholderImage } from '@/lib/placeholder-image'
import { submitNewsletterSignup } from '@/lib/forms'

const posts = [
  { id: 1, title: '10 Hidden Gems of Jamaica You Must Visit', excerpt: 'Discover the lesser-known waterfalls, beaches, and natural wonders that make Jamaica truly special.', author: 'Amelia Brown', date: '2026-07-15', category: 'Travel Guide', readTime: 8 },
  { id: 2, title: 'What to Pack for Your Jamaica Adventure', excerpt: "A complete packing guide ensuring you're prepared for water activities, hiking, and tropical weather.", author: 'Marcus Johnson', date: '2026-07-10', category: 'Travel Tips', readTime: 5 },
  { id: 3, title: "The Magic of Luminous Lagoon: Nature's Glow", excerpt: "Explore the science behind Jamaica's most enchanting natural phenomenon—the glowing waters of Luminous Lagoon.", author: 'Sophia Grant', date: '2026-07-05', category: 'Nature', readTime: 6 },
  { id: 4, title: 'Sustainable Tourism: How to Travel Responsibly in Jamaica', excerpt: 'Learn how to minimize your environmental impact while supporting local communities during your visit.', author: 'David Thompson', date: '2026-06-28', category: 'Sustainability', readTime: 10 },
  { id: 5, title: 'Jamaican Cuisine: A Culinary Journey', excerpt: 'From ackee and saltfish to jerk chicken, discover the flavors that define Jamaican food culture.', author: 'Marcus Johnson', date: '2026-06-20', category: 'Culture', readTime: 7 },
  { id: 6, title: 'Planning Your Perfect Group Adventure in Jamaica', excerpt: 'Tips for organizing memorable group tours, handling logistics, and ensuring everyone has an amazing time.', author: 'Amelia Brown', date: '2026-06-12', category: 'Travel Tips', readTime: 9 },
]

const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))]
const featured = posts[0]
const rest = posts.slice(1)

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      await submitNewsletterSignup(email)
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4 text-center text-green-700 max-w-md mx-auto">
        Thank you for subscribing! Check your email for a confirmation.
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          disabled={status === 'submitting'}
          className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-secondary disabled:opacity-50"
        />
        <button type="submit" disabled={status === 'submitting'} className="btn-secondary whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-50">
          {status === 'submitting' ? <Loader className="h-4 w-4 animate-spin" /> : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 text-center text-red-700 max-w-md mx-auto">
          There was an error subscribing. Please try again.
        </div>
      )}
    </>
  )
}

export default function Blog() {
  const [active, setActive] = useState('All')
  const visible = active === 'All' ? rest : rest.filter((p) => p.category === active)

  return (
    <>
      <section id="blog-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Blog</h1>
          <p className="text-lg text-gray-100">Tips, guides, and stories from Jamaica's premier tour company</p>
        </div>
      </section>

      <div className="section-container py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  active === cat ? 'bg-primary text-white' : 'bg-gray-200 text-foreground hover:bg-secondary hover:text-black'
                }`}
              >
                {cat === 'All' ? 'All Posts' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12 border-l-4 border-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <img src={placeholderImage('Hidden Gems of Jamaica', { w: 800, h: 500 })} alt="Featured post" className="w-full h-64 md:h-full object-cover" />
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block bg-secondary text-black px-3 py-1 rounded-full text-sm font-semibold mb-3 w-fit">Featured</span>
              <h2 className="text-3xl font-bold text-primary mb-3">{featured.title}</h2>
              <p className="text-foreground mb-4">{featured.excerpt}</p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-2"><User size={16} /> {featured.author}</span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} /> {new Date(featured.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span>{featured.readTime} min read</span>
              </div>
              <span className="btn-primary inline-flex items-center gap-2 w-fit cursor-default">
                Read More <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 overflow-hidden">
                <img src={placeholderImage(post.category, { w: 600, h: 400 })} alt={post.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <span className="inline-block bg-green-100 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3">{post.category}</span>
                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                  <span>{post.readTime} min</span>
                </div>
                <span className="text-primary font-semibold hover:text-secondary transition-colors flex items-center gap-2 cursor-default">
                  Read More <ArrowRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-primary text-white rounded-xl p-8 mt-16 text-center">
          <h3 className="text-2xl font-bold mb-3">Never Miss a Post</h3>
          <p className="text-gray-100 mb-6">Get the latest travel tips, destination guides, and Jamaica stories delivered to your inbox.</p>
          <NewsletterForm />
        </div>
      </div>
    </>
  )
}
