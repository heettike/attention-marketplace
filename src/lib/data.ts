// noice - attention marketplace data

export interface Company {
  id: string;
  name: string;
  ticker: string;
  tagline: string;
  website: string;
  twitter: string;
  category: 'ai' | 'consumer' | 'fintech' | 'saas' | 'crypto';
  funding?: {
    raised: string;
    investors: string[];
  };
  token: {
    price: number;
    priceChange24h: number;
    marketCap: number;
    volume24h: number;
    holders: number;
  };
  growthWallet: {
    usdc: number;
    tokens: number;
  };
  metrics: {
    followers: number;
    avgViews: number;
    totalImpressions: number;
  };
  viralContent: {
    url: string;
    views: number;
    type: 'twitter' | 'youtube' | 'tiktok';
  }[];
  results: {
    metric: string;
    before: string;
    after: string;
    supplier?: string;
  }[];
  hiredSuppliers: string[];
  priceHistory: { time: string; price: number }[];
}

export interface Supplier {
  id: string;
  name: string;
  handle: string;
  category: SupplierCategory;
  tagline: string;
  bio: string;
  twitter: string;
  website?: string;
  price: number;
  priceUnit: string;
  deliverables: string[];
  results: {
    metric: string;
    value: string;
  }[];
  portfolio: {
    title: string;
    link?: string;
    metrics: string;
  }[];
  clientsServed: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  rate: {
    min: number;
    max: number;
  };
}

export type SupplierCategory =
  | 'kols'
  | 'market-makers'
  | 'trenching'
  | 'video'
  | 'podcasts'
  | 'twitter-growth'
  | 'design'
  | 'newsletters'
  | 'ghostwriting'
  | 'launch';

export const SUPPLIER_CATEGORIES: { id: SupplierCategory; label: string; icon: string }[] = [
  { id: 'kols', label: 'kols', icon: '📢' },
  { id: 'market-makers', label: 'market makers', icon: '📊' },
  { id: 'trenching', label: 'trenching groups', icon: '⛏️' },
  { id: 'video', label: 'video', icon: '🎬' },
  { id: 'podcasts', label: 'podcasts', icon: '🎙️' },
  { id: 'twitter-growth', label: 'twitter growth', icon: '🐦' },
  { id: 'newsletters', label: 'newsletters', icon: '📧' },
  { id: 'ghostwriting', label: 'ghostwriting', icon: '✍️' },
  { id: 'design', label: 'design', icon: '🎨' },
  { id: 'launch', label: 'launch strategy', icon: '🚀' },
];

function generatePriceHistory(basePrice: number, days: number = 30): { time: string; price: number }[] {
  const history: { time: string; price: number }[] = [];
  let price = basePrice * 0.3;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const change = (Math.random() - 0.4) * 0.15;
    price = price * (1 + change);
    price = Math.max(price, basePrice * 0.1);
    history.push({
      time: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(6)),
    });
  }
  history[history.length - 1].price = basePrice;
  return history;
}

export const COMPANIES: Company[] = [
  {
    id: 'cluely',
    name: 'cluely',
    ticker: '$cluely',
    tagline: 'ai that thinks with you, not for you',
    website: 'https://cluely.com',
    twitter: '@clulooy',
    category: 'ai',
    funding: {
      raised: '$5.6m',
      investors: ['a16z', 'abstract ventures', 'gigafund'],
    },
    token: {
      price: 0.000847,
      priceChange24h: 12.4,
      marketCap: 847000,
      volume24h: 124500,
      holders: 2847,
    },
    growthWallet: {
      usdc: 4250,
      tokens: 40000000000,
    },
    metrics: {
      followers: 48200,
      avgViews: 125000,
      totalImpressions: 15400000,
    },
    viralContent: [
      { url: 'https://x.com/cluely/status/1234567890', views: 2100000, type: 'twitter' },
      { url: 'https://x.com/cluely/status/1234567891', views: 890000, type: 'twitter' },
      { url: 'https://x.com/cluely/status/1234567892', views: 650000, type: 'twitter' },
    ],
    results: [
      { metric: 'twitter followers', before: '12k', after: '48k', supplier: 'wordisbonz' },
      { metric: 'avg post views', before: '15k', after: '125k', supplier: 'threadguy' },
      { metric: 'daily signups', before: '45', after: '340' },
    ],
    hiredSuppliers: ['threadguy', 'wordisbonz', 'vnc'],
    priceHistory: generatePriceHistory(0.000847),
  },
];

