export const reviewedAt = '2026-08-21';
export const canonicalHost = 'https://yourfundedaccount.com';
export const legacyHost = 'https://propfunded.ai';

export const organization = {
  brandName: 'Your Funded Account',
  shortName: 'YFA',
  legalName: 'Prop Skills Tech Ltd',
  registrationNumber: '01010909',
  jurisdiction: 'United Arab Emirates',
  registeredZone: 'RAK Digital Assets Oasis',
  model: 'crypto-focused simulated trading evaluation platform',
};

export const serviceFacts = {
  maximumAccountSize: '$200K',
  markets: '350+ USDT perpetual markets',
  settlementAsset: 'USDT',
  customerDepositsAccepted: false,
  customerCapitalManaged: false,
  evaluationExpiry: 'No evaluation expiry',
};

export const programs = {
  one: {
    key: 'one',
    label: '1-Step Evaluation',
    short: 'One phase',
    profitTarget: '10%',
    dailyDrawdown: '3%',
    totalDrawdown: '6%',
    profitableDays: '3',
    timeLimit: 'No expiry',
    fee: null,
    sizes: null,
    href: '/one-step-challenge/',
  },
  two: {
    key: 'two',
    label: '2-Step Evaluation',
    short: 'Two phases',
    profitTarget: '7% + 7%',
    dailyDrawdown: '5%',
    totalDrawdown: '10%',
    profitableDays: '3 per phase',
    timeLimit: 'No expiry',
    fee: null,
    sizes: null,
    href: '/two-step-challenge/',
  },
  instant: {
    key: 'instant',
    label: 'Instant Funding',
    short: 'No evaluation phase',
    trailingDrawdown: '3%',
    totalDrawdown: '5%',
    maxMargin: '30%',
    leverage: '5×',
    sizes: [
      { balance: '$2.5K', fee: '$199' },
      { balance: '$5K', fee: '$349' },
    ],
    href: '/instant-funding/',
  },
};

export const tradingConduct = {
  allowed: [
    ['Overnight & weekend holding', 'Positions may remain open overnight and across weekends.'],
    ['No mandatory stop-loss', 'A stop-loss is not required by default; risk limits still apply.'],
    ['Normal news trading', 'Normal trading around news is permitted under the current published rules.'],
    ['Multiple positions', 'Position count is not capped separately from the applicable risk limits.'],
  ],
  prohibited: [
    ['Hedging', 'Hedging strategies are prohibited under the current published rules.'],
    ['External API trading', 'External API connections are not currently permitted.'],
    ['Third-party algorithmic bots', 'External third-party trading bots are prohibited.'],
    ['Gambling-style execution', 'Execution patterns designed around uncontrolled or abusive risk are prohibited.'],
    ['News-event exploitation', 'Using event spikes as a sole exploitative strategy is prohibited.'],
  ],
};

export const fundedStageFacts = {
  trailingDrawdown: '3%',
  totalDrawdown: '5%',
  leverage: '5×',
  maxMarginPerPair: '30%',
  inactivityDisableAfter: '30 days',
};

export const restrictedLocations = ['Russia', 'Myanmar', 'Iran', 'North Korea'];

export const externalFlows = {
  signup: `${legacyHost}/signup`,
  signin: `${legacyHost}/signin`,
  checkout: `${legacyHost}/challenges`,
  currentRules: `${legacyHost}/rules`,
  currentFaq: `${legacyHost}/faq`,
  currentTerms: `${legacyHost}/terms-and-conditions`,
  currentPrivacy: `${legacyHost}/privacy-policy`,
};

export const unresolvedFacts = [
  'Evaluation account-size matrix and current evaluation fees must come from the live pricing source.',
  'Payout eligibility threshold and first-payout timing require product confirmation before hardcoding.',
  'Headline maximum profit split requires product confirmation by account type and condition.',
  'Exact drawdown reset time/timezone and equity-formula wording require product/legal confirmation.',
  'Public support email, phone number, hours and registered street address are not approved for publication in this candidate.',
  'Public payout feed/API is not connected to this standalone candidate.',
  'Real product-platform screenshots/components were not supplied in the accessible project assets.',
];

export const forbiddenClaims = [
  /risk nothing/i,
  /get funded with real capital/i,
  /trade with our capital/i,
  /instant withdrawals/i,
  /blockchain-backed reserves/i,
  /join thousands of traders/i,
  /guaranteed payouts?/i,
  /guaranteed profitability/i,
  /live capital/i,
  /real account/i,
  /no risk/i,
];
