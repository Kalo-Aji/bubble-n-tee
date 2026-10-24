import { useState } from 'react'
import services from '../../data/services.js'
import TimePicker from './TimePicker.jsx'

const today = new Date()
today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
const minimumDate = today.toISOString().slice(0, 10)
const pickupDeliveryOption = 'Pickup & delivery (FREE: Friday–Sunday)'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  option: '',
  date: '',
  time: '',
  handoff: 'Drop-off at the hub',
  location: '',
  instructions: '',
}

export default function BookingForm({ selectedService, onClose }) {
  const [form, setForm] = useState({ ...initialForm, service: selectedService })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const selected = services.find((service) => service.title === form.service)

  function update(event) {
    const { name, value } = event.target
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === 'service' ? { option: '' } : {}),
    }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function submit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Enter your name.'
    if (!form.phone.trim()) nextErrors.phone = 'Enter a contact number.'
    if (!form.email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.service) nextErrors.service = 'Choose a service.'
    if (!form.date) nextErrors.date = 'Choose a preferred date.'
    else if (
      form.handoff === pickupDeliveryOption &&
      ![0, 5, 6].includes(new Date(`${form.date}T00:00:00`).getDay())
    ) {
      nextErrors.date = 'Free pickup and delivery are available Friday through Sunday. Choose one of those days.'
    }
    if (!form.time) nextErrors.time = 'Choose a preferred time.'
    if (form.handoff === pickupDeliveryOption && !form.location.trim()) nextErrors.location = 'Enter a pickup address.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span className="form-success__icon" aria-hidden="true">✓</span>
        <h3>Your details are ready</h3>
        <p>This preview hasn’t sent or created a booking. Contact us to check availability and confirm arrangements.</p>
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
        <span>Email address *</span>
        <input name="email" type="email" autoComplete="email" value={form.email} onChange={update} aria-invalid={Boolean(errors.email)} />
        {errors.email && <small className="field-error">{errors.email}</small>}
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
            <option value="">Select an option (optional)</option>
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
          <option>Drop-off at the hub</option>
          <option>{pickupDeliveryOption}</option>
        </select>
      </label>
      <label className="field field--full">
        <span>{form.handoff === pickupDeliveryOption ? 'Pickup location / address *' : 'Location (optional)'}</span>
        <input
          name="location"
          autoComplete="street-address"
          value={form.location}
          onChange={update}
          placeholder={form.handoff === pickupDeliveryOption ? 'Enter your pickup address' : 'Add a location if needed'}
          aria-invalid={Boolean(errors.location)}
          aria-required={form.handoff === pickupDeliveryOption}
        />
        {errors.location && <small className="field-error">{errors.location}</small>}
      </label>
      <label className="field field--full">
        <span>Additional instructions</span>
        <textarea name="instructions" rows="3" value={form.instructions} onChange={update} />
      </label>
      <p className="prototype-note field--full">Price check: Contact us for current prices. Costs can depend on the service and its units, so this preview won’t estimate a total.</p>
      <button className="button button--primary field--full" type="submit">Review my details</button>
    </form>
  )
}