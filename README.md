# Your Funded Account — production candidate

This package implements the approved YFA/GARY website direction as a static, server-rendered public site with reusable source modules, centralized commercial facts, SEO metadata, structured data, responsive layouts and a small interaction layer.

## Build

```bash
npm install
npm run build
```

Output: `dist/`

There are no runtime dependencies. The production build uses Node only to generate static HTML.

## Preview locally

```bash
python -m http.server 4173 -d dist
```

Then open `http://localhost:4173/`.

## Implemented public routes

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
- `/contact/` — intentionally `noindex` until public support details are approved
- `/risk-disclosure/`
- `/404.html`

Temporary Vercel redirects preserve the current legal documents at PropFunded until YFA-specific legal pages are approved:

- `/terms-and-conditions/` → `https://propfunded.ai/terms-and-conditions`
- `/privacy-policy/` → `https://propfunded.ai/privacy-policy`

## Source of truth

Commercial facts are centralized in `src/site-facts.mjs`. Public pages do not maintain independent copies of the core target/drawdown/company facts.

The candidate is intentionally conservative. Unresolved product/legal fields are listed in `VERIFIED_CONTENT.md` and are not promoted as marketing claims.

## Important launch blockers

1. Connect the live evaluation account-size and pricing source.
2. Resolve the payout eligibility / first-payout timing conflict before publishing exact payout thresholds or timing.
3. Confirm profit-split conditions by program.
4. Confirm exact drawdown formulas, reset time/timezone, floating P/L, fees and breach boundary.
5. Approve public support details and registered street address where required.
6. Connect the real public payout feed/API.
7. Replace illustrative platform compositions with approved CLEO/YFA product media or components.
8. Re-verify the full fact registry immediately before domain cutover.

## Deployment

`vercel.json` is included. Vercel should run `npm run build` and serve `dist/`.

No live deployment or domain cutover is included in this package.
