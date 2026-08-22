import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { forbiddenClaims } from '../src/site-facts.mjs';

const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist=path.join(root,'dist');
const errors=[];
const warnings=[];
const htmlFiles=[];

function walk(dir){
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,ent.name);
    if(ent.isDirectory()) walk(p);
    else if(p.endsWith('.html')) htmlFiles.push(p);
  }
}
function readRoute(route){
  const p=route==='/'?path.join(dist,'index.html'):path.join(dist,route.replace(/^\//,'').replace(/\/$/,''),'index.html');
  if(!fs.existsSync(p)){errors.push(`${route}: parity route missing`);return ''}
  return fs.readFileSync(p,'utf8');
}
function requireAll(route,checks){
  const html=readRoute(route);
  for(const [label,re] of checks){if(!re.test(html)) errors.push(`${route}: PropFunded parity missing ${label}`)}
}

walk(dist);
const titleSeen=new Map();
const canonicalSeen=new Map();
const routePaths=new Set(['/']);
for(const f of htmlFiles){
  let rel=path.relative(dist,f).replaceAll(path.sep,'/');
  if(rel==='index.html') routePaths.add('/');
  else if(rel==='404.html') routePaths.add('/404.html');
  else if(rel.endsWith('/index.html')) routePaths.add('/'+rel.replace(/index\.html$/,'').replace(/\/$/,'')+'/');
}

const internalCopy=/\b(production candidate|standalone candidate|staging candidate|backend blocker|accessible source set|fact registry|migration blocker|project brief flags)\b/i;
const conflictCopy=/4% of (?:the )?initial balance/i;

for(const f of htmlFiles){
  const html=fs.readFileSync(f,'utf8');
  const rel=path.relative(dist,f);
  const title=(html.match(/<title>([^<]+)<\/title>/)||[])[1];
  if(!title) errors.push(`${rel}: missing title`);
  else {if(titleSeen.has(title)) errors.push(`${rel}: duplicate title with ${titleSeen.get(title)}`);titleSeen.set(title,rel)}
  const desc=(html.match(/<meta name="description" content="([^"]*)"/i)||[])[1];
  if(!desc||desc.length<70) warnings.push(`${rel}: short/missing description`);
  const canon=(html.match(/<link rel="canonical" href="([^"]+)"/i)||[])[1];
  if(!canon) errors.push(`${rel}: missing canonical`);
  else {if(canonicalSeen.has(canon)) errors.push(`${rel}: duplicate canonical with ${canonicalSeen.get(canon)}`);canonicalSeen.set(canon,rel)}
  if(!(html.match(/<h1[^>]*>[\s\S]*?<\/h1>/i))) errors.push(`${rel}: missing H1`);
  if(!/404\.html$/.test(rel)&&!/risk-disclosure/.test(rel)&&!/contact/.test(rel)&&!/terms-and-conditions/.test(rel)&&!/simulated|virtual funds/i.test(html)) warnings.push(`${rel}: simulated-trading disclosure not obvious`);
  for(const re of forbiddenClaims){if(re.test(html)) errors.push(`${rel}: forbidden/guarded claim matched ${re}`)}
  if(/\$0\b|0 completed payouts|waiting for first payout/i.test(html)) errors.push(`${rel}: unsafe payout fallback copy`);
  if(!/404\.html$/.test(rel)&&internalCopy.test(html)) errors.push(`${rel}: internal build/process language leaked into public copy`);
  if(conflictCopy.test(html)) errors.push(`${rel}: conflicting legacy 4% payout threshold surfaced publicly`);
  for(const m of html.matchAll(/href="(\/[^"]*)"/g)){
    let href=m[1].split(/[?#]/)[0];
    if(href===''||href==='/'||href.startsWith('/assets/')) continue;
    if(href.endsWith('.html')){if(!routePaths.has(href)) warnings.push(`${rel}: internal html href not mapped ${href}`);continue;}
    if(!href.endsWith('/')) href += '/';
    if(!routePaths.has(href)&&!['/terms-and-conditions/','/privacy-policy/'].includes(href)) warnings.push(`${rel}: internal route target absent ${href}`);
  }
}

requireAll('/rules/',[
  ['1-Step 10% target',/1-Step[\s\S]{0,500}10%/i],
  ['1-Step 3% daily drawdown',/3% daily/i],
  ['1-Step 6% total drawdown',/6% total/i],
  ['2-Step two 7% targets',/(two 7%|7% \+ 7%)/i],
  ['2-Step 5% daily drawdown',/5% daily/i],
  ['2-Step 10% total drawdown',/10% total/i],
  ['profitable day closed-position rule',/closed position/i],
  ['profitable day 1% rule',/1% profit/i],
  ['UTC daily reset',/reset[^<]{0,80}UTC|UTC[^<]{0,80}reset/i],
  ['floating P&L and fee treatment',/floating P\/?L[\s\S]{0,120}fees|fees[\s\S]{0,120}floating P\/?L/i],
  ['funded $50 unlock',/\$50 profit/i],
  ['funded 3% trailing drawdown',/3% trailing/i],
  ['funded 5% total drawdown',/5% total drawdown/i],
  ['5x leverage',/5×|5x/i],
  ['30% max margin per pair',/30%[^<]{0,80}(?:per pair|margin)/i],
  ['30-day closed-trade inactivity rule',/30 consecutive days[^<]{0,100}closed trades|no trades are closed[^<]{0,100}30 consecutive days/i],
  ['non-refundable challenge fee',/non-refundable/i],
]);

requireAll('/instant-funding/',[
  ['$2.5K / $199 offer',/\$2\.5K[\s\S]{0,160}\$199/i],
  ['$5K / $349 offer',/\$5K[\s\S]{0,160}\$349/i],
  ['60% standard split',/60%/i],
  ['80% boosted split',/80%/i],
  ['$50 minimum/unlock',/\$50/i],
  ['day-1 first withdrawal',/day 1/i],
  ['7-day withdrawal cycle',/7[- ]day|7 days/i],
  ['no monthly fee',/no monthly fee/i],
  ['no withdrawal fee',/no withdrawal fee/i],
  ['non-refundable fee',/non-refundable/i],
]);

requireAll('/platform/',[
  ['CLEO platform relationship',/CLEO/i],
  ['roughly 350 USDT perpetual markets',/350[+]?[^<]{0,80}USDT/i],
  ['maker fee 0.0200%',/0\.0200%/i],
  ['taker fee 0.0500%',/0\.0500%/i],
  ['iOS availability',/iOS/i],
  ['Android availability',/Android/i],
  ['simulated environment',/simulated/i],
]);

requireAll('/about/',[
  ['legal operator',/Prop Skills Tech Ltd/i],
  ['registration number',/01010909/i],
  ['RAK Digital Assets Oasis Dubai',/RAK Digital Assets Oasis Dubai/i],
  ['simulated trading model',/simulated/i],
]);
requireAll('/contact/',[['public support email',/contact@propfunded\.ai/i]]);
requireAll('/risk-disclosure/',[
  ['virtual funds disclosure',/virtual funds/i],
  ['no customer deposits',/does not accept customer deposits|no customer deposits/i],
]);

for(const asset of ['assets/styles.css','assets/app.js','assets/yfa-logo.png','assets/yfa-mark.png','robots.txt','sitemap.xml','llms.txt']){
  if(!fs.existsSync(path.join(dist,asset))) errors.push(`missing asset ${asset}`);
}

console.log(`Verified ${htmlFiles.length} HTML files.`);
if(warnings.length){console.log('\nWarnings:');warnings.forEach(x=>console.log(' - '+x))}
if(errors.length){console.error('\nErrors:');errors.forEach(x=>console.error(' - '+x));process.exit(1)}
console.log('\nPASS: no blocking verification errors, including PropFunded parity guards.');
