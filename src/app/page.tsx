"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard, StatCard, ResultCard } from "@/components/ui/glass-card";
import { MiniChart } from "@/components/ui/price-chart";
import {
  COMPANIES,
  PLATFORM_STATS,
  formatCurrency,
  formatPrice,
  formatNumber,
  getFeaturedSuppliers,
  SUPPLIER_CATEGORIES,
  DISCLAIMER,
} from "@/lib/data";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function HomePage() {
  const cluely = COMPANIES.find((c) => c.id === "cluely");
  const featuredSuppliers = getFeaturedSuppliers().slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* hero - minimal */}
      <section className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm text-muted-foreground mb-4">
              live on base
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-6 leading-[1.1]">
              speculation is the
              <br />
              new distribution
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              launch an attention coin. earn from every trade. spend it on vetted growth talent.
              your startup&apos;s flywheel.
            </p>
            <div className="flex gap-3">
              <Link href="/launch">
                <Button size="lg" className="text-sm">
                  launch token
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline" className="text-sm">
                  browse suppliers
                </Button>
              </Link>
            </div>
          </div>

          {/* stats row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              label="total volume"
              value={formatCurrency(PLATFORM_STATS.totalVolume)}
            />
            <StatCard
              label="startups launched"
              value={PLATFORM_STATS.totalCompanies}
            />
            <StatCard
              label="growth suppliers"
              value={PLATFORM_STATS.totalSuppliers}
            />
            <StatCard
              label="avg day 1 earnings"
              value={formatCurrency(PLATFORM_STATS.avgDayOneEarnings)}
            />
          </div>
        </div>
      </section>

      {/* case study - cluely */}
      {cluely && (
        <section className="py-16 border-t border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-sm text-muted-foreground">case study</span>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm">{cluely.name}</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* left - info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-3xl font-semibold">{cluely.name}</h2>
                  {cluely.funding && (
                    <span className="text-sm text-accent-warm px-2 py-0.5 bg-accent-warm/10 rounded">
                      {cluely.funding.raised} raised
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mb-2">{cluely.tagline}</p>
                {cluely.funding && (
                  <p className="text-sm text-muted-foreground mb-6">
                    backed by {cluely.funding.investors.join(", ")}
                  </p>
                )}

                {/* results */}
                <div className="space-y-1 mb-8">
                  {cluely.results.map((result, i) => (
                    <ResultCard
                      key={i}
                      metric={result.metric}
                      before={result.before}
                      after={result.after}
                      supplier={result.supplier}
                    />
                  ))}
                </div>

                {/* token stats */}
                <GlassCard className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm text-muted-foreground">{cluely.ticker}</p>
                      <p className="text-2xl font-semibold">${formatPrice(cluely.token.price)}</p>
                    </div>
                    <MiniChart data={cluely.priceHistory} width={100} height={40} />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">mcap</p>
                      <p className="font-medium">{formatCurrency(cluely.token.marketCap)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">24h vol</p>
                      <p className="font-medium">{formatCurrency(cluely.token.volume24h)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">holders</p>
                      <p className="font-medium">{formatNumber(cluely.token.holders)}</p>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* right - viral content */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">viral content</p>
                <div className="space-y-4">
                  {cluely.viralContent.map((content, i) => (
                    <a
                      key={i}
                      href={content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <GlassCard hover className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg">
                              {content.type === "twitter" ? "𝕏" : content.type === "youtube" ? "▶" : "♪"}
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {content.type} post
                              </p>
                              <p className="text-sm text-accent-green font-mono">
                                {formatNumber(content.views)} views
                              </p>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </GlassCard>
                    </a>
                  ))}
                </div>

                {/* growth wallet */}
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-3">growth wallet</p>
                  <GlassCard className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-semibold">
                          ${formatNumber(cluely.growthWallet.usdc)}
                        </p>
                        <p className="text-sm text-muted-foreground">usdc available</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-muted-foreground">
                          {formatNumber(cluely.growthWallet.tokens)}
                        </p>
                        <p className="text-sm text-muted-foreground">tokens reserved</p>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                {/* hired suppliers */}
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-3">suppliers hired</p>
                  <div className="flex gap-2 flex-wrap">
                    {cluely.hiredSuppliers.map((id) => (
                      <Link
                        key={id}
                        href={`/supplier/${id}`}
                        className="px-3 py-1 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors"
                      >
                        @{id}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Link href={`/company/${cluely.id}`}>
                <Button variant="outline" size="sm">
                  view full case study
                  <ArrowRight className="ml-2 w-3 h-3" />
                </Button>
              </Link>
              <a href={cluely.website} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm">
                  visit {cluely.name}
                  <ExternalLink className="ml-2 w-3 h-3" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* how it works */}
      <section className="py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-semibold mb-8">how it works</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="p-6">
              <p className="text-sm text-muted-foreground mb-2">01</p>
              <h3 className="font-semibold mb-2">launch your token</h3>
              <p className="text-sm text-muted-foreground">
                deploy in minutes. 50% to traders, 40% to your growth wallet, 10% to team.
                paired to usdc on base.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-sm text-muted-foreground mb-2">02</p>
              <h3 className="font-semibold mb-2">earn from speculation</h3>
              <p className="text-sm text-muted-foreground">
                2% fee on every trade. 1.6% goes to your marketplace wallet.
                people talk about what they own.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-sm text-muted-foreground mb-2">03</p>
              <h3 className="font-semibold mb-2">hire growth talent</h3>
              <p className="text-sm text-muted-foreground">
                spend earnings on vetted kols, market makers, trenching groups,
                video producers, and more.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* supplier categories */}
      <section className="py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">marketplace</h2>
            <Link href="/marketplace">
              <Button variant="ghost" size="sm">
                view all
                <ArrowRight className="ml-2 w-3 h-3" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {SUPPLIER_CATEGORIES.map((category) => (
              <Link key={category.id} href={`/marketplace?category=${category.id}`}>
                <GlassCard hover className="p-4 text-center">
                  <p className="text-xl mb-1">{category.icon}</p>
                  <p className="text-sm">{category.label}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* featured suppliers */}
      <section className="py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-semibold mb-8">featured suppliers</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredSuppliers.map((supplier) => (
              <Link key={supplier.id} href={`/supplier/${supplier.id}`}>
                <GlassCard hover className="p-5 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{supplier.name}</h3>
                      <p className="text-sm text-accent-warm">{supplier.handle}</p>
                    </div>
                    <p className="text-sm font-mono">
                      ${formatNumber(supplier.price)}
                      <span className="text-muted-foreground">/{supplier.priceUnit.split(" ")[1] || supplier.priceUnit}</span>
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {supplier.tagline}
                  </p>
                  {supplier.results.length > 0 && (
                    <div className="flex gap-3 text-xs">
                      {supplier.results.slice(0, 2).map((r, i) => (
                        <span key={i} className="text-accent-green font-mono">
                          {r.value} {r.metric}
                        </span>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <GlassCard className="p-8 md:p-12">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold mb-4">
                ready to turn attention into action?
              </h2>
              <p className="text-muted-foreground mb-6">
                join startups already using speculation as their distribution weapon.
                a16z speedrun and yc s25 companies welcome.
              </p>
              <div className="flex gap-3">
                <Link href="/launch">
                  <Button>
                    launch token
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Button variant="outline">
                  talk to us
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* disclaimer */}
      <section className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-xs text-muted-foreground max-w-2xl">
            {DISCLAIMER}
          </p>
        </div>
      </section>

      {/* footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-medium">noice</span>
            <p className="text-sm text-muted-foreground">
              built for startups who want infinite distribution
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                twitter
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                discord
              </a>
              <a href="/docs" className="hover:text-foreground transition-colors">
                docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
