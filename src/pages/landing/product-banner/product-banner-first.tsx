import React from "react";
import { Button } from "../../../components/ui/Button";
import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons";
import { Badge } from "../../../components/ui/Badge/Badge";
import { cn } from "../../../lib/utils";

type BannerCardProps = {
  theme: "light" | "dark";
  label: string;
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
  imageClassName?: string;
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
  const isDark = theme === "dark";

  return (
    <article
      className={cn(
        "relative flex flex-col gap-6 overflow-hidden rounded p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 md:p-10",
        isDark ? "bg-foreground text-background" : "bg-muted text-foreground",
      )}
    >
      <div className="relative z-20 flex-1">
        <Badge variant="best_deals" className="px-3 py-1.5 text-xs">
          {label}
        </Badge>

        <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>

        <p
          className={cn(
            "mt-2 text-xs",
            isDark ? "text-background" : "text-muted-foreground",
          )}
        >
          {description}
        </p>

        <Button
          href="/shop"
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
        className={cn(
          "pointer-events-none z-10 mx-auto size-40 select-none object-contain sm:mx-0 sm:size-44",
          imageClassName,
        )}
      />

      {badge ? (
        <div className="absolute right-4 top-4 z-30 flex size-14 items-center justify-center rounded-full bg-text-primary text-base font-medium tracking-tight text-background sm:right-6 sm:top-6 sm:size-16 sm:text-lg">
          {badge}
        </div>
      ) : null}
    </article>
  );
});

export default function ProductBannerFirst() {
  return (
    <section className="grid grid-cols-1 gap-4 pt-10 sm:gap-6 md:grid-cols-2 md:pt-16">
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
        imageClassName="sm:absolute sm:-bottom-1 sm:-right-1 sm:size-64"
        badge="$590"
      />
    </section>
  );
}
