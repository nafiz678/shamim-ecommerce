import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeVariant =
  | 'discount'
  | 'hot'
  | 'sold_out'
  | 'default'
  | 'sale'
  | 'best_deals';

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const badgeStyles: Record<BadgeVariant, string> = {
  discount: 'bg-yellow-400 text-neutral-900',
  hot: 'bg-red-500 text-background',
  sold_out: 'bg-slate-500 text-foreground',
  default: 'bg-badge text-gray-800',
  sale: 'bg-[#2DB224] text-background',
  best_deals: 'bg-text-primary text-background',
};

export function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-xs px-2 py-1 text-sm  uppercase tracking-wide',
        badgeStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
