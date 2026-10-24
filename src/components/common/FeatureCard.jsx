export default function FeatureCard({ feature }) {
  return (
    <article className="feature-card">
      <span className="feature-card__icon" aria-hidden="true">{feature.icon}</span>
      {feature.badge && <span className="feature-card__badge">{feature.badge}</span>}
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </article>
  )
}