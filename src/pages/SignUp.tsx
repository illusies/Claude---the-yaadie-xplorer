import { Link } from 'react-router-dom'
import SignInForm from '@/components/SignInForm'
import SignUpForm from '@/components/SignUpForm'

export default function SignUp() {
  return (
    <>
      <section id="signup-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Create Your Account</h1>
          <p className="text-lg text-gray-100">Sign in or create an account to book your Jamaican adventure</p>
        </div>
      </section>

      <div className="section-container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sign In Form */}
            <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Sign In</h2>
              <SignInForm />
            </div>

            {/* Sign Up Form */}
            <div className="bg-card rounded-lg border border-border p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Create Account</h2>
              <SignUpForm />
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-gradient-to-r from-green-50 to-amber-50 rounded-lg p-8 border-l-4 border-primary">
            <h3 className="text-xl font-bold text-foreground mb-4">Why Create an Account?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <li className="flex items-start gap-3">
                <div className="text-secondary text-2xl font-bold flex-shrink-0">✓</div>
                <div>
                  <p className="font-semibold text-foreground">Easy Booking</p>
                  <p className="text-sm text-muted-foreground">Book tours quickly with saved information</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-secondary text-2xl font-bold flex-shrink-0">✓</div>
                <div>
                  <p className="font-semibold text-foreground">Track Reservations</p>
                  <p className="text-sm text-muted-foreground">View and manage all your upcoming tours</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="text-secondary text-2xl font-bold flex-shrink-0">✓</div>
                <div>
                  <p className="font-semibold text-foreground">Exclusive Updates</p>
                  <p className="text-sm text-muted-foreground">Get special offers and new tour announcements</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center p-8 bg-background rounded-lg border border-border">
            <p className="text-foreground mb-4">Need help? Contact us directly:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="tel:876-326-3354" className="text-primary font-semibold hover:text-green-700 text-lg">
                📞 876-326-3354
              </a>
              <a
                href="https://wa.me/1876326354"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:text-green-700 text-lg"
              >
                💬 WhatsApp
              </a>
              <a href="mailto:theyaadiexplorer@gmail.com" className="text-primary font-semibold hover:text-green-700 text-lg">
                📧 Email
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            By continuing you agree to our{' '}
            <Link to="/terms" className="text-primary font-semibold hover:text-green-700">
              Terms
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary font-semibold hover:text-green-700">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