export const SUPPLIERS: Supplier[] = [
  // kols
  {
    id: 'ansem',
    name: 'ansem',
    handle: '@blknoiz06',
    category: 'kols',
    tagline: '2.1m followers, avg 500k views per post',
    bio: 'one of the largest crypto kols. posts drive significant volume and attention.',
    twitter: 'https://x.com/blknoiz06',
    price: 15000,
    priceUnit: 'per post',
    deliverables: ['1 twitter post', '24hr pin', 'engagement reply thread'],
    results: [
      { metric: 'avg views', value: '500k+' },
      { metric: 'avg volume spike', value: '3-5x' },
    ],
    portfolio: [
      { title: '$wif call', link: 'https://x.com/blknoiz06/status/xxx', metrics: '12m views, 40x pump' },
    ],
    clientsServed: [],
    featured: true,
    rating: 4.9,
    reviewCount: 127,
    rate: { min: 15000, max: 25000 },
  },
  {
    id: 'cobie',
    name: 'cobie',
    handle: '@coaborosz',
    category: 'kols',
    tagline: '800k followers, high signal account',
    bio: 'og crypto twitter. selective posts but massive impact when he does.',
    twitter: 'https://x.com/coabolosz',
    price: 25000,
    priceUnit: 'per mention',
    deliverables: ['organic mention', 'spaces appearance'],
    results: [
      { metric: 'credibility boost', value: 'massive' },
      { metric: 'holder quality', value: 'high conviction' },
    ],
    portfolio: [],
    clientsServed: [],
    featured: true,
    rating: 4.8,
    reviewCount: 43,
    rate: { min: 25000, max: 50000 },
  },

  // market makers
  {
    id: 'wintermute',
    name: 'wintermute',
    handle: '@wintermute_t',
    category: 'market-makers',
    tagline: 'top tier mm, $50b+ daily volume',
    bio: 'leading algorithmic market maker. provides deep liquidity and tight spreads.',
    twitter: 'https://x.com/wintermute_t',
    website: 'https://wintermute.com',
    price: 50000,
    priceUnit: 'setup + monthly',
    deliverables: ['liquidity provision', '24/7 market making', 'cex/dex coverage'],
    results: [
      { metric: 'spread reduction', value: '80%+' },
      { metric: 'volume increase', value: '10x+' },
    ],
    portfolio: [],
    clientsServed: [],
    featured: true,
    rating: 4.9,
    reviewCount: 89,
    rate: { min: 50000, max: 150000 },
  },
  {
    id: 'gsr',
    name: 'gsr',
    handle: '@gaborosz',
    category: 'market-makers',
    tagline: 'institutional grade mm since 2013',
    bio: 'one of the oldest crypto market makers. deep relationships with major cexs.',
    twitter: 'https://x.com/GSR_io',
    website: 'https://gsr.io',
    price: 75000,
    priceUnit: 'setup + monthly',
    deliverables: ['multi-venue mm', 'otc desk access', 'treasury management'],
    results: [
      { metric: 'cex listings', value: '5+ major' },
      { metric: 'liquidity depth', value: '$10m+' },
    ],
    portfolio: [],
    clientsServed: [],
    featured: false,
    rating: 4.7,
    reviewCount: 52,
    rate: { min: 75000, max: 200000 },
  },

  // trenching groups
  {
    id: 'vnc',
    name: 'vnc',
    handle: '@vnctrench',
    category: 'trenching',
    tagline: 'elite trenching group, 500+ members',
    bio: 'coordinated buying group with track record of 10x+ runners. early entry, diamond hands.',
    twitter: 'https://x.com/vnctrench',
    price: 5000,
    priceUnit: 'per campaign',
    deliverables: ['coordinated entry', 'social signal boost', 'hold commitment'],
    results: [
      { metric: 'avg entry mcap', value: '<$500k' },
      { metric: 'success rate', value: '70%+' },
    ],
    portfolio: [
      { title: '$bonk early', metrics: '150x from call' },
      { title: '$wif early', metrics: '80x from call' },
    ],
    clientsServed: ['cluely'],
    featured: true,
    rating: 4.6,
    reviewCount: 234,
    rate: { min: 5000, max: 15000 },
  },
  {
    id: 'tnc',
    name: 'tnc',
    handle: '@tncalpha',
    category: 'trenching',
    tagline: 'degen collective, fast movers',
    bio: 'known for catching early narratives. aggressive entry, quick exits on winners.',
    twitter: 'https://x.com/tncalpha',
    price: 3000,
    priceUnit: 'per campaign',
    deliverables: ['alpha leak', 'entry coordination', 'ct buzz'],
    results: [
      { metric: 'avg flip', value: '3-5x' },
      { metric: 'turnaround', value: '24-48hrs' },
    ],
    portfolio: [],
    clientsServed: [],
    featured: false,
    rating: 4.4,
    reviewCount: 156,
    rate: { min: 3000, max: 8000 },
  },
  {
    id: 'sailboat',
    name: 'sailboat',
    handle: '@sailboatcap',
    category: 'trenching',
    tagline: 'whale group, patient capital',
    bio: 'high conviction plays only. larger bags, longer holds. quality over quantity.',
    twitter: 'https://x.com/sailboatcap',
    price: 10000,
    priceUnit: 'per campaign',
    deliverables: ['whale accumulation', 'holder base building', 'long term support'],
    results: [
      { metric: 'avg hold time', value: '30+ days' },
      { metric: 'floor support', value: 'strong' },
    ],
    portfolio: [],
    clientsServed: [],
    featured: false,
    rating: 4.5,
    reviewCount: 78,
    rate: { min: 10000, max: 25000 },
  },

  // video
  {
    id: 'wordisbonz',
    name: 'word is bond',
    handle: '@wordisbonz',
    category: 'video',
    tagline: 'cinematic brand films, 10m+ total views',
    bio: 'documentary-style startup videos that tell your story and go viral.',
    twitter: 'https://x.com/wordisbonz',
    website: 'https://wordisbond.studio',
    price: 8000,
    priceUnit: 'per video',
    deliverables: ['3-5 min brand film', 'social cuts', 'raw footage'],
    results: [
      { metric: 'avg views', value: '800k+' },
      { metric: 'share rate', value: '12%' },
    ],
    portfolio: [
      { title: 'cluely launch film', link: 'https://x.com/cluely/status/xxx', metrics: '2.1m views' },
    ],
    clientsServed: ['cluely'],
    featured: true,
    rating: 4.9,
    reviewCount: 67,
    rate: { min: 8000, max: 20000 },
  },

  // podcasts
  {
    id: 'threadguy',
    name: 'thread guy',
    handle: '@notthreadguy',
    category: 'podcasts',
    tagline: 'tech podcast, 500k+ reach per episode',
    bio: 'weekly tech podcast with engaged founder audience. ad slots and full episodes available.',
    twitter: 'https://x.com/notthreadguy',
    price: 3500,
    priceUnit: 'per episode',
    deliverables: ['60sec ad read', 'show notes mention', 'social clip'],
    results: [
      { metric: 'avg listens', value: '150k' },
      { metric: 'conversion rate', value: '2.4%' },
    ],
    portfolio: [
      { title: 'cluely feature ep', metrics: '340k listens, 8k signups' },
    ],
    clientsServed: ['cluely'],
    featured: true,
    rating: 4.8,
    reviewCount: 112,
    rate: { min: 3500, max: 10000 },
  },

  // newsletters
  {
    id: 'mfm',
    name: 'my first million',
    handle: '@theSamParr',
    category: 'newsletters',
    tagline: '1.5m subs, 45% open rate',
    bio: 'largest business newsletter. reaches founders, operators, and builders.',
    twitter: 'https://x.com/theSamParr',
    price: 12000,
    priceUnit: 'per placement',
    deliverables: ['primary sponsor slot', '150 word copy', 'cta button'],
    results: [
      { metric: 'impressions', value: '600k+' },
      { metric: 'avg clicks', value: '15k' },
    ],
    portfolio: [],
    clientsServed: [],
    featured: true,
    rating: 4.7,
    reviewCount: 89,
    rate: { min: 12000, max: 25000 },
  },

  // twitter growth
  {
    id: 'growthdan',
    name: 'growth dan',
    handle: '@growth_dan',
    category: 'twitter-growth',
    tagline: '0 to 100k in 90 days, guaranteed',
    bio: 'twitter growth specialist. content strategy, ghostwriting, and engagement optimization.',
    twitter: 'https://x.com/growth_dan',
    price: 4000,
    priceUnit: 'per month',
    deliverables: ['4 threads/week', 'daily engagement', 'analytics report'],
    results: [
      { metric: 'avg growth', value: '+25k/month' },
      { metric: 'engagement rate', value: '8%+' },
    ],
    portfolio: [],
    clientsServed: [],
    featured: false,
    rating: 4.6,
    reviewCount: 203,
    rate: { min: 4000, max: 8000 },
  },

  // ghostwriting
  {
    id: 'ghostpen',
    name: 'ghost pen',
    handle: '@ghostpen_',
    category: 'ghostwriting',
    tagline: 'founder voice, 10x amplified',
    bio: 'executive ghostwriter for tech founders. threads, articles, thought leadership.',
    twitter: 'https://x.com/ghostpen_',
    price: 2500,
    priceUnit: 'per month',
    deliverables: ['8 threads', '2 long-form', 'editing'],
    results: [
      { metric: 'avg impressions', value: '500k/month' },
      { metric: 'viral rate', value: '1 in 4' },
    ],
    portfolio: [],
    clientsServed: [],
    featured: false,
    rating: 4.5,
    reviewCount: 145,
    rate: { min: 2500, max: 5000 },
  },

  // design
  {
    id: 'rahul',
    name: 'rahul bhadoriya',
    handle: '@rahulbhadoriya',
    category: 'design',
    tagline: 'brand systems for startups',
    bio: 'design agency for yc and a16z companies. logo to full design systems.',
    twitter: 'https://x.com/rahulbhadoriya',
    website: 'https://rahuldesign.co',
    price: 5000,
    priceUnit: 'per project',
    deliverables: ['brand identity', 'design system', 'social templates'],
    results: [
      { metric: 'clients', value: '40+ startups' },
      { metric: 'featured', value: 'brand new, awwwards' },
    ],
    portfolio: [],
    clientsServed: [],
    featured: false,
    rating: 4.8,
    reviewCount: 56,
    rate: { min: 5000, max: 15000 },
  },

  // launch
  {
    id: 'launchpro',
    name: 'launch pro',
    handle: '@launchpro_',
    category: 'launch',
    tagline: '#1 product hunt, guaranteed',
    bio: '15 #1 launches. full service from community building to launch day coordination.',
    twitter: 'https://x.com/launchpro_',
    price: 8000,
    priceUnit: 'per launch',
    deliverables: ['ph optimization', 'launch day support', 'hunter outreach'],
    results: [
      { metric: 'success rate', value: '93%' },
      { metric: 'avg upvotes', value: '1200+' },
    ],
    portfolio: [],
    clientsServed: [],
    featured: false,
    rating: 4.7,
    reviewCount: 34,
    rate: { min: 8000, max: 15000 },
  },
];

