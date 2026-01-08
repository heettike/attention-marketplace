"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import {
  SUPPLIERS,
  SUPPLIER_CATEGORIES,
  SupplierCategory,
  getRecommendedStrategy,
  formatNumber,
} from "@/lib/data";
import {
  Search,
  Star,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  Eye,
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
  Package,
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

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as SupplierCategory | null;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SupplierCategory | null>(null);
  const [walletBalance, setWalletBalance] = useState(5000); // mock wallet balance

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredSuppliers = useMemo(() => {
    return SUPPLIERS.filter((supplier) => {
      const matchesSearch =
        search === "" ||
        supplier.name.toLowerCase().includes(search.toLowerCase()) ||
        supplier.tagline.toLowerCase().includes(search.toLowerCase()) ||
        supplier.handle.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        !selectedCategory || supplier.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const strategy = getRecommendedStrategy(walletBalance);

  const getCategoryLabel = (id: SupplierCategory) => {
    return SUPPLIER_CATEGORIES.find((c) => c.id === id)?.label || id;
  };

  const getCategoryIcon = (id: SupplierCategory) => {
    const iconName = SUPPLIER_CATEGORIES.find((c) => c.id === id)?.icon || "package";
    return CATEGORY_ICONS[iconName] || Package;
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* header */}
        <div className="mb-12">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2">
                attention marketplace
              </h1>
              <p className="text-muted-foreground">
                vetted suppliers ready to amplify your startup&apos;s reach
              </p>
            </div>
            <a
              href="/docs/marketplace/hiring"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg"
            >
              <TrendingUp className="w-4 h-4" />
              how it works
            </a>
          </div>
        </div>

        {/* strategy recommendation */}
        <GlassCard className="p-5 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-warm/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent-warm" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">your wallet: ${formatNumber(walletBalance)} usdc</p>
                <p className="font-medium">{strategy.message}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {[1000, 5000, 15000, 50000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setWalletBalance(amount)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    walletBalance === amount
                      ? "bg-accent-warm text-black"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  ${formatNumber(amount)}
                </button>
              ))}
            </div>
          </div>
          {strategy.suppliers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">recommended for you</p>
              <div className="flex gap-2 flex-wrap">
                {strategy.suppliers.map((s) => (
                  <Link
                    key={s.id}
                    href={`/supplier/${s.id}`}
                    className="px-3 py-1.5 bg-secondary rounded-full text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2"
                  >
                    <span>{s.name}</span>
                    <span className="text-accent-green font-mono">${formatNumber(s.price)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </GlassCard>

        {/* search & filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="search suppliers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-10"
              />
            </div>
            {selectedCategory && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="h-10"
              >
                clear filter
              </Button>
            )}
          </div>

          {/* category pills */}
          <div className="flex flex-wrap gap-2">
            {SUPPLIER_CATEGORIES.map((category) => {
              const IconComponent = CATEGORY_ICONS[category.icon];
              return (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedCategory === category.id
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filteredSuppliers.length} supplier{filteredSuppliers.length !== 1 ? "s" : ""} found
        </p>

        {/* supplier grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map((supplier) => (
            <Link key={supplier.id} href={`/supplier/${supplier.id}`}>
              <GlassCard hover className="p-5 h-full group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium group-hover:text-accent-warm transition-colors">
                      {supplier.name}
                    </h3>
                    <p className="text-sm text-accent-warm">{supplier.handle}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-secondary rounded text-xs text-muted-foreground mb-3">
                  {(() => {
                    const IconComponent = getCategoryIcon(supplier.category);
                    return <IconComponent className="w-3 h-3" />;
                  })()}
                  {getCategoryLabel(supplier.category)}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {supplier.tagline}
                </p>

                {/* views per dollar - the key metric */}
                {supplier.viewsPerDollar > 0 ? (
                  <div className="p-3 bg-accent-green/10 border border-accent-green/20 rounded-lg mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Eye className="w-4 h-4 text-accent-green" />
                      <span className="text-xs text-muted-foreground">views per $1</span>
                    </div>
                    <p className="text-2xl font-semibold text-accent-green font-mono">
                      {supplier.viewsPerDollar}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-secondary/50 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground">non-attention service</p>
                    <p className="text-xl font-semibold">
                      ${formatNumber(supplier.price)}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {supplier.priceUnit}
                      </span>
                    </p>
                  </div>
                )}

                {/* price and proof of work count */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-muted-foreground">
                    ${formatNumber(supplier.price)} {supplier.priceUnit}
                  </span>
                  {supplier.proofOfWork.length > 0 && (
                    <span className="text-accent-warm">
                      {supplier.proofOfWork.length} verified {supplier.proofOfWork.length === 1 ? 'result' : 'results'}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-3.5 h-3.5 text-accent-warm fill-accent-warm" />
                    <span className="font-medium">{supplier.rating}</span>
                    <span className="text-muted-foreground">({supplier.reviewCount})</span>
                  </div>
                  {supplier.featured && (
                    <span className="text-xs text-accent-warm">featured</span>
                  )}
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        {/* empty state */}
        {filteredSuppliers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              no suppliers found matching your criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setSelectedCategory(null);
              }}
            >
              clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <div className="h-8 w-64 bg-secondary rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-secondary rounded animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card-clean p-5 animate-pulse">
              <div className="h-5 w-32 bg-secondary rounded mb-2" />
              <div className="h-4 w-24 bg-secondary rounded mb-4" />
              <div className="h-16 w-full bg-secondary rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MarketplaceContent />
    </Suspense>
  );
}
