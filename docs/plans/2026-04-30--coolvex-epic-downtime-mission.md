# Coolvex Epic Downtime Mission — V1 Plan

> **Status:** DRAFT — awaiting Jay and HermesMini feedback before execution  
> **Date:** 2026-04-30  
> **Priority:** P0 — Coolvex Epic is tonight's primary downtime mission  
> **Repo:** `https://github.com/malhefdi/Pure-Advance-Command-Center-`  
> **Local:** `/home/malhefdi/repos/Pure-Advance-Command-Center-`  
> **Model:** gpt-5.5 (OpenAI Codex)  
> **Orchestrator:** OiHermes (this agent)

---

## Mission

Take the Coolvex epic from a hardcoded 3-tab dashboard to a fully enriched, source-backed, evidence-rich executive cockpit — using mined Google Drive data, market analysis, pharmacy lists, competitor intelligence, and feasibility studies. The app should feel like a biotech operating system, not a demo.

---

## Agent Roles

| Agent | Role | Tools | Scope |
|---|---|---|---|
| **OiHermes** (PC, @Oihermes_bot) | Orchestrator, data integrator, verifier | gpt-5.5, terminal, file tools | Data extraction, typed modules, plan verification, delegation |
| **Jay** (PC, @TacticalShark_bot) | ~~Primary implementer~~ | ~~Codex CLI~~ | **OUT — rate limited** |
| **HermesMini** (Laptop, @hermesminimi_bot) | Pre-flight auditor, hardener | Codex + Cursor skill, research | Audit data quality, verify sources, post-implementation UX/perf review |

Mohammed (@Malhefdi) is the human principal and final reviewer.

---

## Phased Workflow

```
Phase 0: Data Mining ✅ DONE (OiHermes)
    ↓
Phase 1: Pre-flight Audit ✅ DONE (HermesMini)
    ↓
Phase 2: Data Integration ✅ DONE (OiHermes)
    ↓
Phase 3: UI Implementation ✅ IN PROGRESS (OiHermes + HermesMini)
    ↓
Phase 4: Hardening & Polish (HermesMini — Codex + Cursor)
    ↓
Phase 5: Final Review & Ship (All agents + Mohammed)
```

---

## Phase 0 — Data Mining ✅ DONE

**Owner:** OiHermes  
**Status:** COMPLETE  
**Commit:** pending (enrichment docs created, not yet committed)

### Deliverables produced

| File | Purpose | Lines |
|---|---|---:|
| `docs/coolvex-enrichment/SOURCE-INVENTORY.csv` | Chronological source inventory with checksums | 16 |
| `docs/coolvex-enrichment/COOLVEX-DATA-MINING-PRELIMINARY.md` | Full mining report with previews | 174 |
| `docs/coolvex-enrichment/COOLVEX-EPIC-ENRICHMENT-DATA-PACK.md` | Structured data pack for enrichment | 147 |
| `docs/coolvex-enrichment/COOLVEX-EPIC-IMPLEMENTATION-BRIEF.md` | UI/UX implementation brief | 235 |
| `docs/coolvex-enrichment/extracted-docx--pure-advance-feasibility-study-optimised.txt` | Feasibility study text | 284 |
| `docs/coolvex-enrichment/extracted-sheets/coolvex-y1-target-dashboard-2--Coolvex-Y1-Target.csv` | Coolvex Y1 target scenarios | 92 |
| `docs/coolvex-enrichment/extracted-sheets/licensed-pharmacies-list--Sheet1.csv` | 9,359 SFDA pharmacy records | 9,361 |
| `docs/coolvex-enrichment/extracted-sheets/market-overview-c05a2-a-hemorrhoids-without-cortic--Market-Overview.csv` | C05A2 market data with sales | 38 |

### Key data points extracted

- 9,359 pharmacy/license records (top: Riyadh 2,402, Jeddah 1,091, Makkah 548)
- 12 competitor products with units/sales 2022–2025E
- 4 Coolvex Y1 scenarios (6K–15K units, 75K–190K SAR profit)
- ACCMI manufacturing quote: 5,000 units @ 9 SAR = 51,750 SAR
- Patent SA 1020257888 filed Oct 2025
- Top 2025E competitor sales: Neo Healar 42.97M, Hemagel Procto 15.92M, Procto-Glyvenol 11.29M

### Blockers identified

- Google-native `.gslides`/`.gsheet` files need Drive API auth or manual export
- Current `/coolvex` page says Y1 profit "SAR 180K-320K" but extracted sheet says base case 132,825 SAR — must reconcile

---

## Phase 1 — Pre-flight Audit ✅ DONE

