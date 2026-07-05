# InfluenceBridge

An influencer marketing brokerage platform that connects Indian businesses with social media influencers for paid promotion campaigns.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/influencer-hub run dev` — run the web frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Frontend: React + Vite (`artifacts/influencer-hub`)

## Where things live

- Web app: `artifacts/influencer-hub` (served at `/`)
- API server: `artifacts/api-server` (routes in `src/routes/`, served at `/api`)
- API contract: `lib/api-spec/openapi.yaml` — source of truth for all endpoints
- DB schema: `lib/db/src/schema/influencers.ts`, `lib/db/src/schema/campaigns.ts`

## Product

- Landing page introducing the brokerage platform, with live stats and a showcase of top influencers.
- `/influencers` — searchable, filterable influencer directory (by platform, category, search).
- `/influencers/:id` — individual influencer profile.
- `/start-campaign` — businesses submit a campaign/promotion request.
- `/join-as-influencer` — influencers apply to join the platform.

This is an MVP marketing + lead-capture surface. The full brokerage workflow described in the original business requirements doc (deal matching, escrow payments, GST/TDS invoicing, admin panel, verification workflow) is not yet built — campaign requests and influencer applications are currently stored as leads/applications, not live matched deals.

## User preferences

- User writes in Hindi/Hinglish; respond in the same register they use.

## Gotchas

- Money fields (`budgetInr`, `pricePerPostInr`, etc.) are stored as Postgres `numeric` and must be cast with `Number(...)` when serializing Drizzle rows to JSON — they come back as strings from the driver.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
