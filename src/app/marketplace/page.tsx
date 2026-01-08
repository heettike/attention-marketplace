"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import {
  SUPPLIERS,
  SUPPLIER_CATEGORIES,
  SupplierCategory,
} from "@/lib/data";
import { Search, Star, ArrowUpRight, Filter } from "lucide-react";

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as SupplierCategory | null;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SupplierCategory | null>(null);

  // Set initial category from URL on mount
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

  const getCategoryLabel = (id: SupplierCategory) => {
    return SUPPLIER_CATEGORIES.find((c) => c.id === id)?.label || id;
  };

  const getCategoryIcon = (id: SupplierCategory) => {
    return SUPPLIER_CATEGORIES.find((c) => c.id === id)?.icon || "📦";
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Attention Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vetted suppliers ready to amplify your startup&apos;s reach
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 h-12"
              />
            </div>
            <Button
              variant="outline"
              className="border-white/10 h-12"
              onClick={() => setSelectedCategory(null)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {selectedCategory ? "Clear Filter" : "All Categories"}
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {SUPPLIER_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-accent-warm text-black"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-6"
        >
          {filteredSuppliers.length} supplier
          {filteredSuppliers.length !== 1 ? "s" : ""} found
        </motion.p>

        {/* Supplier Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier, index) => (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link href={`/supplier/${supplier.id}`}>
                <GlassCard className="p-6 h-full cursor-pointer group relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-xl">
                        {supplier.name[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-accent-warm transition-colors">
                          {supplier.name}
                        </h3>
                        <p className="text-sm text-accent-warm">
                          {supplier.handle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <Badge
                    variant="outline"
                    className="mb-3 border-white/10 text-muted-foreground"
                  >
                    {getCategoryIcon(supplier.category)}{" "}
                    {getCategoryLabel(supplier.category)}
                  </Badge>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {supplier.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-accent-warm fill-accent-warm" />
                      <span className="font-medium">{supplier.rating}</span>
                      <span className="text-muted-foreground">
                        ({supplier.reviewCount})
                      </span>
                    </div>
                    <p className="text-sm">
                      <span className="text-muted-foreground">From </span>
                      <span className="font-semibold">
                        ${supplier.rate.min.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  {supplier.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent-warm/10 text-accent-warm border-0">
                        Featured
                      </Badge>
                    </div>
                  )}
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSuppliers.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg mb-4">
              No suppliers found matching your criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setSelectedCategory(null);
              }}
              className="border-white/10"
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-12 w-80 bg-white/5 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-white/5 rounded-lg mx-auto animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-panel p-6 animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5" />
                <div>
                  <div className="h-5 w-32 bg-white/5 rounded mb-2" />
                  <div className="h-4 w-24 bg-white/5 rounded" />
                </div>
              </div>
              <div className="h-6 w-24 bg-white/5 rounded mb-3" />
              <div className="h-12 w-full bg-white/5 rounded" />
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
