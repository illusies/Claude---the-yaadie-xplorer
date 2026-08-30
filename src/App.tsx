import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'

import Home from './pages/Home'
import Tours from './pages/Tours'
import CustomTour from './pages/CustomTour'
import Booking from './pages/Booking'
import Checkout from './pages/Checkout'
import BookingConfirmation from './pages/BookingConfirmation'
import Reviews from './pages/Reviews'
import Testimonials from './pages/Testimonials'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import About from './pages/About'
import GroupPackages from './pages/GroupPackages'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import NotFound from './pages/NotFound'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AuthCallbackPage from './pages/auth/AuthCallbackPage'

/** Scrolls to the top of the page on every route change, mirroring standard multi-page-site behavior. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/custom-tour" element={<CustomTour />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/group-packages" element={<GroupPackages />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignUp />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
