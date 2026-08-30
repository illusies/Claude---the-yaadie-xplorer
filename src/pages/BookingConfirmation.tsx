import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, Mail, Phone, AlertCircle, Loader } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface BookingDetails {
  booking_reference: string | null
  booking_date: string
  number_of_participants: number
  estimated_price: number
  status: string
  tourName: string
  depositAmount: number | null
  balanceAmount: number | null
  paymentStatus: string | null
}

export default function BookingConfirmation() {
  const [searchParams] = useSearchParams()
  const bookingId = searchParams.get('booking')
  const [loading, setLoading] = useState(Boolean(bookingId))
  const [booking, setBooking] = useState<BookingDetails | null>(null)

  useEffect(() => {
    if (!bookingId) return

    let cancelled = false
    ;(async () => {
      const { data: bookingData } = await supabase.from('bookings').select('*').eq('id', bookingId).single()
      if (!bookingData || cancelled) {
        setLoading(false)
        return
      }
      const [{ data: tourData }, { data: paymentData }] = await Promise.all([
        supabase.from('tours').select('name').eq('id', bookingData.tour_id).single(),
        supabase.from('payments').select('*').eq('booking_id', bookingId).single(),
      ])
      if (cancelled) return
      setBooking({
        booking_reference: bookingData.booking_reference,
        booking_date: bookingData.booking_date,
        number_of_participants: bookingData.number_of_participants,
        estimated_price: bookingData.estimated_price,
        status: bookingData.status,
        tourName: tourData?.name || 'Your tour',
        depositAmount: paymentData?.deposit_amount ?? null,
        balanceAmount: paymentData?.balance_amount ?? null,
        paymentStatus: paymentData?.payment_status ?? null,
      })
      setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [bookingId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="section-container py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success Message */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-8 border-2 border-green-500">
          <div className="flex items-center gap-4 mb-6">
            <CheckCircle className="text-green-600" size={48} />
            <div>
              <h1 className="text-3xl font-bold text-green-700">Booking Confirmed!</h1>
              <p className="text-green-600">Your adventure awaits</p>
            </div>
          </div>
          <p className="text-foreground mb-2">
            Thank you for booking with The Yaadie Xplorer! Your tour reservation has been successfully confirmed.
          </p>
          <p className="text-muted-foreground text-sm">
            A confirmation email has been sent to your registered email address with all tour details and important
            information.
          </p>
        </div>

        {/* Booking Details Card */}
        {booking ? (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Your Booking Details</h2>
            <div className="space-y-4 mb-8">
              <div className="border-b border-border pb-4">
                <p className="text-sm text-muted-foreground mb-1">Confirmation Number</p>
                <p className="text-lg font-bold text-foreground">{booking.booking_reference || '—'}</p>
              </div>
              <div className="border-b border-border pb-4">
                <p className="text-sm text-muted-foreground mb-1">Tour Name</p>
                <p className="text-lg font-bold text-foreground">{booking.tourName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-border pb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-bold text-foreground">{new Date(booking.booking_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Participants</p>
                  <p className="font-bold text-foreground">{booking.number_of_participants}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-foreground">Tour Cost</p>
                  <p className="text-2xl font-bold text-primary">${booking.estimated_price.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {booking.depositAmount != null && booking.balanceAmount != null && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-foreground mb-3">Payment Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground">Deposit (30%)</span>
                    <span className={`font-bold ${booking.paymentStatus === 'deposit_paid' || booking.paymentStatus === 'fully_paid' ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {booking.paymentStatus === 'deposit_paid' || booking.paymentStatus === 'fully_paid' ? '✓ ' : ''}
                      ${booking.depositAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-blue-200 pt-2">
                    <span className="text-foreground">Balance Due on Tour Date</span>
                    <span className="font-bold text-primary">${booking.balanceAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-primary text-white rounded-lg p-6">
              <h3 className="font-bold mb-4">Next Steps</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex gap-3"><span className="font-bold">1.</span><span>Check your email for the complete booking confirmation</span></li>
                <li className="flex gap-3"><span className="font-bold">2.</span><span>Pay the remaining balance before your tour date</span></li>
                <li className="flex gap-3"><span className="font-bold">3.</span><span>Arrive 15 minutes early on tour day at your pickup location</span></li>
                <li className="flex gap-3"><span className="font-bold">4.</span><span>Bring your confirmation number and valid ID</span></li>
              </ol>
            </div>
          </div>
        ) : bookingId ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 text-center text-yellow-800">
            We couldn't find that booking. If you just completed checkout, check your email for a confirmation, or{' '}
            <Link to="/contact" className="font-semibold underline">contact us</Link>.
          </div>
        ) : null}

        {/* Important Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={24} />
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">Important Information</h3>
              <ul className="text-sm text-yellow-800 space-y-2">
                <li>✓ Bring sunscreen, water shoes, and a change of clothes</li>
                <li>✓ Tour includes complimentary rum punch, red stripe beer, water, and coconut water (on selected tours)</li>
                <li>✓ Not suitable for pregnant women or those with heart conditions</li>
                <li>✓ Arrive 15 minutes early. Late arrivals may forfeit the tour</li>
                <li>✓ Cancellation policy applies (see Terms &amp; Conditions)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact & Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="text-primary" size={24} />
              <h3 className="font-bold text-foreground">Questions? Call Us</h3>
            </div>
            <p className="text-foreground mb-2">876-326-3354</p>
            <p className="text-xs text-muted-foreground">Available 9am - 6pm EST, 7 days a week</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="text-secondary" size={24} />
              <h3 className="font-bold text-foreground">Email Support</h3>
            </div>
            <p className="text-foreground mb-2 break-all">theyaadiexplorer@gmail.com</p>
            <p className="text-xs text-muted-foreground">Response within 24 hours</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 text-center border border-green-200">
          <h3 className="text-xl font-bold text-primary mb-3">Get Excited! 🎉</h3>
          <p className="text-foreground mb-6">
            Your Jamaican adventure is just around the corner. Follow us on Instagram to see what awaits you!
          </p>
          <a href="https://instagram.com/the.yaadie.xplorer" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Follow @the.yaadie.xplorer
          </a>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Check your email for the complete confirmation. If you don't see it, please check your spam folder or{' '}
          <Link to="/contact" className="underline">contact us</Link>.
        </p>
      </div>
    </div>
  )
}
