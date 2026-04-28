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

export default function SearchAndSort({ query, setQuery, sortBy, setSortBy }: SearchSortProp) {
  return (
    <div className="flex w-full items-center justify-between gap-6">
      <div className="relative w-full max-w-100">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for anything..."
          className="w-full border border-border px-5.25 pr-16 text-[19px] font-normal text-[#22313a] shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none transition-all duration-200 placeholder:text-[#7b8f9b] focus:border-[#c7d3da] focus:shadow-[0_0_0_4px_rgba(124,144,155,0.12)] rounded-xs py-1.5 placeholder:text-xs"
        />

        <HugeiconsIcon
          icon={Search}
          className="absolute right-5.25 top-1/2 size-5 -translate-y-1/2 text-[#151f26] pointer-events-none"
          strokeWidth={2}
        />
      </div>

      <div className="flex items-center gap-7">
        <span className="text-xs w-full font-medium text-foreground/80 text-nowrap">
          Sort by:
        </span>

        <div className="flex items-center border border-[#dfe6ea] bg-white px-3 rounded-xs">
          <Dropdown
            label=""
            value={sortBy}
            options={sortOptions}
            onChange={(value) => setSortBy(value as SortBy)}
            className="w-full text-xs text-foreground/70 text-nowrap py-2.5"
          />
        </div>
      </div>
    </div>
  );
}
