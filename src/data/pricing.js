import services from './services.js'

export default services.map((service) => ({
  id: service.id,
  title: service.title,
  prices: service.options,
  startingPrice: service.startingPrice,
  startingLabel: service.startingLabel,
}))