# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A reactive website survey built with SvelteKit 5 + Svelte 5. Users design their ideal website by choosing colors, sizes, typography, animations, and layout preferences. As they answer, CSS custom properties update in real-time so the survey page itself reflects their choices. Responses are saved to PostgreSQL and aggregated statistics are displayed with Chart.js and Plotly.

## Commands

- **Dev server**: `pnpm dev`
- **Build**: `pnpm run build` (runs `vite build && drizzle-kit generate`)
- **Preview production build**: `pnpm run preview`
- **Lint**: `pnpm lint` (prettier --check + eslint)
- **Format**: `pnpm format`
- **Type check**: `pnpm check`
- **DB push schema**: `pnpm db:push`
- **DB migrate**: `pnpm db:migrate`
- **DB studio**: `pnpm db:studio`
- **Generate migrations**: `pnpm drizzle-kit generate`

## Tech Stack

- **Framework**: SvelteKit 5 with Svelte 5 (runes: `$state`, `$effect`, `$derived`)
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite` plugin) + CSS custom properties for real-time survey theming
- **Database**: PostgreSQL via `postgres` (postgres.js) driver + Drizzle ORM
- **Charts**: Chart.js for bar/pie charts, Plotly (`plotly.js-dist-min`) for 3D scatter plots
- **Math**: mathjs for statistical calculations
- **Adapter**: `@sveltejs/adapter-node` (Node.js server deployment)
- **Package manager**: pnpm

## Architecture

### Real-time Theming System
The core feature is the live-preview theming. `src/lib/state/userStyles.svelte.js` holds a global `$state` object with all user preferences (initially null). The survey page (`src/routes/survey/+page.svelte`) has a `$effect` that maps these values to `--survey-*` CSS custom properties on `document.documentElement`. All survey UI elements reference these properties, so changes appear instantly.

### Route Structure
- `/` — Landing page
- `/survey` — Multi-step survey with 6 slides: Colors, Sizes, Typography, Animations, Layout, Rating
- `/statistics` — Results dashboard fetching from `/api/stats`
- `/api/save` (POST) — Validates and saves a response across normalized tables, then updates the `statistics` aggregate table
- `/api/stats` (GET) — Returns aggregated statistics keyed by parameter name

### Database Schema (`src/lib/server/db/schema/`)
Normalized into separate tables: `responses` (main + rating), `colors`, `sizes`, `typography`, `animations`, `layout`, and a `statistics` table for pre-aggregated stats (count, sum, values array per parameter). All detail tables reference `responses.id` as foreign key.

### Component Organization
- `src/lib/components/cards/` — Survey step components (Colors, Size, Typography, Animations, Layout, Rating), barrel-exported via `index.js`
- `src/lib/components/graphTemplates/` — Reusable chart wrappers (BarChart, Histogram, PieChart, ScatterPlot3D)
- `src/lib/components/graphs/` — Statistics section components (BgStats, CardsStats, MarginaliaStats, ButtonsStats, RatingStats)

### Data Flow on Submit
Colors are converted from hex to RGB (`convertColorsToRgb`) before POSTing to `/api/save`. The server validates all fields, inserts into per-category tables, and upserts running aggregates in the `statistics` table. CSS custom properties are cleaned up before navigating to `/statistics`.

## Environment

Requires `DATABASE_URL` in `.env` (PostgreSQL connection string). See `.env.example`.

## Docker

`docker-compose.yaml` + `dockerfile` provide containerized deployment. The entrypoint runs `drizzle-kit migrate` before starting the Node server on port 3000.
