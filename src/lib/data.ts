// Mock data for Noice - Attention Marketplace

export interface Company {
  id: string;
  name: string;
  ticker: string;
  tagline: string;
  logo: string;
  website: string;
  twitter: string;
  category: 'ai' | 'consumer' | 'fintech' | 'saas' | 'crypto';
  token: {
    price: number;
    priceChange24h: number;
    marketCap: number;
    volume24h: number;
    holders: number;
    totalSupply: number;
  };
  marketplaceWallet: {
    balance: number; // in USDC
    tokenBalance: number; // in company tokens
  };
  metrics: {
    twitterFollowers: number;
    avgViews: number;
    avgEngagement: number;
  };
  hiredSuppliers: string[]; // supplier IDs
  priceHistory: { time: string; price: number }[];
}

export interface Supplier {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  category: SupplierCategory;
  tagline: string;
  bio: string;
  website?: string;
  twitter: string;
  rate: {
    min: number;
    max: number;
    unit: string;
  };
  timeline: string;
  portfolio: {
    title: string;
    description: string;
    link?: string;
    metrics?: string;
    image?: string;
  }[];
  clientsServed: string[]; // company IDs
  rating: number;
  reviewCount: number;
  featured: boolean;
}

export type SupplierCategory =
  | 'video-production'
  | 'podcasts'
  | 'twitter-growth'
  | 'design'
  | 'newsletters'
  | 'seo'
  | 'content-writing'
  | 'launch-strategy';

export const SUPPLIER_CATEGORIES: { id: SupplierCategory; label: string; icon: string }[] = [
  { id: 'video-production', label: 'Video Production', icon: '🎬' },
  { id: 'podcasts', label: 'Podcasts & Ad Slots', icon: '🎙️' },
  { id: 'twitter-growth', label: 'Twitter Growth', icon: '🐦' },
  { id: 'design', label: 'Design & Branding', icon: '🎨' },
  { id: 'newsletters', label: 'Newsletters', icon: '📧' },
  { id: 'seo', label: 'SEO & Content', icon: '🔍' },
  { id: 'content-writing', label: 'Ghostwriting', icon: '✍️' },
  { id: 'launch-strategy', label: 'Launch Strategy', icon: '🚀' },
];

// Generate realistic price history
function generatePriceHistory(basePrice: number, days: number = 30): { time: string; price: number }[] {
  const history: { time: string; price: number }[] = [];
  let price = basePrice * 0.3; // Start from 30% of current price

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    // Add some volatility
    const change = (Math.random() - 0.4) * 0.15; // Slight upward bias
    price = price * (1 + change);
    price = Math.max(price, basePrice * 0.1); // Floor

    history.push({
      time: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(6)),
    });
  }

  // Ensure last price matches current
  history[history.length - 1].price = basePrice;

  return history;
}

// Mock Companies
export const COMPANIES: Company[] = [
  {
    id: 'cluely',
    name: 'Cluely',
    ticker: '$CLUELY',
    tagline: 'AI that thinks with you, not for you',
    logo: '/companies/cluely.svg',
    website: 'https://cluely.com',
    twitter: '@clooly',
    category: 'ai',
    token: {
      price: 0.000847,
      priceChange24h: 12.4,
      marketCap: 847000,
      volume24h: 124500,
      holders: 2847,
      totalSupply: 1000000000,
    },
    marketplaceWallet: {
      balance: 4250,
      tokenBalance: 40000000000,
    },
    metrics: {
      twitterFollowers: 48200,
      avgViews: 125000,
      avgEngagement: 4.2,
    },
    hiredSuppliers: ['threadguy', 'wordisbonz'],
    priceHistory: generatePriceHistory(0.000847),
  },
  {
    id: 'demo-fintech',
    name: 'PayFlow',
    ticker: '$FLOW',
    tagline: 'Payments that just work',
    logo: '/companies/payflow.svg',
    website: 'https://payflow.io',
    twitter: '@payflow_io',
    category: 'fintech',
    token: {
      price: 0.001234,
      priceChange24h: -3.2,
      marketCap: 1234000,
      volume24h: 89000,
      holders: 1923,
      totalSupply: 1000000000,
    },
    marketplaceWallet: {
      balance: 2890,
      tokenBalance: 40000000000,
    },
    metrics: {
      twitterFollowers: 23400,
      avgViews: 67000,
      avgEngagement: 3.1,
    },
    hiredSuppliers: ['rahul-design'],
    priceHistory: generatePriceHistory(0.001234),
  },
];

