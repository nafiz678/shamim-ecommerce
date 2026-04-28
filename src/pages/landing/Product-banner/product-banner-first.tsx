import React from 'react';
import Button from '../../../components/ui/Button';
import { ArrowRight02FreeIcons } from '@hugeicons/core-free-icons';
import { Badge } from '../../../components/ui/badge';

type BannerCardProps = {
  theme: 'light' | 'dark';
  label: string;
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
  imageClassName: string;
  imageAlt: string;
  badge?: string;
};

const BannerCard = React.memo(function BannerCard({
  theme,
  label,
  title,
  description,
  imageClassName,
  imageAlt,
  badge,
  image,
}: BannerCardProps) {
  const isDark = theme === 'dark';

  return (
    <article
      className={`relative overflow-hidden rounded p-10 flex items-center justify-between ${isDark ? 'bg-foreground/95 ' : 'bg-muted'}`}
    >
      <div className={`relative z-20`}>
        <Badge variant="best_deals" className="text-xs px-3 py-1.5">
          {label}
        </Badge>

        <h2
          className={`mt-3 text-2xl font-semibold tracking-[-.03em] ${isDark ? 'text-background' : 'text-foreground'}`}
        >
          {title}
        </h2>

        <p
          className={`mt-2 text-xs ${isDark ? 'text-background/85' : 'text-foreground/50'}`}
        >
          {description}
        </p>

        <Button
          rightIcon={ArrowRight02FreeIcons}
          variant="secondary"
          className="mt-2 rounded-xs"
        >
          Shop Now
        </Button>
      </div>

      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className={`pointer-events-none select-none object-contain size-44 ${imageClassName}`}
      />

      {badge ? (
        <div className="absolute right-6 top-6 z-30 flex size-16 items-center justify-center rounded-full bg-text-primary text-lg font-medium tracking-[-.03em] text-white">
          {badge}
        </div>
      ) : null}
    </article>
  );
});

export default function ProductBannerFirst() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-16">
      <BannerCard
        image="/assets/images/products/apple.png"
        theme="light"
        label="Introducing"
        title={
          <>
            New Apple
            <br />
            Homepod Mini
          </>
        }
        description={
          <>
            Jam-packed with innovation,
            <br />
            HomePod mini delivers unexpectedly.
          </>
        }
        imageAlt="Apple HomePod Mini"
        imageClassName=""
      />

      <BannerCard
        image="/assets/images/products/xiaomi.png"
        theme="dark"
        label="Introducing New"
        title={
          <>
            Xiaomi Mi 11 Ultra
            <br />
            12GB+256GB
          </>
        }
        description={
          <>
            *Data provided by internal
            <br />
            laboratories. Industry measurement.
          </>
        }
        imageAlt="Xiaomi Mi 11 Ultra"
        imageClassName="absolute -bottom-1 -right-1 size-62"
        badge="$590"
      />
    </section>
  );
}
