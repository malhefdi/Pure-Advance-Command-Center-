# Security Policy

## Reporting a vulnerability or data exposure

Do not open a public issue containing exploit details, personal data, financial
records, credentials, private documents, or screenshots of sensitive material.

Use GitHub's private vulnerability-reporting or security-advisory flow for this
repository when available. Otherwise, contact the repository owner through an
already established private channel. Include only the minimum information needed
to locate the problem: affected path or route, commit identifier, impact, and a
safe reproduction. Do not attach copies of exposed private records unless the
owner provides an approved secure transfer channel.

The project owner should acknowledge the report privately, contain active
exposure first, preserve necessary evidence, assess notification obligations,
and coordinate remediation before public disclosure.

## Data handling

- Treat CRM, finance, supplier, regulatory, intellectual-property, customer, and
  employee records as private by default.
- Keep private source evidence outside Git in encrypted, access-controlled
  storage with audit logs and retention rules.
- Use synthetic data in development and tests. Never place real contact details,
  deal terms, bank references, certificates, or source documents in client
  bundles, fixtures, logs, screenshots, or API examples.
- Enforce authentication and record-level authorization server-side. Hiding a
  page or protecting only the UI is not an access control.
- Use a Basic-auth password of at least 16 characters for the interim gate and
  serve it only over HTTPS. Replace it with managed identity before broad use.
- Remove or mask sensitive fields before logging and before returning errors.
- Review dependencies and source history before release.
- Mount the private financial workbook outside the application directory and
  expose only the fixed aggregate adapter contract. Never serve the workbook.

Detailed repository rules are in `docs/PRIVATE_DATA_POLICY.md`.
