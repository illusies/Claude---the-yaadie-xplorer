import BookingForm from '@/components/BookingForm'

export default function Booking() {
  return (
    <>
      <section id="booking-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Tour</h1>
          <p className="text-lg text-gray-100">Choose your adventure and secure your spot today</p>
        </div>
      </section>

      <div className="section-container py-12">
        <BookingForm />
      </div>
    </>
  )
}
