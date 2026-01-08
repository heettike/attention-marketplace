"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard, StatCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
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
  Twitter,
  Globe,
  Users,
  TrendingUp,
  Wallet,
  Eye,
  BarChart3,
  ExternalLink,
  Star,
} from "lucide-react";

export default function CompanyPage() {
  const params = useParams();
  const company = getCompanyById(params.id as string);

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Company not found</h1>
          <Link href="/">
            <Button variant="outline">Go home</Button>
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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-accent-warm/20 to-accent-purple/20 flex items-center justify-center text-4xl font-bold">
                  {company.name[0]}
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-1">{company.name}</h1>
                  <div className="flex items-center gap-3">
                    <span className="text-xl text-accent-warm font-medium">
                      {company.ticker}
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        company.token.priceChange24h >= 0
                          ? "border-accent-green/30 text-accent-green"
                          : "border-accent-red/30 text-accent-red"
                      }
                    >
                      {company.token.priceChange24h >= 0 ? "+" : ""}
                      {company.token.priceChange24h.toFixed(1)}% 24h
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-xl text-muted-foreground mb-6">
                {company.tagline}
              </p>

              <div className="flex items-center gap-4">
                <a
                  href={`https://twitter.com/${company.twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="border-white/10">
                    <Twitter className="w-4 h-4 mr-2" />
                    {company.twitter}
                  </Button>
                </a>
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="border-white/10">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Price Card */}
            <GlassCard className="p-6 lg:w-80" glow="warm">
              <p className="text-sm text-muted-foreground mb-2">Current Price</p>
              <p className="stat-number-xl text-gradient mb-4">
                ${formatPrice(company.token.price)}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Button className="flex-1 bg-accent-green text-black hover:bg-accent-green/90">
                  Buy
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-accent-red/30 text-accent-red hover:bg-accent-red/10"
                >
                  Sell
                </Button>
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Price History</h2>
              <div className="flex gap-2">
                {["24H", "7D", "30D", "ALL"].map((period) => (
                  <button
                    key={period}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      period === "30D"
                        ? "bg-white/10 text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <PriceChart data={company.priceHistory} height={300} showAxis />
          </GlassCard>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            label="Market Cap"
            value={formatCurrency(company.token.marketCap)}
            trend={company.token.priceChange24h}
          />
          <StatCard
            label="24h Volume"
            value={formatCurrency(company.token.volume24h)}
          />
          <StatCard
            label="Holders"
            value={formatNumber(company.token.holders)}
          />
          <StatCard
            label="Total Supply"
            value={formatNumber(company.token.totalSupply)}
          />
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Social Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-accent-warm" />
                  Social Metrics
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Twitter className="w-4 h-4" />
                      <span className="text-sm">Followers</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {formatNumber(company.metrics.twitterFollowers)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Avg Views</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {formatNumber(company.metrics.avgViews)}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">Engagement</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {company.metrics.avgEngagement}%
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Hired Suppliers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-accent-warm" />
                  Growth Partners
                </h2>
                {hiredSuppliers.length > 0 ? (
                  <div className="space-y-4">
                    {hiredSuppliers.map((supplier) => (
                      <Link
                        key={supplier!.id}
                        href={`/supplier/${supplier!.id}`}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-lg">
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
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    No suppliers hired yet
                  </p>
                )}
              </GlassCard>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Marketplace Wallet */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassCard className="p-6" variant="highlight">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-accent-warm" />
                  Growth Wallet
                </h2>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    USDC Balance
                  </p>
                  <p className="text-3xl font-bold text-gradient">
                    ${formatCurrency(company.marketplaceWallet.balance).replace("$", "")}
                  </p>
                </div>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">
                    Token Balance
                  </p>
                  <p className="text-xl font-semibold">
                    {formatNumber(company.marketplaceWallet.tokenBalance)}{" "}
                    {company.ticker}
                  </p>
                </div>
                <Link href="/marketplace">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Spend on Growth
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>

            {/* Recommended Suppliers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Recommended for you
                </h2>
                <div className="space-y-3">
                  {recommendedSuppliers.map((supplier) => (
                    <Link
                      key={supplier.id}
                      href={`/supplier/${supplier.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-sm">
                        {supplier.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate group-hover:text-accent-warm transition-colors">
                          {supplier.name}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 text-accent-warm fill-accent-warm" />
                          {supplier.rating}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ${supplier.rate.min.toLocaleString()}+
                      </p>
                    </Link>
                  ))}
                </div>
                <Link href="/marketplace">
                  <Button
                    variant="ghost"
                    className="w-full mt-4 text-muted-foreground"
                  >
                    View all suppliers
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
