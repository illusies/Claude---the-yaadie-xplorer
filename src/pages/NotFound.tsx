import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="section-container py-24 text-center">
      <p className="text-secondary font-bold text-lg mb-2">404</p>
      <h1 className="text-4xl font-bold text-foreground mb-4">Page Not Found</h1>
      <p className="text-muted-foreground mb-8">
        Looks like this trail doesn't lead anywhere. Let's get you back on the map.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/" className="btn-primary">Back to Home</Link>
        <Link to="/tours" className="btn-outline">Browse Tours</Link>
      </div>
    </div>
  )
}
