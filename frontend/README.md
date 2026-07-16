# JobPulse Frontend

Modern job intelligence dashboard built with React + Vite + Tailwind CSS.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** — custom dark theme
- **React Router 6** — client-side routing
- **Axios** — API calls with proxy to FastAPI backend
- **Recharts** — bar, pie, line charts
- **React Icons** — Remix Icon set

## Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy env and set your backend URL
cp .env.example .env

# Start dev server (proxies /api → localhost:8000)
npm run dev
```

## Pages

| Route | Page |
|-------|------|
| `/` | Dashboard — stats, top skills/companies, recent jobs |
| `/jobs` | Jobs — search, filter, paginate |
| `/jobs/:id` | Job Details |
| `/analytics` | Analytics — all charts |

## API Proxy

Vite proxies `localhost:5173/api/*` → `localhost:8000/*` in dev.
Set `VITE_API_URL` in `.env` for a different backend URL.

## Adding later

- Auth / login page → add a route + `PrivateRoute` wrapper
- Job bookmarks → local state or new backend endpoint
- Notifications → Navbar bell icon
