import { HugeiconsIcon } from '@hugeicons/react';
import { Search } from '@hugeicons/core-free-icons';
import Dropdown from '../../components/ui/Dropdown';
import type { Dispatch, SetStateAction } from 'react';
import type { SortBy } from './shop-page';
const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export type SearchSortProp = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
};

export default function SearchAndSort({
  query,
  setQuery,
  sortBy,
  setSortBy,
}: SearchSortProp) {
  return (
    <div className="flex w-full items-center justify-between md:gap-6 gap-3">
      <div className="relative w-full max-w-100">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for anything..."
          className="w-full rounded-xs border border-border md:px-5.25 px-3 md:pr-16 pr-4 py-3 md:text-xs text-xxs font-normal text-[#22313a] shadow-sm outline-none transition-all duration-200 placeholder:text-xs placeholder:text-[#7b8f9b] focus:border-[#c7d3da] focus:shadow-lg"
        />

        <HugeiconsIcon
          icon={Search}
          className="absolute md:right-5.25 right-2 top-1/2 md:size-5 size-4 -translate-y-1/2 text-[#151f26] pointer-events-none"
          strokeWidth={2}
        />
      </div>

      <div className="flex items-center md:gap-7 gap-3">
        <span className="text-xs w-full font-medium text-foreground/80 text-nowrap">
          Sort by:
        </span>

        <div className="flex items-center  px-3 rounded-xs">
          <Dropdown
            label=""
            value={sortBy}
            options={sortOptions}
            onChange={(value) => setSortBy(value as SortBy)}
            className="w-full text-xs border border-[#dfe6ea] bg-white  text-foreground/70 text-nowrap md:py-2.5 py-2"
          />
        </div>
      </div>
    </div>
  );
}
