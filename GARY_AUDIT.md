# GARY production audit — Your Funded Account

## Decision

**Production direction: PASS WITH MIGRATION BLOCKERS**

The site is ready as a coded staging candidate. It is not ready for irreversible public cutover until the product/legal/data blockers in `VERIFIED_CONTENT.md` are resolved.

## Intent fidelity

- Uses the exact user-approved YFA logo asset.
- Uses logo-derived blue + teal rather than dark-blue/gold prop-firm styling.
- Preserves the crypto-first positioning.
- Preserves verified PropFunded commercial facts rather than inventing a new product.
- Keeps the approved hero/account-configurator/markets/trust architecture.

## Anti-AI-slop gate

### Passed
- No floating crypto coins.
- No 3D trophies, badges or Lamborghini imagery.
- No black/gold luxury-prop aesthetic.
- No glassmorphism panels.
- No fake testimonials.
- No fake awards.
- No fake user counts.
- No fake payout totals.
- No fake uptime claims.
- No generic “trusted worldwide” claim.
- No repetitive five-card SaaS feature grid.
- No generated product UI presented as real product evidence.
- No “real capital”, “risk nothing”, “guaranteed payout” or similar guarded claims.
- No `$0` payout fallback state.

### Remaining authenticity blocker
The product visuals are explicitly labelled illustrative. Approved CLEO/YFA screenshots or product components should replace them before public launch. CLEO itself currently confirms Prop Funded as a platform client; that relationship is documented, not visually faked.

## Information architecture

Public staging routes implemented:
- Home
- Program comparison
- 1-Step
- 2-Step
- Instant Funding
- Pricing
- Rules
- Payout transparency
- FAQ
- Platform
- Markets
- About
- Contact placeholder/noindex
- Risk disclosure

The design uses alternating composition instead of a repeated card stack:
- asymmetrical hero
- service definition
- interactive program panel
- product/market composition
- editorial allowed/prohibited rules
- four-step process
- dark payout disclosure band
- institutional trust ledger
- answer-first FAQ

## Trust architecture

The candidate surfaces:
- legal operator
- registration number
- jurisdiction
- simulated-trading model
- no-customer-deposit framing
- payout asset with approval caveat
- restricted-location disclosure
- direct access to rules and legal documents

It deliberately does not manufacture maturity signals while the brand is new.

## Conversion architecture

Primary conversion mechanism: program selector.

The selector:
- server-renders 1-Step facts before JavaScript runs
- switches 1-Step / 2-Step / Instant Funding
- shows verified target/drawdown data
- shows verified Instant Funding sizes/prices
- keeps evaluation pricing live at checkout rather than risking stale duplicate values

## SEO / AI-search

Implemented:
- unique titles/descriptions/canonical URLs
- index/noindex controls
- Open Graph / Twitter metadata
- Organization schema
- WebSite schema
- BreadcrumbList on non-home routes
- visible-only FAQPage schema
- answer-first content blocks
- HTML tables/lists for important facts
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- static/server-rendered public content

## Accessibility / interaction

Implemented:
- semantic headings
- visible focus states
- ARIA states for program tabs, FAQs and mobile navigation
- reduced-motion handling
- descriptive alternative text for the real brand logo
- no essential fact conveyed only via color
- mobile-specific layout rules

## Complexity assessment

### Kept
- static HTML generator
- centralized fact registry
- small vanilla interaction layer
- Vercel static output

### Rejected for launch
- gamification
- leaderboards
- loyalty systems
- giant academy buildout
- public payout counters without data
- community widgets
- animation-heavy sections
- multi-framework runtime

**Complexity score:** approximately 3/10.

The complexity is concentrated where it earns value: content consistency, program selection, SEO and verification.
