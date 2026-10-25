import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authenticateAdmin } from '../data/adminAuth.js'
import { getBookings, markBookingFinished, removeBooking } from '../data/bookingStorage.js'

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    if (authenticateAdmin({ username, password })) {
      setError('')
      onLogin()
      return
    }

    setError('The username or password is incorrect.')
  }

  return (
    <section className="admin-panel admin-login" aria-labelledby="admin-title">
      <p className="eyebrow">Bubble N Tee</p>
      <h1 id="admin-title">Admin sign in</h1>
      <p>Sign in to review customer booking requests.</p>
      <form className="form-grid admin-login__form" onSubmit={submit}>
        <label className="field field--full">
          <span>Username</span>
          <input
            name="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label className="field field--full">
          <span>Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error && <p className="field-error field--full" role="alert">{error}</p>}
        <button className="button button--primary field--full" type="submit">Sign in</button>
      </form>
      <Link className="admin-back-link" to="/">← Back to customer website</Link>
      <p className="prototype-note admin-login__note">This prototype stores bookings and checks this demo login in your browser only. It is not a secure system for real customer information.</p>
    </section>
  )
}

function formatDate(date) {
  if (!date) return '—'
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
    new Date(`${date}T00:00:00`),
  )
}

function AdminDashboard({ onLogout }) {
  const [{ bookings: initialBookings, loadError }] = useState(() => {
    try {
      return { bookings: getBookings(), loadError: '' }
    } catch (error) {
      console.error('Unable to load saved bookings.', error)
      return {
        bookings: [],
        loadError: 'Bookings could not be read from this browser. Saved browser data may be invalid.',
      }
    }
  })
  const [bookings, setBookings] = useState(initialBookings)
  const [search, setSearch] = useState('')
  const [serviceFilter, setServiceFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [bookingActionError, setBookingActionError] = useState('')
  const services = [...new Set(bookings.map((booking) => booking.service))].sort()
  const normalizedSearch = search.trim().toLocaleLowerCase()
  const filteredBookings = bookings.filter((booking) => {
    const matchesService = !serviceFilter || booking.service === serviceFilter
    const matchesStatus = !statusFilter ||
      (statusFilter === 'finished' ? booking.status === 'finished' : booking.status !== 'finished')
    const searchableValues = [
      booking.name,
      booking.phone,
      booking.email,
      booking.service,
      booking.option,
    ]
    const matchesSearch = !normalizedSearch || searchableValues.some((value) => (
      value?.toLocaleLowerCase().includes(normalizedSearch)
    ))
    return matchesService && matchesStatus && matchesSearch
  })

  function deleteBooking(booking) {
    if (!window.confirm(`Delete the booking for ${booking.name}? This cannot be undone.`)) return

    try {
      setBookings(removeBooking(booking.id))
      setBookingActionError('')
    } catch (error) {
      console.error('Unable to delete booking.', error)
      setBookingActionError('This booking could not be deleted. Please refresh the page and try again.')
    }
  }

  function finishBooking(booking) {
    try {
      setBookings(markBookingFinished(booking.id))
      setBookingActionError('')
    } catch (error) {
      console.error('Unable to mark booking as finished.', error)
      setBookingActionError('This booking could not be updated. Please refresh the page and try again.')
    }
  }

  return (
    <section className="admin-panel admin-dashboard" aria-labelledby="admin-title">
      <header className="admin-dashboard__header">
        <div>
          <p className="eyebrow">Bubble N Tee • Admin</p>
          <h1 id="admin-title">Customer bookings</h1>
          <p>Review the service requests saved in this browser.</p>
        </div>
        <div className="admin-dashboard__actions">
          <Link className="button button--outline" to="/customer">Customer website</Link>
          <button className="button button--primary" type="button" onClick={onLogout}>Sign out</button>
        </div>
      </header>

      <div className="admin-booking-count">
        <strong>{bookings.length}</strong>
        <span>{bookings.length === 1 ? 'booking' : 'bookings'}</span>
      </div>

      {loadError ? (
        <p className="admin-error" role="alert">{loadError}</p>
      ) : bookings.length === 0 ? (
        <div className="admin-empty">
          <h2>No bookings yet</h2>
          <p>Customer requests saved from this browser will appear here.</p>
        </div>
      ) : (
        <>
          <div className="admin-booking-filters">
            <label className="field">
              <span>Search bookings</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Name, phone, email, or service"
              />
            </label>
            <label className="field">
              <span>Filter by service</span>
              <select value={serviceFilter} onChange={(event) => setServiceFilter(event.target.value)}>
                <option value="">All services</option>
                {services.map((service) => <option key={service} value={service}>{service}</option>)}
              </select>
            </label>
            <label className="field">
              <span>Filter by status</span>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="">All statuses</option>
                <option value="pending">Pending</option>
                <option value="finished">Finished</option>
              </select>
            </label>
          </div>
          <p className="admin-filter-count" aria-live="polite">
            Showing {filteredBookings.length} of {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
          </p>
          {bookingActionError && <p className="admin-error" role="alert">{bookingActionError}</p>}
          {filteredBookings.length === 0 ? (
            <div className="admin-empty">
              <h2>No matching bookings</h2>
              <p>Try another search or choose a different service filter.</p>
            </div>
          ) : (
            <div className="admin-bookings">
              {filteredBookings.map((booking) => (
                <article className="admin-booking" key={booking.id}>
                  <header className="admin-booking__header">
                    <div>
                      <h2>{booking.name}</h2>
                      <p>{booking.service}{booking.option ? ` · ${booking.option}` : ''}</p>
                      <span className={`admin-booking-status${booking.status === 'finished' ? ' admin-booking-status--finished' : ''}`}>
                        {booking.status === 'finished' ? 'Finished' : 'Pending'}
                      </span>
                    </div>
                    <div className="admin-booking__actions">
                      <span className="admin-booking__date">{formatDate(booking.date)} at {booking.time || '—'}</span>
                      {booking.status !== 'finished' && (
                        <button
                          className="button admin-finish-button"
                          type="button"
                          onClick={() => finishBooking(booking)}
                          aria-label={`Mark booking for ${booking.name} as finished`}
                        >
                          Mark as finished
                        </button>
                      )}
                      <button
                        className="button admin-delete-button"
                        type="button"
                        onClick={() => deleteBooking(booking)}
                        aria-label={`Delete booking for ${booking.name}`}
                      >
                        Delete booking
                      </button>
                    </div>
                  </header>
                  <dl className="admin-booking__details">
                    <div><dt>Phone</dt><dd><a href={`tel:${booking.phone}`}>{booking.phone}</a></dd></div>
                    {booking.email && <div><dt>Email</dt><dd><a href={`mailto:${booking.email}`}>{booking.email}</a></dd></div>}
                    <div>
                      <dt>Handoff</dt>
                      <dd>
                        {booking.handoff || '—'}
                        {(booking.transportFeeStatus || booking.deliveryStatus) &&
                          ` (${booking.transportFeeStatus || booking.deliveryStatus} transport fee)`}
                      </dd>
                    </div>
                    <div><dt>Location</dt><dd>{booking.location || '—'}</dd></div>
                    {booking.instructions && <div className="admin-booking__instructions"><dt>Instructions</dt><dd>{booking.instructions}</dd></div>}
                  </dl>
                </article>
              ))}
            </div>
          )}
        </>
      )}
      <p className="prototype-note admin-dashboard__note">These bookings are stored locally in this browser only. They are not shared with other devices or sent to the shop.</p>
    </section>
  )
}

export default function AdminPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => location.state?.authenticated === true,
  )

  return (
    <main className="admin-page">
      {isAuthenticated
        ? <AdminDashboard onLogout={() => navigate('/', { replace: true })} />
        : <AdminLogin onLogin={() => setIsAuthenticated(true)} />}
    </main>
  )
}
