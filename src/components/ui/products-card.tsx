import { HugeiconsIcon } from '@hugeicons/react';
import {
  FavouriteIcon,
  ShoppingCart02Icon,
  StarIcon,
  ViewIcon,
} from '@hugeicons/core-free-icons';
import type { ProductProps } from '../../lib/type';
import { Badge, type BadgeVariant } from './badge';
import { Link } from '@tanstack/react-router';

type ProductCardProps = {
  product: ProductProps;
  className?: string;
  featured?: boolean;
};

export default function ProductsCard({
  product,
  className = '',
  featured,
}: ProductCardProps) {
  return (
    <article
      className={`group relative font-sans border border-border p-3 space-y-2 ${className} ${featured ? 'hover:shadow-[0px_8px_24px_0px_rgba(25,28,31,0.12)] transition-shadow duration-200 ease-linear' : ''}`}
    >
      <div className="absolute left-2.5 top-3 z-10 flex flex-col gap-1">
        {product.discount_percent !== null && (
          <Badge className="text-xxs font-semibold" variant="discount">
            {product.discount_percent}% OFF
          </Badge>
        )}

        {product.tags?.map((tag) => (
          <Badge
            key={tag}
            className="text-xxs font-semibold"
            variant={tag.toLowerCase().replaceAll(' ', '_') as BadgeVariant}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="relative flex items-start justify-center ">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.image}
          loading="lazy"
          decoding="async"
          className="max-w-full object-contain rounded-xs group-hover:brightness-80 transition-[filter] duration-200 ease-linear"
        />

        <div className="absolute top-1/2 -translate-1/2 left-1/2 size-8 flex items-center justify-center rounded-full w-fit gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-linear">
          <HugeiconsIcon
            icon={FavouriteIcon}
            className="bg-background hover:bg-secondary hover:text-background cursor-pointer p-2 rounded-full md:size-10 size-7 transition-colors duration-200 ease-in-out"
          />
          <HugeiconsIcon
            icon={ShoppingCart02Icon}
            className="bg-background hover:bg-secondary hover:text-background cursor-pointer p-2 rounded-full md:size-10 size-7 transition-colors duration-200 ease-in-out"
          />
          <Link
            to={'/shop/$productId'}
            params={{ productId: 'product_details' }}
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
                className={`size-3 text-secondary ${product.rating ? 'fill-secondary' : 'fill-transparent'}`}
              />
            ))}

            <span className="ml-0.5 text-xs text-text/50 leading-[100%]">
              ({product.reviews_count?.toLocaleString() ?? 0})
            </span>
          </div>
        )}
        <h3 className="text-xs font-normal text-foreground/90 overflow-hidden text-ellipsis line-clamp-2">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 text-xs">
          {product.original_price !== null && (
            <span className="text-xs font-semibold text-foreground/50 line-through">
              ${product.original_price.toFixed(2)}
            </span>
          )}

          <span className="text-xs font-semibold text-text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </article>
  );
}
