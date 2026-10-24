export default function PriceCard({ price }) {
  return (
    <div className="price-row">
      <div>
        <h3>{price.name}</h3>
        {price.detail && <p>{price.detail}</p>}
      </div>
      <strong>₱{price.price.toFixed(2)}</strong>
    </div>
  )
}