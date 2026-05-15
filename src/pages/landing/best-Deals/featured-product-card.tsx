import { HugeiconsIcon } from "@hugeicons/react";
import type { ProductProps } from "../../../lib/types";

import {
  FavouriteIcon,
  ShoppingCart02Icon,
  StarIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";

import Button from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";

export function FeaturedProductCard({ product }: { product: ProductProps }) {
  const rating = Math.round(product.rating ?? 0);

  const image = product.images?.[0] ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/products/${product.images[0]}` : "/placeholder.svg";

  const discountPercent =
    product.old_price && product.old_price > product.price
      ? Math.round(
          ((product.old_price - product.price) / product.old_price) * 100,
        )
      : null;

  return (
    <article className="relative col-span-12 border-r border-border p-2 md:col-span-3 md:p-5">
      {discountPercent && (
        <Badge
          className="absolute left-2.5 top-3 z-10 text-xxs font-semibold"
          variant="discount"
        >
          {discountPercent}% OFF
        </Badge>
      )}

      {product.is_featured && (
        <Badge
          className="absolute left-3 top-10 z-10 text-xxs font-semibold"
          variant="hot"
        >
          Featured
        </Badge>
      )}

      <div className="flex items-center justify-center overflow-hidden rounded-xs">
        <img
          src={image}
          alt={product.title}
          loading="eager"
          decoding="async"
          className="size-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="space-y-2.5 pt-5">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <HugeiconsIcon
              key={index}
              icon={StarIcon}
              className="size-3 text-accent md:size-4"
              fill={index < rating ? "currentColor" : "transparent"}
            />
          ))}

          <span className="ml-0.5 text-xs leading-[100%] text-text/50">
            ({rating}/5)
          </span>
        </div>

        <h2 className="line-clamp-2 text-xs font-medium md:text-sm">
          {product.title}
        </h2>

        {product.brand && (
          <p className="text-xxs uppercase tracking-wide text-foreground/50">
            {product.brand}
          </p>
        )}

        <div className="flex items-center gap-2">
          {product.old_price !== null && (
            <span className="text-sm text-foreground/60 line-through md:text-base">
              ${product.old_price.toFixed(2)}
            </span>
          )}

          <span className="text-sm font-semibold text-text-primary md:text-base">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {product.description && (
          <p className="line-clamp-3 text-xxs text-foreground/50 md:text-xs">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between gap-1 pt-2 md:gap-3">
          <Button
            className="rounded bg-secondary/30 hover:bg-secondary/40"
            size="sm"
          >
            <HugeiconsIcon
              icon={FavouriteIcon}
              className="size-3.5 md:size-4"
            />
          </Button>

          <Button
            variant="secondary"
            className="rounded text-xxs font-medium"
            disabled={!product.is_active || product.stock <= 0}
          >
            <span className="flex items-center justify-center gap-1 md:gap-2">
              <HugeiconsIcon icon={ShoppingCart02Icon} className="size-4" />

              <span className="text-xxs">
                {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
              </span>
            </span>
          </Button>

          <Button
            className="rounded bg-secondary/30 hover:bg-secondary/40"
            size="sm"
          >
            <HugeiconsIcon icon={ViewIcon} className="size-3.5 md:size-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
