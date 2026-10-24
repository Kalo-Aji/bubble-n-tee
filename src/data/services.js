const services = [
  {
    id: 'full-service',
    title: 'Full Service',
    icon: '✦',
    color: 'blue',
    description:
      'Full-service laundry loads with detergent and fabcon included in the listed price.',
    options: [
      {
        name: 'Full Service — 4 kg load',
        detail: 'Includes 1 detergent + 1 fabcon',
        price: 155,
      },
      {
        name: 'Full Service — 7 kg load',
        detail: 'Includes 1 detergent + 1 fabcon',
        price: 220,
      },
    ],
    startingPrice: null,
    startingLabel: '4 kg load from ₱155.00',
    turnaround: '',
  },
  {
    id: 'self-service',
    title: 'Self Service',
    icon: '◷',
    color: 'yellow',
    description:
      'Use the self-service laundry option at the price listed on the current menu.',
    options: [{ name: 'Self Service', detail: '', price: 160 }],
    startingPrice: null,
    startingLabel: '₱160.00',
    turnaround: '',
  },
  {
    id: 'wash-dry',
    title: 'Wash Only & Dry Only',
    icon: '◉',
    color: 'blue',
    description:
      'Choose a wash-only or dry-only service, priced separately on the menu.',
    options: [
      { name: 'Wash Only', detail: '', price: 75 },
      { name: 'Dry Only', detail: '', price: 85 },
    ],
    startingPrice: null,
    startingLabel: 'Options from ₱75.00',
    turnaround: '',
  },
  {
    id: 'comforter-duvet',
    title: 'Comforter / Duvet',
    icon: '⌂',
    color: 'coral',
    description:
      'Comforter and duvet service, priced per piece for the listed sizes.',
    options: [
      {
        name: 'Comforter / Duvet',
        detail: 'Per piece — Twin, Twin XL, and Queen',
        price: 185,
      },
    ],
    startingPrice: null,
    startingLabel: '₱185.00 per piece',
    turnaround: '',
  },
  {
    id: 'linens',
    title: 'Towels, Blankets, Linens & Jeans',
    icon: '▤',
    color: 'blue',
    description:
      'Laundry service for towels, blankets, linens, and jeans with the menu-stated minimum load.',
    options: [
      {
        name: 'Towels, blankets, linens, and jeans',
        detail: 'Minimum 4 kg',
        price: 240,
      },
    ],
    startingPrice: null,
    startingLabel: '₱240.00 (minimum 4 kg)',
    turnaround: '',
  },
  {
    id: 'add-ons',
    title: 'Laundry Add-ons',
    icon: '✚',
    color: 'yellow',
    description:
      'Optional folding and laundry supplies listed separately from the service prices.',
    options: [
      { name: 'Fold', detail: '', price: 40 },
      { name: 'Detergent twin pack', detail: '', price: 20 },
      { name: 'Fabcon', detail: '', price: 10 },
      { name: 'Plastic XL', detail: '', price: 3 },
    ],
    startingPrice: null,
    startingLabel: 'Add-ons from ₱2.00',
    turnaround: '',
  },
]

export default services
