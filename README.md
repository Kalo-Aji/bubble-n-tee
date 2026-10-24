# Bubble N Tee

A responsive React frontend prototype for Bubble N Tee. It includes Home, Services, Pricing, About Us, and Contact Us pages.

## Run locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Create and preview a production build:

```sh
npm run build
npm run preview
```

Run lint checks:

```sh
npm run lint
```

## Project layout

- `src/pages/` contains the five routed pages.
- `src/components/` contains shared layout, cards, forms, and booking UI.
- `src/data/` contains service, pricing, benefit, and business information.
- `src/styles/` contains the design tokens, global styles, component styles, and responsive rules.
- `src/assets/images/` contains the locally stored laundry photos.

## Updating business details

Edit `src/data/business.js` to update the address, contact details, hours, map link, or announcement text. Edit `src/data/services.js` to update the service options and prices; the Pricing page reads the same service data. The listed prices are reference information, not a guarantee of current charges. Confirm service details with the business before publishing changes.

Replace images in `src/assets/images/` and update the imports in `src/data/services.js` and the page files that use them. The text-based logo is in `src/components/layout/Navbar.jsx` and `src/components/layout/Footer.jsx`; replace those elements with an approved brand asset when available.

## Prototype limitations

The booking dialog and contact form validate input and show local demonstration feedback only. They do not send or save requests, create bookings, calculate final charges, or connect to a backend, payment system, or live order tracker. Confirm prices, service availability, and pickup or delivery arrangements directly with Bubble N Tee.
