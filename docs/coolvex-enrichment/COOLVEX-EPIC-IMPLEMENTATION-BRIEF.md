# Coolvex Epic Implementation Brief

_Date: 2026-04-30_  
_Target repo: `Pure-Advance-Command-Center-`_  
_Status: data-mining handoff for enrichment / not yet UI implementation_

## Objective

Use mined Coolvex source data to transform `/coolvex` from a simple dashboard into the priority epic cockpit for tonight's downtime workflow.

## Current `/coolvex` Page State

File:

```text
src/app/coolvex/page.tsx
```

Current structure:

- hardcoded milestones;
- hardcoded GTM stats;
- hardcoded competitor table;
- three tabs: manufacturing timeline, market intelligence, competition;
- useful but shallow, with no source/evidence layer and limited data density.

Current high-value facts already present:

- Patent: `SA 1020257888`
- Manufacturer: `ACCMi`
- 50% payment paid
- Oak Park delivery expected May 4, 2026
- SFDA pending
- Riyadh pharmacies mapped: 420+
- competitor set: Neo Healar, Hemagel Procto, Procto-Glyvenol, Rohelar, Healarido, Coolvex

## Source Data Now Mined

Primary documents created:

```text
docs/coolvex-enrichment/SOURCE-INVENTORY.csv
docs/coolvex-enrichment/COOLVEX-DATA-MINING-PRELIMINARY.md
docs/coolvex-enrichment/COOLVEX-EPIC-ENRICHMENT-DATA-PACK.md
```

Extracted sheets:

```text
docs/coolvex-enrichment/extracted-sheets/coolvex-y1-target-dashboard-2--Coolvex-Y1-Target.csv
docs/coolvex-enrichment/extracted-sheets/licensed-pharmacies-list--Sheet1.csv
docs/coolvex-enrichment/extracted-sheets/market-overview-c05a2-a-hemorrhoids-without-cortic--Market-Overview.csv
```

Extracted DOCX text:

```text
docs/coolvex-enrichment/extracted-docx--pure-advance-feasibility-study-optimised.txt
```

## Recommended New Coolvex Epic Sections

### 1. Executive Launch Cockpit

Purpose: immediate CEO view of what matters tonight.

Cards:

- Manufacturing status: ACCMI, 5,000 units, 9 SAR/unit, 51,750 SAR quote.
- Regulatory status: SFDA pending, claims/label compliance required.
- IP status: SA 1020257888, filed Oct 2025, 18–24 month timeline.
- Launch model: 10,500 units base case, 132,825 SAR Y1 profit.
- Pharmacy footprint: 420 target pilot locations.
- Key blocker: verify ACCMI SFDA/GMP certifications before PO/full commitment.

### 2. Market Battlefield

Use source:

```text
Market Overview C05A2 A-HEMORRHOIDS WITHOUT CORTIC.xlsx
KSA Hemorrhoid Market Analysis.md
```

Recommended UI:

- competitor revenue ranking;
- 2024 vs 2025E growth;
- positioning lanes: premium herbal, chemical efficacy, medical device, tender/generic;
- callouts for Neo Healar, Procto-Glyvenol, Hemagel Procto, Rohelar, Healarido.

### 3. Pharmacy Rollout Map / Chain Targeting

Use source:

```text
Licensed Pharmacies List.xlsx
Coolvex_Y1_Target_Dashboard_2.xlsx
```

Data points:

- 9,359 extracted pharmacy/license records.
- top city counts:
  - Riyadh: 2,402
  - Jeddah: 1,091
  - Makkah: 548
  - Madinah: 389
  - Taif: 291
- pilot assumption: 420 stores across 7 chains.

Recommended UI:

- city/region table;
- pharmacy launch funnel;
- target chain card;
- map placeholder until GPS enrichment is wired.

### 4. Scenario Model

Use source:

```text
Coolvex_Y1_Target_Dashboard_2.xlsx
```

Scenario cards:

| Scenario | Y1 Units | Velocity | Profit | Risk |
|---|---:|---:|---:|---|
| Floor | 6,000 | 1.19 u/location/month | 75,900 SAR | Low |
| Conservative | 7,500 | 1.49 | 94,875 SAR | Low |
| Base Case | 10,500 | 2.08 | 132,825 SAR | Moderate |
| Aggressive | 15,000 | 2.98 | 189,750 SAR | High |

Important correction: current `/coolvex` says Y1 projected profit `SAR 180K-320K`; mined sheet base-case says `132,825 SAR`. UI should either reconcile this discrepancy or label the higher value as an older/alternate scenario.

### 5. Evidence Drawer

Every metric should expose:

- source file;
- modified date;
- extraction status;
- confidence level;
- note if source is Google shortcut requiring export.

Minimum component concept:

```tsx
<EvidenceTag source="Coolvex_Y1_Target_Dashboard_2.xlsx" confidence="high" />
```

### 6. Action Lane

Recommended action cards:

- Verify ACCMI SFDA registrations and GMP certifications.
- Confirm PO/payment terms and batch timeline.
- Export February 2026 Coolvex competitive intelligence Google Slides.
- Export Coolvex Target Google Sheet.
- Validate claims language against SFDA and platform rules.
- Decide launch channel order: pharmacy pilot vs Amazon/Noon/Salasa.

## Data Quality Notes

High confidence:

- XLSX-derived market and scenario numbers.
- Pharmacy list extraction counts.
- Current repo seed data for ACCMI, SAIP, quote, and patent.

Medium confidence:

- Narrative claims from KSA Hemorrhoid Market Analysis until citations are audited.
- Current page GTM stats, because some appear inconsistent with extracted sheets.

Blocked / needs export:

- `Coolvex-Competitive-Intelligence-Feb2026.gslides`
- `Competitive Intelligence Report.gslides`
- `Coolvex Target.gsheet`
- `Coolvex Y1 Pharmacy Target.gslides`

## Suggested Build Order for Jay/OiHermes Later

1. Move hardcoded Coolvex data from `page.tsx` into a typed data module:

```text
src/lib/coolvex-epic-data.ts
```

2. Add reusable evidence-backed card components:

```text
src/components/coolvex/EvidenceMetricCard.tsx
src/components/coolvex/ScenarioCard.tsx
src/components/coolvex/CompetitorMatrix.tsx
src/components/coolvex/PharmacyFootprint.tsx
src/components/coolvex/ActionLane.tsx
```

3. Replace current three-tab page with richer sections:

```text
Launch Cockpit
Timeline
Market Battlefield
Pharmacy Rollout
Scenario Model
Evidence & Sources
Action Lane
```

4. Keep initial implementation static/typed, then later wire APIs.

## Suggested Hardening for HermesMini + Codex/Cursor Later

Codex:

- mechanical extraction into `coolvex-epic-data.ts`;
- create typed interfaces;
- refactor repeated card/table markup;
- run typecheck/build fixes.

Cursor:

- vertical UX implementation for the Coolvex epic;
- visual polish and responsive layout;
- evidence drawer interaction;
- performance and component architecture review.

## Next Missing Step

Export Google-native files or authenticate Drive API so the Feb 2026 competitive intelligence slides and Coolvex Target sheet can be fully mined before final UI enrichment.
