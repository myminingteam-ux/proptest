# YourFundedAccount handoff

- Handoff revision: `5`
- Project revision: `3`
- GARY control-plane revision: `4`
- Updated: `2026-09-14T15:39:17+02:00`
- Surface: Codex Desktop

## Changed

- Refreshed the minimal GARY continuity projection against canonical v2.7.6 P0-1 state.
- Verified the selected archive and persistence receipt, and verified the shared hash-chained ledger: state hash `282eb1ed658bf47e5b792d54759d32e8975757bd38381ac37bf474d8819b4d3a`, 109 persisted evolution events, trace head `202` / `520db56d76fb106fd1762233bd78c53db394737954527af0868e56f2e2c00124`.
- Preserved the reconciled continuity projection while integrating the approved YFA redesign on the dedicated `redesign/yfa-premium-green-gold` branch.
- Added the premium dark-green/gold, mobile-first system and single challenge configurator across the 15-page static application, preserving existing facts, routes, checkout bindings, SEO, accessibility contracts, logo/mascot, and brand colors.
- Verified the source build, existing parity/guard verifier, generated-page count, diff hygiene, exact-width responsive behavior at 360/390/430/768/1024/1280/1440 px, and local browser interactions.
- Pushed implementation commit `6fa70a995b1461b903611f6bf49aebe7f13ed834`; the existing Vercel integration completed a review-only preview at `https://proptest-adeyvedjq-myminingteam-3375s-projects.vercel.app`, which was verified in browser.
- Recorded the supported YFA project status, blockers, QA evidence, and LAB boundary.
- Recorded the Cloudflare Computer remote trial as LAB/BLOCKED with direct deployment evidence and a regression rule; retained historical evidence without changing its status.
- Bound the project projection to the canonical pointer/ledger state; project deployment authority is unchanged.

## Decisions

- The GARY pointer and evolution ledger are authoritative across ChatGPT and Codex surfaces; repository state is a verified projection.
- P0-1 is canonical and read-only within its stated scope; SBK1 remains non-canonical in its NEXT/LAB-origin lane, the Experience Compiler remains LAB, R1 remains NEXT-only, and P0-2 has not started.
- The redesign branch is review-only: do not merge to `main`, deploy to production, or perform domain cutover from this handoff.

## Rejected or not promoted

- No vector database, synchronization daemon, or additional MCP layer.
- The removed temporary Cloudflare Computer LAB workflow is not STABLE.
- Both temporary and authenticated remote activation attempts were rejected by Cloudflare API error `10195`; no endpoint was created and nothing was promoted.

## Next

- On the next consequential session, run the continuity gate before edits.
- Resolve the documented migration blockers and re-verify the fact registry before any production or domain decision.
- If a dedicated control-plane repository is created, migrate these files in one revisioned change and update all pointers.
- To resume the Cloudflare Computer LAB, first enable Dynamic Workers through a paid Workers plan, then deploy and collect endpoint, authenticated smoke, and runtime-log evidence.
