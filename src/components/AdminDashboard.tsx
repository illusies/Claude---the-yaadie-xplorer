import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { LogOut, TrendingUp, Users, Calendar, DollarSign, AlertCircle, Loader } from 'lucide-react'

interface DashboardStats {
  totalBookings: number
  confirmedBookings: number
  pendingBookings: number
  totalRevenue: number
  depositPaid: number
  totalCustomers: number
}

interface RecentBooking {
  id: string
  booking_reference: string
  customer_id: string
  tour_id: string
  booking_date: string
  number_of_participants: number
  status: string
  estimated_price: number
}

interface PaymentRecord {
  id: string
  booking_id: string
  amount: number
  deposit_amount: number | null
  balance_amount: number | null
  payment_status: string
  payment_method: string | null
  created_at: string
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([])
  const [allBookings, setAllBookings] = useState<RecentBooking[]>([])
  const [allPayments, setAllPayments] = useState<PaymentRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()

      if (!currentUser) {
        window.location.href = '/admin/login'
        return
      }

      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('email')
        .eq('email', currentUser.email)
        .single()

      if (adminError || !adminData) {
        window.location.href = '/admin/login'
        return
      }

      setUser(currentUser)
      await loadDashboardData()
    } catch (err) {
      console.error('Error checking admin access:', err)
      window.location.href = '/admin/login'
    }
  }

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')

      // Get all bookings
      const { data: bookingsData } = await supabase.from('bookings').select('*')

      // Get all payments
      const { data: paymentsData } = await supabase.from('payments').select('*')

      // Get all customers
      const { data: customersData } = await supabase.from('customers').select('*')

      // Calculate stats
      if (bookingsData && paymentsData) {
        const totalBookings = bookingsData.length
        const confirmedBookings = bookingsData.filter((b) => b.status === 'confirmed').length
        const pendingBookings = bookingsData.filter((b) => b.status === 'pending').length
        const totalRevenue = paymentsData.reduce((sum, p) => sum + (p.amount || 0), 0)
        const depositPaid = paymentsData
          .filter((p) => p.payment_status === 'deposit_paid' || p.payment_status === 'fully_paid')
          .reduce((sum, p) => sum + (p.deposit_amount || 0), 0)
        const totalCustomers = customersData?.length || 0

        setStats({
          totalBookings,
          confirmedBookings,
          pendingBookings,
          totalRevenue,
          depositPaid,
          totalCustomers,
        })

        // Get recent bookings (and keep the full sorted lists for the Bookings/Payments tabs)
        const sorted = [...bookingsData].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        setRecentBookings(sorted.slice(0, 5))
        setAllBookings(sorted)
        setAllPayments([...paymentsData].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
      }
    } catch (err: any) {
      console.error('Error loading dashboard data:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-50">
        <div className="section-container flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage bookings, payments, and customers</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="section-container py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Bookings */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Bookings</h3>
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.totalBookings}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {stats.confirmedBookings} confirmed, {stats.pendingBookings} pending
              </p>
            </div>

            {/* Revenue */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
                <DollarSign className="h-5 w-5 text-secondary" />
              </div>
              <p className="text-3xl font-bold text-foreground">${stats.totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                ${stats.depositPaid.toFixed(2)} deposits collected
              </p>
            </div>

            {/* Customers */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Total Customers</h3>
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.totalCustomers}</p>
              <p className="text-xs text-muted-foreground mt-2">Active bookings tracked</p>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'bookings'
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'payments'
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            Payments
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Recent Bookings</h2>
            {recentBookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No bookings yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Reference</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Date</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Participants</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Price</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border hover:bg-background transition-colors">
                        <td className="py-3 px-4 font-semibold text-foreground">{booking.booking_reference}</td>
                        <td className="py-3 px-4 text-muted-foreground">{new Date(booking.booking_date).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-muted-foreground">{booking.number_of_participants}</td>
                        <td className="py-3 px-4 text-foreground font-semibold">${booking.estimated_price.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">All Bookings ({allBookings.length})</h2>
            {allBookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No bookings yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Reference</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Date</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Participants</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Price</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border hover:bg-background transition-colors">
                        <td className="py-3 px-4 font-semibold text-foreground">{booking.booking_reference}</td>
                        <td className="py-3 px-4 text-muted-foreground">{new Date(booking.booking_date).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-muted-foreground">{booking.number_of_participants}</td>
                        <td className="py-3 px-4 text-foreground font-semibold">${booking.estimated_price.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Payment Tracking ({allPayments.length})</h2>
            {allPayments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No payments yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Date</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Amount</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Deposit</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Balance</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Method</th>
                      <th className="text-left py-2 px-4 font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPayments.map((payment) => (
                      <tr key={payment.id} className="border-b border-border hover:bg-background transition-colors">
                        <td className="py-3 px-4 text-muted-foreground">{new Date(payment.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-foreground font-semibold">${payment.amount.toFixed(2)}</td>
                        <td className="py-3 px-4 text-muted-foreground">{payment.deposit_amount != null ? `$${payment.deposit_amount.toFixed(2)}` : '—'}</td>
                        <td className="py-3 px-4 text-muted-foreground">{payment.balance_amount != null ? `$${payment.balance_amount.toFixed(2)}` : '—'}</td>
                        <td className="py-3 px-4 text-muted-foreground capitalize">{payment.payment_method || '—'}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              payment.payment_status === 'fully_paid'
                                ? 'bg-green-100 text-green-800'
                                : payment.payment_status === 'refunded'
                                ? 'bg-red-100 text-red-800'
                                : payment.payment_status === 'deposit_paid'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {payment.payment_status.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
