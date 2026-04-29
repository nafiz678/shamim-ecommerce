import { HugeiconsIcon } from '@hugeicons/react';
import type { ProductProps } from '../../../lib/type';
import {
  FavouriteIcon,
  ShoppingCart02Icon,
  StarIcon,
  ViewIcon,
} from '@hugeicons/core-free-icons';
import Button from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/badge';

export function FeaturedProductCard({ product }: { product: ProductProps }) {
  const rating = Math.round(product.rating ?? 0);
  const tag = product.tags?.[0];
  return (
    <article className="relative col-span-3 border-r border-border p-5">
      {product.discount_percent && (
        <Badge
          className="absolute left-2.5 top-3 z-10 text-[10px] font-semibold"
          variant="discount"
        >
          {product.discount_percent}% OFF
        </Badge>
      )}

      {tag && (
        <Badge
          className="absolute left-3 top-10 z-10 text-[10px] font-semibold"
          variant="hot"
        >
          {tag}
        </Badge>
      )}

      <div className="flex items-center justify-center ">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.title}
          loading="eager"
          decoding="async"
          className="size-full object-contain rounded-xs"
        />
      </div>

      <div className="pt-5 space-y-2.5">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <HugeiconsIcon
              key={index}
              icon={StarIcon}
              className="size-4 text-accent"
              fill={index < rating ? 'currentColor' : 'transparent'}
            />
          ))}

          <span className="ml-0.5 text-xs text-text/50 leading-[100%]">
            ({product.reviews_count?.toLocaleString() ?? 0})
          </span>
        </div>

        <h2 className="line-clamp-2 text-xs font-base">{product.title}</h2>

        <div className=" flex items-center gap-2">
          {product.original_price !== null && (
            <span className="text-base text-foreground/60 line-through">
              ${product.original_price.toFixed(2)}
            </span>
          )}

          <span className="text-base font-semibold text-text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {product.description && (
          <p className="line-clamp-3 text-[11px] text-foreground/50">
            {product.description}
          </p>
        )}

        <div className="mt-2 flex items-center justify-between gap-3">
          <Button
            className="rounded bg-secondary/30 hover:bg-secondary/40"
            size="sm"
          >
            <HugeiconsIcon icon={FavouriteIcon} className="size-4" />
          </Button>

          <Button
            variant="secondary"
            className="rounded text-[10px] font-medium "
          >
            <span className="flex items-center justify-center gap-2">
              <HugeiconsIcon icon={ShoppingCart02Icon} className="size-4" />
              ADD TO CARD
            </span>
          </Button>

          <Button
            className="rounded bg-secondary/30 hover:bg-secondary/40"
            size="sm"
          >
            <HugeiconsIcon icon={ViewIcon} className="size-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
