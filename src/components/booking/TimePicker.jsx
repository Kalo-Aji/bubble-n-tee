import { useEffect, useRef, useState } from 'react'

function getParts(value) {
  if (!value) return { hour: '', minute: '00', period: 'AM' }
  const [rawHour, minute] = value.split(':')
  const hour = Number(rawHour)
  return {
    hour: String(hour % 12 || 12).padStart(2, '0'),
    minute,
    period: hour >= 12 ? 'PM' : 'AM',
  }
}

function formatTime(value) {
  if (!value) return 'Select a time'
  const { hour, minute, period } = getParts(value)
  return `${hour}:${minute} ${period}`
}

export default function TimePicker({ value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('00')
  const [period, setPeriod] = useState('AM')
  const [pickerError, setPickerError] = useState('')
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll('input, button')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  function openPicker() {
    const parts = getParts(value)
    setHour(parts.hour)
    setMinute(parts.minute)
    setPeriod(parts.period)
    setPickerError('')
    setIsOpen(true)
  }

  function confirmTime() {
    const hourNumber = Number(hour)
    const minuteNumber = Number(minute)

    if (!hour || hourNumber < 1 || hourNumber > 12 || !minute || minuteNumber < 0 || minuteNumber > 59) {
      setPickerError('Enter an hour from 1 to 12 and minutes from 00 to 59.')
      return
    }

    const normalizedHour = hourNumber % 12 + (period === 'PM' ? 12 : 0)
    onChange(`${String(normalizedHour).padStart(2, '0')}:${String(minuteNumber).padStart(2, '0')}`)
    setIsOpen(false)
  }

  return (
    <>
      <button
        className="time-picker-trigger"
        type="button"
        onClick={openPicker}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'preferred-time-error' : undefined}
      >
        <span>{formatTime(value)}</span>
        <span className="time-picker-trigger__icon" aria-hidden="true">◷</span>
      </button>
      {error && <small id="preferred-time-error" className="field-error">{error}</small>}
      {isOpen && (
        <div className="time-picker-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false)
        }}>
          <section className="time-picker-dialog" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="time-picker-title">
            <h2 id="time-picker-title">Enter time</h2>
            <div>
              <div className="time-picker-inputs">
                <label className="time-picker-unit">
                  <span className="sr-only">Hour</span>
                  <input
                    autoFocus
                    aria-label="Hour"
                    inputMode="numeric"
                    max="12"
                    min="1"
                    onChange={(event) => setHour(event.target.value)}
                    placeholder="--"
                    type="number"
                    value={hour}
                  />
                  <small>Hour</small>
                </label>
                <span className="time-picker-colon" aria-hidden="true">:</span>
                <label className="time-picker-unit">
                  <span className="sr-only">Minute</span>
                  <input
                    aria-label="Minute"
                    inputMode="numeric"
                    max="59"
                    min="0"
                    onChange={(event) => setMinute(event.target.value)}
                    placeholder="00"
                    type="number"
                    value={minute}
                  />
                  <small>Minute</small>
                </label>
                <div className="time-picker-period" aria-label="AM or PM">
                  {['AM', 'PM'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={period === option}
                      onClick={() => setPeriod(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              {pickerError && <p className="field-error" role="alert">{pickerError}</p>}
              <div className="time-picker-actions">
                <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
                <button type="button" onClick={confirmTime}>OK</button>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