// Mock Suppliers - Real people + expanded categories
export const SUPPLIERS: Supplier[] = [
  // Real suppliers from your list
  {
    id: 'threadguy',
    name: 'Thread Guy',
    handle: '@notthreadguy',
    avatar: '/suppliers/threadguy.jpg',
    category: 'podcasts',
    tagline: 'Podcast host & streamer with 500K+ reach',
    bio: 'Host of multiple tech podcasts with combined audience of 500K+. Offering ad slots, sponsored segments, and full episode features for startups looking to reach engaged tech audiences.',
    twitter: 'https://x.com/notthreadguy',
    rate: { min: 2000, max: 10000, unit: 'per episode' },
    timeline: '2-4 weeks',
    portfolio: [
      {
        title: 'Startup Spotlight Series',
        description: 'Featured 12 YC startups in dedicated episodes',
        metrics: '2.1M total listens',
      },
      {
        title: 'Live Twitter Spaces',
        description: 'Weekly spaces with 5K+ live listeners',
        metrics: '89K avg replay views',
      },
    ],
    clientsServed: ['cluely'],
    rating: 4.9,
    reviewCount: 23,
    featured: true,
  },
  {
    id: 'wordisbonz',
    name: 'Word is Bond',
    handle: '@wordisbonz',
    avatar: '/suppliers/wordisbonz.jpg',
    category: 'video-production',
    tagline: 'Cinematic brand films that go viral',
    bio: 'Award-winning filmmaker creating brand documentaries and launch videos. Specialized in startup storytelling that captures attention and converts viewers into believers.',
    twitter: 'https://x.com/wordisbonz',
    website: 'https://wordisbond.studio',
    rate: { min: 5000, max: 25000, unit: 'per project' },
    timeline: '3-6 weeks',
    portfolio: [
      {
        title: 'Founder Story: AI Startup',
        description: '3-min documentary style launch video',
        metrics: '1.2M views, 45K shares',
      },
      {
        title: 'Product Demo Reel',
        description: 'Fast-paced feature showcase',
        metrics: '800K views',
      },
    ],
    clientsServed: ['cluely'],
    rating: 4.8,
    reviewCount: 18,
    featured: true,
  },
  {
    id: 'rahul-design',
    name: 'Rahul Bhadoriya',
    handle: '@rahulbhadoriya',
    avatar: '/suppliers/rahul.jpg',
    category: 'design',
    tagline: 'Design systems that scale with you',
    bio: 'Design agency founder with 10+ years crafting brand identities for tech startups. From logo to full design systems, we build visual languages that resonate.',
    twitter: 'https://x.com/rahulbhadoriya',
    website: 'https://rahuldesign.co',
    rate: { min: 3000, max: 15000, unit: 'per project' },
    timeline: '2-4 weeks',
    portfolio: [
      {
        title: 'Fintech Rebrand',
        description: 'Complete visual identity overhaul',
        metrics: 'Featured in Brand New',
      },
      {
        title: 'SaaS Design System',
        description: '200+ components, dark/light modes',
        metrics: 'Adopted by 3 YC companies',
      },
    ],
    clientsServed: ['demo-fintech'],
    rating: 4.9,
    reviewCount: 31,
    featured: true,
  },
  // Newsletter creators
  {
    id: 'mfm-ads',
    name: 'My First Million',
    handle: '@maborosz',
    avatar: '/suppliers/mfm.jpg',
    category: 'newsletters',
    tagline: '1.5M subscribers, 45% open rate',
    bio: 'One of the largest business newsletters with highly engaged audience of entrepreneurs, founders, and operators. Premium ad placements and dedicated sends available.',
    twitter: 'https://x.com/maborosz',
    rate: { min: 8000, max: 30000, unit: 'per placement' },
    timeline: '1-2 weeks',
    portfolio: [
      {
        title: 'Sponsor Spotlight',
        description: 'Dedicated paragraph in main newsletter',
        metrics: '500K+ impressions per send',
      },
    ],
    clientsServed: [],
    rating: 4.7,
    reviewCount: 45,
    featured: true,
  },
  {
    id: 'lenny',
    name: "Lenny's Newsletter",
    handle: '@lennysan',
    avatar: '/suppliers/lenny.jpg',
    category: 'newsletters',
    tagline: 'The PM newsletter with 700K readers',
    bio: "Lenny's Newsletter is the #1 product management newsletter. Reach PMs, founders, and operators at top tech companies. Extremely high-intent B2B audience.",
    twitter: 'https://x.com/lennysan',
    rate: { min: 15000, max: 40000, unit: 'per placement' },
    timeline: '2-4 weeks',
    portfolio: [
      {
        title: 'Primary Sponsor Slot',
        description: 'Top placement in weekly newsletter',
        metrics: '700K subscribers, 52% open rate',
      },
    ],
    clientsServed: [],
    rating: 4.9,
    reviewCount: 28,
    featured: true,
  },
  // Twitter Growth
  {
    id: 'twitter-maven',
    name: 'Growth Maven',
    handle: '@growthmaven',
    avatar: '/suppliers/maven.jpg',
    category: 'twitter-growth',
    tagline: '0 to 100K followers in 90 days',
    bio: 'Twitter growth strategist who has helped 50+ founders build audiences. Includes content strategy, ghostwriting, engagement pods, and viral thread frameworks.',
    twitter: 'https://x.com/growthmaven',
    rate: { min: 2500, max: 8000, unit: 'per month' },
    timeline: 'Ongoing',
    portfolio: [
      {
        title: 'Founder Account Growth',
        description: 'Took founder from 2K to 120K in 4 months',
        metrics: '15M impressions/month',
      },
      {
        title: 'Viral Thread Package',
        description: '4 threads/month with engagement strategy',
        metrics: '89% hit 1M+ impressions',
      },
    ],
    clientsServed: [],
    rating: 4.6,
    reviewCount: 52,
    featured: false,
  },
  // SEO
  {
    id: 'seo-wizard',
    name: 'Search Wizard',
    handle: '@seowizard',
    avatar: '/suppliers/seo.jpg',
    category: 'seo',
    tagline: 'Page 1 or you don\'t pay',
    bio: 'SEO agency specializing in startups. We do technical SEO, content strategy, and link building. Track record of 10x organic traffic growth.',
    twitter: 'https://x.com/seowizard',
    rate: { min: 4000, max: 12000, unit: 'per month' },
    timeline: '3-6 months',
    portfolio: [
      {
        title: 'SaaS SEO Overhaul',
        description: 'Complete technical + content strategy',
        metrics: '10x organic traffic in 6 months',
      },
    ],
    clientsServed: [],
    rating: 4.5,
    reviewCount: 19,
    featured: false,
  },
  // Launch Strategy
  {
    id: 'launch-pro',
    name: 'Launch Pro',
    handle: '@launchpro',
    avatar: '/suppliers/launch.jpg',
    category: 'launch-strategy',
    tagline: '#1 on Product Hunt, guaranteed',
    bio: 'Launch strategist with 15 #1 Product Hunt launches. Full service from pre-launch community building to launch day coordination to post-launch momentum.',
    twitter: 'https://x.com/launchpro',
    rate: { min: 5000, max: 20000, unit: 'per launch' },
    timeline: '4-8 weeks',
    portfolio: [
      {
        title: 'AI Tool Launch',
        description: '#1 Product of the Day + Week',
        metrics: '5K signups day 1',
      },
      {
        title: 'Developer Tool Launch',
        description: 'Coordinated PH + HN + Twitter',
        metrics: '12K GitHub stars week 1',
      },
    ],
    clientsServed: [],
    rating: 4.8,
    reviewCount: 24,
    featured: false,
  },
  // Ghostwriting
  {
    id: 'ghost-pen',
    name: 'Ghost Pen',
    handle: '@ghostpen',
    avatar: '/suppliers/ghost.jpg',
    category: 'content-writing',
    tagline: 'Your voice, amplified 10x',
    bio: 'Executive ghostwriter for tech founders. We capture your voice and ideas, then craft compelling threads, articles, and thought leadership content.',
    twitter: 'https://x.com/ghostpen',
    rate: { min: 1500, max: 5000, unit: 'per month' },
    timeline: 'Ongoing',
    portfolio: [
      {
        title: 'Founder Thought Leadership',
        description: '8 threads + 2 long-form pieces/month',
        metrics: 'Avg 500K impressions/month',
      },
    ],
    clientsServed: [],
    rating: 4.7,
    reviewCount: 37,
    featured: false,
  },
  // Video clips
  {
    id: 'clip-master',
    name: 'Clip Master',
    handle: '@clipmaster',
    avatar: '/suppliers/clips.jpg',
    category: 'video-production',
    tagline: 'Turn long-form into viral clips',
    bio: 'We take your podcasts, demos, and talks and turn them into scroll-stopping short-form content optimized for Twitter, TikTok, and Instagram.',
    twitter: 'https://x.com/clipmaster',
    rate: { min: 500, max: 2000, unit: 'per batch of 10' },
    timeline: '3-5 days',
    portfolio: [
      {
        title: 'Podcast Clip Package',
        description: '20 clips from single episode',
        metrics: 'Avg 100K views per clip',
      },
    ],
    clientsServed: [],
    rating: 4.6,
    reviewCount: 67,
    featured: false,
  },
];

// Platform stats (for landing page)
export const PLATFORM_STATS = {
  totalVolume: 12847000,
  totalCompanies: 47,
  totalSuppliers: 156,
  avgDayOneEarnings: 2400,
};

// Tagline candidates for homepage
export const TAGLINES = {
  primary: "Speculation is the new distribution",
  secondary: "Launch a coin. Earn from trades. Spend on growth.",
  cta: "Turn attention into action",
  hero: "Your startup's new growth engine",
};

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
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
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