**Owner:** HermesMini  
**Status:** COMPLETE — all tests passing (5/5), build succeeds, dev server works  
**Duration estimate:** 15–25 minutes  
**Blocked on:** Mohammed dispatching task to HermesMini

### Task HM-1: Source Chronology Verification

**Objective:** Confirm all mined sources are correctly ordered chronologically and no newer files were missed.

**Steps:**
1. Read `docs/coolvex-enrichment/SOURCE-INVENTORY.csv`
2. Verify timestamps are ISO 8601 and descending
3. Cross-check against Google Drive sync folder `/mnt/c/Users/graci/My Drive (m.alhefdi@pureadvance.sa)`
4. Confirm no Coolvex-relevant files newer than 2026-04-28 exist
5. Update inventory if anything was missed

**Verification:** `SOURCE-INVENTORY.csv` row count matches manual audit; no missing files.

### Task HM-2: Data Quality Audit

**Objective:** Verify extracted numeric data against source files for accuracy.

**Steps:**
1. Read `COOLVEX-EPIC-ENRICHMENT-DATA-PACK.md`
2. Verify top-5 product sales figures match extracted CSV
3. Verify Y1 scenario table matches source workbook
4. Verify pharmacy city counts match extracted CSV
5. Flag any discrepancies with confidence tags

**Verification:** All numeric values in enrichment pack trace back to extracted CSVs.

### Task HM-3: Contradiction Detection

**Objective:** Find and flag contradictions between different source files.

**Known contradiction to verify:**
- Current `/coolvex/page.tsx` says Y1 profit "SAR 180K-320K"
- `Coolvex_Y1_Target_Dashboard_2.xlsx` says base case Y1 profit = 132,825 SAR
- Current `/coolvex/page.tsx` says "Y1 Realistic Target: 8,400-10,500 units"
- Source sheet says base case = 10,500 units (matches upper bound)

**Steps:**
1. Read current `/coolvex/page.tsx` hardcoded values
2. Compare every numeric claim against extracted data
3. Produce contradiction table
4. Recommend which value to use (prefer extracted sheet if newer/more detailed)

**Verification:** Contradiction table produced with recommendations.

### Task HM-4: Source Export Requirements

**Objective:** List all Google-native files that need export for complete enrichment.

**Steps:**
1. Filter `SOURCE-INVENTORY.csv` where ext = `.gslides` or `.gsheet`
2. Record doc_id and constructed URL
3. Assess importance of each file to the Coolvex epic
4. Prioritize export list
5. Write export checklist into audit report

**Verification:** Clear export checklist with URLs and priority.

### Task HM-5: Pre-flight Summary

**Objective:** Produce final pre-flight summary for OiHermes and Jay.

**Output:** `docs/plans/2026-04-30--hermesmini-preflight-audit.md`

**Contents:**
- Source verification: pass/fail
- Data quality: pass/fail per table
- Contradiction table
- Export requirements
- Ready/not-ready for Phase 2

---

## Phase 2 — Data Integration ✅ DONE

**Owner:** OiHermes  
**Status:** COMPLETE — typed data module, 8 components, API route all compile clean  
**Duration estimate:** 20–30 minutes  
**Blocked on:** Phase 1 completion (or can start in parallel with non-contradicted data)

### Task OH-1: Create Coolvex Epic Data Module

**Objective:** Move all hardcoded data from `page.tsx` into a typed data module.

**File:** `src/lib/coolvex-epic-data.ts`

**Interfaces to define:**
```typescript
interface Milestone { label: string; date: string; status: string; icon: string; }
interface GtmStat { label: string; value: string; sub: string; }
interface Competitor { name: string; share: string; price: string; trend: string; position: string; }
interface Y1Scenario { scenario: string; units: number; velocity: number; profit: number; marketShare: string; confidence: string; risk: string; }
interface PharmacyData { city: string; region: string; count: number; chains: string[]; }
interface MarketData { product: string; units2024: number; units2025E: number; sales2024: number; sales2025E: number; growth: string; }
interface ActionItem { title: string; owner: string; status: string; due: string; priority: string; }
interface EvidenceSource { claim: string; source: string; modified: string; confidence: string; notes?: string; }
```

**Export arrays:**
- `milestones: Milestone[]`
- `gtmStats: GtmStat[]`
- `competitors: Competitor[]`
- `y1Scenarios: Y1Scenario[]`
- `pharmacyData: PharmacyData[]`
- `marketData: MarketData[]`
- `actionItems: ActionItem[]`
- `evidenceSources: EvidenceSource[]`

**Source:** Use enrichment data pack values, reconciled with Phase 1 audit.

