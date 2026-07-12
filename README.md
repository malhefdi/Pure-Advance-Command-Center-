# PA Command Center

Private Next.js executive-operations dashboard. The repository now contains source code and explicitly synthetic demonstration fixtures only; it is not a finance system, CRM, evidence room, or operational source of truth.

## Intended function

The application is designed to give an authorized operator a concise view of:

- financial pulse, invoice deadlines, and data freshness;
- product lifecycle stages, readiness gates, and blockers;
- role-based workload and urgent tasks;
- sanitized partner and interaction records;
- an evidence-aware launch cockpit;
- future governance and AI modules with explicit approval boundaries.

Current write-like behavior is deliberately constrained. CRM records are read-only and the escalation endpoint returns a preview; it does not send or queue messages.

## Security boundary

Every application and API route is protected by an interim HTTP Basic authentication gate. Production fails closed when credentials are missing. Use HTTPS and a deployment secret store; never commit credentials.

This gate is suitable for controlled interim access, not as a replacement for production SSO, per-user sessions, role/record authorization, audit logging, rate limiting, or an encrypted data service. Those controls must exist before real operational data is connected.

See [SECURITY.md](SECURITY.md), [docs/PRIVATE_DATA_POLICY.md](docs/PRIVATE_DATA_POLICY.md), and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Local development

Requirements: Node.js 22.20.x and npm 11.18.x.

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Set a non-placeholder `COMMAND_CENTER_USERNAME` and `COMMAND_CENTER_PASSWORD` in `.env.local`. For an isolated local session only, `COMMAND_CENTER_AUTH_DISABLED=true` bypasses the gate when `NODE_ENV` is not `production`.

Passwords must be at least 16 characters. To enable the private preliminary financial model, set `COMMAND_CENTER_FINANCIAL_MODEL_PATH` to the absolute path of an external `.xlsx` file. The workbook must remain outside this repository. Recalculate and save it in Excel before refresh because the server reads last-saved formula values.

The Finance module loads only a fixed aggregate cell contract: cash, burn, runway, scenario, monthly forecast, capital-plan, actuals-coverage, and reconciliation signals. Employee rows and other raw sheets are neither returned by the API nor bundled into the browser. See [docs/FINANCIAL_MODEL_INTEGRATION.md](docs/FINANCIAL_MODEL_INTEGRATION.md).

## Verification

```powershell
npm run lint
npm run typecheck
npm test
npm run build
```

The same checks run in GitHub Actions. Fixture values marked unknown or withheld must remain unknown or withheld; do not replace them with invented operational values.
