import AdminLogin from '@/components/AdminLogin'

export default function AdminLoginPage() {
  return (
    <>
      <section id="admin-login-header" className="bg-gradient-to-r from-primary to-green-800 text-white py-12">
        <div className="section-container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Admin Portal</h1>
          <p className="text-lg text-gray-100">Manage your booking platform</p>
        </div>
      </section>

      <div className="section-container py-12">
        <AdminLogin />
      </div>
    </>
  )
}
