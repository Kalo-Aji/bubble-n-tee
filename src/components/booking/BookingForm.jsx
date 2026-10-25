import { useState } from 'react'
import { saveBooking } from '../../data/bookingStorage.js'
import services from '../../data/services.js'
import TimePicker from './TimePicker.jsx'

const today = new Date()
today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
const minimumDate = today.toISOString().slice(0, 10)
const dropOffOption = 'Drop-off at the hub'
const pickupOnlyOption = 'Pickup only'
const deliveryOnlyOption = 'Delivery only'
const pickupDeliveryOption = 'Pickup & delivery'

function isWeekend(date) {
  if (!date) return false
  const day = new Date(`${date}T00:00:00`).getDay()
  return day === 0 || day === 5 || day === 6
}

function needsAddress(handoff) {
  return handoff !== dropOffOption
}

function getAddressLabel(handoff) {
  if (handoff === pickupOnlyOption) return 'Pickup address *'
  if (handoff === deliveryOnlyOption) return 'Delivery address *'
  if (handoff === pickupDeliveryOption) return 'Pickup / delivery address *'
  return 'Location (optional)'
}

function getHandoffOptionLabel(option, date) {
  if (option === dropOffOption) return option
  const feeStatus = !date
    ? 'SELECT DATE'
    : isWeekend(date)
      ? 'FREE: Friday–Sunday'
      : 'PAID: Monday–Thursday'
  return `${option} (${feeStatus})`
}

const initialForm = {
  name: '',
  phone: '',
  service: '',
  option: '',
  date: '',
  time: '',
  handoff: 'Drop-off at the hub',
  location: '',
  instructions: '',
}

export default function BookingForm({ selectedService, customer, onClose }) {
  const initialService = services.find((service) => service.title === selectedService)
  const [form, setForm] = useState({
    ...initialForm,
    name: customer.name,
    phone: customer.phone,
    service: selectedService,
    option: initialService?.options[0]?.name ?? '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [saveError, setSaveError] = useState('')
  const selected = services.find((service) => service.title === form.service)

  function update(event) {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === 'service'
        ? { option: services.find((service) => service.title === value)?.options[0]?.name ?? '' }
        : {}),
    }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function submit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Enter your name.'
    if (!form.phone.trim()) nextErrors.phone = 'Enter a contact number.'
    if (!form.service) nextErrors.service = 'Choose a service.'
    if (!form.date) nextErrors.date = 'Choose a preferred date.'
    if (!form.time) nextErrors.time = 'Choose a preferred time.'
    if (needsAddress(form.handoff) && !form.location.trim()) {
      nextErrors.location = form.handoff === deliveryOnlyOption
        ? 'Enter a delivery address.'
        : 'Enter a pickup address.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      try {
        saveBooking({
          ...form,
          transportFeeStatus: needsAddress(form.handoff)
            ? isWeekend(form.date) ? 'free' : 'paid'
            : '',
        })
        setSubmitted(true)
      } catch (error) {
        console.error('Unable to save booking in browser storage.', error)
        setSaveError('We could not save your booking in this browser. Please try again or contact the shop directly.')
      }
    }
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon" aria-hidden="true">✓</span>
        <h3>Your booking details are saved</h3>
        <p>The shop can view this booking from the admin page in this browser. Contact us to confirm availability and arrangements.</p>
        <button className="button button--primary" type="button" onClick={onClose}>Done</button>
      </div>
    )
  }

  return (
    <form className="form-grid" onSubmit={submit} noValidate>
      <label className="field">
        <span>Full name *</span>
        <input name="name" autoComplete="name" value={form.name} onChange={update} aria-invalid={Boolean(errors.name)} />
        {errors.name && <small className="field-error">{errors.name}</small>}
      </label>
      <label className="field">
        <span>Contact number *</span>
        <input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update} aria-invalid={Boolean(errors.phone)} />
        {errors.phone && <small className="field-error">{errors.phone}</small>}
      </label>
      <label className="field field--full">
        <span>Service *</span>
        <select name="service" value={form.service} onChange={update} aria-invalid={Boolean(errors.service)}>
          <option value="">Choose a service</option>
          {services.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}
        </select>
        {errors.service && <small className="field-error">{errors.service}</small>}
      </label>
      {selected && (
        <label className="field field--full">
          <span>Service option</span>
          <select name="option" value={form.option} onChange={update}>
            {selected.options.map((option) => <option key={option.name} value={option.name}>{option.name} — ₱{option.price.toFixed(2)}</option>)}
          </select>
        </label>
      )}
      <label className="field">
        <span>Preferred date *</span>
        <input name="date" type="date" min={minimumDate} value={form.date} onChange={update} aria-invalid={Boolean(errors.date)} />
        {errors.date && <small className="field-error">{errors.date}</small>}
      </label>
      <label className="field">
        <span>Preferred time *</span>
        <TimePicker
          value={form.time}
          onChange={(value) => {
            setForm((current) => ({ ...current, time: value }))
            setErrors((current) => ({ ...current, time: '' }))
          }}
          error={errors.time}
        />
      </label>
      <label className="field">
        <span>Pickup or drop-off</span>
        <select name="handoff" value={form.handoff} onChange={update}>
          {[dropOffOption, pickupOnlyOption, deliveryOnlyOption, pickupDeliveryOption].map((option) => (
            <option key={option} value={option}>{getHandoffOptionLabel(option, form.date)}</option>
          ))}
        </select>
      </label>
      {needsAddress(form.handoff) && (
        <p className="prototype-note field--full">
          {!form.date
            ? 'Choose a preferred date to see whether pickup or delivery is free or paid.'
            : isWeekend(form.date)
              ? 'Pickup and delivery are free on Friday, Saturday, and Sunday.'
              : 'A pickup or delivery fee applies Monday through Thursday. Contact us for the current fee.'}
        </p>
      )}
      <label className="field field--full">
        <span>{getAddressLabel(form.handoff)}</span>
        <input
          name="location"
          autoComplete="street-address"
          value={form.location}
          onChange={update}
          placeholder={needsAddress(form.handoff) ? 'Enter the service address' : 'Add a location if needed'}
          aria-invalid={Boolean(errors.location)}
          aria-required={needsAddress(form.handoff)}
        />
        {errors.location && <small className="field-error">{errors.location}</small>}
      </label>
      <label className="field field--full">
        <span>Additional instructions</span>
        <textarea name="instructions" rows="3" value={form.instructions} onChange={update} />
      </label>
      <p className="prototype-note field--full">Bookings are saved only in this browser and are not sent to the shop. Contact us to confirm your booking and current prices.</p>
      {saveError && <p className="field-error field--full" role="alert">{saveError}</p>}
      <button className="button button--primary field--full" type="submit">Save my booking</button>
    </form>
  )
}