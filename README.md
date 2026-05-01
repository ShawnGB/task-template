# App Template

A fork-ready full-stack TypeScript monorepo template.

## Stack

| Layer | Technology | Version |
|---|---|---|
| Runtime | Node.js | 22 |
| Language | TypeScript | 6 |
| Backend | Express | 5 |
| Frontend | React | 19 |
| Routing | React Router | 7 |
| Bundler | Vite | 8+ |
| Dev runner | tsx | 4 |
| Containers | Docker Compose | v2 |
| Packages | npm workspaces | — |

## Quick Start

### Local

```bash
npm install
npm run dev --workspace=backend    # http://localhost:3001
npm run dev --workspace=frontend   # http://localhost:5173
```

### Docker

```bash
docker compose up --build                              # first run
docker compose up                                      # subsequent runs
docker compose down                                    # stop
docker compose down -v && docker compose up --build    # after changing dependencies
```

## Project Structure

```
├── backend/
│   └── src/
│       ├── modules/        Feature modules (routes + controller + service)
│       │   └── hello/
│       ├── middleware/     Shared Express middleware
│       ├── config/         Environment config
│       └── index.ts        App entry point
├── frontend/
│   └── app/
│       ├── root.tsx        Root HTML layout
│       └── routes/         File-based routes
├── packages/
│   └── shared/             @app/shared — shared TypeScript types
└── docker-compose.yml
```

## Adding a Backend Feature

1. Create `backend/src/modules/<name>/`:
   - `<name>.service.ts` — business logic (no Express imports)
   - `<name>.controller.ts` — calls service, sends response
   - `<name>.routes.ts` — `Router()`, registers endpoints
2. Mount the router in `backend/src/index.ts`:
   ```typescript
   import nameRouter from './modules/<name>/<name>.routes.js'
   app.use('/<name>', nameRouter)
   ```

## Adding a Frontend Route

Add a file to `frontend/app/routes/`. React Router picks it up automatically.

| File | URL |
|---|---|
| `_index.tsx` | `/` |
| `about.tsx` | `/about` |
| `posts.$id.tsx` | `/posts/:id` |
| `dashboard._index.tsx` | `/dashboard` (nested) |

Each route file can export:
- `loader` — fetch data before rendering (runs client-side in SPA mode)
- `action` — handle form submissions
- `default` — the page component

## Express 5 Notes

> For reviewers familiar with Express 4

**Async errors bubble automatically.** In Express 4, async errors had to be caught and forwarded:

```typescript
// Express 4 — required
app.get('/path', async (req, res, next) => {
  try {
    const data = await riskyOperation()
    res.json(data)
  } catch (err) {
    next(err)
  }
})
```

In Express 5, throwing from an async handler (or returning a rejected promise) is caught by the router automatically:

```typescript
// Express 5 — throw, Express handles it
app.get('/path', async (req, res) => {
  const data = await riskyOperation()
  res.json(data)
})
```

No `next`, no try/catch in controllers.

Other changes relevant to this template:
- `express.json()` is built in (since Express 4.16) — no need for the `body-parser` package
- Route path syntax changed in Express 5 (path-to-regexp v8) — some Express 4 regex-style paths are invalid

## React Router v7 Notes

> For reviewers familiar with React Router v5/v6 or Next.js

**Single package.** `react-router` v7 replaces both `react-router` and `react-router-dom`. Import everything from `'react-router'`.

**SPA mode.** This template uses `ssr: false` in `react-router.config.ts`. Loaders run in the browser — they are typed `fetch` calls, not server-side functions.

**File-based routing.** Files in `app/routes/` are registered automatically. No route definition file needed.

**Generated types.** React Router generates per-route types into `frontend/.react-router/types/` at dev/build time. This directory is gitignored — it appears after the first `npm run dev`.

**Root layout requirements.** `app/root.tsx` must include `<Scripts />` and `<ScrollRestoration />` from `'react-router'`. These are required by framework mode — they inject the client bundle and restore scroll position between navigations.

## Forking This Template

Update these files after forking:

1. `package.json` → change `"name": "app"` to your project name
2. `packages/shared/package.json` → change `"name": "@app/shared"` to `@yourscope/shared`
3. `backend/package.json` → change `"@app/shared": "*"` to `@yourscope/shared`
4. `frontend/package.json` → same
5. `backend/src/modules/hello/hello.service.ts` → import path
6. `backend/tsconfig.json` → `paths` alias key
7. `frontend/tsconfig.json` → `paths` alias key
8. `frontend/vite.config.ts` → alias key
9. Run `npm install` to regenerate `package-lock.json`
