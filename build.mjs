import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { canonicalHost, reviewedAt } from './src/site-facts.mjs';
import home from './src/pages/home.mjs';
import challenges from './src/pages/challenges.mjs';
import one from './src/pages/one-step.mjs';
import two from './src/pages/two-step.mjs';
import instant from './src/pages/instant.mjs';
import pricing from './src/pages/pricing.mjs';
import rules from './src/pages/rules.mjs';
import withdrawals from './src/pages/withdrawals.mjs';
import faq from './src/pages/faq.mjs';
import platform from './src/pages/platform.mjs';
import instruments from './src/pages/instruments.mjs';
import about from './src/pages/about.mjs';
import contact from './src/pages/contact.mjs';
import risk from './src/pages/risk.mjs';
import notFound from './src/pages/not-found.mjs';

const root=path.dirname(fileURLToPath(import.meta.url));
const dist=path.join(root,'dist');
const pages=[home,challenges,one,two,instant,pricing,rules,withdrawals,faq,platform,instruments,about,contact,risk,notFound];
fs.rmSync(dist,{recursive:true,force:true});
fs.mkdirSync(dist,{recursive:true});

function writePage(p){
  if(p.path==='/'){fs.writeFileSync(path.join(dist,'index.html'),p.html);return;}
  if(p.path==='/404.html'){fs.writeFileSync(path.join(dist,'404.html'),p.html);return;}
  const dir=path.join(dist,p.path.replace(/^\//,'').replace(/\/$/,''));
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'index.html'),p.html);
}
pages.forEach(writePage);

fs.cpSync(path.join(root,'public'),dist,{recursive:true});
fs.copyFileSync(path.join(root,'src/assets/styles.css'),path.join(dist,'assets/styles.css'));
fs.copyFileSync(path.join(root,'src/assets/premium.css'),path.join(dist,'assets/premium.css'));
fs.copyFileSync(path.join(root,'src/assets/chrome.css'),path.join(dist,'assets/chrome.css'));
fs.copyFileSync(path.join(root,'src/assets/app.js'),path.join(dist,'assets/app.js'));

const indexable=pages.filter(p=>!['/contact/','/404.html'].includes(p.path));
const sitemap=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map(p=>`  <url><loc>${new URL(p.path,canonicalHost)}</loc><lastmod>${reviewedAt}</lastmod></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(dist,'sitemap.xml'),sitemap);
fs.writeFileSync(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /dashboard/\nDisallow: /account/\nDisallow: /checkout/\nDisallow: /payment/\nDisallow: /internal/\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nSitemap: ${canonicalHost}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist,'llms.txt'),`# Your Funded Account\n\n> Your Funded Account is a crypto-focused simulated trading evaluation brand operated by Prop Skills Tech Ltd.\n\n## Canonical resources\n- ${canonicalHost}/about/\n- ${canonicalHost}/challenges/\n- ${canonicalHost}/rules/\n- ${canonicalHost}/withdrawals/\n- ${canonicalHost}/faq/\n- ${canonicalHost}/platform/\n- ${canonicalHost}/instruments/\n- ${canonicalHost}/risk-disclosure/\n`);
console.log(`Built ${pages.length} HTML pages into ${dist}`);
