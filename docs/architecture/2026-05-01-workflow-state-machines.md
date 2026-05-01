# 2026-05-01 Workflow State Machines

## 1) Tasks state machine
States: `draft -> ready -> in_progress -> blocked -> at_risk -> completed` (+ `cancelled`)
- `draft -> ready`: owner/manager defines assignee + due date.
- `ready -> in_progress`: assignee starts.
- `in_progress -> blocked`: assignee marks blocker with rationale.
- `blocked -> in_progress`: blocker resolved by owner/manager.
- `in_progress/blocked -> at_risk`: SLA breach predictor or manager escalation.
- `in_progress/at_risk -> completed`: assignee closes with evidence.
- any non-terminal -> `cancelled`: manager/admin with rationale.
Audit events: `task.created`, `task.started`, `task.blocked`, `task.unblocked`, `task.marked_at_risk`, `task.completed`, `task.cancelled`.
Unknown/stale: task becomes `unknown_state` if not updated for policy window.

## 2) Escalations state machine
States: `queued -> dispatched -> acknowledged -> in_resolution -> resolved` (+ `failed`, `expired`)
Trigger: task enters `blocked`/`at_risk` or operator manual escalation.
Who can trigger: assignee (soft), manager, operator; hard escalation to exec by policy.
Failure paths: dispatch channel failure => `failed`; no ack before SLA => `expired` + auto-reescalate.
Audit: `escalation.queued/dispatched/acknowledged/expired/resolved`.

## 3) Alerts/Incidents state machine
Alert states: `new -> triaged -> acknowledged -> closed` (+ `suppressed`, `false_positive`).
Incident states: `open -> mitigating -> monitoring -> closed` (+ `reopened`).
Triggers: domain event rules, sync failures, threshold breaches.
Owners: alert owner (functional lead), incident commander for red alerts.
Blocked path: missing owner => `triage_blocked`.
Audit: alert creation source, severity changes, suppression rationale.

## 4) Approvals state machine
States: `not_required | requested -> under_review -> approved/rejected` (+ `expired`, `revoked`)
Transitions:
- command requiring policy threshold creates approval request,
- approver decision requires rationale,
- dual-control actions require two distinct approvers.
Who can trigger: requester role per action; approvers per policy matrix.
Audit: who requested, who approved/rejected, rationale, policy version.

## 5) Invoices/Payments state machine
Invoice: `draft -> received -> validated -> approved -> scheduled -> paid` (+ `disputed`, `overdue`, `void`)
Payment: `pending_approval -> approved -> submitted -> settled` (+ `failed`, `reversed`)
Rules:
- `validated` requires vendor + amount + source doc checks.
- `approved` requires threshold-based policy.
- `submitted` only via finance command path (not dashboard quick action).
Unknown/stale: if source sync stale > SLA, freeze status at `verification_required`.

## 6) Product readiness state machine
States: `concept -> dd -> pre_reg -> reg_submitted -> reg_cleared -> mfg_pilot -> mfg_ready -> launch_ready -> launched` (+ `on_hold`)
Gate checks: scientific evidence, regulatory docs, supplier readiness, quality signoff.
Transition requires checklist completion and owner attestation.
Failure/blocked: any critical gate failed => `on_hold` with blocker class.
Audit: gate pass/fail evidence hashes + approver identities.

## 7) Sync health/data freshness state machine
States: `healthy -> aging -> stale -> degraded -> failed` (+ `unknown`)
Transitions based on dataset SLA and connector outcomes.
Triggers: scheduler tick, webhook timeout, reconciliation mismatch.
Owners: integration owner + affected domain owner.
Audit: sync run stats, error codes, retries, manual overrides.

## What should be true before this system is trusted daily by a CEO
- All critical actions enforce explicit state transitions.
- Blocked/failure paths are visible and owned.
- Unknown/stale states are impossible to hide in UI.
- Every state transition emits auditable events with actor and rationale.
