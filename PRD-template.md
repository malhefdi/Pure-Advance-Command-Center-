# PRD: [Feature Name]

> **How to use this template:** Fill in each section, delete the italicized hints, and hand the finished file to Claude Code (e.g., `claude "Read PRD-template.md and implement it. Start with the Implementation Plan section."`). The clearer and more specific each section, the less Claude has to guess. Anywhere you write `TBD` or `???`, expect Claude to ask you about it.

---

## 1. Summary

*One paragraph (3–5 sentences). What is this feature, who is it for, and why are we building it now? A reader should be able to stop here and know whether the rest of the doc is relevant to them.*

---

## 2. Problem & Context

**Problem:** *What is broken, missing, or painful today? Be concrete — describe the user's current workflow and where it breaks down.*

**Why now:** *What changed? A customer ask, a competitor shipping, a deadline, an internal blocker?*

**Background / prior art:** *Link to past discussions, related PRs, design docs, Linear/Jira tickets, customer tickets, or existing code that this builds on.*

---

## 3. Goals & Non-Goals

**Goals** (what success looks like):

1. *Specific, observable outcome — e.g., "Users can export a report as CSV in under 2 clicks."*
2. *…*
3. *…*

**Non-Goals** (explicitly out of scope for this work):

1. *e.g., "Excel export — that's a follow-up."*
2. *e.g., "Bulk export of more than 10k rows — out of scope, will be a separate ticket."*

> Non-goals are as important as goals. Anything not listed here is fair game for Claude to implement, so be explicit about what you DON'T want touched.

---

## 4. Users & Use Cases

**Primary user(s):** *Who is this for? Be specific — "internal admins," "free-tier signups in their first 7 days," "API customers integrating via webhook."*

**Use cases / user stories:**

1. *As a `<user>`, I want to `<action>` so that `<outcome>`.*
2. *…*
3. *…*

---

## 5. Functional Requirements

*Numbered, testable, unambiguous. Each requirement should map to one or more acceptance criteria in §10.*

| # | Requirement | Priority |
|---|-------------|----------|
| FR-1 | *The system shall …* | Must |
| FR-2 | *The system shall …* | Must |
| FR-3 | *The system shall …* | Should |
| FR-4 | *The system shall …* | Could |

> Use **Must / Should / Could / Won't** (MoSCoW). "Must" = ship blockers. "Won't" = defer to a later release.

---

## 6. UX / UI Requirements

*Skip this section if there's no user-facing surface.*

- **Entry points:** *Where does the user encounter this? Nav item, button, deep link, CLI command?*
- **Key screens / states:** *Empty, loading, error, success, edge cases (no permissions, offline, etc.).*
- **Copy & microcopy:** *Exact button labels, error messages, empty state text. If you don't specify, Claude will guess.*
- **Mockups / references:** *Link Figma, screenshots, or a similar feature in another product.*
- **Accessibility:** *Keyboard nav, screen reader labels, contrast, focus states. Default expectation: WCAG 2.1 AA.*

---

## 7. Technical Requirements

**Tech stack & libraries:** *Language, framework, key dependencies. Call out anything Claude must use (or must NOT use).*

**Code locations:** *Where in the repo should new files live? Which existing files will be modified? Be specific — "add to `src/features/billing/`, follow the pattern in `src/features/notifications/`."*

**Data model / schema changes:** *New tables, columns, indexes, migrations. If this touches a shared schema, say so.*

**APIs / contracts:**

- *New endpoints: method, path, request shape, response shape, error codes.*
- *External APIs being called: which one, what auth, rate limits.*
- *Breaking changes to existing contracts: list them.*

**Dependencies & integrations:** *Other services, feature flags, third-party APIs, internal libraries.*

**Performance / scale:** *Expected request volume, latency targets, payload sizes, concurrent users.*

**Security & privacy:** *Auth requirements, PII handling, data retention, audit logging, threat-model concerns.*

**Observability:** *Logs, metrics, traces, alerts. What should oncall see when this breaks?*

---

## 8. Constraints & Assumptions

**Constraints:** *Things Claude can't change — existing API contracts, deploy windows, browser support, framework version locks.*

**Assumptions:** *Things you're treating as given. If any assumption turns out to be wrong, the PRD needs revisiting.*

---

## 9. Edge Cases & Error Handling

*Walk through what should happen when things go sideways. The more of these you list, the fewer surprises in review.*

- *Empty input / no data*
- *Network failure mid-request*
- *Partial save / resumable state*
- *Permission denied*
- *Concurrent edits / race conditions*
- *Rate limits hit*
- *Invalid or malicious input*

---

## 10. Acceptance Criteria

*Each "Must" requirement in §5 should have at least one acceptance criterion here. These are what you'll check before merging.*

- [ ] *Given `<context>`, when `<action>`, then `<observable result>`.*
- [ ] *…*
- [ ] *Tests cover: unit (logic), integration (API/DB), e2e (critical user path).*
- [ ] *No regressions in `<related area>` — verified by existing test suite passing.*
- [ ] *Documentation updated: `<README / API docs / changelog>`.*

---

## 11. Testing Strategy

- **Unit tests:** *What logic must be covered? Any specific edge cases?*
- **Integration tests:** *Which boundaries — DB, external APIs, queues?*
- **E2E / manual QA:** *Critical user paths that need a real browser / device.*
- **Test data:** *Fixtures, seed data, mock services.*
- **Performance / load:** *Only if §7 set a numeric target.*

---

## 12. Rollout Plan

- **Feature flag:** *Name, default state, who can flip it.*
- **Migration / backfill:** *Order of operations, downtime window, rollback plan.*
- **Phased release:** *Internal → beta → GA, or all at once?*
- **Comms:** *Changelog, release notes, customer email, in-app notification.*
- **Rollback:** *How do we turn this off cleanly if it goes wrong?*

---

## 13. Implementation Plan

*Suggest a sequence of small, reviewable PRs. This is what Claude Code will work through — keep each step small enough to review in one sitting.*

1. **Step 1 — Scaffolding:** *e.g., add migration + model + empty service.*
2. **Step 2 — Core logic:** *e.g., implement the main use case path.*
3. **Step 3 — Edge cases & error handling:** *…*
4. **Step 4 — UI / API surface:** *…*
5. **Step 5 — Tests & docs:** *…*
6. **Step 6 — Feature flag wiring & rollout:** *…*

> Tell Claude: "Stop after each step and show me the diff before moving on." This catches drift early.

---

## 14. Open Questions

*Things you haven't decided yet. Claude will either ask about these or make a reasonable assumption — list them here so neither side is surprised.*

- [ ] *Q: Should we …? — Owner: <name>, due before step <n>.*
- [ ] *…*

---

## 15. References

- **Related PRs / commits:** *…*
- **Linear / Jira tickets:** *…*
- **Design files:** *…*
- **Slack threads / customer tickets:** *…*
- **Existing code to mirror or extend:** *…*

---

## Appendix: Tips for Handing This to Claude Code

- **Start narrow:** point Claude at one section at a time (`"implement section 13, step 1"`) rather than the whole PRD at once.
- **Demand a plan first:** ask Claude to read the PRD and produce its own implementation plan before touching code. Compare it against §13 — gaps tell you where the PRD is fuzzy.
- **Use `/clear` between phases:** long contexts drift. Reset the conversation when moving from one major step to the next.
- **Verify, don't trust:** after each step, ask Claude to show you the diff and the failing → passing test output. "Done" means the test ran, not that Claude said it did.
- **Update the PRD as you go:** if a decision changes mid-build, edit this file. The PRD is the source of truth — not the chat history.
