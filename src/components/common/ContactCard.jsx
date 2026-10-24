export default function ContactCard({ icon, title, children }) {
  return (
    <article className="contact-card">
      <span className="contact-card__icon" aria-hidden="true">{icon}</span>
      <div>
        <h3>{title}</h3>
        {children}
      </div>
    </article>
  )
}