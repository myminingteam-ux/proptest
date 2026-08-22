export const reviewedAt = '2026-08-22';
export const canonicalHost = 'https://yourfundedaccount.com';
export const legacyHost = 'https://propfunded.ai';

export const organization = {
  brandName: 'Your Funded Account', shortName: 'YFA', legalName: 'Prop Skills Tech Ltd',
  registrationNumber: '01010909', jurisdiction: 'United Arab Emirates',
  registeredZone: 'RAK Digital Assets Oasis Dubai', model: 'crypto-focused simulated trading evaluation platform',
  supportEmail: 'contact@propfunded.ai',
};

export const serviceFacts = {
  maximumAccountSize: '$200K', markets: 'roughly 350 USDT perpetual futures pairs', settlementAsset: 'USDT',
  customerDepositsAccepted: false, customerCapitalManaged: false, evaluationExpiry: 'No evaluation expiry',
  fundedActivation: '2 to 24 hours after successful evaluation completion',
  defaultPlatformLeverage: '5×, adjustable on the platform', mobileApps: 'iOS and Android',
  makerFee: '0.0200%', takerFee: '0.0500%', usdcPairsSupported: false, currentAssetCoverage: 'Crypto and commodities',
};

export const evaluationRules = {
  profitableDayDefinition: 'At least one closed position and at least 1% profit of the starting balance on that distinct trading day.',
  closePositionsAtTarget: true, dailyReset: 'UTC', drawdownIncludes: 'Equity, floating P/L and fees', challengeFeeRefundable: false,
};

export const programs = {
  one: {key:'one',label:'1-Step Evaluation',short:'One phase',profitTarget:'10%',dailyDrawdown:'3%',totalDrawdown:'6%',profitableDays:'3',timeLimit:'No expiry',fee:null,sizes:null,href:'/one-step-challenge/'},
  two: {key:'two',label:'2-Step Evaluation',short:'Two phases',profitTarget:'7% + 7%',dailyDrawdown:'5%',totalDrawdown:'10%',profitableDays:'3 per phase',timeLimit:'No expiry',fee:null,sizes:null,href:'/two-step-challenge/'},
  instant: {key:'instant',label:'Instant Funding',short:'No evaluation phase',trailingDrawdown:'3%',totalDrawdown:'5%',maxMargin:'30% per pair',leverage:'5×',standardSplit:'60%',boostedSplit:'80%',firstWithdrawal:'Day 1 after reaching $50 profit',minimumWithdrawal:'$50',withdrawalCycle:'7 days after each withdrawal request',withdrawalFee:'No withdrawal fee',monthlyFee:'No monthly fee',refundable:false,sizes:[{balance:'$2.5K',fee:'$199'},{balance:'$5K',fee:'$349'}],href:'/instant-funding/'},
};

export const fundedStageFacts = {
  withdrawalUnlock:'$50 profit', firstPayout:'Day 1 after reaching the profit unlock', withdrawalCycle:'7 days after each withdrawal request',
  minimumWithdrawal:'$50', payoutAsset:'USDT', payoutProcessing:'Public FAQ states within 24 hours; Terms reserve the right to delay, adjust or deny after review.',
  maxTraderSplit:'Up to 80%', trailingDrawdown:'3%', totalDrawdown:'5%', leverage:'5×', maxMarginPerPair:'30%', profitableDays:'None',
  inactivityDisableAfter:'30 consecutive days with no closed trades',
};

export const tradingConduct = {
  allowed: [
    ['Overnight & weekend holding','Positions may remain open overnight and across weekends.'],
    ['Unlimited positions','Position count is not capped separately as long as all risk rules are respected.'],
    ['No mandatory stop-loss','A stop-loss is not required by default; risk limits still apply.'],
    ['Normal news trading','Trading during news is allowed, but a strategy based solely on news-event exploitation is prohibited.'],
  ],
  prohibited: [
    ['Hedging','Hedging is not allowed.'],['External API trading','External API integrations are not allowed.'],
    ['Third-party algorithmic bots','Algorithmic trading through third-party bots, automated systems or expert advisors is not allowed.'],
    ['Gambling-style execution','All-or-nothing or gambling-style execution is prohibited.'],
    ['News-event exploitation','A strategy built solely around news-event exploitation is prohibited.'],
    ['System or market abuse','System-error exploitation, latency arbitrage, price manipulation and other abusive behavior may invalidate profits or accounts.'],
    ['Cross-account manipulation','Copy trading or multi-account behavior used to manipulate performance or circumvent rules is prohibited.'],
  ],
};

export const platformFacts = {
  provider:'CLEO', environment:'Simulated liquidity and order-book depth', markets:'Roughly 350 USDT perpetual futures pairs',
  cryptoAndCommodities:true, usdcPairs:false, makerFee:'0.0200%', takerFee:'0.0500%', slippagePossible:true,
  mobileApps:['iOS','Android'], builtInTools:['Stop-loss','Take-profit','Quantity calculation'], externalApiAllowed:false, thirdPartyBotsAllowed:false,
  mt4mt5:'Planned for the future',
};

export const restrictedLocations = ['Russia','Myanmar','Iran','North Korea'];
export const otherEligibilityRestrictions = ['Sanctioned individuals','Financial-crime cases','Company trusts','Previously banned users'];

export const externalFlows = {
  signup:`${legacyHost}/signup`, signin:`${legacyHost}/signin`, checkout:`${legacyHost}/challenges`, currentRules:`${legacyHost}/rules`,
  currentFaq:`${legacyHost}/faq`, currentTerms:`${legacyHost}/terms-and-conditions`, currentPrivacy:`${legacyHost}/privacy-policy`, currentWithdrawals:`${legacyHost}/withdrawals`,
};

export const sourceConflictNotes = ['PropFunded Rules lists funded payout eligibility at $50 profit and day-1 first payout. One FAQ subsection still says 4% of initial balance. YFA follows the dedicated Rules page operationally while Terms remain the legal authority.'];
export const unresolvedFacts = ['Current 1-Step and 2-Step evaluation account-size and fee matrices must continue to come from the live checkout source.','The public payout feed/API is not connected to this standalone frontend.'];
export const forbiddenClaims = [/risk nothing/i,/get funded with real capital/i,/trade with our capital/i,/blockchain-backed reserves/i,/join thousands of traders/i,/guaranteed payouts?/i,/guaranteed profitability/i,/live capital/i,/real account/i,/no risk/i];
