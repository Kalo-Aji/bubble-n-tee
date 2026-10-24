import { Link } from 'react-router-dom'
import business from '../../data/business.js'
import Button from '../common/Button.jsx'
import logo from '../../assets/images/Logo.png'

const currentYear = new Date().getFullYear()

export default function Footer({ onBook }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="brand brand--footer" to="/">
              <img className="brand__logo" src={logo} alt="Bubble N Tee Laundry Shop" />
            </Link>
            <p>A convenient spot to check out laundry options for clothes, bigger loads, and home linens.</p>
            <Button onClick={onBook} variant="yellow">Plan a laundry visit</Button>
          </div>
          <div>
            <h2>Find your way</h2>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h2>Drop us a line</h2>
            <a href={`tel:${business.phoneLink}`}>{business.phone}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer">Visit our Facebook page <span aria-hidden="true">↗</span></a>
            <p>{business.address}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {currentYear} {business.name}. All rights reserved.</p>
          <p>Preview site — forms do not send requests.</p>
        </div>
      </div>
    </footer>
  )
}