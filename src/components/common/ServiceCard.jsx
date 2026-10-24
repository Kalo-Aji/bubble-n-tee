import Button from './Button.jsx'

export default function ServiceCard({ service, onBook, compact = false }) {
  return (
    <article className={`service-card${compact ? ' service-card--compact' : ''}`}>
      <div className={`service-card__art service-card__art--${service.color || 'blue'}`} aria-hidden="true">
        <span className="service-card__art-bubble service-card__art-bubble--one" />
        <span className="service-card__art-bubble service-card__art-bubble--two" />
        <span className="service-card__art-bubble service-card__art-bubble--three" />
        <span className="service-card__icon">{service.icon}</span>
      </div>
      <div className="service-card__body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <div className="service-card__price">{service.startingLabel}</div>
        <div className="service-card__actions">
          <Button to="/services" variant="text">Explore details <span aria-hidden="true">→</span></Button>
          <Button onClick={() => onBook(service.title)} variant="outline">Book service</Button>
        </div>
      </div>
    </article>
  )
}