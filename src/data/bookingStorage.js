const BOOKINGS_KEY = 'bubble-n-tee-bookings'

export function getBookings() {
  const savedBookings = window.localStorage.getItem(BOOKINGS_KEY)
  if (!savedBookings) return []

  const bookings = JSON.parse(savedBookings)
  if (!Array.isArray(bookings)) {
    throw new Error('Saved bookings are not in the expected format.')
  }
  const validBookings = bookings.every((booking) => (
    booking &&
    typeof booking.id === 'string' &&
    typeof booking.name === 'string' &&
    typeof booking.phone === 'string' &&
    (booking.email === undefined || typeof booking.email === 'string') &&
    typeof booking.service === 'string' &&
    typeof booking.date === 'string' &&
    typeof booking.time === 'string'
  ))
  if (!validBookings) {
    throw new Error('Saved bookings contain an invalid entry.')
  }

  return bookings
}

export function saveBooking(details) {
  const bookings = getBookings()
  const booking = {
    ...details,
    id: window.crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }

  window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify([booking, ...bookings]))
  return booking
}

export function removeBooking(id) {
  const bookings = getBookings()
  const updatedBookings = bookings.filter((booking) => booking.id !== id)

  if (updatedBookings.length === bookings.length) {
    throw new Error('The booking to delete could not be found.')
  }

  window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings))
  return updatedBookings
}

export function markBookingFinished(id) {
  const bookings = getBookings()
  let bookingFound = false
  const updatedBookings = bookings.map((booking) => {
    if (booking.id !== id) return booking
    bookingFound = true
    return { ...booking, status: 'finished' }
  })

  if (!bookingFound) {
    throw new Error('The booking to update could not be found.')
  }

  window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings))
  return updatedBookings
}
