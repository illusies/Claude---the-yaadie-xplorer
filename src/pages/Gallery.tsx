import { useState } from 'react'
import { placeholderImage } from '@/lib/placeholder-image'

const images = [
  { id: 1, title: 'Caribbean Waters', category: 'Scenery' },
  { id: 2, title: "Dunn's River Cascades", category: 'Waterfalls' },
  { id: 3, title: 'Catamaran Sailing', category: 'Water Activities' },
  { id: 4, title: 'Blue Hole Adventure', category: 'Waterfalls' },
  { id: 5, title: 'Luxury Yacht Experience', category: 'Charters' },
  { id: 6, title: 'Marine Life', category: 'Scenery' },
  { id: 7, title: 'Sunset Cruise', category: 'Water Activities' },
  { id: 8, title: 'Beach Paradise', category: 'Scenery' },
  { id: 9, title: 'Adventure Awaits', category: 'Waterfalls' },
]

const categories = ['All', ...Array.from(new Set(images.map((i) => i.category)))]

export default function Gallery() {
  const [active, setActive] = useState('All')
  const visible = active === 'All' ? images : images.filter((i) => i.category === active)

  return (
    <>
      <section id="gallery-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-lg text-gray-100">Stunning moments from our guests' unforgettable Caribbean adventures</p>
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
                  active === cat ? 'bg-secondary text-black' : 'bg-gray-200 text-foreground hover:bg-secondary hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((img) => (
            <div key={img.id} className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all group cursor-pointer h-64">
              <img
                src={placeholderImage(img.title, { w: 600, h: 500 })}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity">{img.title}</h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">{img.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Share on Social */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Share Your Adventure</h3>
          <p className="text-foreground mb-6">Tag us on Instagram @the.yaadie.xplorer for a chance to be featured in our gallery!</p>
          <a href="https://instagram.com/the.yaadie.xplorer" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </>
  )
}
