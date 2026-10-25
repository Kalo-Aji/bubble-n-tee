import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import BackToTop from './components/common/BackToTop.jsx'
import AnnouncementBar from './components/layout/AnnouncementBar.jsx'
import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import BookingModal from './components/booking/BookingModal.jsx'
import AdminPage from './pages/Admin.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Pricing from './pages/Pricing.jsx'
import Services from './pages/Services.jsx'
import useBooking from './hooks/useBooking.js'

function CustomerSite({ booking, isDarkMode, onToggleTheme }) {
  const {
    isOpen,
    selectedService,
    customer,
    openBooking,
    closeBooking,
    authenticateCustomer,
    logoutCustomer,
  } = booking

  return (
    <>
      <AnnouncementBar />
      <Navbar
        onBook={openBooking}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
        customer={customer}
        onLogout={logoutCustomer}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home onBook={openBooking} />} />
          <Route path="/customer" element={<Home onBook={openBooking} />} />
          <Route path="/services" element={<Services onBook={openBooking} />} />
          <Route path="/pricing" element={<Pricing onBook={openBooking} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer onBook={openBooking} />
      <BackToTop />
      <BookingModal
        isOpen={isOpen}
        selectedService={selectedService}
        customer={customer}
        onAuthenticated={authenticateCustomer}
        onLogout={logoutCustomer}
        onClose={closeBooking}
      />
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function App() {
  const booking = useBooking()
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.localStorage.getItem('theme') === 'dark',
  )

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light'
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [isDarkMode])

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/*"
          element={
            <CustomerSite
              booking={booking}
              isDarkMode={isDarkMode}
              onToggleTheme={() => setIsDarkMode((darkMode) => !darkMode)}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
