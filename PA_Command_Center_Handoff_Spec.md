# PA Command Center — Developer Handoff Spec

**For:** Mohammed (PA Digital)
**From:** Design (translation of Dr. Sultan Al-Hayyani's brief v1.0)
**Scope of this doc:** Phase 1 — **CEO Dashboard (Module 1)**. Same tokens and components carry into Modules 2–7.
**Companion file:** `PA_Command_Center_Dashboard_Mockup.html` (open in any browser)

---

## Overview

The CEO Dashboard is the single landing screen Sultan opens every day. It must answer four questions in **under 5 seconds, no scrolling**: (1) is the company making money, (2) where are my products today, (3) who is doing what, (4) what is on fire. Everything else is one click deeper.

The dashboard is **read-heavy** (Sultan scans) with a **thin action layer** (assign, escalate, mark-paid). It is not a project management UI — it is a real-time status board.

---

## Layout

A 12-column grid on desktop, single-column stack on mobile. **Mobile-first is non-negotiable** — Sultan reviews this from meetings.

| Region | Desktop | Mobile |
|---|---|---|
| Sidebar nav | 240px fixed left | Hidden, hamburger top-left |
| Topbar (greeting + actions) | Full-width, sticky | Full-width, scrolls |
| Alerts strip | Horizontal pills, full-width | Horizontal scroll, snap |
| Financial Pulse | 4 KPI cards (3-col each) | Stack 1-up, swipeable carousel acceptable |
| Revenue by product + Invoices | 8 + 4 split | Stack 1-up |
| Product status by platform | Full-width, three collapsible blocks | Same, default-collapsed |
| Team pulse + Tasks | 4 + 8 split | Tasks first, then team |

**Breakpoints:** `>1280` desktop · `980–1280` compact desktop · `<980` mobile.

---

## Design Tokens

Use these names, not raw values, in CSS / Tailwind config / SwiftUI / wherever you build.

### Color
| Token | Hex | Usage |
|---|---|---|
| `color/brand/navy` | `#0B2545` | Sidebar, primary buttons, headlines |
| `color/brand/navy-2` | `#13315C` | Hover state for navy surfaces |
| `color/brand/teal` | `#1B998B` | Brand accent, sparkline trends, brand-mark |
| `color/brand/gold` | `#C9A227` | Academy product family |
| `color/surface/bg` | `#F5F7FA` | Page background |
| `color/surface/card` | `#FFFFFF` | Cards, modals |
| `color/border/default` | `#E3E8EF` | Card borders, row dividers |
| `color/text/primary` | `#0E1B2C` | Body, KPI values |
| `color/text/muted` | `#5A6B7E` | Captions, labels |
| `color/text/faint` | `#8895A7` | Placeholder, timestamps |
| `color/sem/green` / `green-bg` | `#1F9D55` / `#E6F6EE` | On-track, paid, active |
| `color/sem/yellow` / `yellow-bg` | `#C58E00` / `#FFF6DA` | Warning, attention soon |
| `color/sem/red` / `red-bg` | `#D14343` / `#FBE6E6` | Overdue, low stock, blocked |
| `color/sem/blue` / `blue-bg` | `#2563EB` / `#E8F0FE` | Information, in-progress |
| `color/platform/bio` | `#16A34A` | Bioenvironment products |
| `color/platform/med` | `#2563EB` | Biomedicine products |
| `color/platform/aca` | `#C58E00` | Academy products |

### Spacing (4-pt scale)
| Token | Value | Usage |
|---|---|---|
| `space/1` | 4 | Tight gaps |
| `space/2` | 8 | Inline element gaps |
| `space/3` | 12 | Card internal gaps |
| `space/4` | 16 | Card padding, grid gutter |
| `space/5` | 24 | Section margin |
| `space/6` | 32 | Section header spacing |
| `space/7` | 48 | Page-level breathing room |

### Radius / Elevation
| Token | Value |
|---|---|
| `radius/sm` | 6px (pills, buttons) |
| `radius/md` | 10px (cards) |
| `radius/lg` | 14px (modals) |
| `shadow/1` | `0 1px 2px rgba(13,27,44,.06), 0 1px 3px rgba(13,27,44,.04)` |
| `shadow/2` | `0 4px 12px rgba(13,27,44,.08)` |

### Type
| Token | Spec | Usage |
|---|---|---|
| `font/family/sans` | Inter | All UI text |
| `font/family/num` | SF Mono / JetBrains Mono | All currency + counts (tabular alignment) |
| `font/h1` | 22 / 600 / -1% tracking | Page title |
| `font/h2` | 16 / 600 | Section headers |
| `font/kpi` | 26 / 600 / -2% tracking, mono | KPI values |
| `font/body` | 14 / 400 | Default |
| `font/label` | 12 / 600 / +6% tracking, uppercase, muted | Card titles |
| `font/caption` | 11 / 500, muted | Sub-labels, timestamps |

### Currency rule
All amounts are SAR. Format: thousands separator with comma, no decimals on dashboard (`487,200 SAR`). Show `SAR` as a smaller, muted suffix — never as a prefix symbol. Drill-down screens may show two decimals.

---

## Components

| Component | Variants | Props | Notes |
|---|---|---|---|
| `KPICard` | default, with-spark, with-bar | `title`, `value`, `currency?`, `delta?`, `deltaDirection`, `meta?`, `spark?: number[]`, `progress?: 0-1` | Number is the hero. Delta sits top-right. Sparkline under meta. |
| `AlertPill` | red, yellow, green | `text`, `severity`, `dismissible?` | Always paired with a colored dot. Horizontally scrollable container. |
| `PlatformBlock` | bio, med, academy | `name`, `icon`, `productCount`, `collapsed?` | Header has tinted gradient. Children are `ProductRow`. |
| `ProductRow` | default | `name`, `subtitle`, `stage`, `metrics[]`, `actionLabel` | 4-col grid: identity / stage / metric / action. |
| `StagePill` | dd, reg, mfg, market | `label`, `stage` | Maps to product lifecycle stages. |
| `StockBar` | normal, low | `current`, `threshold`, `max` | Auto-flips to red when `current < threshold`. |
| `TaskRow` | default, blocked, overdue | `priority`, `title`, `assignee`, `product`, `due`, `status` | Priority dot is the leftmost element. Due pill is colored by overdue/today/soon. |
| `WhoChip` | initials, avatar | `name`, `colorSeed?` | 28×28 circle, gradient background derived from name. |
| `Sidebar` | default | `items`, `activeId` | Counts (e.g. Alerts: 3) shown as red badge. |
| `TopBar` | default | `greeting`, `subtitle`, `actions[]` | Greeting personalised + dated. |

---

## States and Interactions

| Element | State | Behavior |
|---|---|---|
| `KPICard` | hover | Shadow lifts to `shadow/2`, cursor pointer, opens drill-down view |
| `KPICard` | loading | Skeleton shimmer for value + meta, sparkline hidden |
| `KPICard` | error | Show "—" with red dot tooltip "Last sync failed, retry" |
| `AlertPill` | tap | Opens the source record (the overdue task, the product page, etc.) |
| `AlertPill` | new (last 5 min) | Subtle 1.5s pulse on the dot, then settles |
| `ProductRow` | tap | Slides in product profile (Module 2) from right; on mobile, full-screen push |
| `ProductRow` | hover | Background `color/surface/bg`, cursor pointer |
| `StockBar` | `current < threshold` | Bar fills red, label "Below reorder threshold" appears under it, raises a red flag in alerts strip |
| `TaskRow` priority dot | hover | Tooltip "Critical / High / Normal" |
| `TaskRow` "Escalate" | tap | Opens modal: pre-filled message, default recipient = task assignee's manager, sends WhatsApp + email |
| `TaskRow` "View blocker" | tap | Inline expand showing the blocker text logged by the team member |
| Tab filter (Overdue / This week / Blocked) | tap | Filters list in place, count in tab updates |
| Sidebar nav item | active | Background `navy-2`, white text |
| Sidebar Alerts badge | count > 0 | Red pill with count; pulse when count increases |

---

## Responsive Behavior

| Breakpoint | Changes |
|---|---|
| Desktop > 1280px | Default 12-col layout as in mockup |
| 980–1280px | Sidebar collapses to icon-only (60px). KPI cards remain 4-up but reduce padding to `space/3`. |
| Mobile < 980px | Sidebar becomes hamburger drawer. KPIs stack 1-up (or swipeable horizontal carousel — preferred for Sultan's "scan one number, swipe" pattern). Product blocks default-collapsed; tap to expand. Tasks render before Team Pulse (action over status on mobile). |

---

## Edge Cases

- **Empty financials (early month, no entries yet):** show "—" not "0 SAR". Add caption "Awaiting first entry of [Month]."
- **Stale data:** if any data point is older than 24h, show a small clock icon next to it. Tap → "Last updated 2 days ago. Refresh."
- **Long product names:** truncate with ellipsis at 32 chars. Full name in tooltip and on the product profile page.
- **Long Arabic names** (some scientists, partners): allow 1.4× the latin width before truncating; verify `dir="rtl"` flips layout cleanly. The brief is delivered in English but Arabic toggle should be planned for v1.1.
- **Negative net profit:** value text turns `color/sem/red`, prefix with `−`. No green "down arrow is good" tricks.
- **Cash runway < 3 months:** runway card border turns red (1px → 2px), red flag added to alerts strip automatically (per brief §1.4).
- **No tasks overdue:** show empty state in Tasks card: "Nothing overdue. Good." + green check.
- **No team members logged in:** "Working today" card shows "No check-ins yet — first one usually 8:30 AM."
- **Slow connection:** skeleton states for all cards, never block the page on the slowest call. Each card fetches independently.

---

## Animation / Motion

| Element | Trigger | Animation | Duration | Easing |
|---|---|---|---|---|
| KPI value change | new data arrives | Cross-fade old → new value | 200ms | `ease-out` |
| Alert pill (new) | item added | Slide in from left + dot pulse | 250ms slide, 1.5s pulse | `ease-out` |
| Product block collapse | tap | Height collapse + chevron rotate | 180ms | `ease-in-out` |
| Modal / drill-down | open | Slide from right (desktop), push from right (mobile) | 220ms | `ease-out` |
| Task row escalate confirm | success | Subtle green flash on row | 600ms | `ease-out` |

Keep motion minimal. Sultan reviews this many times a day — animation that delights once, irritates 100 times.

---

## Accessibility Notes

- **Contrast:** all text/background pairs meet WCAG AA at minimum. KPI values use `text/primary` on white = 15.2:1.
- **Focus order:** Topbar → Alerts → KPI row → Product blocks (top to bottom) → Team → Tasks. Sidebar reachable via `Skip to nav` link.
- **Keyboard:** all rows and pills must be `<button>` or `<a>`, focusable; Enter activates; Escape closes drill-downs.
- **ARIA:** alert strip has `role="region" aria-label="Active alerts"`. KPI deltas read out as "Revenue MTD, 487,200 Saudi Riyals, up 12 percent versus last month."
- **Color is never the only signal:** stage pills carry text, delta arrows are paired with `▲ ▼`, blocked tasks are labelled "BLOCKED" not just amber.
- **Reduce motion:** respect `prefers-reduced-motion: reduce` — disable pulses and slide-in.

---

## Data Model — Hooks the Backend Needs

The dashboard is a thin renderer. Mohammed should expose these endpoints for Phase 1:

| Endpoint | Returns |
|---|---|
| `GET /api/dashboard/financial-pulse?period=mtd` | revenue, netProfit, cash, burnRate, runwayMonths, sparkSeries |
| `GET /api/dashboard/revenue-by-product?period=mtd` | array `{productId, name, platform, amountSAR, share}` |
| `GET /api/dashboard/invoices?status=upcoming&limit=5` | array `{partnerName, productId, amountSAR, dueDate}` |
| `GET /api/dashboard/product-status` | array of platforms with nested products and stage/metrics |
| `GET /api/dashboard/team-pulse?date=today` | array `{memberId, name, status, openTasks, lastSeen}` |
| `GET /api/dashboard/tasks?filter=overdue\|week\|blocked` | array `{taskId, title, assignee, product, dueDate, priority, status}` |
| `GET /api/dashboard/alerts` | array `{severity, message, sourceRef}` — server-computed per the rules in brief §1.4 |
| `POST /api/tasks/{id}/escalate` | sends WhatsApp + email per notification layer |

All amounts come from the server already in SAR; the client never converts. Net profit definition is enforced server-side (`Revenue − COGS − Fixed − Variable`) and that single number is reused everywhere — including the royalty calculator (per brief).

---

## Build Order Inside Phase 1

1. **Skeleton shell + tokens + sidebar** — get the chrome right first; everything plugs in.
2. **Financial Pulse cards** — wire the four KPIs even if Sultan enters values manually for the first month.
3. **Alerts strip** — cheap to build, highest perceived value, runs off the same data already loaded.
4. **Product status blocks** — start with read-only; "Open →" goes to a placeholder until Module 2 lands.
5. **Team Pulse + Tasks** — last in Phase 1; ties into Module 3.

Aim to ship a working Dashboard in 2 sprints, even with placeholder data on the deeper modules. Sultan needs the *view* before the *plumbing*.

---

## Out of Scope for Phase 1

(Per brief — restated so nothing creeps in.)

- Royalty Calculator (Module 2.2) — Phase 2
- Cap Table / SAFE simulator — Phase 2
- Full regulatory & R&D pipeline detail — Phase 3
- AI anomaly layer + natural-language queries — Phase 4
- Bookkeeping, payroll, customer-facing portal, full WMS — never
