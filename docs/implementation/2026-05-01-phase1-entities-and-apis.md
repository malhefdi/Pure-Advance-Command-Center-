# 2026-05-01 Phase 1 Entities and APIs

## Phase 1 entity model (minimum viable production-grade)

## 1) Identity / capability
### user
- **Purpose:** actor identity for auth, ownership, audit.
- **Key fields:** id (uuid), email, display_name, status, created_at.
- **Relationships:** user_roles (M:N), tasks.assignee_user_id, audit_events.actor_user_id.
- **Trust class:** canonical.
- **Type:** internal.

### role / capability / role_capability
- **Purpose:** enforce command authorization.
- **Key fields:** role(id,name), capability(id,key), role_capability(role_id,capability_id).
- **Relationships:** user_roles links users→roles.
- **Trust class:** canonical.
- **Type:** internal.

## 2) task
- **Purpose:** operational work item lifecycle.
- **Key fields:** id, title, product_ref, assignee_user_id, manager_user_id, due_at, priority, status, blocker_text, created_at, updated_at.
- **Relationships:** escalations.task_id, approval_requests.subject_task_id, audit_events.subject_task_id.
- **Trust class:** canonical.
- **Type:** internal.

## 3) escalation
- **Purpose:** record escalation intent, ack, and resolution.
- **Key fields:** id, task_id, initiated_by_user_id, recipient_user_id, channel, message, status(open|acknowledged|resolved), ack_at, resolved_at, created_at.
- **Relationships:** task 1:M escalations.
- **Trust class:** canonical.
- **Type:** internal.

## 4) alert
- **Purpose:** operator-visible risk/attention signal.
- **Key fields:** id, severity, message, source_ref, source_entity_type, source_entity_id, acknowledged_by_user_id, acknowledged_at, created_at.
- **Relationships:** optional link to task/escalation/invoice.
- **Trust class:** derived (if computed) or canonical (if manually created).
- **Type:** internal derived.

## 5) invoice / payment approval
### invoice
- **Purpose:** payable record and state progression.
- **Key fields:** id, partner_name, product_ref, amount_sar, due_at, status(draft|upcoming|overdue|paid), external_ref, created_at.
- **Relationships:** approval_requests.subject_invoice_id.
- **Trust class:** canonical (internal-owned) / synced (if imported).
- **Type:** internal or synced.

## 6) data_sync_status
- **Purpose:** freshness and sync truth by domain/feed.
- **Key fields:** id, domain_key, source_system, last_success_at, last_attempt_at, status(ok|degraded|failed), freshness_sla_minutes, lag_seconds, error_summary.
- **Relationships:** referenced by dashboard metadata.
- **Trust class:** canonical.
- **Type:** internal.

## 7) audit_event
- **Purpose:** immutable action trace.
- **Key fields:** id, occurred_at, actor_user_id, action_key, subject_type, subject_id, before_json, after_json, rationale, correlation_id.
- **Relationships:** links across all mutable entities.
- **Trust class:** canonical.
- **Type:** internal.

## 8) approval_request
- **Purpose:** workflow gate for sensitive actions.
- **Key fields:** id, approval_type(payment|risk|task_exception), subject_type, subject_id, requested_by_user_id, assigned_approver_user_id, status(pending|approved|rejected|cancelled), rationale, decision_note, decided_at, created_at.
- **Relationships:** invoice/task/escalation via polymorphic subject.
- **Trust class:** canonical.
- **Type:** internal.

## Phase 1 command/query API surface

## Queries
- `GET /api/v1/dashboard/snapshot`
  - Output: dashboard cards + trust/freshness envelope.
  - Auth: authenticated user.
  - Audit: no (read logs optional).
- `GET /api/v1/trust/freshness`
  - Output: list of `data_sync_status` and domain trust tags.
  - Auth: authenticated user.

## Commands
- `POST /api/v1/tasks/{taskId}/status`
  - Input: `{ "status": "blocked|on-track|completed", "blockerText?": "...", "rationale": "..." }`
  - Output: updated task + event id.
  - Auth: `task:update` capability.
  - Audit: required.
- `POST /api/v1/tasks/{taskId}/escalations`
  - Input: `{ "recipientUserId": "...", "channel": "whatsapp|email", "message": "...", "rationale": "..." }`
  - Output: escalation record.
  - Auth: `task:escalate`.
  - Audit: required.
- `POST /api/v1/escalations/{id}/ack`
  - Auth: recipient or `escalation:manage`.
  - Audit: required.
- `POST /api/v1/escalations/{id}/resolve`
  - Input: `{ "resolutionNote": "...", "rationale": "..." }`
  - Auth: `escalation:manage`.
  - Audit: required.
- `POST /api/v1/alerts/{id}/ack`
  - Input: `{ "rationale": "..." }`
  - Auth: `alert:ack`.
  - Audit: required.
- `POST /api/v1/invoices/{id}/approval-requests`
  - Input: `{ "approvalType": "payment", "rationale": "..." }`
  - Auth: `invoice:request_approval`.
  - Approval: creates pending approval request.
  - Audit: required.
- `POST /api/v1/approval-requests/{id}/decision`
  - Input: `{ "decision": "approved|rejected", "decisionNote": "..." }`
  - Auth: `approval:decide`.
  - Approval: terminal decision endpoint.
  - Audit: required.

## API conventions (Phase 1)
- Mutations require `rationale` string (min length enforced).
- Responses include:
  - `data`
  - `meta.trust_classification`
  - `meta.freshness`
  - `meta.audit_event_id` (mutations)
