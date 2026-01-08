"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  getSupplierById,
  getCompanyById,
  SUPPLIER_CATEGORIES,
  formatNumber,
} from "@/lib/data";
import {
  ArrowLeft,
  Star,
  DollarSign,
  Globe,
  ExternalLink,
  CheckCircle2,
  MessageSquare,
  Eye,
  BookOpen,
  Megaphone,
  BarChart3,
  Pickaxe,
  Video,
  Mic,
  Twitter,
  Mail,
  PenTool,
  Palette,
  Rocket,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  megaphone: Megaphone,
  'chart-bar': BarChart3,
  pickaxe: Pickaxe,
  video: Video,
  mic: Mic,
  twitter: Twitter,
  mail: Mail,
  'pen-tool': PenTool,
  palette: Palette,
  rocket: Rocket,
};

export default function SupplierPage() {
  const params = useParams();
  const supplier = getSupplierById(params.id as string);

  if (!supplier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">supplier not found</h1>
          <Link href="/marketplace">
            <Button variant="outline">back to marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const category = SUPPLIER_CATEGORIES.find((c) => c.id === supplier.category);
  const clients = supplier.clientsServed
    .map((id) => getCompanyById(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* back button */}
        <div className="mb-8">
          <Link href="/marketplace">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              back to marketplace
            </Button>
          </Link>
        </div>

        {/* hero */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* main info */}
          <div className="lg:col-span-2">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center text-3xl">
                {supplier.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-semibold">{supplier.name}</h1>
                  {supplier.featured && (
                    <span className="text-xs text-accent-warm px-2 py-0.5 bg-accent-warm/10 rounded">
                      featured
                    </span>
                  )}
                </div>
                <p className="text-accent-warm mb-2">{supplier.handle}</p>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-secondary rounded text-xs text-muted-foreground">
                  {category?.icon && (() => {
                    const IconComponent = CATEGORY_ICONS[category.icon];
                    return IconComponent ? <IconComponent className="w-3 h-3" /> : null;
                  })()}
                  {category?.label}
                </span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-4">
              {supplier.tagline}
            </p>

            <p className="text-foreground/80 leading-relaxed mb-6">
              {supplier.bio}
            </p>

            <div className="flex items-center gap-3">
              <a
                href={supplier.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  twitter
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </a>
              {supplier.website && (
                <a
                  href={supplier.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">
                    <Globe className="w-4 h-4 mr-2" />
                    website
                  </Button>
                </a>
              )}
            </div>
          </div>

          {/* cta card */}
          <GlassCard className="p-5 h-fit">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-accent-warm fill-accent-warm" />
              <span className="text-lg font-semibold">{supplier.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({supplier.reviewCount} reviews)
              </span>
            </div>

            {/* views per dollar - key metric */}
            {supplier.viewsPerDollar > 0 && (
              <div className="p-4 bg-accent-green/10 border border-accent-green/20 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-accent-green" />
                  <span className="text-xs text-muted-foreground">views per $1 spent</span>
                </div>
                <p className="text-3xl font-semibold text-accent-green font-mono">
                  {supplier.viewsPerDollar}
                </p>
              </div>
            )}

            {/* price */}
            <div className="p-4 bg-secondary/50 rounded-lg mb-4">
              <p className="text-2xl font-semibold">
                ${formatNumber(supplier.price)}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {supplier.priceUnit}
                </span>
              </p>
            </div>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  range
                </span>
                <span className="font-mono">
                  ${formatNumber(supplier.rate.min)} - ${formatNumber(supplier.rate.max)}
                </span>
              </div>
            </div>

            <Button className="w-full mb-3">
              <MessageSquare className="w-4 h-4 mr-2" />
              request quote
            </Button>
            <Button variant="outline" className="w-full">
              schedule call
            </Button>
          </GlassCard>
        </div>

        {/* proof of work - verified results */}
        {supplier.proofOfWork.length > 0 && (
          <GlassCard className="p-6 mb-8">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent-green" />
              verified results
            </h2>
            <div className="space-y-4">
              {supplier.proofOfWork.map((proof, i) => (
                <div key={i} className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{proof.client}</p>
                      <p className="text-sm text-muted-foreground">{proof.description}</p>
                    </div>
                    <a
                      href={proof.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs bg-secondary rounded hover:bg-secondary/80 transition-colors flex items-center gap-1"
                    >
                      view proof
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      ${formatNumber(proof.cost)} spent
                    </span>
                    <span className="flex items-center gap-1.5 text-accent-green">
                      <Eye className="w-4 h-4" />
                      {formatNumber(proof.views)} views
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({Math.round(proof.views / proof.cost)} views/$1)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* results */}
        {supplier.results.length > 0 && (
          <GlassCard className="p-6 mb-8">
            <h2 className="font-semibold mb-4">results they deliver</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {supplier.results.map((result, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-green" />
                  <div>
                    <span className="text-muted-foreground">{result.metric}: </span>
                    <span className="text-accent-green font-mono">{result.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* deliverables */}
        <GlassCard className="p-6 mb-8">
          <h2 className="font-semibold mb-4">what you get</h2>
          <div className="space-y-2">
            {supplier.deliverables.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent-warm" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* portfolio */}
        {supplier.portfolio.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold mb-4">portfolio</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {supplier.portfolio.map((item, index) => (
                <GlassCard key={index} className="p-5">
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-green" />
                    <span className="text-sm text-accent-green">{item.metrics}</span>
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block"
                    >
                      <Button variant="ghost" size="sm">
                        view project
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    </a>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* clients on noice */}
        {clients.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold mb-4">worked with on noice</h2>
            <div className="flex flex-wrap gap-3">
              {clients.map((company) => (
                <Link key={company!.id} href={`/company/${company!.id}`}>
                  <GlassCard hover className="p-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center font-semibold">
                      {company!.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{company!.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {company!.ticker}
                      </p>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* how payments work */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">how payments work on noice</h2>
            <a
              href="/docs/marketplace/hiring"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent-warm hover:underline flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3" />
              full guide
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-8 h-8 rounded-lg bg-accent-warm/10 flex items-center justify-center mb-3">
                <span className="text-accent-warm font-semibold">1</span>
              </div>
              <h3 className="font-medium mb-1">request a quote</h3>
              <p className="text-sm text-muted-foreground">
                describe your project and the supplier will send you a custom proposal.
              </p>
            </div>
            <div>
              <div className="w-8 h-8 rounded-lg bg-accent-warm/10 flex items-center justify-center mb-3">
                <span className="text-accent-warm font-semibold">2</span>
              </div>
              <h3 className="font-medium mb-1">pay from your wallet</h3>
              <p className="text-sm text-muted-foreground">
                use your growth wallet balance (usdc or tokens) to fund the project.
              </p>
            </div>
            <div>
              <div className="w-8 h-8 rounded-lg bg-accent-warm/10 flex items-center justify-center mb-3">
                <span className="text-accent-warm font-semibold">3</span>
              </div>
              <h3 className="font-medium mb-1">get results</h3>
              <p className="text-sm text-muted-foreground">
                supplier delivers the work. payment is released upon your approval.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
