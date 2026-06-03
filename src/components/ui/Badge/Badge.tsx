import React from "react";
import { cn } from "../../../lib/utils";

export type BadgeVariant =
  | "discount"
  | "hot"
  | "sold_out"
  | "sale"
  | "best_deals";

export type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const badgeStyles: Record<BadgeVariant, string> = {
  discount: "bg-badge text-gray-800",
  hot: "bg-red-500 text-background",
  sold_out: "bg-slate-500 text-muted-foreground",
  sale: "bg-[#2DB224] text-background",
  best_deals: "bg-text-primary text-background",
};

export function Badge({
  children,
  variant = "discount",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full shrink-0 cursor-default items-center justify-center rounded-xs px-1.5 py-0.5 text-xxs uppercase tracking-wide sm:px-2 sm:py-1 sm:text-xs",
        badgeStyles[variant],
        className,
      )}
    >
      <span className="truncate">{children}</span>
    </span>
  );
}

Badge.displayName = "Badge";
