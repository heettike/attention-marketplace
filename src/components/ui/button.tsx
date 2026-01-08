import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-white/90 shadow-[0_1px_2px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-[0_1px_2px_rgba(239,68,68,0.3)]",
        outline:
          "border border-white/10 bg-transparent hover:bg-white/5 hover:border-white/20",
        secondary:
          "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/15",
        ghost:
          "hover:bg-white/5 text-muted-foreground hover:text-foreground",
        link: "text-accent-warm underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-accent-warm to-accent-green text-black font-semibold hover:opacity-90 shadow-[0_2px_8px_rgba(240,180,41,0.3)]",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded-md gap-1.5 px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
