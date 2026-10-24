import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/images/Logo.png'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar({ onBook, isDarkMode, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="brand" to="/" onClick={closeMenu} aria-label="Bubble N Tee home">
          <img className="brand__logo" src={logo} alt="Bubble N Tee Laundry Shop" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className={`primary-nav${menuOpen ? ' primary-nav--open' : ''}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' nav-link--active' : ''}`}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-pressed={isDarkMode}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            <span className="theme-toggle__track" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="button button--primary nav-book"
            onClick={() => {
              closeMenu()
              onBook()
            }}
          >
            Book a Service <span aria-hidden="true">↗</span>
          </button>
        </nav>
      </div>
      <span className="sr-only" aria-live="polite">Page: {location.pathname}</span>
    </header>
  )
}