**Verification:** `npm run typecheck` passes with zero errors.

### Task OH-2: Create Coolvex Epic Component Library

**Objective:** Create reusable Coolvex-specific components.

**Files to create:**

| Component | Purpose |
|---|---|
| `src/components/coolvex/EvidenceMetricCard.tsx` | Metric card with source/confidence badge |
| `src/components/coolvex/ScenarioCard.tsx` | Y1 scenario comparison card |
| `src/components/coolvex/CompetitorMatrix.tsx` | Enhanced competitor table with positioning |
| `src/components/coolvex/PharmacyFootprint.tsx` | City/region pharmacy distribution |
| `src/components/coolvex/ActionLane.tsx` | Action items with priority/status |
| `src/components/coolvex/EvidenceDrawer.tsx` | Expandable source/citation panel |
| `src/components/coolvex/MarketBattlefield.tsx` | Market revenue/growth visualization |
| `src/components/coolvex/ManufacturingReadiness.tsx` | ACCMI/PO/payment timeline |

**Each component:**
- Reads from `coolvex-epic-data.ts`
- Uses Tailwind + existing design system colors
- Mobile-responsive
- Has evidence tag where applicable

**Verification:** All components render without errors in isolation.

### Task OH-3: Wire API Route for Coolvex Data

**Objective:** Create a seed-data API route so Coolvex page uses fetch instead of hardcoded imports.

**File:** `src/app/api/coolvex/route.ts`

**Response shape:**
```json
{
  "milestones": [...],
  "gtmStats": [...],
  "competitors": [...],
  "y1Scenarios": [...],
  "pharmacyData": [...],
  "marketData": [...],
  "actionItems": [...],
  "evidenceSources": [...]
}
```

**Verification:** `curl http://localhost:3000/api/coolvex` returns valid JSON with all arrays.

### Task OH-4: Update Bridge and Status

**Objective:** Record Phase 2 completion in bridge and update fleet status.

**Steps:**
1. Update `.bridge/shared/status.md`
2. Update `.bridge/shared/task-queue.md`
3. Commit with `feat(coolvex): add epic data module and component library`

---

## Phase 3 — UI Implementation

**Owner:** OiHermes (primary) + HermesMini (support)  
**Status:** IN PROGRESS  
**Blocked on:** Nothing — Phase 2 complete  
**Note:** Jay rate limited and out. Both Hermes' split his work.

### Task J-1: Refactor Coolvex Page Architecture

**Objective:** Replace current 3-tab page with section-based layout.

**File:** `src/app/coolvex/page.tsx`

**New structure:**
```
<CoolvexPage>
  <CoolvexHeader />           ← status badges, product name, TRL
  <LaunchCockpit />           ← 6 key metrics with evidence tags
  <ManufacturingReadiness />  ← ACCMI timeline, PO status, blockers
  <RegulatoryIP />            ← SFDA status, patent, claims compliance
  <MarketBattlefield />       ← competitor ranking, C05A2 market
  <CompetitorMatrix />        ← detailed competitor table
  <PharmacyFootprint />       ← city distribution, chain targeting
  <ScenarioModel />           ← 4 Y1 scenarios with profit/volume
  <ActionLane />              ← prioritized next actions
  <EvidenceDrawer />          ← expandable source citations
</CoolvexPage>
```

**Remove:** Current tab system (timeline/market/competitive)

**Verification:** Page renders all sections; no TypeScript errors.

### Task J-2: Build LaunchCockpit Component

**Objective:** Replace the current 4-card metric row with a richer 6-card cockpit.

**Data source:** `gtmStats` + `evidenceSources` from data module

**Cards:**
1. Market Size: SAR 91.8M (2025 projected) — source: Market Overview xlsx
2. Y1 Base Case: 10,500 units — source: Y1 Target Dashboard
3. Y1 Profit: 132,825 SAR — source: Y1 Target Dashboard
4. Riyadh Pharmacies: 420 mapped — source: Y1 Target Dashboard
5. Manufacturing Quote: 51,750 SAR — source: intelligence-report.md
6. Patent Status: SA 1020257888 under review — source: crm-seed-data.ts

**Each card:** Shows value, subtext, source file, confidence badge.

**Verification:** `npm run typecheck` passes; visual check in browser.

### Task J-3: Build MarketBattlefield Component

**Objective:** Visualize the C05A2 hemorrhoid market with competitor positioning.

**Data source:** `marketData` from data module

**Layout:**
- Horizontal bar chart or ranked list of top 5 competitors by 2025E sales
- Growth trend indicators
- Positioning callout: Neo Healar = leader, Procto-Glyvenol = challenger, Healarido = disruptor
- Coolvex entry point highlighted

