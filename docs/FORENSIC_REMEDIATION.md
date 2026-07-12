# Forensic Remediation Record

Date: 2026-07-12

## Finding

The historical repository contained categories of material that do not belong in source control: personal profile information, commercial and payment records, supplier correspondence, regulatory and intellectual-property identifiers, internal market and financial analyses, extracted office documents, images, archives, and source-pack manifests. Application fixtures also mixed operational-looking values with placeholder behavior and exposed them through unauthenticated routes.

This record intentionally omits the sensitive values and document contents.

## Containment and remediation

- Repository visibility was restricted before code remediation.
- Private documents, extracted files, archives, and internal research artifacts were removed from the release tree.
- Application fixtures were replaced with clearly labeled synthetic records.
- Personal biographies, external profile links, exact commercial values, filing identifiers, and unapproved claims were removed from the client application.
- Application and API routes now fail closed behind an authentication gate.
- CRM mutation controls were removed until audited persistence and authorization exist.
- Escalation behavior now returns a preview and cannot claim a message was sent.
- Security headers, dependency checks, linting, type checks, tests, and production build checks were added.
- The release history is replaced so the sanitized tree becomes the only reachable branch history.

## Residual obligations

Git history replacement does not invalidate already downloaded clones, screenshots, notifications, CI artifacts, third-party caches, or copied documents. The repository owner must assess whether exposed records require credential rotation, invoice or filing reissue, contractual notification, privacy notification, or deletion requests to downstream holders. GitHub Support may be required to purge cached views or unreachable objects beyond normal branch rewriting.

Real data must not be reintroduced until the production controls listed in `docs/ARCHITECTURE.md` are implemented and reviewed.
