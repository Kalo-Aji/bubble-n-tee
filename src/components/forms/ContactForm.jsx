import { useState } from 'react'

const blankForm = { name: '', email: '', phone: '', subject: '', message: '' }

export default function ContactForm() {
  const [form, setForm] = useState(blankForm)
  const [errors, setErrors] = useState({})
  const [prepared, setPrepared] = useState(false)

  function update(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setPrepared(false)
  }

  function submit(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Enter your name.'
    if (!form.email.trim()) nextErrors.email = 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address.'
    if (!form.phone.trim()) nextErrors.phone = 'Enter your phone number.'
    if (!form.subject.trim()) nextErrors.subject = 'Enter a subject.'
    if (!form.message.trim()) nextErrors.message = 'Enter a message.'
    setErrors(nextErrors)
    setPrepared(Object.keys(nextErrors).length === 0)
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label className="field">
          <span>Full name *</span>
          <input name="name" autoComplete="name" value={form.name} onChange={update} aria-invalid={Boolean(errors.name)} />
          {errors.name && <small className="field-error">{errors.name}</small>}
        </label>
        <label className="field">
          <span>Email address *</span>
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={update} aria-invalid={Boolean(errors.email)} />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>
        <label className="field">
          <span>Phone number *</span>
          <input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update} aria-invalid={Boolean(errors.phone)} />
          {errors.phone && <small className="field-error">{errors.phone}</small>}
        </label>
        <label className="field">
          <span>Subject *</span>
          <input name="subject" value={form.subject} onChange={update} aria-invalid={Boolean(errors.subject)} />
          {errors.subject && <small className="field-error">{errors.subject}</small>}
        </label>
        <label className="field field--full">
          <span>Message *</span>
          <textarea name="message" rows="5" value={form.message} onChange={update} aria-invalid={Boolean(errors.message)} />
          {errors.message && <small className="field-error">{errors.message}</small>}
        </label>
      </div>
      <button className="button button--primary" type="submit">Review my message</button>
      {prepared && (
        <p className="form-feedback" role="status">
          Your note is ready in this preview, but it hasn’t been sent or saved. Contact us by email if you’d like a reply.
        </p>
      )}
    </form>
  )
}