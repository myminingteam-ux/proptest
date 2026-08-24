# YourFundedAccount project state

- Repository: `myminingteam-ux/proptest`
- Project revision: `1`
- Required control-plane revision: `1`
- Updated: `2026-08-24T15:27:24+02:00`
- Control plane: `../gary-control-plane/` or `https://github.com/myminingteam-ux/proptest/tree/main/gary-control-plane`
- Source commit inspected: `916bd19ac2b9c8054dfae556cdfb8a3b795a552c`

## Current state

The site is a coded, static/server-rendered YourFundedAccount production candidate. The GARY production audit is `PASS WITH MIGRATION BLOCKERS`; this is not authorization for irreversible public cutover.

## Verified evidence

- The 2026-08-21 build, tests, syntax checks, generated-page checks, guarded-claim scans, asset checks, initial server-rendered program facts, and local HTTP route smoke tests passed.
- Responsive renders were inspected at 1440 px, 820 px, and 390 px, with documented fixes.

## Current blockers

- Live pricing/account-size source, payout timing and profit-split conditions, drawdown formula details, support/legal details, public payout feed, and approved product media remain unresolved.
- Browser interaction verification must be repeated on a deployment preview before domain cutover.
- Re-verify the fact registry immediately before cutover.

## Boundaries

- No public deployment or domain cutover is authorized by this state file.
- Do not promote temporary LAB work into the production path without explicit evidence and decision entries.
