import { useState } from 'react';
import './shop.css';
import { brands, categories, priceRanges, tags } from './shop-data';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Apple,
  ArrowRight02FreeIcons,
  CheckSquare,
  ShoppingCart02Icon,
} from '@hugeicons/core-free-icons';
import Button from '../../components/ui/Button';

export type ShopSidebarProps = {
  selectedCategory: string | null;
  selectedPriceRange: string | null;
  onCategoryChange: (category: string | null) => void;
  onPriceRangeChange: (range: string | null) => void;
};

export default function ShopSidebar({
  selectedCategory = 'Electronics Devices',
  selectedPriceRange = 'All Price',
  onCategoryChange,
  onPriceRangeChange,
}: ShopSidebarProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([
    'Apple',
    'Microsoft',
    'Sony',
    'Symphony',
  ]);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Graphics Card']);
  return (
    <div>
      {/* category */}
      <div className="w-full">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide">
          Category
        </h3>

        <div className="space-y-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(isActive ? null : category)}
                className="flex w-full items-center gap-3 text-left md:text-xs text-xxs font-medium text-foreground/60 transition-colors duration-300
               hover:text-foreground"
              >
                <span
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isActive
                      ? 'border-secondary bg-secondary'
                      : 'border-[#c7d0d6] bg-background'
                  }`}
                >
                  {isActive && (
                    <span className="size-2 rounded-full bg-background" />
                  )}
                </span>

                <span className={isActive ? 'text-foreground' : ''}>
                  {category}
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
        <PriceRangeFilter />
        <div className="space-y-2">
          {priceRanges.map((range) => {
            const isActive = selectedPriceRange === range;

            return (
              <button
                key={range}
                type="button"
                onClick={() => onPriceRangeChange(isActive ? null : range)}
                className="flex w-full items-center gap-3 text-left md:text-xs text-xxs font-medium text-foreground/60 transition-colors duration-300
               hover:text-foreground"
              >
                <span
                  className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isActive
                      ? 'border-secondary border-2'
                      : 'border-[#c7d0d6] bg-background'
                  }`}
                ></span>

                <span className={isActive ? 'text-foreground' : ''}>
                  {range}
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
          {brands.map((brand) => {
            const isActive = selectedBrands.includes(brand);

            return (
              <button
                key={brand}
                type="button"
                onClick={() =>
                  setSelectedBrands((prev) =>
                    isActive
                      ? prev.filter((b) => b !== brand)
                      : [...prev, brand],
                  )
                }
                className="flex items-center gap-2 md:text-xs text-xxs text-foreground/70 hover:text-foreground"
              >
                <span
                  className={`flex size-4 items-center justify-center rounded border transition-colors ${
                    isActive
                      ? 'bg-secondary border-secondary'
                      : 'border-border bg-background'
                  }`}
                >
                  {isActive && (
                    <span className="text-background text-xxs">
                      <HugeiconsIcon icon={CheckSquare} />
                    </span>
                  )}
                </span>

                <span className={isActive ? 'text-foreground' : ''}>
                  {brand}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* popular tag */}
      <div className="w-full mt-5">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wide">
          Popular Tag
        </h3>

        <div className="flex flex-wrap gap-3">
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
                ? 'border-secondary text-secondary bg-orange-50'
                : 'border-border text-foreground/70 hover:border-gray-400'
            }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
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
              />{' '}
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
              className="uppercase w-full md:w-auto md:px-10 text-sxs rounded-xs sm:text-xxs font-semibold text-nowrap"
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

function PriceRangeFilter() {
  const [min, setMin] = useState(18);
  const [max, setMax] = useState(67);

  return (
    <div className="flex flex-col items-center justify-start pt-2">
      <div className="relative w-full h-6">
        <div className="absolute left-0 right-0 top-2 h-0.5 bg-foreground/20 rounded-full" />
        <div
          className="absolute top-2 h-0.5 bg-secondary rounded-full"
          style={{ left: `${min}%`, right: `${100 - max}%` }}
        />

        <input
          type="range"
          min="0"
          max="100"
          value={min}
          onChange={(e) => setMin(Math.min(Number(e.target.value), max - 1))}
          className="range-thumb pointer-events-none absolute left-0 top-0 h-5 w-full appearance-none bg-transparent"
        />
        <input
          type="range"
          min="0"
          max="100"
          value={max}
          onChange={(e) => setMax(Math.max(Number(e.target.value), min + 1))}
          className="range-thumb pointer-events-none absolute left-0 top-0 h-5 w-full appearance-none bg-transparent"
        />
      </div>

      <div className="my-2 flex items-center justify-center gap-3">
        <input
          placeholder="Min price"
          className="w-1/2 py-2 rounded-sm border border-[#dfe5e8] bg-background px-3.75 text-xs font-normal text-[#6f858f] outline-none placeholder:text-[#6f858f]"
        />
        <input
          placeholder="Max price"
          className="w-1/2 py-2 rounded-sm border border-[#dfe5e8] bg-background px-3.75 text-xs font-normal text-[#6f858f] outline-none placeholder:text-[#6f858f]"
        />
      </div>
    </div>
  );
}
