# 2026-05-01 Permissions and Guardrails

## Recommended roles
- CEO (global visibility, selective high-risk approvals)
- Operator (cross-domain execution, no ownership/treasury execution rights)
- Functional Owner (Finance Lead, Product Lead, BD Lead, People Lead)
- Admin/Platform (policy/config, no unilateral financial execution)
- Auditor/Observer (read-only with full audit visibility)

## Permissions matrix (simplified)

| Capability | CEO | Operator | Finance Lead | Product Lead | BD Lead | Admin | Auditor |
|---|---:|---:|---:|---:|---:|---:|---:|
| View executive dashboard | Y | Y | Y | Y | Y | Y | Y |
| Edit task states | Y | Y | domain only | domain only | domain only | Y | N |
| Trigger escalation | Y | Y | Y | Y | Y | Y | N |
| Approve payments < threshold | Y | N | Y | N | N | N | N |
| Approve payments >= threshold | Y (with dual control) | N | Y (with dual control) | N | N | N | N |
| Execute payment submission | N | N | Y | N | N | N | N |
| Modify cap table data | N | N | N | N | N | N | N (external SoR only) |
| Approve readiness gate | Y | N | N | Y | N | N | N |
| Configure integration mappings | N | N | N | N | N | Y | N |
| Override alert suppression | Y | Y (with reason) | Y | Y | Y | Y | N |

## Restricted surfaces
- Payment execution, bank details, cap table legal records, regulatory filing final status, role grants.
- These require dedicated workflow screens, never one-click from summary dashboard.

## Required confirmations
- Any monetary action: amount + counterparty + source doc preview + typed confirmation.
- Any stage-gate approval: checklist completion + evidence links + rationale.
- Any suppression/override: reason category + expiry timestamp.

## Rationale capture requirements
Mandatory for:
- escalation severity overrides,
- approval rejection/approval on high-risk items,
- manual data backfills touching authoritative fields,
- closing red alerts without mitigation evidence.

## Dual-control rules
- Payment above policy threshold.
- Ownership/cap-table scenario publication.
- Production connector credential changes.
- CEO-delegated emergency overrides lasting >24h.

## Kill switches
- Global “read-only mode” if finance or integration integrity breach.
- Per-domain write freeze if sync health in `failed`.
- AI recommendation auto-apply disabled by default; hard kill switch retained.

## Prototype/live safety rules
1. Prototype data cannot co-reside in live tables.
2. Live mode requires environment banner + action watermarking.
3. Any action generated from simulated data must be blocked.
4. API rejects write commands if source data trust state is `stale/unknown/simulated`.

## Actions impossible from dashboard
- Final payment execution.
- Cap table mutation.
- Regulatory submission filing.
- Role elevation.

## What should be true before this system is trusted daily by a CEO
- Role/capability matrix enforced server-side.
- High-risk actions always require approval workflow and rationale.
- Dual-control pathways tested and auditable.
- Read-only safety mode can be activated in <1 minute.
