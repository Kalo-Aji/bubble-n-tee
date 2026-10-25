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

## Booking and admin preview

The customer home page loads first, with an Admin button in the navigation to open the admin sign-in. The admin demo login is `Admin` / `1234`. Selecting Book a Service prompts the customer to log in by phone number or register with a name, phone number, and password. After login, Log out is available in the navigation and in the booking dialog. Booking requests no longer require an email address. Customer accounts and bookings are saved in the current browser's local storage and are visible from the admin page in that same browser. Admins can search bookings, filter by service or status, mark bookings as finished, and delete individual booking requests. Booking options include drop-off, pickup only, delivery only, and pickup & delivery. Pickup and delivery are free Friday–Sunday and paid Monday–Thursday; the fee status is saved with the request, and the weekday fee must be confirmed with the shop.

This is a frontend-only preview: accounts and bookings are not sent to the shop, shared with other devices, or stored on a server. Customer passwords are hashed in the browser, but the local demo login is not secure authentication and must not be used to protect real customer information. Connect the app to a backend with server-side authentication and booking storage before using it for live bookings. The contact form remains a local preview and does not send messages. Confirm prices, service availability, and pickup or delivery arrangements directly with Bubble N Tee.
