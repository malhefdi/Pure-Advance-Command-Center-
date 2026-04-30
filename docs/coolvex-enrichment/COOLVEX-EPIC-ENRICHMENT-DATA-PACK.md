# Coolvex Epic Enrichment Data Pack

_Generated: 2026-04-30T06:34:34_

## Purpose

This document condenses mined Coolvex, pharmacy, competitor, feasibility, and current Command Center sources into structured facts for enriching the Coolvex epic UI/logic. Latest sources are prioritized chronologically, but older structured sheets are retained when they contain stronger numeric data.

## Highest-Priority Source Order

1. Current Command Center seeded data — Apr 28 2026 (`public/intelligence-report.md`, `src/lib/crm-seed-data.ts`).
2. Company feasibility study — Apr 9 2026 (`pure_advance_feasibility_study_optimised.docx`).
3. Feb 2026 Google-native competitive intelligence presentations/videos — need Drive export/auth.
4. Dec 2025 KSA hemorrhoid market and Coolvex Y1 target workbooks — strongest numeric market model.

## Pharmacy Footprint Data

Source: `Licensed Pharmacies List.xlsx` from SFDA registered pharmacies list.

- Total local rows extracted: **9,359** pharmacy/license records.
- License type distribution: FINAL: 7,329, INSTANT: 2,030

### Top Cities by Pharmacy Records

| City | Records |
|---|---:|
| الرياض | 2,402 |
| جدة | 1,091 |
| مكة المكرمة | 548 |
| المدينة المنورة | 389 |
| الطائف | 291 |
| بريدة | 271 |
| الدمام | 248 |
| حائل | 206 |
| خميس مشيط | 195 |
| تبوك | 178 |
| ابها | 153 |
| الخرج | 149 |
| غير محدد | 148 |
| الخبر | 139 |
| حفر الباطن | 94 |

### Top Administrative Regions

| Region | Records |
|---|---:|
| الرياض | 3,005 |
| جدة | 1,125 |
| المنطقة الشرقية | 678 |
| مكة المكرمة | 611 |
| عسير | 584 |
| المدينة المنورة | 534 |
| القصيم | 515 |
| جازان | 508 |
| الطائف | 366 |
| حائل | 283 |

## Hemorrhoid Market / Competitor Data

Source: `Market Overview C05A2 A-HEMORRHOIDS WITHOUT CORTIC.xlsx`; category C05A2 anti-haemorrhoid without corticosteroids. Values are local-currency sales where LC is used in the source. 2025E = YTD/05 × 2.4.

| Rank | Product | Units 2024 | Units 2025E | Sales 2024 | Sales 2025E |
|---:|---|---:|---:|---:|---:|
| 1 | NEO HEALAR | 913,745 | 807,343 | 48,022,469 | 42,969,197 |
| 2 | HEMAGEL PROCTO | 178,793 | 185,669 | 15,335,076 | 15,924,814 |
| 3 | PROCTO GLYVENOL | 258,839 | 423,780 | 6,979,299 | 11,292,314 |
| 4 | PILOCIN | 626,347 | 443,405 | 7,757,346 | 5,542,565 |
| 5 | ROHELAR | 79,085 | 81,154 | 4,666,015 | 4,788,062 |
| 6 | HEALARIDO | 300 | 70,618 | 18,000 | 4,237,056 |
| 7 | HAEMOPROCT | 54,809 | 410,938 | 529,456 | 3,969,658 |
| 8 | RECTACURE | 350,239 | 219,869 | 4,377,992 | 2,748,365 |
| 9 | SOREX | 4,656 | 5,064 | 232,017 | 274,310 |
| 10 | NAYYAR | 8,937 | 1,418 | 472,876 | 50,544 |
| 11 | EMOFLON | 3,493 | 434 | 101,682 | 12,646 |
| 12 | ALOEPROCT | 123 | 22 | 3,536 | 622 |

## Coolvex Y1 Target Scenarios

Source: `Coolvex_Y1_Target_Dashboard_2.xlsx`. Net profit per unit assumption = **12.65 SAR**; target pharmacy locations = **420**; Riyadh assumed as **50%** of national private pharmacy market.

