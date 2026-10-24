import Button from '../components/common/Button.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import services from '../data/services.js'

export default function Services({ onBook }) {
  return (
    <>
      <section className="page-hero page-hero--compact page-hero--services">
        <div className="container">
          <p className="eyebrow">The service menu</p>
          <h1>Find the right rhythm for your laundry.</h1>
          <p>Compare full-service load sizes, self-service, wash-only and dry-only options, bedding care, and add-ons.</p>
          <Button to="/pricing" variant="outline">Take a look at prices</Button>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading align="left" eyebrow="Choose your approach" title="What are you washing today?" description="Explore the listed choices. Prices, turnaround details, and availability may change, so contact us before making plans." />
          <nav className="category-pills" aria-label="Service categories">
            {services.map((service) => <a href={`#${service.id}`} key={service.id}>{service.title}</a>)}
          </nav>
          <div className="service-list">
            {services.map((service) => (
              <article id={service.id} className="service-detail" key={service.id}>
                <div className={`service-detail__art service-detail__art--${service.color || 'blue'}`} aria-hidden="true">
                  <span className="service-detail__bubble service-detail__bubble--one" />
                  <span className="service-detail__bubble service-detail__bubble--two" />
                  <span className="service-detail__bubble service-detail__bubble--three" />
                  <span className="service-detail__symbol">{service.icon}</span>
                </div>
                <div className="service-detail__content">
                  <p className="eyebrow">{service.startingLabel}</p>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <ul className="option-list">
                    {service.options.map((option) => (
                      <li key={option.name}><span><strong>{option.name}</strong>{option.detail && <small>{option.detail}</small>}</span><b>₱{option.price.toFixed(2)}</b></li>
                    ))}
                  </ul>
                  {service.turnaround && <p className="service-turnaround">{service.turnaround}</p>}
                  <div className="button-row">
                    <Button to={`/pricing#${service.id}`} variant="outline">View pricing</Button>
                    <Button onClick={() => onBook(service.title)}>Book this service</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="notice-box">This site is a preview, not a live booking system. Your selections are not sent anywhere. Contact us to confirm service details and current prices.</p>
        </div>
      </section>
    </>
  )
}