# PRD: PA Command Center

## 1. Summary

PA Command Center is an executive operations platform for Pure Advance leadership, starting with a CEO Dashboard that lets Sultan understand cash, product status, team activity, and urgent issues in under five seconds. The product is read-heavy with a thin action layer for escalation and follow-up. Phase 1 ships the dashboard and shared foundations; later modules deepen product, team, finance, regulatory, ownership, and AI workflows without replacing the dashboard as the daily landing screen.

---

## 2. Problem & Context

**Problem:** Pure Advance's operating signals are spread across finance, product, inventory, team, and partner workflows. The CEO needs a single real-time status board that highlights what matters today and links to source records without becoming a project management UI.

**Why now:** The handoff spec identifies the CEO Dashboard as the first production slice and states that Sultan needs the view before all deeper plumbing is complete.

**Background / prior art:** `PA_Command_Center_Handoff_Spec.md`, `PA_Command_Center_Dashboard_Mockup.html`, `PRD-template.md`, and the PA Command Center brief.

---

## 3. Goals & Non-Goals

**Goals**

1. Sultan can answer whether the company is making money, where products are, who is doing what, and what is on fire in under five seconds.
2. Dashboard data is served through stable API contracts with seeded/manual adapters first and live integrations later.
3. Shared tokens, components, data types, and module routing support Modules 1-7.
4. Alerts are server-computed from source records and link back to their source.
5. Mobile behavior is first-class below 980px.

**Non-Goals**

1. Customer portal, payroll, bookkeeping, and full warehouse management.
2. AI anomaly detection or natural-language queries in Phase 1.
3. Cap table and SAFE simulator before core finance data is reliable.
4. Full regulatory and R&D detail before dashboard/product foundations land.

---

## 4. Users & Use Cases

**Primary users:** CEO / Sultan, PA Digital implementers, operations leads who own product, finance, and team records.

**Use cases / user stories:**

1. As the CEO, I want a no-scroll daily dashboard so that I can scan the company in under five seconds.
2. As the CEO, I want urgent alerts linked to source records so that I can act immediately.
3. As an operations lead, I want product and task details one click deeper so that the dashboard stays focused.
4. As a finance owner, I want net profit and runway to use one server-side definition so that numbers match across modules.

---

## 5. Functional Requirements

| # | Requirement | Priority |
|---|-------------|----------|
| FR-1 | The system shall render a responsive CEO Dashboard with topbar, sidebar, alerts, financial pulse, revenue, invoices, product status, team pulse, and tasks. | Must |
| FR-2 | The system shall expose dashboard API routes for financial pulse, revenue by product, invoices, product status, team pulse, tasks, alerts, and escalation. | Must |
| FR-3 | The system shall format dashboard currency as comma-separated SAR with no decimals. | Must |
| FR-4 | The system shall compute alert conditions server-side from dashboard data, including low runway, low stock, overdue tasks, and upcoming invoices. | Must |
| FR-5 | The system shall provide module routes for Products, Team, Finance, Pipeline, Ownership, and AI. | Should |
| FR-6 | The system shall support seeded/manual data adapters before live integrations. | Must |
| FR-7 | The system shall make interactive rows, pills, filters, and drawers keyboard accessible. | Must |
| FR-8 | The system shall respect reduced-motion preferences. | Should |

---

## 6. UX / UI Requirements

- **Entry points:** `/` for the CEO Dashboard; sidebar links for modules.
- **Key screens / states:** loading skeletons, stale data indicators, empty task states, low-stock flags, error-safe API responses, mobile collapsed product blocks.
- **Copy & microcopy:** use handoff labels such as `Nothing overdue. Good.`, `Below reorder threshold`, `Escalate`, and `View blocker`.
- **Mockups / references:** `PA_Command_Center_Dashboard_Mockup.html` and `PA_Command_Center_Handoff_Spec.md`.
- **Accessibility:** WCAG AA contrast, keyboard activation, `aria-label` on alert region, focusable row controls, color paired with text.

---

## 7. Technical Requirements

**Tech stack & libraries:** Next.js App Router, React, TypeScript, Tailwind, seeded service layer, API route handlers.

**Code locations:** app routes in `src/app/`, dashboard components in `src/components/dashboard/`, shell layout in `src/components/layout/`, seeded services in `src/lib/`, and types in `src/types/`.

