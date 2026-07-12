# Command Center Architecture

## Scope

The Command Center is a read-heavy executive status board. Its purpose is to aggregate reliable operational signals, surface urgent exceptions, and link each claim to an accountable source. It is not intended to become the primary database for finance, CRM, regulatory evidence, or private documents.

## Current request flow

1. `src/proxy.ts` protects application and API routes with an interim HTTP Basic gate.
2. Server pages call `src/lib/dashboard-service.ts` to normalize fixture records and derive alerts.
3. API routes repeat the authorization check close to the data boundary.
4. Client components render read-only summaries and prepare escalation previews.
5. The Finance module may read an externally mounted private workbook through a strict server-only aggregate adapter.
6. No current route persists a record, sends a message, or serves a private source document.

## Data boundary

The tracked `src/lib/*-data.ts` modules are synthetic demonstrations. A production adapter must run server-side and must:

- authenticate the user and enforce role, record, and field authorization;
- return only the minimum fields needed for the requested view;
- preserve `unknown` and `withheld` states instead of coercing them to zero;
- attach source identifier, classification, owner, freshness, and approval status;
- redact logs and error responses;
- store private evidence outside Git and outside browser bundles;
- write an immutable audit event for reads of restricted records and for every action.

## Module intent

| Module | Intended responsibility | Current state |
| --- | --- | --- |
| Dashboard | Aggregate money, products, people, tasks, and urgent alerts | Functional on synthetic fixtures |
| Products | Show lifecycle stage, evidence readiness, ownership, and blockers | Read-only synthetic profiles |
| Team | Show role-based availability and workload | Read-only synthetic roles |
| Finance | Reconcile revenue, cash, invoices, burn, and runway | External private-workbook aggregate adapter |
| Pipeline | Track R&D and regulatory gates with provenance | Foundation page |
| Partners | Review relationship records and interaction history | Read-only sanitized demo |
| Ownership | Define decision rights and approval boundaries | Planned |
| AI | Source-grounded analysis with human approval gates | Planned |
| Launch cockpit | Reconcile manufacturing, regulatory, market, and action evidence | Functional sanitized workflow |

## Production gaps

Before operational deployment, replace Basic authentication with managed identity and short-lived sessions, add granular authorization, connect audited server-side data adapters, add database and message-delivery integrations with idempotency, define retention and incident response, and complete threat modeling and independent security review.

The preliminary workbook adapter is described in `docs/FINANCIAL_MODEL_INTEGRATION.md`. It reads last-saved values, caches by file modification time, rejects unexpected workbook structure, and never returns employee-level data or a filesystem path.
