import { organization, reviewedAt, externalFlows, canonicalHost } from './site-facts.mjs';
import { organizationSchema, websiteSchema } from './seo.mjs';

const navItems = [
  ['Programs','/challenges/'],
  ['Rules','/rules/'],
  ['Payouts','/withdrawals/'],
  ['Platform','/platform/'],
  ['FAQ','/faq/'],
  ['About','/about/'],
];

export function escapeHtml(value='') {
  return String(value)
    .replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')
    .replaceAll('"','&quot;').replaceAll("'",'&#039;');
}

export function icon(name, cls='') {
  const base = `class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"`;
  const paths = {
    check: `<path d="M20 6 9 17l-5-5"/>`,
    close: `<path d="m6 6 12 12M18 6 6 18"/>`,
    shield: `<path d="M12 3 5 6v5c0 5 3.2 8.2 7 10 3.8-1.8 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>`,
    chart: `<path d="M4 19V5M4 19h16"/><path d="m7 15 4-5 3 3 5-7"/>`,
    clock: `<circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/>`,
    layers: `<path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 12 8 4 8-4M4 17l8 4 8-4"/>`,
    money: `<circle cx="12" cy="12" r="8"/><path d="M8.5 9.5c.8-1 2-1.5 3.5-1.5 2 0 3 .8 3 2 0 3-6 1.5-6 4 0 1.2 1.2 2 3 2 1.5 0 2.7-.5 3.5-1.5M12 6v12"/>`,
    arrow: `<path d="M5 12h14M14 7l5 5-5 5"/>`,
    info: `<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>`,
    file: `<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>`,
    building: `<path d="M4 21h16M6 18V9M10 18V9M14 18V9M18 18V9M3 9h18L12 3 3 9Z"/>`,
    menu: `<path d="M4 7h16M4 12h16M4 17h16"/>`,
  };
  return `<svg ${base}>${paths[name] || paths.info}</svg>`;
}

export function header(activePath='') {
  const links = navItems.map(([label, href]) => {
    const active = activePath === href || (href !== '/' && activePath.startsWith(href));
    return `<a href="${href}"${active ? ' aria-current="page" class="active"' : ''}>${label}</a>`;
  }).join('');
  return `<header class="site-header">
    <div class="wrap nav">
      <a class="brand" href="/" aria-label="Your Funded Account home"><span class="brand-logo" aria-hidden="true"></span></a>
      <nav class="desktop-nav" aria-label="Primary">${links}</nav>
      <div class="nav-actions"><a class="login" href="${externalFlows.signin}">Log in</a><a class="btn btn-primary" href="${externalFlows.signup}">Get started</a><button class="menu-toggle" aria-label="Open menu" aria-expanded="false">${icon('menu')}</button></div>
    </div>
    <nav class="mobile-nav" aria-label="Mobile primary">${links}<a href="${externalFlows.signin}">Log in</a><a class="btn btn-primary" href="${externalFlows.signup}">Get started</a></nav>
  </header>`;
}

export function footer() {
  return `<footer class="site-footer">
    <div class="wrap footer-main">
      <div class="footer-brand"><span class="footer-logo" role="img" aria-label="Your Funded Account"></span><p>Crypto-focused simulated trading evaluations with clear public rules.</p></div>
      <div><strong>Programs</strong><a href="/one-step-challenge/">1-Step</a><a href="/two-step-challenge/">2-Step</a><a href="/instant-funding/">Instant Funding</a><a href="/pricing/">Pricing</a></div>
      <div><strong>Resources</strong><a href="/rules/">Rules</a><a href="/withdrawals/">Payouts</a><a href="/platform/">Platform</a><a href="/instruments/">Markets</a><a href="/faq/">FAQ</a></div>
      <div><strong>Company</strong><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/terms-and-conditions/">Terms</a><a href="/privacy-policy/">Privacy</a><a href="/risk-disclosure/">Risk disclosure</a></div>
    </div>
    <div class="wrap legal-strip">
      <p><strong>${organization.legalName}</strong> · Reg. No. ${organization.registrationNumber} · ${organization.registeredZone}, ${organization.jurisdiction}</p>
      <p>All trading is simulated using virtual funds. No customer deposits are accepted and no customer capital is managed.</p>
    </div>
  </footer>`;
}

export function pageHero({ eyebrow, title, lead, actions='', aside='' }) {
  return `<section class="page-hero"><div class="wrap page-hero-grid"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="lead">${lead}</p>${actions}</div>${aside ? `<aside>${aside}</aside>` : ''}</div></section>`;
}

export function lastReviewed(owner='Product & Risk') {
  return `<div class="reviewed">Last reviewed <strong>${reviewedAt}</strong> · Content owner: ${owner}</div>`;
}

export function directAnswer(text) {
  return `<div class="direct-answer"><span>Direct answer</span><p>${text}</p></div>`;
}

export function keyFacts(items) {
  return `<div class="key-facts">${items.map(([k,v])=>`<div><span>${k}</span><strong>${v}</strong></div>`).join('')}</div>`;
}

export function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb">${items.map((x,i)=>`${i?'<span>›</span>':''}<a href="${x.path}"${i===items.length-1?' aria-current="page"':''}>${x.name}</a>`).join('')}</nav>`;
}

export function disclosureBand() {
  return `<section class="disclosure-band"><div class="wrap">${icon('shield')}<p><strong>Simulated trading environment.</strong> Evaluation and funded-stage accounts use virtual funds. ${organization.brandName} does not accept customer deposits or provide direct access to deployed trading capital.</p></div></section>`;
}

export function layout({ seo, path='/', body, schemas=[] }) {
  const allSchemas = path === '/' ? [organizationSchema(), websiteSchema(), ...schemas] : [organizationSchema(), ...schemas];
  const schemaHtml = allSchemas.map(s=>`<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  return `<!doctype html><html lang="en"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="theme-color" content="#05070a"><title>${escapeHtml(seo.title)}</title>
    <meta name="description" content="${escapeHtml(seo.description)}"><meta name="robots" content="${seo.robots}"><meta name="googlebot" content="${seo.robots}">
    <link rel="canonical" href="${seo.canonical}"><link rel="icon" href="/assets/yfa-mark.png">
    <meta property="og:type" content="website"><meta property="og:site_name" content="${escapeHtml(seo.siteName)}"><meta property="og:title" content="${escapeHtml(seo.title)}"><meta property="og:description" content="${escapeHtml(seo.description)}"><meta property="og:url" content="${seo.canonical}"><meta property="og:image" content="${seo.image}">
    <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(seo.title)}"><meta name="twitter:description" content="${escapeHtml(seo.description)}"><meta name="twitter:image" content="${seo.image}">
    <link rel="stylesheet" href="/assets/styles.css"><link rel="stylesheet" href="/assets/premium.css?v=20260822-black2">${schemaHtml}
  </head><body data-path="${path}">${header(path)}<main>${body}</main>${footer()}<script type="module" src="/assets/app.js"></script></body></html>`;
}

export function ctaBand(title='Ready to compare the programs?', text='Review the current rules before choosing an account.') {
  return `<section class="cta-band"><div class="wrap"><div><h2>${title}</h2><p>${text}</p></div><div class="cta-actions"><a class="btn btn-light" href="/challenges/">Compare programs</a><a class="text-on-blue" href="/rules/">Read the rules ${icon('arrow')}</a></div></div></section>`;
}

export function migrationNote(text) {
  return `<div class="migration-note">${icon('info')}<p>${text}</p></div>`;
}
