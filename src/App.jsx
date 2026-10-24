import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import BackToTop from './components/common/BackToTop.jsx'
import AnnouncementBar from './components/layout/AnnouncementBar.jsx'
import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import BookingModal from './components/booking/BookingModal.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Pricing from './pages/Pricing.jsx'
import Services from './pages/Services.jsx'
import useBooking from './hooks/useBooking.js'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function App() {
  const { isOpen, selectedService, openBooking, closeBooking } = useBooking()
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
      <AnnouncementBar />
      <Navbar
        onBook={openBooking}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode((darkMode) => !darkMode)}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home onBook={openBooking} />} />
          <Route path="/services" element={<Services onBook={openBooking} />} />
          <Route path="/pricing" element={<Pricing onBook={openBooking} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home onBook={openBooking} />} />
        </Routes>
      </main>
      <Footer onBook={openBooking} />
      <BackToTop />
      <BookingModal
        isOpen={isOpen}
        selectedService={selectedService}
        onClose={closeBooking}
      />
    </>
  )
}

export default App
