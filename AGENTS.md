# AGENTS.md — pickforme.tv

This document orients AI agents and human developers on **what this repo is**, **how it is structured**, **how to run and ship it**, and **where to change behavior**.

---

## Product summary

**Pick For Me TV** is a small web app that lets users curate favorite TV shows, then get a **random episode** from that set—similar to “channel surfing” across shows they already like.

- **Data source**: [The Movie Database (TMDB)](https://www.themoviedb.org/) TV search and TV detail/episode APIs.
- **User “library”**: Stored in the browser as **`localStorage.shows`** (JSON array of `Show` objects). There is **no account system or server-side persistence** yet.

---

## Tech stack

| Area | Choice |
|------|--------|
| Runtime / framework | **Next.js 16** (App Router) |
| Language | **TypeScript** (`strict: true`) |
| UI | **React 19** (functional components) |
| Compiler | **React Compiler** enabled in `next.config.ts` |
| Styling | **Tailwind CSS v4** (PostCSS plugin), **shadcn/ui** (`radix-vega` style, RSC-friendly setup in `components.json`) |
| Icons | **lucide-react** |
| Analytics | **Vercel Analytics** + **Speed Insights** in root layout |
| Class merging | `clsx` + `tailwind-merge` via `cn()` in `src/lib/utils.ts` |

Path alias: `@/*` → `./src/*` (see `tsconfig.json`).

---

## Prerequisites

- **Node.js** compatible with Next 16 (use current LTS unless the team pins otherwise).
- **npm** (lockfile is `package-lock.json`).

---

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   API routes call TMDB with a **Bearer** token:

   - **`TMDB_API_KEY`** — In practice this should be a TMDB **API Read Access Token** (v4-style bearer token), as used in `Authorization: Bearer …` in:

     - `src/app/api/shows/route.ts`
     - `src/app/api/episode/route.ts`

   Add to `.env.local` (or `.env` locally; `.env*` is gitignored):

   ```env
   TMDB_API_KEY=your_read_access_token_here
   ```

   Without this, search and random-episode flows will fail at runtime when those routes fetch TMDB.

3. **Dev server**

   ```bash
   npm run dev
   ```

   Default: [http://localhost:3000](http://localhost:3000)

---

## Common commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript configs) |
| `npm run prettier:check` | Prettier check |
| `npm run prettier:write` | Prettier format |

---

## Repository layout

```
src/
  app/                    # App Router: routes, layouts, global CSS
    api/                  # Route handlers (server)
    ui/                   # Route-adjacent UI: nav, footer, show-list, show-card
    globals.css           # Tailwind + shadcn theme tokens
    layout.tsx            # Root layout: fonts, Nav, Footer, analytics
    page.tsx              # Home (/)
    search/page.tsx
    library/page.tsx
    episode/page.tsx
    about/page.tsx
  components/ui/          # shadcn-style primitives (button, card, input, etc.)
  hooks/                  # e.g. use-mobile breakpoint helper
  lib/
    definitions.ts        # Shared TypeScript types (Show, Episode, …)
    apiService.ts         # Client `fetch` wrappers → `/api/*`
    localStorageService.ts# Library persistence (browser only)
    utils.ts              # `cn()`, plus static `getPopularShows()` list
public/                   # Static assets (favicons, TMDB attribution SVG)
```

---

## Routes and user flows

| Path | Component | Role |
|------|-----------|------|
| `/` | `src/app/page.tsx` | Marketing-style home: random tagline, **Popular shows** grid (`getPopularShows()` — static IDs, not TMDB at runtime) |
| `/search` | `src/app/search/page.tsx` | Search TMDB via `GET /api/shows`, paginated results, `ShowList` |
| `/library` | `src/app/library/page.tsx` | Reads `localStorage` via `getShows()`, lists saved shows |
| `/episode` | `src/app/episode/page.tsx` | If library non-empty, picks random episode via `GET /api/episode`; otherwise prompts to add shows |
| `/about` | `src/app/about/page.tsx` | Static copy + TMDB attribution |

Navigation is defined in `src/app/ui/nav.tsx`.

---

## API surface (App Router)

All backend logic for TMDB is **server-side** in route handlers; the browser only talks to **same-origin `/api/...`**.

### `GET /api/shows`

- **Query**: `show_name`, optional `page` (default `1`).
- **Behavior**: Proxies to TMDB `GET /3/search/tv`, then **trims** each result to `{ id, name, backdrop_path }`.
- **File**: `src/app/api/shows/route.ts`

### `GET /api/episode`

- **Query**: `shows` — JSON stringified **array of TMDB TV IDs** (e.g. `[1668,2316]`). Optional cache-buster `c` (client sends Unix time via `apiService`).
- **Behavior**:
  1. Randomly picks one show ID from the list.
  2. Fetches show details (needs `seasons` on the response).
  3. Filters out **season 0** (specials).
  4. Random season, random episode number in `[1, episode_count]`.
  5. Fetches episode details, attaches trimmed `show`, returns trimmed episode payload.
- **File**: `src/app/api/episode/route.ts`

### Client API helpers

- **`src/lib/apiService.ts`** — `findShows()`, `getEpisode()`; uses **relative** `/api` base (works in browser and typical same-origin contexts).

---

## Domain types

Defined in **`src/lib/definitions.ts`**:

- **`Show`**: `id`, `name`, `backdrop_path`, optional `seasons` (populated when full show is loaded server-side).
- **`ShowsResponse`**: TMDB-shaped search response with `results: Show[]`, pagination fields.
- **`Episode`**: Episode metadata plus nested **`show`**.

When extending types, keep API trim functions in route handlers aligned so the client does not rely on huge TMDB payloads.

---

## State and persistence

- **Library**: `localStorageService` stores JSON under key **`shows`** (array of `Show`).
- **Add/remove**: `ShowCard` toggles membership via `addRemoveShow()` / `isShowInLibrary()`.
- **Important SSR pattern**: `ShowList` dynamically imports `ShowCard` with **`ssr: false`** to avoid hydration mismatches tied to `localStorage` (see comment in `src/app/ui/show-list.tsx`).

There is **no sync** between tabs or devices; clearing site data clears the library.

---

## Images and Next.js config

- Posters/backdrops/stills use **`https://image.tmdb.org/...`**.
- **`next.config.ts`** allowlists `image.tmdb.org` for `next/image`.
- Episode page builds still URLs manually (`getImagePath()`) with width variants `w300` / `w780` / `w1280` / `original`.

---

## Styling conventions

- Pages share a dark **slate gradient** background pattern (`bg-linear-to-br from-slate-900 …`).
- Theme extensions for cards: custom colors in `globals.css` `@theme` block (e.g. `--color-green-add`, `--color-red-remove`, `gray-light` / `gray-dark`).
- **shadcn** components live under `src/components/ui/`; app chrome under `src/app/ui/`.
- Fonts: **Inter** as `--font-sans` on `<html>`; **Geist** + **Geist Mono** variables on `<body>` (`src/app/layout.tsx`).

---

## Tooling and quality gates

- **ESLint**: `eslint.config.mjs` extends `eslint-config-next` (core-web-vitals + typescript).
- **Prettier**: `.prettierrc` / `.prettierignore` — run `prettier:check` before PRs if the team enforces it.

---

## Deployment

- Intended for **Vercel** (Analytics/Speed Insights already integrated).
- Set **`TMDB_API_KEY`** in the Vercel project environment.
- Respect TMDB attribution: **About** page includes required messaging and logo asset under `public/`.

---

## Roadmap / known gaps (from project docs)

From `README.md` TODOs:

- User **registration/login** — not implemented.
- Move from **localStorage** to a **SQL (or other) backend** — not implemented.

Agents implementing auth or persistence should plan replacements for `localStorageService` and any client-only assumptions (e.g. `ShowList` / `ShowCard` loading strategy).

---

## Tips for agents making changes

1. **Keeping secrets server-side**: Never put the TMDB token in client bundles; keep fetches in `src/app/api/*` or Server Components/Actions as appropriate.
2. **Extending search or episode logic**: Prefer trimming responses in the route handler so the UI stays simple and payloads small.
3. **New pages**: Follow existing patterns — client pages use `'use client'` when using hooks, `localStorage`, or event handlers; server static pages can stay as server components (e.g. About).
4. **UI additions**: Prefer existing `src/components/ui/*` primitives; run `npx shadcn@latest add …` if the project adopts new shadcn components (see `components.json` aliases).
5. **Hydration**: If a component reads `localStorage` or `window` during render, mirror the `ShowCard` approach (client-only or `dynamic(..., { ssr: false })`) to avoid SSR/client mismatches.

---

## Quick reference: files to touch for common tasks

| Task | Likely files |
|------|----------------|
| Copy / metadata | `src/app/layout.tsx`, route `page.tsx` files |
| Nav links | `src/app/ui/nav.tsx` |
| TMDB search behavior | `src/app/api/shows/route.ts`, `src/app/search/page.tsx` |
| Random episode algorithm | `src/app/api/episode/route.ts` |
| Client fetch URLs / error handling | `src/lib/apiService.ts` |
| Library storage | `src/lib/localStorageService.ts`, `src/app/ui/show-card.tsx` |
| Types | `src/lib/definitions.ts` |
| Homepage “popular” list | `src/lib/utils.ts` (`getPopularShows`) |
| Global styles / theme tokens | `src/app/globals.css` |
| Image domains | `next.config.ts` |

---

*Last aligned with repo layout and dependencies as of the `cursor-experimentation` branch snapshot; verify versions in `package.json` after dependency upgrades.*