**APIs / contracts:** financial pulse, revenue by product, invoices, product status, team pulse, tasks, alerts, and task escalation are exposed under `/api`.

**Dependencies & integrations:** Finance, inventory, team status, WhatsApp, and email must sit behind adapters.

**Performance / scale:** Dashboard data should be independently fetchable so one slow source does not block the full page.

**Security & privacy:** Add authentication before real company data is connected. Treat finance and ownership data as restricted.

**Observability:** Log sync freshness, failed escalation attempts, failed data adapters, and stale-data thresholds.

---

## 8. Constraints & Assumptions

**Constraints:** Module 1 design tokens and components must follow the handoff spec. Dashboard amounts are already in SAR; the client does not convert currencies.

**Assumptions:** Initial implementation can use seeded/manual data. Live data sources, auth provider, database host, deployment platform, and WhatsApp/email provider are not finalized.

---

## 9. Edge Cases & Error Handling

- Empty financial values show `-` with a month-aware caption instead of `0 SAR`.
- Data older than 24 hours is marked stale.
- Negative net profit is red and prefixed with a minus sign.
- Cash runway under three months raises a red alert.
- Low stock raises product and alert flags.
- No overdue tasks shows `Nothing overdue. Good.`
- Long names truncate visually but keep full names in labels/titles.
- Reduced motion disables pulses and slide-in animation.

---

## 10. Acceptance Criteria

- [ ] Given the CEO opens `/`, when seeded dashboard data loads, then the four executive questions are visible without opening another page.
- [ ] Given the viewport is below 980px, when the CEO opens `/`, then navigation becomes mobile-friendly and tasks appear before team status.
- [ ] Given financial values render, when they are displayed on the dashboard, then they use comma-separated SAR formatting with no decimals.
- [ ] Given stock falls below threshold, when alerts are requested, then a red low-stock alert is returned and linked to the product.
- [ ] Given a task is overdue or blocked, when task filters are used, then matching rows update in place.
- [ ] Given escalation is triggered, when the API receives a task id, then it returns the intended WhatsApp/email escalation payload.
- [ ] Tests cover currency formatting, alert derivation, and task filtering.

---

## 11. Testing Strategy

- **Unit tests:** currency formatting, stale-data detection, alert derivation, task filters.
- **Integration tests:** dashboard API response shapes and escalation payload.
- **E2E / manual QA:** desktop dashboard scan, mobile dashboard order, keyboard focus, reduced-motion behavior.
- **Test data:** seeded products, financials, invoices, team members, and tasks.

---

## 12. Rollout Plan

- **Feature flag:** module routes beyond Dashboard can remain beta-labelled until backed by live data.
- **Migration / backfill:** migrate seed models to Postgres/Prisma once persistence is approved.
- **Phased release:** internal dashboard demo, CEO pilot, live-data hardening, module expansion.
- **Comms:** dashboard release notes should call out seeded/manual vs live data sources.
- **Rollback:** disable live adapters and fall back to seeded/manual adapter if a sync fails.

---

## 13. Implementation Plan

1. **Scaffolding:** Add Next.js, Tailwind tokens, app shell, shared types, seed data, and PRD.
2. **Core dashboard logic:** Implement dashboard services, formatting, alert derivation, and API routes.
3. **Dashboard UI:** Build responsive cards, alerts, product blocks, team/task views, and top-level interactions.
4. **Module foundations:** Add module routes for product, team, finance, pipeline, ownership, and AI expansion.
5. **Tests and docs:** Add focused unit tests and README instructions.
6. **Production hardening:** Add auth, persistent DB, live adapters, observability, and deployment once provider choices are confirmed.

---

## 14. Open Questions

- [ ] Which auth provider should protect finance and ownership data? Owner: PA Digital, due before live data.
- [ ] Which WhatsApp/email provider should send escalation messages? Owner: PA Digital, due before production escalation.
- [ ] Which finance and inventory systems are the source of truth? Owner: Operations, due before live integration.
- [ ] Should Postgres/Prisma be used immediately or after dashboard demo approval? Owner: PA Digital, due before Sprint 2.

---

## 15. References

- `PA_Command_Center_Handoff_Spec.md`
- `PA_Command_Center_Dashboard_Mockup.html`
- `PRD-template.md`
- `PA_Command_Center_Brief_v2.docx`
