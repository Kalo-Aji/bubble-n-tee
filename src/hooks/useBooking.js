import { useState } from 'react'

export default function useBooking() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')

  function openBooking(service = '') {
    setSelectedService(service)
    setIsOpen(true)
  }

  function closeBooking() {
    setIsOpen(false)
  }

  return { isOpen, selectedService, openBooking, closeBooking }
}