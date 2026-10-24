export default function ProcessStep({ step, index }) {
  return (
    <article className="process-step">
      <span className="process-step__number">{String(index + 1).padStart(2, '0')}</span>
      <div>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </div>
    </article>
  )
}