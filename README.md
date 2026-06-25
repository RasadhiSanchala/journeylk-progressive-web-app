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

| Feature Area | How JourneyLK Implements It |
| --- | --- |
| Mobile-first responsive design | max-width mobile shell, bottom nav, responsive cards, 48px touch targets |
| DOM/state management | React state for filters, search, forms, favorites, weather, and geolocation |
| Asynchronous integration | Fetch API calls `/api/attractions` and Open-Meteo weather service |
| Browser storage | LocalStorage for favorites and profile preferences |
| Web-based hardware API | Geolocation API for real-time distance calculation |
| SPA routing | Next.js App Router pages and dynamic attraction routes |
| Code quality | TypeScript interfaces, reusable components, hooks, utilities, and error handling |

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


