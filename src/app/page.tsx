"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard, StatCard } from "@/components/ui/glass-card";
import { MiniChart } from "@/components/ui/price-chart";
import { Badge } from "@/components/ui/badge";
import {
  COMPANIES,
  PLATFORM_STATS,
  formatCurrency,
  formatPrice,
  getFeaturedSuppliers,
  SUPPLIER_CATEGORIES,
} from "@/lib/data";
import { ArrowRight, Zap, TrendingUp, Users, Sparkles } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  const featuredSuppliers = getFeaturedSuppliers().slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-warm/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-blue/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="mb-6 px-4 py-1.5 text-sm border-accent-warm/30 text-accent-warm"
              >
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Now live on Base
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="text-gradient">Speculation</span> is the
              <br />
              new distribution
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Launch a token. Earn from every trade. Spend it all on A++ growth
              talent. Your startup&apos;s attention flywheel.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/launch">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Launch Your Token
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-white/10 hover:bg-white/5"
                >
                  Browse Marketplace
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatCard
              label="Total Volume"
              value={formatCurrency(PLATFORM_STATS.totalVolume)}
            />
            <StatCard
              label="Startups Launched"
              value={PLATFORM_STATS.totalCompanies}
            />
            <StatCard
              label="Growth Suppliers"
              value={PLATFORM_STATS.totalSuppliers}
            />
            <StatCard
              label="Avg Day 1 Earnings"
              value={formatCurrency(PLATFORM_STATS.avgDayOneEarnings)}
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The attention flywheel
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every trade generates revenue. Every dollar spent multiplies your reach.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "1. Launch your token",
                description:
                  "Deploy in minutes. 50% to traders, 40% to your growth wallet, 10% to team.",
              },
              {
                icon: TrendingUp,
                title: "2. Speculation = Marketing",
                description:
                  "Every trade = 2% fee. 1.6% goes to your marketplace wallet. People talk about what they own.",
              },
              {
                icon: Users,
                title: "3. Hire A++ talent",
                description:
                  "Spend your earnings on vetted creators, newsletters, podcasts, and growth hackers.",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent-warm/10 flex items-center justify-center mb-6">
                    <step.icon className="w-6 h-6 text-accent-warm" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Companies */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Live on Noice
              </h2>
              <p className="text-muted-foreground">
                Startups already turning speculation into distribution
              </p>
            </div>
            <Link href="/marketplace">
              <Button variant="ghost" className="hidden sm:flex">
                View all <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {COMPANIES.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/company/${company.id}`}>
                  <GlassCard className="p-6 cursor-pointer" glow="warm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-warm/20 to-accent-purple/20 flex items-center justify-center text-2xl font-bold">
                          {company.name[0]}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{company.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {company.ticker}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          company.token.priceChange24h >= 0
                            ? "border-accent-green/30 text-accent-green"
                            : "border-accent-red/30 text-accent-red"
                        }
                      >
                        {company.token.priceChange24h >= 0 ? "+" : ""}
                        {company.token.priceChange24h.toFixed(1)}%
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-1">
                      {company.tagline}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">
                          ${formatPrice(company.token.price)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          MC: {formatCurrency(company.token.marketCap)}
                        </p>
                      </div>
                      <MiniChart data={company.priceHistory} width={120} height={40} />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplier Categories */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The attention marketplace
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Vetted suppliers who know how to move the needle
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SUPPLIER_CATEGORIES.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/marketplace?category=${category.id}`}>
                  <GlassCard
                    className="p-6 text-center cursor-pointer"
                    variant="subtle"
                  >
                    <div className="text-3xl mb-3">{category.icon}</div>
                    <p className="font-medium">{category.label}</p>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Suppliers */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                Featured suppliers
              </h2>
              <p className="text-muted-foreground">
                Hand-picked talent ready to amplify your reach
              </p>
            </div>
            <Link href="/marketplace">
              <Button variant="ghost" className="hidden sm:flex">
                View all <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSuppliers.map((supplier, index) => (
              <motion.div
                key={supplier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/supplier/${supplier.id}`}>
                  <GlassCard className="p-6 cursor-pointer h-full">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-2xl mb-4">
                      {supplier.name[0]}
                    </div>
                    <h3 className="font-semibold mb-1">{supplier.name}</h3>
                    <p className="text-sm text-accent-warm mb-2">
                      {supplier.handle}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {supplier.tagline}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        From ${supplier.rate.min.toLocaleString()}
                      </span>
                      <span className="text-accent-warm">
                        {supplier.rating} ({supplier.reviewCount})
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-12 md:p-20 text-center" variant="highlight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to turn attention
                <br />
                <span className="text-gradient">into action?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                Join the startups already using speculation as their secret
                distribution weapon.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/launch">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Launch Your Token
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-white/10 hover:bg-white/5"
                >
                  Talk to Us
                </Button>
              </div>
            </motion.div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-accent-warm to-accent-warm-hover flex items-center justify-center">
                <span className="text-black font-bold text-xs">N</span>
              </div>
              <span className="font-medium">noice</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built for startups who want infinite distribution.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Twitter
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Discord
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Docs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
