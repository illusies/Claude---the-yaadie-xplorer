import { Link } from 'react-router-dom'
import { Instagram, Facebook, Music } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-secondary mb-4">The Yaadie Xplorer</h3>
            <p className="text-sm text-gray-300">
              Premium Jamaican tours, transfers, and unforgettable Caribbean adventures.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="text-sm text-gray-300 space-y-2">
              <p>📍 Lot 1220 Porto Bello Meadows, Montego Bay, St James, Jamaica</p>
              <p>📞 876-326-3354</p>
              <p>✉️ theyaadiexplorer@gmail.com</p>
              <p>🕒 9am - 6pm EST</p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/the.yaadie.xplorer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com/the.yaadie.xplorer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://tiktok.com/@the.yaadie.xplorer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="TikTok"
              >
                <Music size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-xs">
            <div>
              <h4 className="font-semibold text-white mb-3">Explore</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/tours" className="hover:text-secondary transition-colors">Tours</Link></li>
                <li><Link to="/custom-tour" className="hover:text-secondary transition-colors">Custom Tour</Link></li>
                <li><Link to="/group-packages" className="hover:text-secondary transition-colors">Groups</Link></li>
                <li><Link to="/gallery" className="hover:text-secondary transition-colors">Gallery</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Learn</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="hover:text-secondary transition-colors">Blog</Link></li>
                <li><Link to="/reviews" className="hover:text-secondary transition-colors">Reviews</Link></li>
                <li><Link to="/testimonials" className="hover:text-secondary transition-colors">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
                <li><Link to="/terms" className="hover:text-secondary transition-colors">Terms</Link></li>
                <li><Link to="/privacy" className="hover:text-secondary transition-colors">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-secondary transition-colors">Home</Link></li>
                <li><a href="tel:876-326-3354" className="hover:text-secondary transition-colors">Call Us</a></li>
                <li><a href="mailto:theyaadiexplorer@gmail.com" className="hover:text-secondary transition-colors">Email</a></li>
                <li><Link to="/booking-confirmation" className="hover:text-secondary transition-colors">Confirmation</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-400 border-t border-gray-700 pt-6">
            <p>&copy; {new Date().getFullYear()} The Yaadie Xplorer Tours and Transfers. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
