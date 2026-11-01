# BikeSphere

Frontend-first motorcycle parts marketplace for Bangladesh. Customers request quotations instead of buying from published catalog prices.

This repository is a **prototype**. It uses mock data and client state only. There is no live inventory, authentication, payment processing, or order fulfillment.

## Phase 1 status

Foundation is complete:

- Next.js App Router, TypeScript, Tailwind CSS v4
- Design system and store chrome
- Redux Toolkit with SSR-safe localStorage persistence
- Mock catalog service/repository layer
- Responsive homepage
- Route map for later phases so navigation does not 404

Later phases add filters, checkout, account workflows, admin quotation tools, and seller listings.

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Architecture

```
src/
  app/           Route groups: store, auth, account, admin
  components/    UI primitives, layout, product, home, dashboard
  features/      Feature composition (homepage first)
  store/         Redux slices, selectors, persistence
  services/      Repository interfaces + mock adapters
  data/mock/     Bangladesh-focused catalog data
  types/         Shared entities
  lib/           Tokens helpers, validation, motion
  config/        Site copy and locale
```

Pages import `catalogService` from `src/services/adapters/catalog.ts`. They do not import mock files directly. Replacing the mock repository with an API client should not require rewriting page components.

## Business rule

Public catalog, cards, and cart must not show product prices. Use **Price on Request** until an admin writes a quotation. Delivery charge is separate from the remaining product amount.

## State

Redux Toolkit slices:

- auth, cart, favorites, bikes, products, filters
- quotations, orders, notifications, comparison, listings, ui

Persisted in `localStorage` under `bikesphere.v1` after client hydration. Browser APIs are never read during SSR.

## Introducing a backend later

1. Keep the repository interfaces in `src/services/interfaces`.
2. Add API adapters beside the mock implementations.
3. Point `catalogService` (and future quotation/order services) at those adapters.
4. Add Prisma/PostgreSQL, real auth, and a payment provider without redesigning the App Router or design system.

## Stack

Next.js 16, React 19, Tailwind CSS 4, Redux Toolkit, Framer Motion, Lucide, React Hook Form, Zod, Recharts.
