# YourFundedAccount project state

- Repository: `myminingteam-ux/proptest`
- Project revision: `3`
- Required control-plane revision: `4`
- Updated: `2026-09-14T15:39:17+02:00`
- Control plane: `../gary-control-plane/` or `https://github.com/myminingteam-ux/proptest/tree/main/gary-control-plane`
- Source commit inspected: `6fa70a995b1461b903611f6bf49aebe7f13ed834`
- Canonical GARY: `v2.7.6` / `P0-1-MEMORY-STATE-CONTRACT-CANONICAL`.
- Shared evolution state: `282eb1ed658bf47e5b792d54759d32e8975757bd38381ac37bf474d8819b4d3a`, 109 persisted events; trace head `202` / `520db56d76fb106fd1762233bd78c53db394737954527af0868e56f2e2c00124`.

## Current state

The site is a coded, static/server-rendered YourFundedAccount redesign candidate on `redesign/yfa-premium-green-gold`. The GARY production audit is `PASS WITH MIGRATION BLOCKERS`; this is not authorization for irreversible public cutover.

## Verified evidence

- The 2026-08-21 build, tests, syntax checks, generated-page checks, guarded-claim scans, asset checks, initial server-rendered program facts, and local HTTP route smoke tests passed.
- Responsive renders were inspected at 1440 px, 820 px, and 390 px, with documented fixes.
- The approved premium dark-green/gold redesign was integrated across all 15 generated routes without changing the logo/mascot, brand colors, product facts, routes, checkout bindings, SEO metadata, or accessibility contracts.
- `node build.mjs`, `node scripts/verify.mjs`, and `git diff --check` passed; the verifier confirmed 15 generated HTML pages and no blocking parity/guard errors.
- Exact CSS viewport QA passed at 360, 390, 430, 768, 1024, 1280, and 1440 px with zero horizontal overflow. Mobile menu, sticky conversion CTA, configurator tabs, Instant Funding size switching, and FAQ expansion were exercised.
- The Vercel preview for implementation commit `6fa70a995b1461b903611f6bf49aebe7f13ed834` completed successfully and was browser-verified at `https://proptest-adeyvedjq-myminingteam-3375s-projects.vercel.app`.

## Current blockers

- Live pricing/account-size source, payout timing and profit-split conditions, drawdown formula details, support/legal details, public payout feed, and approved product media remain unresolved.
- Re-verify the fact registry immediately before cutover.

## Boundaries

- No production deployment or domain cutover is authorized by this state file; the Vercel preview is review-only.
- Do not promote temporary LAB work into the production path without explicit evidence and decision entries.
- Cloudflare Computer LAB remains blocked by Dynamic Workers plan entitlement; it is not part of this production candidate.
- GARY v2.7.6 P0-1 is the current canonical runtime; its bounded read-only memory-state scope does not change YourFundedAccount deployment authority or migration blockers.
