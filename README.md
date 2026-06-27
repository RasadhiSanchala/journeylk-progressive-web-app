# JourneyLK — Progressive Web App

JourneyLK is a mobile-first Local Tour & Travel Web Guide.

The application helps tourists discover Sri Lankan attractions, filter places by category, view rich destination details, save favorites, calculate real-time distance using the browser Geolocation API, and open destinations in Google Maps.

## Technology Stack

- Next.js latest App Router
- React
- TypeScript
- Tailwind CSS
- Fetch API
- LocalStorage
- HTML5 Geolocation API
- PWA Web Manifest

## Main Features

- Mobile-first responsive layout with phone-width app shell
- Discover page with attraction cards, search, and category filtering
- Mock REST API route at `/api/attractions`
- Rich attraction detail page with gallery, tips, rating, entry fee, opening hours, and directions
- Favorites system persisted with LocalStorage
- Nearby page with Geolocation-based distance calculation and mobile map-style interface
- Profile page with client-side form validation and persisted user preferences
- PWA manifest for installability
- Bottom navigation with touch-friendly targets

## Technical Overview

| Feature Area | Implementation in JourneyLK |
| --- | --- |
| Mobile-first user experience | Uses a mobile-width app layout, bottom navigation, responsive attraction cards, readable spacing, and touch-friendly buttons for small screens. |
| Interactive UI behavior | Uses React state for category filters, search input, forms, favorites, and location-based UI updates. |
| Dynamic data handling | Fetches attraction data asynchronously using the Fetch API through the `/api/attractions` route. |
| User data persistence | Saves favorites and profile preferences in LocalStorage so selected data remains after refresh or browser restart. |
| Location-based experience | Uses the HTML5 Geolocation API to get the user's current location and calculate nearby attraction distance. |
| Map navigation support | Generates Google Maps direction links using attraction coordinates and the user's current location when available. |
| App routing | Uses Next.js App Router for pages such as Discover, Favorites, Nearby, Profile, and dynamic attraction detail pages. |
| Code organization | Uses TypeScript interfaces, reusable components, custom hooks, utility functions, and error handling for maintainable code. |

## Folder Structure

```txt
src/
├── app/
│   ├── api/attractions/route.ts
│   ├── attractions/[id]/page.tsx
│   ├── favorites/page.tsx
│   ├── nearby/page.tsx
│   ├── profile/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── data/
├── hooks/
├── lib/
└── types/
```

## Running Locally

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Useful Commands

```bash
npm run dev        # start development server
npm run build      # production build
npm run lint       # run ESLint
npm run type-check # run TypeScript checks
```

## Browser Compatibility Notes

- Recommended: Google Chrome latest
- Firefox and Safari are also supported for normal browsing
- Geolocation requires HTTPS or localhost


