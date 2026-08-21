# Deployment notes

## Candidate type
Static Vercel site generated with Node. No frontend framework/runtime dependency.

## Commands

```bash
npm install
npm run build
```

Output directory: `dist`

## Current verification
- Build: PASS
- Static verifier: PASS
- Route HTTP smoke test: PASS for all implemented local routes
- JavaScript syntax: PASS
- Source module syntax: PASS
- Server-rendered default program facts: PASS
- Desktop visual render: inspected
- Tablet visual render: inspected
- Mobile visual render: inspected with forced responsive preview stylesheet because the available PDF renderer does not evaluate viewport-width media queries like a browser

## Vercel behavior
`vercel.json` configures:
- `npm run build`
- output `dist`
- clean URLs
- trailing slash normalization
- temporary legal redirects to current PropFunded Terms/Privacy
- baseline security headers

## Not deployed
No Vercel deployment or domain change was performed from this package.

## Required before production cutover
See `VERIFIED_CONTENT.md` launch blockers. The most important are live pricing integration, payout-rule reconciliation, payout-feed integration, public support approval, exact rule-formula approval and real CLEO/YFA product assets.
