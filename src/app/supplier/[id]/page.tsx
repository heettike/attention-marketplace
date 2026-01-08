"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import {
  getSupplierById,
  getCompanyById,
  SUPPLIER_CATEGORIES,
} from "@/lib/data";
import {
  ArrowLeft,
  Star,
  Clock,
  DollarSign,
  Twitter,
  Globe,
  ExternalLink,
  CheckCircle2,
  MessageSquare,
  Briefcase,
} from "lucide-react";

export default function SupplierPage() {
  const params = useParams();
  const supplier = getSupplierById(params.id as string);

  if (!supplier) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Supplier not found</h1>
          <Link href="/marketplace">
            <Button variant="outline">Back to marketplace</Button>
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
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/marketplace">
            <Button variant="ghost" className="text-muted-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to marketplace
            </Button>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Main Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-4xl">
                {supplier.name[0]}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{supplier.name}</h1>
                  {supplier.featured && (
                    <Badge className="bg-accent-warm/10 text-accent-warm border-0">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-accent-warm text-lg mb-2">{supplier.handle}</p>
                <Badge
                  variant="outline"
                  className="border-white/10 text-muted-foreground"
                >
                  {category?.icon} {category?.label}
                </Badge>
              </div>
            </div>

            <p className="text-xl text-muted-foreground mb-6">
              {supplier.tagline}
            </p>

            <p className="text-foreground/80 leading-relaxed mb-6">
              {supplier.bio}
            </p>

            <div className="flex items-center gap-4">
              <a
                href={supplier.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="border-white/10">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </a>
              {supplier.website && (
                <a
                  href={supplier.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="border-white/10">
                    <Globe className="w-4 h-4 mr-2" />
                    Website
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </a>
              )}
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-6 sticky top-28" variant="highlight">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-accent-warm fill-accent-warm" />
                <span className="text-xl font-bold">{supplier.rating}</span>
                <span className="text-muted-foreground">
                  ({supplier.reviewCount} reviews)
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>Rate</span>
                  </div>
                  <span className="font-semibold">
                    ${supplier.rate.min.toLocaleString()} - $
                    {supplier.rate.max.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Timeline</span>
                  </div>
                  <span className="font-semibold">{supplier.timeline}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span>Pricing</span>
                  </div>
                  <span className="font-semibold">{supplier.rate.unit}</span>
                </div>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mb-3">
                <MessageSquare className="w-4 h-4 mr-2" />
                Request Quote
              </Button>
              <Button variant="outline" className="w-full border-white/10">
                Schedule Call
              </Button>
            </GlassCard>
          </motion.div>
        </div>

        {/* Portfolio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Portfolio</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {supplier.portfolio.map((item, index) => (
              <GlassCard key={index} className="p-6">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                {item.metrics && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent-green" />
                    <span className="text-sm text-accent-green">
                      {item.metrics}
                    </span>
                  </div>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block"
                  >
                    <Button variant="ghost" size="sm">
                      View project
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </a>
                )}
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Clients on Noice */}
        {clients.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Worked with on Noice
            </h2>
            <div className="flex flex-wrap gap-4">
              {clients.map((company) => (
                <Link key={company!.id} href={`/company/${company!.id}`}>
                  <GlassCard className="p-4 flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-warm/20 to-accent-purple/20 flex items-center justify-center text-lg font-bold">
                      {company!.name[0]}
                    </div>
                    <div>
                      <p className="font-medium">{company!.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {company!.ticker}
                      </p>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* What You Get */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold mb-6">
              How payments work on Noice
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent-warm/10 flex items-center justify-center mb-4">
                  <span className="text-accent-warm font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Request a quote</h3>
                <p className="text-sm text-muted-foreground">
                  Describe your project and the supplier will send you a custom
                  proposal.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent-warm/10 flex items-center justify-center mb-4">
                  <span className="text-accent-warm font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Pay from your wallet</h3>
                <p className="text-sm text-muted-foreground">
                  Use your marketplace wallet balance (USDC or tokens) to fund
                  the project.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent-warm/10 flex items-center justify-center mb-4">
                  <span className="text-accent-warm font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Get results</h3>
                <p className="text-sm text-muted-foreground">
                  Supplier delivers the work. Payment is released upon your
                  approval.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
