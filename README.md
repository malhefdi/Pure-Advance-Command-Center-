# PA Command Center

Next.js implementation of the Pure Advance Command Center roadmap.

## What is included

- Tokenized Next.js + Tailwind foundation based on `PA_Command_Center_Handoff_Spec.md`.
- Module 1 CEO Dashboard with seeded API data and responsive dashboard UI.
- Placeholder module pages for Products, Team, Finance, Pipeline, Ownership, and AI so the full Modules 1-7 roadmap has navigable foundations.
- Filled implementation PRD in `PA_Command_Center_PRD.md`.

## Run locally

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run test
npm run build
```

The dashboard intentionally starts from seeded/manual adapters so the CEO surface can ship before finance, inventory, team, WhatsApp, and email integrations are finalized.