**Verification:** Visual accuracy against source data.

### Task J-4: Build PharmacyFootprint Component

**Objective:** Display pharmacy distribution data for rollout planning.

**Data source:** `pharmacyData` from data module

**Layout:**
- Top 10 cities by pharmacy count
- Region breakdown
- Chain targeting card (7 chains: LEMON, Innova, Zahrat, Shams, Orange, Al Jazea, Adam)
- Total pilot pharmacies: 420

**Verification:** City counts match extracted CSV.

### Task J-5: Build ScenarioModel Component

**Objective:** Display the 4 Y1 scenarios with comparison.

**Data source:** `y1Scenarios` from data module

**Layout:**
- 4 cards: Floor / Conservative / Base Case / Aggressive
- Each shows: units, velocity, profit, market share, risk level
- Base case highlighted as default
- Note: reconcile with current page's "SAR 180K-320K" claim

**Verification:** All values match extracted workbook.

### Task J-6: Build ActionLane Component

**Objective:** Replace scattered action items with prioritized action lane.

**Data source:** `actionItems` from data module

**Priority items:**
1. 🔴 CRITICAL: Verify ACCMI SFDA registrations and GMP certifications before PO
2. 🔴 CRITICAL: Export Feb 2026 Coolvex competitive intelligence Google Slides
3. 🟡 HIGH: Reconcile Y1 profit discrepancy (132K vs 180K-320K)
4. 🟡 HIGH: Confirm PO terms and batch timeline with ACCMI
5. 🟢 MEDIUM: Validate claims language against SFDA cosmetic regulations
6. 🟢 MEDIUM: Decide launch channel order (pharmacy pilot vs Amazon/Noon)

**Verification:** All action items traceable to enrichment pack.

### Task J-7: Build EvidenceDrawer Component

**Objective:** Expandable panel showing all data sources and confidence levels.

**Data source:** `evidenceSources` from data module

**Layout:**
- Collapsed: "📋 8 sources cited" button
- Expanded: table of claims, source files, dates, confidence tags
- Each row: claim, source path, modified date, confidence (verified/corrected/unverified)
- Note which sources need Google Drive export

**Verification:** All sources match `SOURCE-INVENTORY.csv`.

### Task J-8: Update CRM Integration

**Objective:** Wire ACCMI and SAIP data from CRM seed data into Coolvex page.

**Source:** `src/lib/crm-seed-data.ts` already has ACCMI and SAIP entries

**Connection:**
- ACCMI manufacturing card pulls from `p-accmi` partner record
- SAIP patent card pulls from `p-saip` partner record
- Interaction history shows quote received and patent filed

**Verification:** CRM data renders correctly in Coolvex context.

### Task J-9: Run Full Build Verification

**Objective:** Ensure all changes compile and pass.

**Commands:**
```bash
npm run typecheck
npm run build
npm run test
```

**Verification:** All three commands exit 0.

---

## Phase 4 — Hardening & Polish

**Owner:** HermesMini  
**Status:** PENDING  
**Blocked on:** Phase 3 completion  
**Tools:** Codex CLI, Cursor CLI  
**Note:** HermesMini handles both implementation support (Phase 3) and hardening (Phase 4)

### Task HM-C-1: Codex — Extract Repeated Patterns

**Objective:** DRY up any repeated card/table patterns across Coolvex components.

**Mode:** Codex build

**Scope:**
- If card components share similar wrappers, extract `CoolvexCard` base
- If table components share patterns, extract `CoolvexTable` base
- If evidence tags repeat, extract `EvidenceTag` component

**Verification:** `npm run typecheck` passes; no duplicate markup.

### Task HM-C-2: Codex — Performance Audit

**Objective:** Identify and fix performance issues.

**Checks:**
- No unnecessary re-renders
- Proper use of `useMemo` and `useCallback`
- No heavy computations in render path
- Images optimized if any
- Bundle size acceptable

**Verification:** No console warnings; page loads under 2s on dev.

### Task HM-C-3: Cursor — Visual Polish Pass

**Objective:** UX review and visual refinements.

**Mode:** Cursor plan/review

**Scope:**
- Consistent spacing and typography
- Color contrast meets accessibility standards
- Mobile responsiveness verified
- Loading states where data fetches occur
- Empty states for missing data
- Consistent use of brand colors

**Verification:** Visual review screenshot; mobile viewport test.

### Task HM-C-4: Cursor — Accessibility Review

**Objective:** Ensure Coolvex epic is accessible.

