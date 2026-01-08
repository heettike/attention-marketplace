"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Wallet,
  Rocket,
  Sparkles,
  Twitter,
  Globe,
  Zap,
} from "lucide-react";

type Step = "connect" | "info" | "token" | "preview" | "success";

interface LaunchData {
  companyName: string;
  ticker: string;
  tagline: string;
  twitter: string;
  website: string;
}

export default function LaunchPage() {
  const [step, setStep] = useState<Step>("connect");
  const [isConnected, setIsConnected] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [data, setData] = useState<LaunchData>({
    companyName: "",
    ticker: "",
    tagline: "",
    twitter: "",
    website: "",
  });

  const handleConnect = () => {
    // Mock wallet connection
    setIsConnected(true);
    setStep("info");
  };

  const handleLaunch = async () => {
    setIsLaunching(true);
    // Mock launch delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLaunching(false);
    setStep("success");
  };

  const steps: { id: Step; label: string }[] = [
    { id: "connect", label: "Connect" },
    { id: "info", label: "Info" },
    { id: "token", label: "Token" },
    { id: "preview", label: "Preview" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 border-accent-warm/30 text-accent-warm"
          >
            <Rocket className="w-3.5 h-3.5 mr-2" />
            Token Launch
          </Badge>
          <h1 className="text-4xl font-bold mb-3">Launch your token</h1>
          <p className="text-muted-foreground">
            Deploy in minutes. Start earning from day one.
          </p>
        </motion.div>

        {/* Progress Steps */}
        {step !== "success" && (
          <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    index <= currentStepIndex
                      ? "bg-accent-warm text-black"
                      : "bg-white/5 text-muted-foreground"
                  }`}
                >
                  {index < currentStepIndex ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 transition-colors ${
                      index < currentStepIndex ? "bg-accent-warm" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === "connect" && (
            <motion.div
              key="connect"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent-warm/10 flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-8 h-8 text-accent-warm" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Connect your wallet</h2>
                <p className="text-muted-foreground mb-8">
                  Connect your wallet to launch a token on Base
                </p>
                <Button
                  size="lg"
                  onClick={handleConnect}
                  className="w-full max-w-xs bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Connect Wallet
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </GlassCard>
            </motion.div>
          )}

          {step === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard className="p-8">
                <h2 className="text-2xl font-semibold mb-6">
                  Tell us about your startup
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Company Name
                    </label>
                    <Input
                      placeholder="e.g. Cluely"
                      value={data.companyName}
                      onChange={(e) =>
                        setData({ ...data, companyName: e.target.value })
                      }
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      One-liner
                    </label>
                    <Input
                      placeholder="e.g. AI that thinks with you, not for you"
                      value={data.tagline}
                      onChange={(e) =>
                        setData({ ...data, tagline: e.target.value })
                      }
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Twitter className="w-4 h-4 inline mr-2" />
                        Twitter
                      </label>
                      <Input
                        placeholder="@handle"
                        value={data.twitter}
                        onChange={(e) =>
                          setData({ ...data, twitter: e.target.value })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Website
                      </label>
                      <Input
                        placeholder="https://"
                        value={data.website}
                        onChange={(e) =>
                          setData({ ...data, website: e.target.value })
                        }
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setStep("connect")}
                    className="border-white/10"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep("token")}
                    disabled={!data.companyName || !data.tagline}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {step === "token" && (
            <motion.div
              key="token"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Configure your token</h2>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Token Ticker
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        placeholder="CLUELY"
                        value={data.ticker}
                        onChange={(e) =>
                          setData({
                            ...data,
                            ticker: e.target.value.toUpperCase(),
                          })
                        }
                        className="bg-white/5 border-white/10 pl-7 uppercase"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  {/* Fixed Tokenomics Display */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-sm font-medium mb-4 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-accent-warm" />
                      Fixed Tokenomics
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total Supply</p>
                        <p className="font-semibold">1,000,000,000</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Trading Tax</p>
                        <p className="font-semibold">2%</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-sm text-muted-foreground mb-2">
                        Allocation
                      </p>
                      <div className="flex gap-2">
                        <div className="flex-1 h-3 rounded-full bg-accent-green/20 relative overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 bg-accent-green rounded-full"
                            style={{ width: "50%" }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs mt-2">
                        <span>50% Retail</span>
                        <span>40% Growth Wallet</span>
                        <span>10% Team</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setStep("info")}
                    className="border-white/10"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep("preview")}
                    disabled={!data.ticker}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {step === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Review & Launch</h2>

                {/* Preview Card */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-warm/20 to-accent-purple/20 flex items-center justify-center text-2xl font-bold">
                      {data.companyName[0] || "?"}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{data.companyName}</h3>
                      <p className="text-accent-warm">${data.ticker}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{data.tagline}</p>
                  <div className="flex gap-4 text-sm">
                    {data.twitter && (
                      <span className="text-muted-foreground">
                        <Twitter className="w-4 h-4 inline mr-1" />
                        {data.twitter}
                      </span>
                    )}
                    {data.website && (
                      <span className="text-muted-foreground">
                        <Globe className="w-4 h-4 inline mr-1" />
                        {data.website}
                      </span>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3 text-sm mb-8">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-muted-foreground">Network</span>
                    <span>Base</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-muted-foreground">Total Supply</span>
                    <span>1,000,000,000 ${data.ticker}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-muted-foreground">Trading Tax</span>
                    <span>2% (1.6% to you, 0.4% to Noice)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Launch Fee</span>
                    <span className="text-accent-green">Free</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("token")}
                    className="border-white/10"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleLaunch}
                    disabled={isLaunching}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isLaunching ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
                        Launching...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-2 w-4 h-4" />
                        Launch Token
                      </>
                    )}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <GlassCard className="p-8 text-center" variant="highlight">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 rounded-full bg-accent-green/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Sparkles className="w-10 h-10 text-accent-green" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-3">
                  ${data.ticker} is live!
                </h2>
                <p className="text-muted-foreground mb-8">
                  Your token has been deployed. Start sharing and watch the
                  attention roll in.
                </p>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 mb-8">
                  <p className="text-sm text-muted-foreground mb-2">
                    Your Growth Wallet
                  </p>
                  <p className="text-3xl font-bold text-gradient">$0.00</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Earnings from trading tax will appear here
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link href={`/company/cluely`}>
                    <Button
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      View Your Page
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/marketplace">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-white/10"
                    >
                      Browse Marketplace
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
