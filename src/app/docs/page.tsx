"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  ArrowLeft,
  Rocket,
  DollarSign,
  UserCheck,
  TrendingUp,
  Wallet,
  Store,
  BookOpen,
  FileText,
  Code,
  ChevronRight,
} from "lucide-react";

const DOCS_SECTIONS = [
  {
    title: "get started",
    items: [
      { title: "introduction", href: "#introduction", icon: BookOpen },
      { title: "quickstart", href: "#quickstart", icon: Rocket },
      { title: "tokenomics", href: "#tokenomics", icon: TrendingUp },
    ],
  },
  {
    title: "marketplace",
    items: [
      { title: "overview", href: "#marketplace-overview", icon: Store },
      { title: "suppliers", href: "#suppliers", icon: UserCheck },
      { title: "hiring", href: "#hiring", icon: FileText },
    ],
  },
  {
    title: "for founders",
    items: [
      { title: "launching", href: "#launching", icon: Rocket },
      { title: "growth wallet", href: "#growth-wallet", icon: Wallet },
      { title: "spending", href: "#spending", icon: DollarSign },
    ],
  },
  {
    title: "api reference",
    items: [
      { title: "introduction", href: "#api", icon: Code },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* back button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              back to home
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-[250px_1fr] gap-12">
          {/* sidebar navigation */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {DOCS_SECTIONS.map((section) => (
                <div key={section.title}>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                    {section.title}
                  </p>
                  <nav className="space-y-1">
                    {section.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </aside>

          {/* main content */}
          <main className="min-w-0">
            {/* introduction */}
            <section id="introduction" className="mb-16">
              <h1 className="text-4xl font-bold mb-4">documentation</h1>
              <p className="text-xl text-muted-foreground mb-8">
                speculation is the new distribution
              </p>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-semibold mb-4">what is noice?</h2>
                <p className="text-muted-foreground mb-6">
                  noice is an attention marketplace for startups. launch a token, earn from every trade, and spend those earnings on vetted growth talent.
                </p>

                <h3 className="text-xl font-semibold mb-4">the flywheel</h3>
                <div className="space-y-4 mb-8">
                  <GlassCard className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-warm/10 flex items-center justify-center shrink-0">
                        <span className="text-accent-warm font-semibold">1</span>
                      </div>
                      <div>
                        <p className="font-medium">launch your token</p>
                        <p className="text-sm text-muted-foreground">
                          deploy in minutes on base. 50% to traders, 40% to your growth wallet, 10% to team
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                  <GlassCard className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-warm/10 flex items-center justify-center shrink-0">
                        <span className="text-accent-warm font-semibold">2</span>
                      </div>
                      <div>
                        <p className="font-medium">earn from speculation</p>
                        <p className="text-sm text-muted-foreground">
                          2% fee on every trade. 1.6% goes to your marketplace wallet
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                  <GlassCard className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-warm/10 flex items-center justify-center shrink-0">
                        <span className="text-accent-warm font-semibold">3</span>
                      </div>
                      <div>
                        <p className="font-medium">hire growth talent</p>
                        <p className="text-sm text-muted-foreground">
                          spend earnings on kols, market makers, video producers, and more
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                <h3 className="text-xl font-semibold mb-4">why it works</h3>
                <p className="text-muted-foreground mb-8">
                  people talk about what they own. when traders buy your token, they become advocates. the trading tax funds your growth budget, creating a self-sustaining attention flywheel.
                </p>
              </div>
            </section>

            {/* key features */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">key features</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <GlassCard className="p-5">
                  <Rocket className="w-5 h-5 text-accent-warm mb-3" />
                  <h3 className="font-medium mb-1">instant deployment</h3>
                  <p className="text-sm text-muted-foreground">
                    launch your token in under 5 minutes on base
                  </p>
                </GlassCard>
                <GlassCard className="p-5">
                  <DollarSign className="w-5 h-5 text-accent-green mb-3" />
                  <h3 className="font-medium mb-1">built-in revenue</h3>
                  <p className="text-sm text-muted-foreground">
                    earn 1.6% of every trade automatically
                  </p>
                </GlassCard>
                <GlassCard className="p-5">
                  <UserCheck className="w-5 h-5 text-accent-blue mb-3" />
                  <h3 className="font-medium mb-1">vetted suppliers</h3>
                  <p className="text-sm text-muted-foreground">
                    access pre-vetted kols, market makers, and creators
                  </p>
                </GlassCard>
                <GlassCard className="p-5">
                  <TrendingUp className="w-5 h-5 text-accent-purple mb-3" />
                  <h3 className="font-medium mb-1">proof of results</h3>
                  <p className="text-sm text-muted-foreground">
                    see real results before you hire
                  </p>
                </GlassCard>
              </div>
            </section>

            {/* attention coins warning */}
            <section id="tokenomics" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">attention coins</h2>
              <div className="p-4 bg-accent-warm/10 border border-accent-warm/20 rounded-lg mb-6">
                <p className="text-sm text-accent-warm font-medium mb-2">important notice</p>
                <p className="text-sm text-muted-foreground">
                  attention coins are not securities. they do not represent ownership, equity, or any claim to profits or assets. they are purely a mechanism for communities to signal attention and support for projects.
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-4">token distribution</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm">retail traders</span>
                  <span className="font-mono text-accent-green">50%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm">growth wallet</span>
                  <span className="font-mono text-accent-warm">40%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm">team</span>
                  <span className="font-mono text-muted-foreground">10%</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4">trading tax</h3>
              <p className="text-muted-foreground mb-4">
                every trade incurs a 2% fee, distributed as follows:
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm">to founder (growth wallet)</span>
                  <span className="font-mono text-accent-green">1.6%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span className="text-sm">to noice protocol</span>
                  <span className="font-mono text-muted-foreground">0.4%</span>
                </div>
              </div>
            </section>

            {/* marketplace overview */}
            <section id="marketplace-overview" className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">marketplace</h2>
              <p className="text-muted-foreground mb-6">
                the noice marketplace connects startups with vetted growth suppliers. every supplier is verified with proof of work - real results from real campaigns.
              </p>

              <h3 className="text-xl font-semibold mb-4">supplier categories</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {["kols & influencers", "market makers", "video production", "community growth", "pr & media"].map((cat) => (
                  <div key={cat} className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                    <ChevronRight className="w-4 h-4 text-accent-warm" />
                    <span className="text-sm">{cat}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4">views per dollar</h3>
              <p className="text-muted-foreground mb-4">
                every supplier shows their &quot;views per dollar&quot; metric - the average number of views generated for every $1 spent. this helps you compare efficiency across suppliers.
              </p>
            </section>

            {/* who is noice for */}
            <section className="mb-16">
              <h2 className="text-2xl font-semibold mb-6">who is noice for?</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-accent-warm" />
                  <span>a16z speedrun companies looking for distribution</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-accent-green" />
                  <span>yc startups wanting to stand out</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-accent-blue" />
                  <span>crypto-native founders who understand attention economics</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-accent-purple" />
                  <span>growth marketers who want to become suppliers</span>
                </div>
              </div>
            </section>

            {/* cta */}
            <section>
              <GlassCard className="p-8">
                <h2 className="text-2xl font-semibold mb-4">ready to get started?</h2>
                <p className="text-muted-foreground mb-6">
                  launch your token and start building your attention flywheel today.
                </p>
                <div className="flex gap-3">
                  <Link href="/launch">
                    <Button>
                      launch token
                      <Rocket className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/marketplace">
                    <Button variant="outline">browse marketplace</Button>
                  </Link>
                </div>
              </GlassCard>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