// platform stats
export const PLATFORM_STATS = {
  totalVolume: 12847000,
  totalCompanies: 47,
  totalSuppliers: 156,
  avgDayOneEarnings: 2400,
};

// disclaimer
export const DISCLAIMER = `attention coins are not securities. they do not represent ownership, equity, or any claim to profits or assets. they are purely a mechanism for communities to signal attention and support for projects. trading involves risk. only spend what you can afford to lose.`;

export function getCompanyById(id: string): Company | undefined {
  return COMPANIES.find((c) => c.id === id);
}

export function getSupplierById(id: string): Supplier | undefined {
  return SUPPLIERS.find((s) => s.id === id);
}

export function getSuppliersByCategory(category: SupplierCategory): Supplier[] {
  return SUPPLIERS.filter((s) => s.category === category);
}

export function getFeaturedSuppliers(): Supplier[] {
  return SUPPLIERS.filter((s) => s.featured);
}

export function formatPrice(price: number): string {
  if (price < 0.0001) return price.toExponential(2);
  if (price < 0.01) return price.toFixed(6);
  if (price < 1) return price.toFixed(4);
  return price.toFixed(2);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}m`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
  return num.toString();
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

// recommend suppliers based on wallet balance
export function getRecommendedStrategy(walletBalance: number): { suppliers: Supplier[]; message: string } {
  if (walletBalance < 1000) {
    return {
      suppliers: SUPPLIERS.filter(s => s.price <= 1000).slice(0, 3),
      message: 'start with organic growth',
    };
  }
  if (walletBalance < 5000) {
    return {
      suppliers: SUPPLIERS.filter(s => s.category === 'twitter-growth' || s.category === 'ghostwriting').slice(0, 3),
      message: 'focus on twitter presence',
    };
  }
  if (walletBalance < 15000) {
    return {
      suppliers: SUPPLIERS.filter(s => s.category === 'kols' || s.category === 'trenching').slice(0, 3),
      message: 'time for kol push + trenching',
    };
  }
  return {
    suppliers: SUPPLIERS.filter(s => s.category === 'market-makers' || s.featured).slice(0, 3),
    message: 'ready for market maker + major kols',
  };
}
