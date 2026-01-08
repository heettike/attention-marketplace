"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard, StatCard, ResultCard } from "@/components/ui/glass-card";
import { PriceChart } from "@/components/ui/price-chart";
import {
  getCompanyById,
  getSupplierById,
  formatPrice,
  formatCurrency,
  formatNumber,
  SUPPLIERS,
} from "@/lib/data";
import {
  ArrowUpRight,
  Globe,
  Users,
  Wallet,
  ExternalLink,
  Star,
  ArrowLeft,
} from "lucide-react";

export default function CompanyPage() {
  const params = useParams();
  const company = getCompanyById(params.id as string);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">company not found</h1>
          <Link href="/">
            <Button variant="outline">go home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hiredSuppliers = company.hiredSuppliers
    .map((id) => getSupplierById(id))
    .filter(Boolean);

  const recommendedSuppliers = SUPPLIERS.filter(
    (s) => !company.hiredSuppliers.includes(s.id) && s.featured
  ).slice(0, 3);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* back */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              back
            </Button>
          </Link>
        </div>

        {/* header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* company info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center text-2xl font-semibold">
                {company.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-semibold">{company.name}</h1>
                  {company.funding && (
                    <span className="text-sm text-accent-warm px-2 py-0.5 bg-accent-warm/10 rounded">
                      {company.funding.raised} raised
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-accent-warm">{company.ticker}</span>
                  <span
                    className={`text-sm font-mono ${
                      company.token.priceChange24h >= 0
                        ? "text-accent-green"
                        : "text-accent-red"
                    }`}
                  >
                    {company.token.priceChange24h >= 0 ? "+" : ""}
                    {company.token.priceChange24h.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-2">{company.tagline}</p>
            {company.funding && (
              <p className="text-sm text-muted-foreground mb-6">
                backed by {company.funding.investors.join(", ")}
              </p>
            )}

            <div className="flex items-center gap-3">
              <a
                href={`https://x.com/${company.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  {company.twitter}
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </a>
              <a href={company.website} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm">
                  <Globe className="w-4 h-4 mr-2" />
                  website
                </Button>
              </a>
            </div>
          </div>

          {/* price card */}
          <GlassCard className="p-5 lg:w-72">
            <p className="text-sm text-muted-foreground mb-1">current price</p>
            <p className="text-3xl font-semibold mb-4">
              ${formatPrice(company.token.price)}
            </p>
            <div className="flex gap-2">
              <Button className="flex-1 bg-accent-green text-black hover:bg-accent-green/90">
                buy
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-accent-red/30 text-accent-red hover:bg-accent-red/10"
              >
                sell
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* chart */}
        <GlassCard className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">price history</h2>
            <div className="flex gap-2">
              {["24h", "7d", "30d", "all"].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    period === "30d"
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <PriceChart data={company.priceHistory} height={250} showAxis />
        </GlassCard>

        {/* stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="market cap"
            value={formatCurrency(company.token.marketCap)}
            trend={company.token.priceChange24h}
          />
          <StatCard
            label="24h volume"
            value={formatCurrency(company.token.volume24h)}
          />
          <StatCard label="holders" value={formatNumber(company.token.holders)} />
          <StatCard
            label="followers"
            value={formatNumber(company.metrics.followers)}
          />
        </div>

        {/* two column layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* results */}
            {company.results.length > 0 && (
              <GlassCard className="p-6">
                <h2 className="font-semibold mb-4">results</h2>
                <div className="space-y-1">
                  {company.results.map((result, i) => (
                    <ResultCard
                      key={i}
                      metric={result.metric}
                      before={result.before}
                      after={result.after}
                      supplier={result.supplier}
                    />
                  ))}
                </div>
              </GlassCard>
            )}

            {/* viral content */}
            {company.viralContent.length > 0 && (
              <GlassCard className="p-6">
                <h2 className="font-semibold mb-4">viral content</h2>
                <div className="space-y-3">
                  {company.viralContent.map((content, i) => (
                    <a
                      key={i}
                      href={content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-sm">
                          {content.type === "twitter" ? "𝕏" : "▶"}
                        </div>
                        <span className="text-sm">{content.type} post</span>
                      </div>
                      <span className="text-sm text-accent-green font-mono">
                        {formatNumber(content.views)} views
                      </span>
                    </a>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* growth partners */}
            <GlassCard className="p-6">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                growth partners
              </h2>
              {hiredSuppliers.length > 0 ? (
                <div className="space-y-3">
                  {hiredSuppliers.map((supplier) => (
                    <Link
                      key={supplier!.id}
                      href={`/supplier/${supplier!.id}`}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                          {supplier!.name[0]}
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-accent-warm transition-colors">
                            {supplier!.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {supplier!.tagline}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm text-center py-6">
                  no suppliers hired yet
                </p>
              )}
            </GlassCard>
          </div>

          {/* sidebar */}
          <div className="space-y-6">
            {/* growth wallet */}
            <GlassCard className="p-5">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                growth wallet
              </h2>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">usdc balance</p>
                <p className="text-2xl font-semibold">
                  ${formatNumber(company.growthWallet.usdc)}
                </p>
              </div>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">token balance</p>
                <p className="font-medium">
                  {formatNumber(company.growthWallet.tokens)} {company.ticker}
                </p>
              </div>
              <Link href="/marketplace">
                <Button className="w-full">spend on growth</Button>
              </Link>
            </GlassCard>

            {/* recommended suppliers */}
            <GlassCard className="p-5">
              <h2 className="font-semibold mb-4">recommended for you</h2>
              <div className="space-y-3">
                {recommendedSuppliers.map((supplier) => (
                  <Link
                    key={supplier.id}
                    href={`/supplier/${supplier.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-sm">
                      {supplier.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-accent-warm transition-colors">
                        {supplier.name}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 text-accent-warm fill-accent-warm" />
                        {supplier.rating}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      ${formatNumber(supplier.rate.min)}
                    </p>
                  </Link>
                ))}
              </div>
              <Link href="/marketplace">
                <Button variant="ghost" className="w-full mt-3 text-muted-foreground">
                  view all suppliers
                </Button>
              </Link>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
