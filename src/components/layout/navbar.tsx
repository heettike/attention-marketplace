"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/", label: "home" },
  { href: "/marketplace", label: "marketplace" },
  { href: "/launch", label: "launch" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-semibold tracking-tight">noice</span>
          </Link>

          {/* nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* actions */}
          <div className="flex items-center gap-3">
            <Link href="/marketplace" className="text-sm text-muted-foreground hover:text-foreground hidden sm:block">
              become a supplier
            </Link>
            <Button size="sm" variant="outline" className="text-sm">
              connect wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
