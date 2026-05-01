# Deep Code Review Findings (2026-05-01)

## Security
[CRITICAL] src/lib/auth.ts:7-9 – `getCurrentUser()` always returns a hardcoded CEO identity, so every request is effectively authenticated as a privileged user. Fix: replace with real session/token validation (e.g., NextAuth/JWT) and return 401 for unauthenticated requests.
[CRITICAL] src/app/api/crm/partners/route.ts:1-6 – CRM partner endpoint exposes full partner notes and contact details without auth/authz checks. Fix: require authenticated user context and role-based authorization before returning data.
[CRITICAL] src/app/api/crm/partners/[id]/route.ts:1-17 – Per-partner endpoint leaks sensitive contact and deal context without access control. Fix: add auth middleware + explicit role checks and redact sensitive fields for non-privileged roles.
[CRITICAL] src/app/api/crm/interactions/route.ts:1-6 – Interaction timeline endpoint is publicly readable and can leak internal business events. Fix: enforce authenticated access and add least-privilege access policy.
[MAJOR] src/app/api/tasks/[id]/escalate/route.ts:4-8 – Escalation action can be invoked by any caller; this is a write-like workflow with no authorization or anti-abuse controls. Fix: require authenticated user, enforce role checks, and add rate limiting/audit logging.
[MAJOR] src/lib/crm-seed-data.ts:58-61 – Personal contact data (email/phone) is committed in source and served by API responses. Fix: move sensitive data to protected storage/env-backed fixtures and sanitize API payloads.

## Performance
[MINOR] src/components/coolvex/ActionLane.tsx:20-23 – Action items are re-sorted on every render (`[...items].sort`) even when `items` are unchanged. Fix: wrap sort in `useMemo` keyed by `items`.
[MINOR] src/components/dashboard/Dashboard.tsx:17-22 – `escalate()` has no pending guard, so repeated clicks can trigger duplicate requests and extra rerenders/network traffic. Fix: add per-task pending state and disable button while in flight.

## Correctness
[MAJOR] src/lib/dashboard-service.ts:9 and src/app/api/dashboard/invoices/route.ts:4-5 – `limit` is unsanitized; negative values (`?limit=-1`) cause `.slice(0,-1)` behavior and return unexpected invoice subsets. Fix: clamp to a bounded non-negative integer before slicing.
[MAJOR] src/components/dashboard/Dashboard.tsx:63-65 – `Sparkline` divides by `max`; when all values are `0`, height becomes `NaN%`, causing invalid style output. Fix: guard `max <= 0` and render zero-height/default bars.
[MAJOR] src/components/dashboard/Dashboard.tsx:17-22 – `response.json()` is called unconditionally; non-JSON/500 responses throw and can leave UI in inconsistent state. Fix: wrap fetch in `try/catch`, check `content-type`, and set explicit error states.
[MINOR] src/components/dashboard/Dashboard.tsx:47-48 – Top bar date string is hardcoded (`Sunday, Apr 26`), causing stale/wrong UI context after that date. Fix: derive date dynamically from `new Date()` with locale formatting.

## Maintainability
[MAJOR] src/components/dashboard/Dashboard.tsx:1-105 – Single large component contains many nested UI concerns and state branches, increasing complexity and change risk. Fix: split into focused subcomponents/hooks (top bar, alerts, KPI panel, tasks, team, drawer).
[MINOR] src/components/coolvex/ActionLane.tsx:36 and src/components/coolvex/EvidenceDrawer.tsx:33-34,60-61 – Array index used as React key can cause unstable identity during reordering/filtering. Fix: use stable domain identifiers (e.g., title+due hash or source claim id).
[MINOR] package.json:14-34 – Wide `latest` usage makes builds non-reproducible and increases surprise breakages. Fix: pin exact versions (or conservative ranges) and rely on lockfile updates through controlled dependency bumps.

## Testing
[MAJOR] src/__tests__/dashboard-service.test.ts:1-34 – No tests for API route auth behavior, input validation (`limit`, invalid IDs), or escalation error paths. Fix: add route-level integration tests with success + failure + malformed query cases.
[MINOR] src/__tests__/dashboard-service.test.ts:5-34 – Current suite covers only happy paths and misses edge cases (`daysUntil` timezone boundaries, empty sparkline arrays, all-zero spark series). Fix: add edge-case unit tests for date/math and UI helper behaviors.

## Documentation & Comments
[MINOR] README.md:1-27 – README lacks security model and environment variable documentation for API protection expectations. Fix: add sections for auth strategy, sensitive-data handling, and production hardening checklist.
[MINOR] README.md:1-27 – No architecture map describing API routes/data ownership, making onboarding and review harder. Fix: add module/API overview and data-flow diagram/table.

## Project Health
[MAJOR] package.json:14-34 – Dependency policy uses `latest` everywhere, preventing deterministic CI and safe patch management. Fix: pin dependencies and introduce scheduled update workflow.
[MAJOR] package-lock.json (npm audit result) – `npm audit` reports a moderate PostCSS XSS issue via Next.js transitive dependency path. Fix: monitor upstream Next.js patch release and upgrade to the first non-vulnerable version once available; track as a security debt item.
[MINOR] package.json:5-12 – `lint` script exists but no evidence of enforced CI quality gates in repository docs/config. Fix: add CI workflow to run lint/typecheck/test/build on PRs.

## Top 5 Priorities
1. Replace hardcoded CEO auth with real authentication/session validation (`src/lib/auth.ts`).
2. Add authz protections to CRM and escalation API routes (`src/app/api/crm/**`, `src/app/api/tasks/[id]/escalate/route.ts`).
3. Sanitize and bound `limit` query handling for invoices endpoint (`src/app/api/dashboard/invoices/route.ts`, `src/lib/dashboard-service.ts`).
4. Add resilient error handling in dashboard escalation fetch path (`src/components/dashboard/Dashboard.tsx`).
5. Remove `latest` dependency strategy and stabilize dependency governance (`package.json`).

## Build/Typecheck Status (sandbox)
- `npm run typecheck`: executed successfully.
- `npm run build`: executed successfully.
- `npm audit --omit=dev`: executed; reports 2 moderate vulnerabilities (PostCSS via Next.js transitive dependency).
