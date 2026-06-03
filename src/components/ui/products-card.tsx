import { HugeiconsIcon } from "@hugeicons/react";
import {
  FavouriteIcon,
  ShoppingCart02Icon,
  StarIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { Link } from "@tanstack/react-router";
import type { ProductProps } from "../../lib/types";
import { Badge } from "./Badge/Badge";

type ProductCardProps = {
  product: ProductProps;
  className?: string;
  featured?: boolean;
};

function getDiscountPercent(
  price: number,
  oldPrice: number | null,
): number | null {
  if (!oldPrice || oldPrice <= price) return null;

  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export default function ProductsCard({
  product,
  className = "",
  featured = false,
}: ProductCardProps) {
  const imageUrl =
    product.images && product.images.length > 0
      ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/products/${product.images?.[0]}`
      : "/placeholder.svg";

  const discountPercent = getDiscountPercent(product.price, product.old_price);

  return (
    <article
      className={`group relative space-y-2 border border-border p-3 font-sans ${className} ${
        featured
          ? "transition-shadow duration-200 ease-linear hover:shadow-[0px_8px_24px_0px_rgba(25,28,31,0.12)]"
          : ""
      }`}
    >
      <div className="absolute left-2.5 top-3 z-10 flex flex-col gap-1">
        {discountPercent !== null && (
          <Badge className="text-xxs font-semibold" variant="discount">
            {discountPercent}% OFF
          </Badge>
        )}
      </div>

      <div className="relative flex items-start justify-center">
        <img
          src={imageUrl}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="max-w-full rounded-xs object-contain transition-[filter] duration-200 ease-linear group-hover:brightness-80"
        />

        <div className="absolute left-1/2 top-1/2 flex w-fit -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full opacity-0 transition-opacity duration-300 ease-linear group-hover:opacity-100">
          <HugeiconsIcon
            icon={FavouriteIcon}
            className="size-7 cursor-pointer rounded-full bg-background p-2 transition-colors duration-200 ease-in-out hover:bg-secondary hover:text-background md:size-10"
          />

          <HugeiconsIcon
            icon={ShoppingCart02Icon}
            className="size-7 cursor-pointer rounded-full bg-background p-2 transition-colors duration-200 ease-in-out hover:bg-secondary hover:text-background md:size-10"
          />

          <Link
            to="/shop/$slug"
            params={{ slug: product.slug }}
            className="inline-flex"
          >
            <HugeiconsIcon
              icon={ViewIcon}
              className="size-7 cursor-pointer rounded-full bg-background p-2 transition-colors duration-200 ease-in-out hover:bg-secondary hover:text-background md:size-10"
            />
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        {featured && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <HugeiconsIcon
                key={index}
                icon={StarIcon}
                className={`size-3 text-secondary ${
                  index < Math.round(product.rating)
                    ? "fill-secondary"
                    : "fill-transparent"
                }`}
              />
            ))}
          </div>
        )}

        <h3 className="line-clamp-2 overflow-hidden text-ellipsis text-xs font-normal text-foreground/90">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 text-xs">
          {product.old_price !== null && product.old_price > product.price && (
            <span className="text-xs font-semibold text-foreground/50 line-through">
              {formatPrice(product.old_price)}
            </span>
          )}

          <span className="text-xs font-semibold text-text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </article>
  );
}