| Scenario | Y1 Units | Velocity u/location/month | Y1 Profit SAR | Confidence | Risk |
|---|---:|---:|---:|---|---|
| 🔵 Floor | 6,000 | 1.19 | 75,900 | Very Low | 🟢 Low Risk |
| 🟡 Conservative | 7,500 | 1.49 | 94,875 | Low | 🟢 Low Risk |
| 🟢 BASE CASE | 10,500 | 2.08 | 132,825 | Medium | 🟡 Moderate |
| 🔴 Aggressive | 15,000 | 2.98 | 189,750 | High | 🔴 High Risk |

## Coolvex Base Case UX Data Cards

Recommended first data cards for the Coolvex epic:

1. **Launch Target:** 10,500 Y1 units base case.
2. **Pilot Footprint:** 420 pharmacies across 7 mapped chains.
3. **Velocity:** 2.08 units/location/month base case.
4. **Profit:** 132,825 SAR base-case Y1 profit.
5. **Market Share:** 1.01% Riyadh / 0.50% national in base case.
6. **Competitor Benchmark:** base case is below Rohelar Y1 and far below Neo Healar.
7. **Manufacturing Quote:** ACCMI 5,000 units @ 9 SAR/unit = 51,750 SAR total from current Command Center data.
8. **Patent/IP:** SA 1020257888 filed Oct 2025, under review / 18–24 month timeline in current data.

## Competitor Narrative Signals

From `KSA Hemorrhoid Market Analysis.md`:

- Neo Healar remains the private-channel market leader but appears mature/flat in some private-channel trend views.
- Procto-Glyvenol is the chemical efficacy challenger with strong projected 2025 growth.
- Hemagel Procto occupies a super-premium / medical-device style tier.
- Healarido is a fast local/herbal disruptor and strong Vision 2030 localization signal.
- Haemoproct is tender-channel/generic/public procurement relevant.
- Rohelar is the best analog for Coolvex launch trajectory in the Y1 dashboard model.

## Current Command Center Coolvex Signals

Already present in repo and should be upgraded into the Coolvex epic:

- ACCMI manufacturer profile with contact details and quote.
- Quote: 5,000 units @ 9 SAR = 51,750 SAR.
- Pending PO.
- Action: verify SFDA registrations and GMP certifications before PO.
- Patent: SA 1020257888.
- Relevant entities: ACCMI, SAIP, NUPCO, Monsha'at, SFDA, potential healthcare distribution channels.

## Data Gaps / Must Export From Google Drive

The following are high-priority but only available locally as Google shortcuts:

| File | Doc ID / URL | Why needed |
|---|---|---|
| Competitive Intelligence Report.gvid | 1IWvkQFb-008b6rjXCIomc1t8IzagxkOsufasmq1sOyQ | Latest competitive/pharmacy target source; requires export before final enrichment |
| Competitive Intelligence Report (1).gvid | 1-_IWKLy1_eLmTpSIWOZowbU8L65-DsO1qNG8vAy5eF4 | Latest competitive/pharmacy target source; requires export before final enrichment |
| Competitive Intelligence Report.gslides | https://docs.google.com/presentation/d/1AzGVIZAy9xZ5w7l6Di9qlzIL8V4Eh_C1s69Uo0mXaCw/edit | Latest competitive/pharmacy target source; requires export before final enrichment |
| Coolvex-Competitive-Intelligence-Feb2026.gslides | https://docs.google.com/presentation/d/1oNtOC0C_0UTZ1s6UvJ9Ra_2DBk3ArBmWEwdfOOx7520/edit | Latest competitive/pharmacy target source; requires export before final enrichment |
| Coolvex Target.gsheet | https://docs.google.com/spreadsheets/d/1-jNAqOaWC8iznFJ7G_Mow7oiTO3iYvvaP7aU-FJzjIE/edit | Latest competitive/pharmacy target source; requires export before final enrichment |
| Coolvex Y1 Pharmacy Target.gslides | https://docs.google.com/presentation/d/18EtEpo5ty1Wa4STzY_nwOPGfis8rPwwx9qj0uhR8VL8/edit | Latest competitive/pharmacy target source; requires export before final enrichment |

## Recommended Coolvex Epic Sections

1. Executive launch cockpit.
2. Market map and competitor battlefield.
3. Pharmacy rollout and chain targeting.
4. Manufacturing readiness / ACCMI quote / PO blocker.
5. Regulatory + IP lane: SFDA, SAIP, claims, labeling.
6. Financial scenario model: floor/conservative/base/aggressive.
7. Evidence drawer with source citations.
8. Tasks/next actions tied to blockers.
9. UX polish: high-density cards, timeline, competitor matrix, pharmacy heatmap placeholder.

