import Button from '../components/common/Button.jsx'
import ContactCard from '../components/common/ContactCard.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import ContactForm from '../components/forms/ContactForm.jsx'
import business from '../data/business.js'

export default function Contact() {
  return (
    <>
      <section className="page-hero page-hero--compact page-hero--contact">
        <div className="container">
          <p className="eyebrow">Say hello</p>
          <h1>Got a laundry question? We’re listening.</h1>
          <p>Check in about service options, prices, schedules, or possible pickup and delivery arrangements.</p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-layout">
          <div className="contact-form-panel">
            <p className="eyebrow">Write us a note</p>
            <h2>What would you like to know?</h2>
            <p>This sample form helps you organize a message. It won’t send or store your details.</p>
            <ContactForm />
          </div>
          <div className="contact-info">
            <SectionHeading align="left" eyebrow="Contact us" title="Visit or contact us" />
            <ContactCard icon="⌖" title="Visit us"><p>{business.address}</p></ContactCard>
            <ContactCard icon="◷" title="Business hours">
              {business.hours.map((hour) => <p key={hour.days}><strong>{hour.days}:</strong> {hour.time}</p>)}
            </ContactCard>
            <ContactCard icon="☎" title="Phone"><a href={`tel:${business.phoneLink}`}>{business.phone}</a></ContactCard>
            <ContactCard icon="♡" title="Business partnerships">
              <p>We welcome partnership inquiries from spas, hotels, and Airbnb hosts.</p>
              <p>Call us: <a href={`tel:${business.phoneLink}`}>{business.phone}</a></p>
            </ContactCard>
            <ContactCard icon="✉" title="Email"><a href={`mailto:${business.email}`}>{business.email}</a></ContactCard>
            <ContactCard icon="f" title="Facebook"><a href={business.facebookUrl} target="_blank" rel="noopener noreferrer">Visit our Facebook page <span aria-hidden="true">↗</span></a></ContactCard>
          </div>
        </div>
      </section>
      <section className="section section--pale">
        <div className="container">
          <SectionHeading eyebrow="Find us in Lapu-Lapu City" title="Our location" description="The address and map search link are listed by the business website. Confirm the exact destination before travelling." />
          <div className="map-panel">
            <div className="map-panel__copy"><span className="map-pin" aria-hidden="true">⌖</span><h2>Bubble N Tee</h2><p>{business.address}</p><Button href={business.mapUrl} target="_blank" rel="noreferrer">Get directions <span aria-hidden="true">↗</span></Button></div>
            <iframe title="Map showing the Bubble N Tee laundry location" src={business.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  )
}