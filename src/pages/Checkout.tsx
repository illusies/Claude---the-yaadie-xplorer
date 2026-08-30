import CheckoutForm from '@/components/CheckoutForm'

export default function Checkout() {
  return (
    <>
      <section id="checkout-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Complete Your Booking</h1>
          <p className="text-lg text-gray-100">Review and confirm your tour reservation</p>
        </div>
      </section>

      <div className="section-container py-12">
        <CheckoutForm />
      </div>
    </>
  )
}
