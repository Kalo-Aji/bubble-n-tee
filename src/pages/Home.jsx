import { Link } from 'react-router-dom'
import Button from '../components/common/Button.jsx'
import FeatureCard from '../components/common/FeatureCard.jsx'
import ProcessStep from '../components/common/ProcessStep.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import ServiceCard from '../components/common/ServiceCard.jsx'
import features from '../data/features.js'
import services from '../data/services.js'

const process = [
  { title: 'Pick a service', description: 'Browse the menu and find the kind of care you need.' },
  { title: 'Check the details', description: 'Contact us about timing, availability, and drop-off or pickup.' },
  { title: 'Leave the laundry', description: 'Drop it off at the hub or arrange FREE pickup and delivery Friday through Sunday.' },
  { title: 'Collect your clean', description: 'Contact us to confirm the return plan.' },
]

const highlights = [
  { title: 'Full Service', description: 'Pick a 4 kg or 7 kg load, with detergent and fabcon included.', serviceId: 'full-service', icon: '✦' },
  { title: 'Self Service', description: 'A self-service laundry option at the listed menu price.', serviceId: 'self-service', icon: '◷' },
  { title: 'Wash or dry', description: 'Choose wash-only or dry-only service.', serviceId: 'wash-dry', icon: '◉' },
  { title: 'Bedding & everyday items', description: 'Options for comforters, duvets, towels, linens, blankets, and jeans.', serviceId: 'comforter-duvet', icon: '⌂' },
]

export default function Home({ onBook }) {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Wash-day, without the guesswork</p>
            <h1>A lighter load<br />starts <span>right here.</span></h1>
            <p className="hero-description">From your weekly clothes to the bedding that never fits in the hamper, find a laundry option that works for you. FREE pickup and delivery are available every Friday, Saturday, and Sunday—contact us to arrange a time and location.</p>
            <div className="button-row">
              <Button to="/services">Find your fresh <span aria-hidden="true">→</span></Button>
              <Button to="/pricing" variant="outline">Browse the price list</Button>
            </div>
            <div className="hero-trust"><span aria-hidden="true">✦</span> Everyday laundry, extra-large loads, and home linens</div>
          </div>
          <div className="hero-visual" role="img" aria-label="Playful blue and yellow bubbles around a clean laundry basket illustration">
            <div className="bubble-art">
              <span className="bubble-art__orbit bubble-art__orbit--one" />
              <span className="bubble-art__orbit bubble-art__orbit--two" />
              <span className="bubble-art__bubble bubble-art__bubble--one" />
              <span className="bubble-art__bubble bubble-art__bubble--two" />
              <span className="bubble-art__bubble bubble-art__bubble--three" />
              <span className="bubble-art__bubble bubble-art__bubble--four" />
              <div className="bubble-art__basket">
                <span className="bubble-art__shirt">✦</span>
                <span className="bubble-art__towel" />
                <span className="bubble-art__basket-front"><i /><i /><i /><i /></span>
              </div>
              <span className="bubble-art__spark bubble-art__spark--one">✳</span>
              <span className="bubble-art__spark bubble-art__spark--two">✦</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--pale" id="services">
        <div className="container">
          <SectionHeading eyebrow="The service menu" title="Pick your kind of fresh." description="Full-service loads, self-service, wash-only and dry-only options, plus care for bedding and everyday laundry." />
          <div className="highlight-grid">
            {highlights.map((item) => (
              <article className="highlight-card" key={item.title}>
                <span className="highlight-card__icon" aria-hidden="true">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link to={`/services#${item.serviceId}`}>Explore service <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="A little less laundry on your mind" title="The helpful details matter." description="Pickup and delivery are FREE every Friday, Saturday, and Sunday. Contact us to arrange a time and location, and to confirm express options and current prices." />
          <div className="feature-grid">
            {features.map((feature) => <FeatureCard key={feature.title} feature={feature} />)}
          </div>
        </div>
      </section>

      <section className="section section--pale">
        <div className="container">
          <SectionHeading eyebrow="Four easy moves" title="From hamper to handled." description="A simple way to start. Contact us to arrange FREE pickup and delivery for Friday, Saturday, or Sunday." />
          <div className="process-grid">
            {process.map((step, index) => <ProcessStep key={step.title} step={step} index={index} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading section-heading--split">
            <div><p className="eyebrow">Take a closer look</p><h2>Options for every kind of load</h2></div>
            <Button to="/services" variant="text">Open the full menu <span aria-hidden="true">→</span></Button>
          </div>
          <div className="service-grid service-grid--featured">
            {[services.find((service) => service.id === 'full-service'), services.find((service) => service.id === 'comforter-duvet'), services.find((service) => service.id === 'add-ons')].map((service) => <ServiceCard key={service.id} service={service} onBook={onBook} compact />)}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-content">
          <div><p className="eyebrow eyebrow--yellow">Give your day some space</p><h2>Let laundry take up less room.</h2><p>See what’s on the menu, then contact us to check the details for your load.</p></div>
          <div className="button-row"><Button to="/services" variant="yellow">See the service menu</Button><Button to="/contact" variant="light-outline">Say hello</Button></div>
        </div>
      </section>
    </>
  )
}