"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Wallet,
  Rocket,
  Sparkles,
  Globe,
  BookOpen,
  ExternalLink,
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
    setIsConnected(true);
    setStep("info");
  };

  const handleLaunch = async () => {
    setIsLaunching(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLaunching(false);
    setStep("success");
  };

  const steps: { id: Step; label: string }[] = [
    { id: "connect", label: "connect" },
    { id: "info", label: "info" },
    { id: "token", label: "token" },
    { id: "preview", label: "preview" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-xl mx-auto px-4">
        {/* header */}
        <div className="text-center mb-10">
          <p className="text-sm text-muted-foreground mb-2">token launch</p>
          <h1 className="text-3xl font-semibold mb-2">launch your token</h1>
          <p className="text-muted-foreground">
            deploy in minutes. start earning from day one.
          </p>
        </div>

        {/* progress steps */}
        {step !== "success" && (
          <div className="flex items-center justify-center gap-2 mb-10">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    index <= currentStepIndex
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground"
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
                    className={`w-8 h-0.5 mx-1 transition-colors ${
                      index < currentStepIndex ? "bg-foreground" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* step content */}
        <AnimatePresence mode="wait">
          {step === "connect" && (
            <motion.div
              key="connect"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard className="p-8 text-center">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-6">
                  <Wallet className="w-7 h-7 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">connect your wallet</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  connect your wallet to launch a token on base
                </p>
                <Button onClick={handleConnect} className="w-full max-w-xs">
                  connect wallet
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
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                  tell us about your startup
                </h2>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      company name
                    </label>
                    <Input
                      placeholder="e.g. cluely"
                      value={data.companyName}
                      onChange={(e) =>
                        setData({ ...data, companyName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      one-liner
                    </label>
                    <Input
                      placeholder="e.g. ai that thinks with you, not for you"
                      value={data.tagline}
                      onChange={(e) =>
                        setData({ ...data, tagline: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        twitter handle
                      </label>
                      <Input
                        placeholder="@handle"
                        value={data.twitter}
                        onChange={(e) =>
                          setData({ ...data, twitter: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        website
                      </label>
                      <Input
                        placeholder="https://"
                        value={data.website}
                        onChange={(e) =>
                          setData({ ...data, website: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <Button variant="outline" onClick={() => setStep("connect")}>
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    back
                  </Button>
                  <Button
                    onClick={() => setStep("token")}
                    disabled={!data.companyName || !data.tagline}
                    className="flex-1"
                  >
                    continue
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
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold mb-6">configure your token</h2>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      token ticker
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        $
                      </span>
                      <Input
                        placeholder="cluely"
                        value={data.ticker}
                        onChange={(e) =>
                          setData({
                            ...data,
                            ticker: e.target.value.toLowerCase(),
                          })
                        }
                        className="pl-7"
                        maxLength={10}
                      />
                    </div>
                  </div>

                  {/* fixed tokenomics */}
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium">fixed tokenomics</p>
                      <a
                        href="https://docs.noice.so/tokenomics"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent-warm hover:underline flex items-center gap-1"
                      >
                        <BookOpen className="w-3 h-3" />
                        learn more
                      </a>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">total supply</p>
                        <p className="font-mono">1,000,000,000</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">trading tax</p>
                        <p className="font-mono">2%</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">allocation</p>
                      <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                        <div className="w-[50%] bg-accent-green" />
                        <div className="w-[40%] bg-accent-warm" />
                        <div className="w-[10%] bg-muted-foreground" />
                      </div>
                      <div className="flex justify-between text-xs mt-2 text-muted-foreground">
                        <span>50% retail</span>
                        <span>40% growth wallet</span>
                        <span>10% team</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-8">
                  <Button variant="outline" onClick={() => setStep("info")}>
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    back
                  </Button>
                  <Button
                    onClick={() => setStep("preview")}
                    disabled={!data.ticker}
                    className="flex-1"
                  >
                    continue
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
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold mb-6">review & launch</h2>

                {/* preview card */}
                <div className="p-5 bg-secondary/50 rounded-lg mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-lg font-semibold">
                      {data.companyName[0] || "?"}
                    </div>
                    <div>
                      <h3 className="font-semibold">{data.companyName}</h3>
                      <p className="text-sm text-accent-warm">${data.ticker}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{data.tagline}</p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    {data.twitter && <span>@{data.twitter.replace("@", "")}</span>}
                    {data.website && (
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {data.website.replace("https://", "")}
                      </span>
                    )}
                  </div>
                </div>

                {/* summary */}
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">network</span>
                    <span>base</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">total supply</span>
                    <span className="font-mono">1,000,000,000 ${data.ticker}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">trading tax</span>
                    <span>2% (1.6% to you, 0.4% to noice)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">launch fee</span>
                    <span className="text-accent-green">free</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep("token")}>
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    back
                  </Button>
                  <Button
                    onClick={handleLaunch}
                    disabled={isLaunching}
                    className="flex-1"
                  >
                    {isLaunching ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background/20 border-t-background rounded-full animate-spin mr-2" />
                        launching...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-2 w-4 h-4" />
                        launch token
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
              <GlassCard className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-6"
                >
                  <Sparkles className="w-8 h-8 text-accent-green" />
                </motion.div>
                <h2 className="text-2xl font-semibold mb-2">
                  ${data.ticker} is live!
                </h2>
                <p className="text-muted-foreground mb-8">
                  your token has been deployed. start sharing and watch the
                  attention roll in.
                </p>

                <div className="p-4 bg-secondary/50 rounded-lg mb-8">
                  <p className="text-sm text-muted-foreground mb-1">
                    your growth wallet
                  </p>
                  <p className="text-3xl font-semibold">$0.00</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    earnings from trading tax will appear here
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link href={`/company/cluely`}>
                    <Button className="w-full">
                      view your page
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/marketplace">
                    <Button variant="outline" className="w-full">
                      browse marketplace
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
