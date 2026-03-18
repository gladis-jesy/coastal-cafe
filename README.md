# Coastal Cafe

Official website for **Coastal Cafe** — a modern, full-featured cafe web app built with Angular 19.

Live site: [https://coastalcafe.in](https://coastalcafe.in)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 19 (standalone components) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 4.0 |
| Rendering | Angular SSR (Server-Side Rendering) |
| Reactive | RxJS 7.8 |
| SSR Server | Express 4.18 |
| UI Components | Swiper, ngx-slick-carousel |

---

## Features

- **Home page** — Hero section, Our Menu, Specials, Gallery, Testimonials
- **Menu page** — Full food listing with category filter, price range filter, search, and pagination
- **Shopping cart** — Slide-in cart sidebar with quantity controls and order confirmation
- **Live search** — Real-time search with debounce, navigates to menu page automatically
- **About Us & Contact** pages
- **Responsive** — Mobile-first design with hamburger nav

---

## Project Structure

```
src/app/
├── core/
│   ├── models/         # TypeScript interfaces (Food, Category, CartItem, Review)
│   └── services/
│       ├── api.service.ts          # Generic HTTP wrapper
│       ├── food.service.ts         # Food data fetching
│       ├── cart.service.ts         # Cart state management
│       ├── search.service.ts       # Real-time search with debounce
│       └── shared-data.service.ts  # App-wide data loader (foods, categories, reviews)
├── features/
│   ├── home/           # Landing page and its sub-components
│   ├── menu/           # Menu page with filters and pagination
│   ├── about/          # About Us page
│   └── contact/        # Contact page
└── shared/
    └── components/
        ├── nav/        # Main nav, sub-nav, nav switcher
        ├── cart/       # Cart sidebar
        └── footer/     # Footer

test/                   # Karma/Jasmine unit tests (mirrors src/app/ structure)
├── core/services/      # Service specs
├── features/           # Feature component specs
└── shared/             # Shared component specs
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install dependencies

```bash
npm install
```

### Development server

```bash
npm start
```

Navigate to `http://localhost:4200`. The app reloads automatically on file changes.

### Build for production

```bash
npm run build
```

Output is in the `dist/` directory.

### Serve with SSR

```bash
npm run serve:ssr:coastal-cafe
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start dev server at localhost:4200 |
| `npm run build` | Production build |
| `npm run watch` | Build in watch mode |
| `npm test` | Run unit tests with Karma |
| `npm run lint` | Run ESLint |
| `npm run serve:ssr:coastal-cafe` | Serve with Server-Side Rendering |

---

## Technical Challenges

### Lighthouse Accessibility Failures

**The Bug**
After running a Lighthouse audit, the app scored poorly on accessibility and performance. The issues weren't obvious from the UI. Everything looked fine visually, but Lighthouse flagged several structural problems.

**Root Causes**
- Heading hierarchy was broken - `<h3>` and `<h4>` tags were used directly without a preceding `<h2>`, which confuses screen readers and hurts SEO
- Icon-only buttons (cart, hamburger, gallery) had no `aria-label`, making them invisible to assistive technologies
- All route components were eagerly loaded, causing a large initial bundle and slow first paint
- Offscreen images had no `loading="lazy"`, forcing the browser to fetch them all on page load

**The Fix**
- Fixed heading hierarchy across all pages to follow correct `h1 -> h2 -> h3` order
- Added descriptive `aria-label` to every icon-only button
- Converted all routes to lazy-loaded `loadComponent()` for code splitting
- Added `loading="lazy"` to all offscreen images

## Environment

API base URL is configured in `src/environment/environment.ts`:

```ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://coastalcafe.in/api'
};
```
