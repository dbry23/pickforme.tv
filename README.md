# pickforme.tv

pickforme.tv is a small Next.js web application (TypeScript + React) built with the Next.js App Router. It demonstrates a modern, production-ready frontend using server and client components, optimized fonts, and simple deployability on Vercel.

## Tech stack
- Language: TypeScript
- Framework: Next.js (App Router)
- UI: React (functional components)
- Fonts: next/font (Geist)
- Deployment: Vercel-ready

## Key features
- App Router structure (`app/`)
- Server and client component split
- Automatic font optimization via `next/font`
- Fast refresh and developer experience from `create-next-app`

## Project layout
- `src/app/` — application routes and pages
- `src/app/api` — server & edge API route handlers for form submissions, simple JSON endpoints, and integrations
- `src/lib` — shared utilities, types, and data-fetching helpers used by server and client components
- `src/ui/` — reusable UI components
- `public/` — static assets
- `README.md` — this file

## TODO

- [x] Reimplemment functionality from old version
  - [x] Home page
    - [x] Display user's selected shows
  - [x] Search
    - [x] Handle add/removing shows
  - [x] Episode
    - [x] Get a random episode on load
    - [x] Button to select new episode
- [ ] Styling
- [ ] User registration/login
- [ ] Move from localStorage to SQL backend
