import { seo, breadcrumbSchema } from '../seo.mjs';
import { layout,pageHero,lastReviewed,breadcrumbs,ctaBand } from '../components.mjs';
import { organization,programs,serviceFacts,tradingConduct,restrictedLocations,fundedStageFacts,evaluationRules,platformFacts,otherEligibilityRestrictions } from '../site-facts.mjs';
const meta=seo({title:'YFA FAQ | Evaluations, Rules, Payouts & Platform',description:'Current PropFunded-aligned answers about simulated trading, 1-Step and 2-Step evaluations, Instant Funding, profitable days, drawdown, payouts, CLEO, fees, KYC and restrictions.',path:'/faq/'});
const faqs=[
['Model','What is Your Funded Account?',`${organization.brandName} is the new consumer-facing brand for the crypto-focused simulated trading evaluation service operated by ${organization.legalName}. Accounts use virtual funds and do not interact with real financial markets.`],
['Model','Are the accounts live-capital accounts?','No. The current Terms define Challenges as simulated trading using virtual funds. Evaluation and funded accounts operate in a demo environment with simulated liquidity.'],
['Evaluations','How does the 1-Step evaluation work?',`One phase: ${programs.one.profitTarget} target, ${programs.one.dailyDrawdown} daily drawdown, ${programs.one.totalDrawdown} total drawdown and ${programs.one.profitableDays} qualifying profitable days.`],
['Evaluations','How does the 2-Step evaluation work?',`Two phases, each with a 7% target, plus ${programs.two.dailyDrawdown} daily drawdown, ${programs.two.totalDrawdown} total drawdown and ${programs.two.profitableDays}.`],
['Evaluations','What counts as a profitable day?',evaluationRules.profitableDayDefinition],
['Evaluations','Do evaluations expire?',`No. ${serviceFacts.evaluationExpiry}.`],
['Evaluations','What happens when I hit the target?','All positions must be closed. After successful completion, the current FAQ states funded-account activation takes 2 to 24 hours. Do not trade during the review period.'],
['Evaluations','Are Challenge fees refundable?','No. Challenge fees are non-refundable, including after a successful evaluation.'],
['Instant Funding','What Instant Funding options are listed?',`$2.5K for $199 and $5K for $349. Access begins immediately after payment; there is no evaluation phase and no monthly fee.`],
['Instant Funding','When can I request the first Instant Funding payout?','Day 1 after reaching $50 profit. The minimum withdrawal is $50, there is no withdrawal fee, and the next window starts on a 7-day cycle after each request.'],
['Instant Funding','What is the Instant Funding profit split?',`The standard split is ${programs.instant.standardSplit}. The current PropFunded FAQ allows a boost to ${programs.instant.boostedSplit} for a withdrawal after sharing the approved withdrawal certificate publicly and submitting the post link for admin verification.`],
['Risk rules','How are evaluation drawdowns calculated?',`Daily limits reset at ${evaluationRules.dailyReset}. ${evaluationRules.drawdownIncludes} count toward daily and total drawdown.`],
['Risk rules','Can I hold positions overnight or over weekends?',tradingConduct.allowed[0][1]],
['Risk rules','Is a stop-loss mandatory?',tradingConduct.allowed[2][1]],
['Risk rules','Are APIs or third-party bots allowed?','No. External API integrations and third-party algorithmic bots are prohibited.'],
['Risk rules','What happens after 30 days of inactivity?',`If there are ${fundedStageFacts.inactivityDisableAfter}, the account is disabled.`],
['Payouts','When does funded-stage payout eligibility begin?',`The dedicated PropFunded Rules page currently lists ${fundedStageFacts.withdrawalUnlock}, with the first request available on day 1 after reaching that unlock.`],
['Payouts','How are approved payouts settled?',`${fundedStageFacts.payoutAsset}. The public FAQ states processing within 24 hours; the Terms preserve compliance, verification and internal-review discretion.`],
['Platform','Which platform is used?',`${platformFacts.provider}. The current FAQ describes simulated liquidity/order-book depth across ${platformFacts.markets.toLowerCase()}.`],
['Platform','What are the trading fees?',`Maker fee ${platformFacts.makerFee}; taker fee ${platformFacts.takerFee}. Slight variations can occur because of slippage.`],
['Platform','Are mobile apps available?',`Yes. ${platformFacts.mobileApps.join(' and ')} apps are currently listed. Built-in tools include ${platformFacts.builtInTools.join(', ').toLowerCase()}.`],
['Eligibility','Which countries are explicitly restricted?',`${restrictedLocations.join(', ')}, plus sanctions and compliance restrictions.`],
['Eligibility','Are there other eligibility restrictions?',`${otherEligibilityRestrictions.join(', ')} are also listed in the current public FAQ/Terms context.`],
['Eligibility','Can KYC be requested?','Yes. The Terms allow KYC to be requested at account creation, during a Challenge, or before processing payouts.'],
['Company','Who operates YFA?',`${organization.legalName}, Reg. No. ${organization.registrationNumber}, ${organization.registeredZone}, ${organization.jurisdiction}. Public legal contact: ${organization.supportEmail}.`],
];
const schema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(([,q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
const groups=[...new Set(faqs.map(x=>x[0]))];
const body=`<div class="wrap">${breadcrumbs([{name:'Home',path:'/'},{name:'FAQ',path:'/faq/'}])}</div>${pageHero({eyebrow:'FAQ',title:'The current rules, in plain language',lead:'Answers are aligned to the live PropFunded Rules, FAQ and Terms. The Terms remain the legal authority.'})}<section class="section"><div class="wrap">${lastReviewed('Product, Support & Legal')}<div class="faq-categories">${groups.map(group=>`<section><h2>${group}</h2><div class="faq-list" data-faq>${faqs.filter(x=>x[0]===group).map(([,q,a])=>`<article><button aria-expanded="false">${q}<span>+</span></button><div><p>${a}</p></div></article>`).join('')}</div></section>`).join('')}</div></div></section>${ctaBand()}`;
export default {path:'/faq/',seo:meta,html:layout({seo:meta,path:'/faq/',body,schemas:[breadcrumbSchema([{name:'Home',path:'/'},{name:'FAQ',path:'/faq/'}]),schema]})};
