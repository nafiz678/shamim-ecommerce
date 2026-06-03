import "./shop.css";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Apple,
  ArrowRight02FreeIcons,
  ShoppingCart02Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import type { CategoryProp } from "../../lib/types";
import { useMemo } from "react";
import { cn } from "../../lib/utils";
import { pricePresets } from "./shop-data";
import { Button } from "../../components/ui/Button";

type PriceRange = {
  min: number;
  max: number;
};

export type ShopSidebarProps = {
  categories: CategoryProp[];
  brands: (string | null)[];
  selectedCategory: string | null;
  selectedBrands: (string | null)[];
  priceRange: PriceRange;
  onCategoryChange: (category: string | null) => void;
  onBrandChange: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  onPriceRangeChange: React.Dispatch<React.SetStateAction<PriceRange>>;
};

export default function ShopSidebar({
  categories,
  brands,
  selectedCategory,
  selectedBrands,
  priceRange,
  onCategoryChange,
  onBrandChange,
  onPriceRangeChange,
}: ShopSidebarProps) {
  const activePreset = pricePresets.find(
    (preset) => preset.min === priceRange.min && preset.max === priceRange.max,
  );
  return (
    <div>
      {/* category */}
      <div className="w-full">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide">
          Category
        </h3>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onCategoryChange(null)}
            className="flex w-full items-center gap-3 text-left text-xs font-medium text-foreground/60 hover:text-foreground"
          >
            <span
              className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                !selectedCategory
                  ? "border-secondary bg-secondary"
                  : "border-border"
              }`}
            >
              {!selectedCategory && (
                <span className="size-2 rounded-full bg-background" />
              )}
            </span>

            <span>All Categories</span>
          </button>

          {categories.map((category) => {
            const isActive = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(isActive ? null : category.id)}
                className="flex w-full items-center gap-3 text-left text-xs font-medium text-foreground/60 hover:text-foreground"
              >
                <span
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full border ${
                    isActive ? "border-secondary bg-secondary" : "border-border"
                  }`}
                >
                  {isActive && (
                    <span className="size-2 rounded-full bg-background" />
                  )}
                </span>

                <span className={isActive ? "text-foreground" : ""}>
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full h-px bg-border my-6" />

      {/* price range */}
      <div className="w-full">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide">
          Price Range
        </h3>
        <PriceRangeFilter
          priceRange={priceRange}
          onPriceRangeChange={onPriceRangeChange}
        />
        <div className="mt-1">
          {pricePresets.map((preset) => {
            const isActive = activePreset?.label === preset.label;

            return (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  onPriceRangeChange({
                    min: preset.min,
                    max: preset.max,
                  })
                }
                className={`group flex w-full items-center gap-3 rounded-sm px-1 py-1.5 text-left md:text-xs text-xxs font-medium text-foreground/60 transition-colors duration-300
               hover:text-foreground cursor-pointer`}
              >
                {/* Radio */}
                <span
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isActive
                      ? "border-secondary border-2"
                      : "border-[#c7d0d6] bg-background"
                  }`}
                ></span>

                {/* Label */}
                <span
                  className={`transition-colors ${
                    isActive ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  {preset.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* popular brands */}
      <div className="w-full mt-5">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide">
          Popular Brands
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {!brands.length && (
            <p className="text-xxs text-foreground/70">No brands available.</p>
          )}
          {brands.map((brand) => {
            const isActive = selectedBrands.includes(brand);

            return (
              <button
                key={brand}
                type="button"
                onClick={() =>
                  onBrandChange((prev) =>
                    isActive
                      ? prev.filter((b) => b !== brand)
                      : [...prev, brand],
                  )
                }
                className="flex items-center gap-2 text-xs text-foreground/70 hover:text-foreground"
              >
                <span
                  className={`flex size-4 items-center justify-center rounded border ${
                    isActive ? "border-secondary bg-secondary" : "border-border"
                  }`}
                >
                  {isActive && (
                    <HugeiconsIcon
                      icon={Tick02Icon}
                      className="size-3 text-background"
                    />
                  )}
                </span>

                <span
                  className={cn(
                    "text-nowrap truncate capitalize cursor-pointer",
                    isActive ? "text-foreground" : "text-foreground/70",
                  )}
                >
                  {brand}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-6 w-full"
        onClick={() => {
          onCategoryChange(null);

          onBrandChange([]);

          onPriceRangeChange({
            min: 0,
            max: 5000,
          });
        }}
      >
        Clear Filters
      </Button>

      {/* popular tag */}
      <div className="w-full mt-5">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide">
          Popular Tag
        </h3>

        {/* <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const isActive = selectedTags.includes(tag);

            return (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  setSelectedTags((prev) =>
                    isActive ? prev.filter((t) => t !== tag) : [...prev, tag],
                  )
                }
                className={`px-2.5 py-1 text-xxs rounded-xs border transition-all duration-200
            ${
              isActive
                ? "border-secondary text-secondary bg-orange-50"
                : "border-border text-foreground/70 hover:border-gray-400"
            }`}
              >
                {tag}
              </button>
            );
          })}
        </div> */}
      </div>

      {/* apple banner */}
      <div className="w-full mt-5">
        <article className="border-4 border-secondary/30 p-1 sm:p-6 lg:p-8 flex items-center justify-center flex-col">
          <img
            src="/assets/images/brands/apple-watch.png"
            alt="Apple Watch Series 7"
            width={260}
            height={260}
            loading="lazy"
            decoding="async"
            className="mb-3 object-contain"
          />

          <div className="mb-2 flex items-center justify-center flex-col">
            <h3 className="text-lg sm:text-2xl uppercase flex items-center justify-center font-bold size-full gap-1">
              <HugeiconsIcon
                className="size-5 sm:size-6 mb-1"
                fill="var(--color-foreground)"
                icon={Apple}
              />{" "}
              <span>Watch</span>
            </h3>

            <p className="mt-2 sm:mt-3 sm:text-xs text-xxs uppercase font-bold text-[#ef3b2d]">
              Series 7
            </p>
          </div>

          <h2 className="mx-auto mb-3 text-base sm:text-lg text-center font-semibold leading-[1.2] text-foreground/70">
            Heavy on Features. Light on Price.
          </h2>

          <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <span className="text-xxs font-normal text-[#5f6670]">
              Only for:
            </span>

            <span className="rounded bg-badge px-2 py-1 text-xs font-semibold text-nowrap">
              $299 USD
            </span>
          </div>

          <div className="space-y-3 sm:space-y-4 w-full">
            <Button
              variant="secondary"
              leftIcon={ShoppingCart02Icon}
              className="uppercase w-full md:px-10 text-sxs rounded-xs sm:text-xxs font-semibold text-nowrap"
              iconClass="size-4"
            >
              Add to cart
            </Button>

            <Button
              rightIcon={ArrowRight02FreeIcons}
              variant="outline"
              className="border-2 border-secondary/70 w-full text-secondary font-semibold uppercase sm:text-xxs text-sxs rounded-xs hover:bg-secondary/20 text-nowrap"
            >
              View details
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}

type PriceRangeFilterProps = {
  minPrice?: number;
  maxPrice?: number;
  priceRange: {
    min: number;
    max: number;
  };
  onPriceRangeChange: React.Dispatch<
    React.SetStateAction<{
      min: number;
      max: number;
    }>
  >;
};

function PriceRangeFilter({
  minPrice = 0,
  maxPrice = 5000,

  priceRange,
  onPriceRangeChange,
}: PriceRangeFilterProps) {
  const minPercent = useMemo(() => {
    return ((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100;
  }, [priceRange.min, minPrice, maxPrice]);

  const maxPercent = useMemo(() => {
    return ((priceRange.max - minPrice) / (maxPrice - minPrice)) * 100;
  }, [priceRange.max, minPrice, maxPrice]);

  return (
    <div className="space-y-5">
      <div className="relative h-6">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-border" />

        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-secondary"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* Min Slider */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange.min}
          onChange={(e) => {
            const value = Number(e.target.value);

            onPriceRangeChange((prev) => ({
              ...prev,
              min: Math.min(value, prev.max - 1),
            }));
          }}
          className="range-slider"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange.max}
          onChange={(e) => {
            const value = Number(e.target.value);

            onPriceRangeChange((prev) => ({
              ...prev,
              max: Math.max(value, prev.min + 1),
            }));
          }}
          className="range-slider"
        />
      </div>

      {/* Inputs */}
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={minPrice}
          max={maxPrice}
          value={priceRange.min}
          onChange={(e) => {
            const value = Number(e.target.value);

            onPriceRangeChange((prev) => ({
              ...prev,
              min: Math.min(value, prev.max - 1),
            }));
          }}
          className="w-full rounded-sm border border-border bg-background px-3 py-2 text-xs outline-none"
        />

        <input
          type="number"
          min={minPrice}
          max={maxPrice}
          value={priceRange.max}
          onChange={(e) => {
            const value = Number(e.target.value);

            onPriceRangeChange((prev) => ({
              ...prev,
              max: Math.max(value, prev.min + 1),
            }));
          }}
          className="w-full rounded-sm border border-border bg-background px-3 py-2 text-xs outline-none"
        />
      </div>
    </div>
  );
}
