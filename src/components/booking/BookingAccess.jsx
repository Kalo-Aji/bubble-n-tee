import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authenticateAdmin } from '../../data/adminAuth.js'
import { authenticateCustomer, registerCustomer } from '../../data/customerAccounts.js'

export default function BookingAccess({ onAuthenticated }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (mode === 'admin') {
        if (!authenticateAdmin({ username, password })) {
          setError('The username or password is incorrect.')
          return
        }
        navigate('/admin', { state: { authenticated: true } })
        return
      }

      const customer = mode === 'register'
        ? await registerCustomer({ name, phone, password })
        : await authenticateCustomer({ phone, password })
      onAuthenticated(customer)
    } catch (submitError) {
      console.error('Unable to authenticate customer for booking.', submitError)
      setError(submitError instanceof Error
        ? submitError.message
        : 'We could not complete sign-in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode)
    setError('')
    setPassword('')
    setUsername('')
  }

  const isAdmin = mode === 'admin'
  const isRegistering = mode === 'register'

  return (
    <div className="booking-access">
      <p className="eyebrow">{isAdmin ? 'Admin account' : 'Customer account'}</p>
      <h2 id="booking-title">
        {isAdmin
          ? 'Sign in to manage bookings.'
          : isRegistering
            ? 'Create an account to book.'
            : 'Sign in to book a service.'}
      </h2>
      <p className="modal-intro">
        {isAdmin
          ? 'Use your admin username and password to continue.'
          : isRegistering
            ? 'Register with your name, phone number, and password.'
            : 'Sign in with your phone number and password to continue.'}
      </p>
      <div className="booking-access__options">
        <div className="booking-access__tabs" role="group" aria-label="Account option">
          <button
            className={`booking-access__tab${mode === 'login' ? ' booking-access__tab--active' : ''}`}
            type="button"
            aria-pressed={mode === 'login'}
            onClick={() => changeMode('login')}
          >
            Log in
          </button>
          <button
            className={`booking-access__tab${isRegistering ? ' booking-access__tab--active' : ''}`}
            type="button"
            aria-pressed={mode === 'register'}
            onClick={() => changeMode('register')}
          >
            Register
          </button>
          <button
            className={`booking-access__tab${isAdmin ? ' booking-access__tab--active' : ''}`}
            type="button"
            aria-pressed={isAdmin}
            onClick={() => changeMode('admin')}
          >
            Admin
          </button>
        </div>
      </div>
      <form className="form-grid booking-access__form" onSubmit={submit}>
        {isAdmin ? (
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
        ) : isRegistering && (
          <label className="field field--full">
            <span>Name</span>
            <input
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
        )}
        {!isAdmin && (
          <label className="field field--full">
            <span>Phone number</span>
            <input
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </label>
        )}
        <label className="field field--full">
          <span>Password</span>
          <input
            type="password"
            autoComplete={isRegistering ? 'new-password' : 'current-password'}
            minLength={isRegistering ? 8 : undefined}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {isRegistering && <small>Use at least 8 characters.</small>}
        </label>
        {error && <p className="field-error field--full" role="alert">{error}</p>}
        <button className="button button--primary field--full" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? 'Please wait…'
            : isAdmin
              ? 'Sign in as admin'
              : isRegistering
              ? 'Create account'
              : 'Log in and continue'}
        </button>
      </form>
      <p className="prototype-note booking-access__note">
        {isAdmin
          ? 'This prototype checks admin sign-in in this browser only. It is not secure authentication.'
          : 'Customer accounts are saved in this browser only. This demo is not secure authentication and should not be used for real customer information.'}
      </p>
    </div>
  )
}
