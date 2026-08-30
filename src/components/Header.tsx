import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/tours', label: 'Tours' },
  { href: '/about', label: 'About' },
  { href: '/group-packages', label: 'Groups' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-primary text-white">
      <nav className="section-container py-3 flex justify-between items-center">
        {/* Logo on the left */}
        <Link to="/" className="flex items-center flex-shrink-0 gap-2" onClick={() => setMenuOpen(false)}>
          {/* TODO: replace with client's actual logo asset */}
          <span className="flex items-center justify-center h-10 w-10 rounded-md bg-secondary text-black font-extrabold text-lg">
            YX
          </span>
          <span className="hidden sm:inline font-bold text-lg tracking-tight">The Yaadie Xplorer</span>
        </Link>

        {/* Menu items in the middle (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-white hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Shopping cart, admin, and menu icons on the right */}
        <div className="flex items-center gap-4">
          <Link to="/booking" className="text-white hover:text-secondary transition-colors" title="Book a Tour">
            <ShoppingCart size={22} strokeWidth={2.25} />
          </Link>
          <Link
            to="/admin/dashboard"
            className="hidden sm:inline text-white hover:text-secondary transition-colors text-sm font-medium"
          >
            Admin
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden text-white hover:text-secondary transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} strokeWidth={2.25} /> : <Menu size={26} strokeWidth={2.25} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-primary border-t border-white/20 text-white">
          <div className="section-container py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-white hover:text-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/20 pt-3 mt-3 flex flex-col gap-3">
              <Link to="/booking" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white hover:text-secondary transition-colors">
                Book a Tour
              </Link>
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white hover:text-secondary transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
