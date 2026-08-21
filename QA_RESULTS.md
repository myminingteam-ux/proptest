# QA results — YFA production candidate

**Run date:** 2026-08-21

## Build and code
- `npm run build`: PASS
- `npm test`: PASS
- JavaScript syntax (`node --check`): PASS
- Source module syntax: PASS
- 15 generated HTML pages: PASS
- Unique title / canonical / H1 checks: PASS
- Guarded-claim regression scan: PASS
- Unsafe payout-zero fallback scan: PASS
- Required asset check: PASS
- Server-rendered initial program facts: PASS

## HTTP route smoke test
Local static server returned HTTP 200 for:
- `/`
- `/challenges/`
- `/one-step-challenge/`
- `/two-step-challenge/`
- `/instant-funding/`
- `/pricing/`
- `/rules/`
- `/withdrawals/`
- `/faq/`
- `/platform/`
- `/instruments/`
- `/about/`
- `/contact/`
- `/risk-disclosure/`
- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`

## Responsive render inspection
Inspected generated full-page reference renders at:
- Desktop: 1440 px
- Tablet: 820 px
- Mobile: 390 px

Issues found and fixed during visual QA:
1. Mobile hero fact strip collision → changed to compact stacked rows.
2. Server-rendered configurator rule list missing layout inheritance → fixed child selector.
3. Tablet configurator compressed into narrow columns → changed tablet config to deliberate vertical stack.
4. Program tabs clipped at narrow widths → changed tab layout from grid to equal-width flex and shortened the third visible label to `Instant` with an accessible `Instant Funding` label.

## Interaction coverage
The interaction layer includes:
- mobile menu open/close state
- FAQ accordion state
- program tabs
- Instant Funding account-size selection

Syntax and required DOM hook coverage pass. A Chromium-based interactive screenshot session could not be completed reliably in the available container runtime, so final browser interaction verification should be repeated on the Vercel preview before domain cutover.

## No forms changed
The current candidate introduces no public form and therefore does not replace any existing contact/payment/KYC flow. Transaction and sign-in CTAs continue to the existing PropFunded flow until backend migration is authorized.
