import { useState } from 'react'

export default function useBooking() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [customer, setCustomer] = useState(null)

  function openBooking(service = '') {
    setSelectedService(service)
    setIsOpen(true)
  }

  function closeBooking() {
    setIsOpen(false)
  }

  function authenticateCustomer(account) {
    setCustomer(account)
  }

  function logoutCustomer() {
    setCustomer(null)
  }

  return {
    isOpen,
    selectedService,
    customer,
    openBooking,
    closeBooking,
    authenticateCustomer,
    logoutCustomer,
  }
}