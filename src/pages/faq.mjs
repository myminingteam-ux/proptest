import { seo, breadcrumbSchema } from '../seo.mjs';
import { layout,pageHero,lastReviewed,breadcrumbs,ctaBand } from '../components.mjs';
import { organization,programs,serviceFacts,tradingConduct,restrictedLocations,fundedStageFacts } from '../site-facts.mjs';
const meta=seo({title:'YFA FAQ | Evaluations, Rules, Payouts & Platform',description:'Find direct answers about Your Funded Account evaluations, simulated trading, drawdown rules, profitable days, markets, payouts, restricted locations and account restrictions.',path:'/faq/'});
const faqs=[
['What YFA is','What is Your Funded Account?',`${organization.brandName} is a crypto-focused simulated trading evaluation brand operated by ${organization.legalName}. Trading uses virtual funds rather than customer deposits or managed customer capital.`],
['What YFA is','Are YFA accounts live-capital accounts?','No. Evaluation and funded-stage trading uses simulated virtual funds.'],
['Evaluation programs','How does the 1-Step evaluation work?',`The 1-Step evaluation has one phase with a ${programs.one.profitTarget} profit target, ${programs.one.dailyDrawdown} daily drawdown, ${programs.one.totalDrawdown} total drawdown and ${programs.one.profitableDays} profitable days.`],
['Evaluation programs','How does the 2-Step evaluation work?',`The 2-Step evaluation uses two ${programs.two.profitTarget.split(' + ')[0]} profit-target phases, ${programs.two.dailyDrawdown} daily drawdown, ${programs.two.totalDrawdown} total drawdown and ${programs.two.profitableDays}.`],
['Evaluation programs','Do evaluation accounts expire?',`The current fact registry lists ${programs.one.timeLimit.toLowerCase()} for both 1-Step and 2-Step evaluations.`],
['Instant-funded program','What Instant Funding options are verified?',`The currently verified public offers are ${programs.instant.sizes[0].balance} for ${programs.instant.sizes[0].fee} and ${programs.instant.sizes[1].balance} for ${programs.instant.sizes[1].fee}.`],
['Trading rules','Can I hold positions overnight or over weekends?',tradingConduct.allowed[0][1]],
['Trading rules','Is a stop-loss mandatory?',tradingConduct.allowed[1][1]],
['Trading rules','Are external trading bots or APIs allowed?','No. External API trading and third-party algorithmic bots are prohibited under the current published rules.'],
['Platform and markets','How many markets are available?',`The current public product is positioned around ${serviceFacts.markets}.`],
['Payouts','How are approved payouts settled?',`The current public model uses ${serviceFacts.settlementAsset} for approved performance-based payouts. Approval remains subject to eligibility and the applicable Terms.`],
['Account breaches','What happens after prolonged inactivity?',`The funded-stage fact registry lists disablement after ${fundedStageFacts.inactivityDisableAfter} of inactivity.`],
['KYC and restricted countries','Which locations are explicitly restricted in the current terms?',`The current restricted-location list includes ${restrictedLocations.join(', ')}, in addition to sanctions and compliance restrictions.`],
['Company and legal model','Who operates YFA?',`${organization.legalName}, registration number ${organization.registrationNumber}, in ${organization.registeredZone}, ${organization.jurisdiction}.`],
];
const schema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([,q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
const groups=[...new Set(faqs.map(x=>x[0]))];
const body=`<div class="wrap">${breadcrumbs([{name:'Home',path:'/'},{name:'FAQ',path:'/faq/'}])}</div>${pageHero({eyebrow:'FAQ',title:'Direct answers, not brand-story detours',lead:'The first sentence answers the question. Facts come from the same production-candidate registry used across the public routes.'})}<section class="section"><div class="wrap">${lastReviewed('Product, Support & Legal')}<div class="faq-categories">${groups.map(group=>`<section><h2>${group}</h2><div class="faq-list" data-faq>${faqs.filter(x=>x[0]===group).map(([,q,a])=>`<article><button aria-expanded="false">${q}<span>+</span></button><div><p>${a}</p></div></article>`).join('')}</div></section>`).join('')}</div></div></section>${ctaBand()}`;
export default {path:'/faq/',seo:meta,html:layout({seo:meta,path:'/faq/',body,schemas:[breadcrumbSchema([{name:'Home',path:'/'},{name:'FAQ',path:'/faq/'}]),schema]})};
