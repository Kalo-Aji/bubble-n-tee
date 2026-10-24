import { Link } from 'react-router-dom'
import SectionHeading from '../components/common/SectionHeading.jsx'

const values = [
  { title: 'Quality first', icon: '✦', description: 'The business says each item is handled with care and attention to detail.' },
  { title: 'Reliability', icon: '◷', description: 'Dependable service and respect for customers’ time are part of the stated values.' },
  { title: 'Eco-friendly', icon: '❋', description: 'The reference describes environmentally friendly detergents and energy-efficient equipment.' },
  { title: 'Customer satisfaction', icon: '♡', description: 'Customer satisfaction is named as a priority in the business values.' },
]

export default function About() {
  return (
    <>
      <section className="page-hero page-hero--about">
        <div className="container about-hero">
          <div><p className="eyebrow">A bit about us</p><h1>More time for your day. Less laundry in the way.</h1><p>Bubble N Tee brings laundry services together in one easy-to-browse place.</p></div>
          <div className="about-hero-art" role="img" aria-label="Decorative laundry bubbles in blue and yellow">
            <span className="about-hero-art__bubble about-hero-art__bubble--one" />
            <span className="about-hero-art__bubble about-hero-art__bubble--two" />
            <span className="about-hero-art__bubble about-hero-art__bubble--three" />
            <span className="about-hero-art__text">fresh<br />starts<br />here<span>✳</span></span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container story-grid">
          <div className="story-image" aria-hidden="true">
            <span className="story-image__sun" />
            <span className="story-image__cloth story-image__cloth--one" />
            <span className="story-image__cloth story-image__cloth--two" />
            <span className="story-image__cloth story-image__cloth--three" />
            <span className="story-image__spark">✦</span>
          </div>
          <div className="story-copy"><p className="eyebrow">Why we’re here</p><h2>A simpler way to sort out wash day.</h2><p>Bubble N Tee is here to help make laundry feel more manageable, with options for everyday clothes, self-service visits, and household linens.</p><p>Have a particular load in mind? Contact us to check which service and timing are right for you.</p></div>
        </div>
      </section>
      <section className="section section--pale">
        <div className="container">
          <SectionHeading eyebrow="What matters to us" title="Good care, clear choices." description="A few simple principles shape how we talk about the laundry options available." />
          <div className="values-grid">
            {values.map((value) => <article className="value-card" key={value.title}><span aria-hidden="true">{value.icon}</span><h3>{value.title}</h3><p>{value.description}</p></article>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container mission-grid">
          <div><p className="eyebrow">Our aim</p><h2>Make room for more of your day.</h2></div>
          <p>We want it to feel straightforward to find a laundry option, understand the listed prices, and know how to contact us before you visit.</p>
        </div>
      </section>
      <section className="team-note">
        <div className="container team-note__inner"><div><p className="eyebrow eyebrow--yellow">Questions are welcome</p><h2>Not sure which option suits your load?</h2><p>Contact us about service types, timing, pickup arrangements, or anything else you’d like to know before wash day.</p></div><span className="team-note__symbol" aria-hidden="true">◌</span></div>
      </section>
      <section className="section">
        <div className="container about-cta"><div><h2>Start with what you need washed.</h2><p>Look through the menu, or contact us with a question.</p></div><div className="button-row"><Link className="button button--primary" to="/services">Browse laundry options</Link><Link className="button button--outline" to="/contact">Contact us</Link></div></div>
      </section>
    </>
  )
}