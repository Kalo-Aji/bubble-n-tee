import Button from '../components/common/Button.jsx'
import PriceCard from '../components/common/PriceCard.jsx'
import SectionHeading from '../components/common/SectionHeading.jsx'
import pricing from '../data/pricing.js'

export default function Pricing({ onBook }) {
  return (
    <>
      <section className="page-hero page-hero--compact page-hero--pricing">
        <div className="container">
          <p className="eyebrow">The price list</p>
          <h1>Know what’s listed before wash day.</h1>
          <p>Here’s the current menu information provided for Bubble N Tee, shown in Philippine pesos. Contact the shop to confirm before visiting.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="At a glance" title="Prices, grouped by service." description="Full-service load prices include the listed detergent and fabcon. Other items retain the units and minimum quantities shown on the menu." />
          <nav className="category-pills category-pills--center" aria-label="Pricing categories">
            {pricing.map((category) => <a href={`#${category.id}`} key={category.id}>{category.title}</a>)}
          </nav>
          <div className="pricing-list">
            {pricing.map((category) => {
              const minPrice = Math.min(...category.prices.map((price) => price.price))
              const hasStartingDifference = category.startingPrice !== null && category.startingPrice !== minPrice
              return (
                <section className="pricing-category" id={category.id} key={category.id}>
                  <div className="pricing-category__header">
                    <div><p className="eyebrow">Laundry option</p><h2>{category.title}</h2></div>
                    <Button onClick={() => onBook(category.title)} variant="outline">Ask us about it</Button>
                  </div>
                  <div className="price-list">{category.prices.map((price) => <PriceCard key={price.name} price={price} />)}</div>
                  {category.startingLabel && (
                    <p className={`starting-note${hasStartingDifference ? ' starting-note--flag' : ''}`}>
                      {category.startingLabel}
                      {hasStartingDifference && ' — differs from the lowest individual option listed; please verify with the business.'}
                    </p>
                  )}
                </section>
              )
            })}
          </div>
          <div className="pricing-footer">
            <p>This page is an information guide, not a quote. Confirm the current price and availability with Bubble N Tee before arranging service.</p>
            <Button to="/contact">Ask a question</Button>
          </div>
        </div>
      </section>
    </>
  )
}