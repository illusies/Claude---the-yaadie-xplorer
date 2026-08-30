import AccountDashboard from '@/components/AccountDashboard'

export default function Account() {
  return (
    <>
      <section id="account-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Account</h1>
          <p className="text-lg text-gray-100">Manage your bookings and profile</p>
        </div>
      </section>

      <div className="section-container py-12">
        <AccountDashboard />
      </div>
    </>
  )
}
