# 2026-05-01 Dashboard Action Triage

| Action name | Current location | Current risk | Recommended disposition | Reason | Future safe version |
|---|---|---:|---|---|---|
| Escalate task | `src/components/dashboard/Dashboard.tsx` (`TaskRow` button) + `src/app/api/tasks/[id]/escalate/route.ts` | High | Require approval workflow for external notification channels; keep internal escalation creation | Current endpoint only returns generated payload and does not persist or verify authority | `POST /api/v1/tasks/{id}/escalations` persisted + audited + capability checked |
| View blocker | `src/components/dashboard/Dashboard.tsx` | Low | Safe to keep now | Read-only UI expansion only | Keep as read-only task detail drawer with event timeline |
| Mark paid (top bar link) | `src/components/dashboard/Dashboard.tsx` `TopBar` links to `/finance` | High | Reframe as "Request payment approval" | Current affordance implies payment execution without backend controls | Launch approval request modal -> `POST /api/v1/invoices/{id}/approval-requests` |
| Product row open | `src/components/dashboard/Dashboard.tsx` (`ProductRow` button) | Low | Safe to keep now | Opens local drawer only; no mutation | Keep as drill-down to canonical product page once model exists |
| KPI cards clickable | `src/components/dashboard/Dashboard.tsx` (`KPICard` rendered as button) | Medium | Should require drill-down | Buttons imply action but no command support; could mislead operators | Convert to explicit "View details" navigation to read model pages |
| Alert chip clickthrough | `src/components/dashboard/Dashboard.tsx` (`AlertsStrip` anchor) | Medium | Keep read-only and add explicit acknowledge action | Navigation only is safe, but no alert state lifecycle exists | Add ack button calling `POST /api/v1/alerts/{id}/ack` with rationale |
| Task filter chips | `src/components/dashboard/Dashboard.tsx` | Low | Safe to keep now | Pure client filter on loaded data | Later server-side query filter with pagination |
| API dashboard reads | `src/app/api/dashboard/*` | Medium | Keep but reroute to query layer | Contract useful; implementation is seed-backed | Route handlers call `application/queries/dashboard/*` with trust metadata |
| `/api/tasks/:id/escalate` route | `src/app/api/tasks/[id]/escalate/route.ts` | High | Remove until real backend support exists or replace immediately | Simulation endpoint can create false confidence | Replace with versioned command endpoint and deprecate route |