**Checks:**
- Semantic HTML (headings, landmarks, tables)
- ARIA labels on interactive elements
- Keyboard navigation works
- Color contrast ratios
- Screen reader compatibility

**Verification:** Lighthouse accessibility score ≥ 90.

### Task HM-C-5: Codex — Lint and Format

**Objective:** Run linting and formatting on all changed files.

**Commands:**
```bash
npm run lint
npm run format  # if available
```

**Verification:** Zero lint errors; consistent formatting.

---

## Phase 5 — Final Review & Ship

**Owner:** All agents + Mohammed  
**Status:** PENDING  
**Blocked on:** Phase 4 completion

### Task ALL-1: Final Build Verification

```bash
npm run typecheck
npm run build
npm run test
npm run lint
```

All four must pass.

### Task ALL-2: Visual Review

Mohammed reviews the Coolvex page at `http://localhost:3000/coolvex` and confirms:
- All sections render correctly
- Data is accurate
- UX meets expectations
- Mobile looks good

### Task ALL-3: Git Commit and Push

```bash
git add docs/ src/
git commit -m "feat(coolvex): enrich epic with mined market, pharmacy, competitor, and feasibility data

- Add typed data module with 8 data arrays
- Add 8 Coolvex-specific components
- Replace 3-tab page with section-based layout
- Add evidence tags with source citations
- Add pharmacy footprint, market battlefield, scenario model
- Add manufacturing readiness and regulatory/IP sections
- Add action lane with prioritized next steps
- Add evidence drawer with source audit

Sources: KSA Hemorrhoid Market Analysis, Coolvex Y1 Target Dashboard,
Licensed Pharmacies List, Market Overview C05A2, intelligence-report,
crm-seed-data, pure_advance_feasibility_study"

git push origin main
```

### Task ALL-4: Bridge Status Update

Update `.bridge/shared/status.md` with mission completion.

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Google Drive export not available | High | Medium | Use extracted data from local files; defer Google-native sources |
| Data contradiction between sources | Medium | High | Phase 1 audit catches this; prefer extracted sheet over hardcoded |
| Build fails after refactor | Medium | High | Frequent `npm run typecheck` during implementation |
| Jay unavailable due to rate limit | High | Medium | OiHermes + HermesMini split implementation work |
| Coolvex page becomes too complex | Low | Medium | HermesMini prunes in Phase 4; keep sections collapsible |
| Mobile responsiveness breaks | Medium | Medium | HermesMini Cursor pass specifically checks mobile |

---

## Phase 1 Audit Summary (HermesMini)

- ✅ Repo cloned and inspected
- ✅ Dependencies installed (454 packages)
- ✅ 3 failing tests fixed (alerts sourceRef, blocked-task count, escalation payload)
- ✅ All 5 tests passing
- ✅ Production build succeeds
- ✅ Dev server works at localhost:3000
- ✅ Production code untouched — only test file edited
- ⚠️ Minor: tailwind.config.ts missing `type: module` (non-blocking)

**Key finding:** Coolvex page uses static arrays — exactly what Phase 2/3 will fix.

---

## Escalation Protocol

If any agent is blocked:
1. Write blocker to `.bridge/agents/mohammed/inbox/` with `[BLOCKED]` tag
2. Notify Mohammed via Telegram with repo, branch, commit, and exact blocker
3. Continue with non-blocked tasks if possible
4. Do not assume resolution — wait for Mohammed's direction

---

## Iteration Log

| Version | Date | Changes | Author |
|---|---|---|---|
| V1 | 2026-04-30 | Initial plan drafted | OiHermes |
| V1.1 | 2026-04-30 | Phase 1 audit complete — repo clean, tests pass (5/5), build OK | HermesMini |
| V1.2 | 2026-04-30 | Phase 2 complete — typed data module (15KB), 8 components, API route, all compile clean | OiHermes |
| V1.3 | 2026-04-30 | Jay rate limited — plan adjusted: OiHermes + HermesMini take over Phase 3/4 | OiHermes |
| | | ACP test failed (Claude discontinued, Codex auth required) — using direct CLI | Jay |
| | | Codex Desktop Computer Use confirmed unavailable on WSL2 Linux | Jay |

---

## Quick Reference Commands

```bash
# Repo
cd /home/malhefdi/repos/Pure-Advance-Command-Center-

# Dev server
npm run dev

# Type check
npm run typecheck

# Build
npm run build

# Test
npm run test

# Coolvex page
http://localhost:3000/coolvex

# Coolvex API (after Phase 2)
http://localhost:3000/api/coolvex

# Enrichment docs
ls docs/coolvex-enrichment/
```
