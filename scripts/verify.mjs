import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { forbiddenClaims } from '../src/site-facts.mjs';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist=path.join(root,'dist');
const errors=[];
const warnings=[];
const htmlFiles=[];
function walk(dir){for(const ent of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,ent.name);if(ent.isDirectory())walk(p);else if(p.endsWith('.html'))htmlFiles.push(p)}}
walk(dist);
const titleSeen=new Map();
const canonicalSeen=new Map();
const routePaths=new Set(['/']);
for(const f of htmlFiles){let rel=path.relative(dist,f).replaceAll(path.sep,'/');if(rel==='index.html')routePaths.add('/');else if(rel==='404.html')routePaths.add('/404.html');else if(rel.endsWith('/index.html'))routePaths.add('/'+rel.replace(/index\.html$/,'').replace(/\/$/,'' )+'/');}
for(const f of htmlFiles){const html=fs.readFileSync(f,'utf8');const rel=path.relative(dist,f);
  const title=(html.match(/<title>([^<]+)<\/title>/)||[])[1]; if(!title)errors.push(`${rel}: missing title`); else {if(titleSeen.has(title))errors.push(`${rel}: duplicate title with ${titleSeen.get(title)}`);titleSeen.set(title,rel)}
  const desc=(html.match(/<meta name="description" content="([^"]*)"/i)||[])[1]; if(!desc||desc.length<70)warnings.push(`${rel}: short/missing description`);
  const canon=(html.match(/<link rel="canonical" href="([^"]+)"/i)||[])[1]; if(!canon)errors.push(`${rel}: missing canonical`); else {if(canonicalSeen.has(canon))errors.push(`${rel}: duplicate canonical with ${canonicalSeen.get(canon)}`);canonicalSeen.set(canon,rel)}
  const h1=(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||[])[1]; if(!h1)errors.push(`${rel}: missing H1`);
  if(!/404\.html$/.test(rel)&&!/risk-disclosure/.test(rel)&&!/contact/.test(rel)&&!/terms-and-conditions/.test(rel)){if(!/simulated|virtual funds/i.test(html))warnings.push(`${rel}: simulated-trading disclosure not obvious`)}
  for(const re of forbiddenClaims){if(re.test(html))errors.push(`${rel}: forbidden/guarded claim matched ${re}`)}
  if(/\$0\b|0 completed payouts|waiting for first payout/i.test(html))errors.push(`${rel}: unsafe payout fallback copy`);
  for(const m of html.matchAll(/href="(\/[^"]*)"/g)){let href=m[1].split(/[?#]/)[0];if(href===''||href==='/'||href.startsWith('/assets/'))continue;if(href.endsWith('.html')){if(!routePaths.has(href))warnings.push(`${rel}: internal html href not mapped ${href}`);continue;}if(!href.endsWith('/'))href += '/';if(!routePaths.has(href)&&!['/terms-and-conditions/','/privacy-policy/'].includes(href))warnings.push(`${rel}: internal route target absent ${href}`)}
}
for(const asset of ['assets/styles.css','assets/app.js','assets/yfa-logo.png','assets/yfa-mark.png','robots.txt','sitemap.xml','llms.txt']){if(!fs.existsSync(path.join(dist,asset)))errors.push(`missing asset ${asset}`)}
console.log(`Verified ${htmlFiles.length} HTML files.`); if(warnings.length){console.log('\nWarnings:');warnings.forEach(x=>console.log(' - '+x))} if(errors.length){console.error('\nErrors:');errors.forEach(x=>console.error(' - '+x));process.exit(1)} console.log('\nPASS: no blocking verification errors.');
