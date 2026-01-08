# Noice - Attention Marketplace

> Speculation is the new distribution

Noice is a token launchpad + attention marketplace for startups. Launch a token, earn from every trade, and spend your earnings exclusively on vetted growth talent.

## The Loop

```
STARTUP LAUNCHES TOKEN
       ↓
50% retail · 40% marketplace wallet · 10% team
       ↓
SPECULATORS TRADE (attention = free marketing)
       ↓
2% TAX → 1.6% founder · 0.4% noice
       ↓
FOUNDERS SPEND TAX ON A++ SUPPLIERS
       ↓
MORE DISTRIBUTION → MORE SPECULATION → MORE TAX
       ↓
♻️ FLYWHEEL
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Design**: Liquid Glass aesthetic (iOS 26 inspired)
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Chain**: Base (contracts ready)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── launch/page.tsx       # Token launch wizard
│   ├── marketplace/page.tsx  # Supplier marketplace
│   ├── company/[id]/page.tsx # Company profile page
│   └── supplier/[id]/page.tsx # Supplier profile page
├── components/
│   ├── ui/                   # shadcn + custom components
│   └── layout/               # Navbar, etc.
└── lib/
    ├── data.ts               # Mock data & helpers
    └── utils.ts              # Utility functions
```

## Design System

### Colors
- **Accent Warm**: `#FEEFC7` (primary brand color)
- **Accent Warm Hover**: `#FEDD89`
- **Background**: `#050506` (dark mode only)
- **Glass**: `rgba(255, 255, 255, 0.03)` with 20px blur

### Components
- `GlassCard` - Frosted glass panels with hover effects
- `StatCard` - Big number display cards
- `PriceChart` - Interactive price charts
- `MiniChart` - Sparkline charts for compact display

## Suppliers (V0.1)

Initial supplier categories:
- Video Production
- Podcasts & Ad Slots
- Twitter Growth
- Design & Branding
- Newsletters
- SEO & Content
- Ghostwriting
- Launch Strategy

## Contract Integration

Contracts are deployed on Base. See [noiceengg/contracts](https://github.com/noiceengg/contracts) for:
- Token launch mechanics (Doppler Multicurve + Uniswap V4)
- 2% trading tax (1.6% founder, 0.4% Noice)
- Token allocation (50% retail, 40% marketplace, 10% team)
- Vesting mechanics via Sablier

## Roadmap

- [x] V0.1 - Core UI (landing, launch, marketplace, company pages)
- [ ] Wallet connection (wagmi + viem)
- [ ] Real contract integration
- [ ] Supplier dashboard
- [ ] Docs site (Mintlify)
- [ ] Analytics & social metrics integration

## License

MIT
