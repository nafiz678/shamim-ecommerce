import { Link } from '@tanstack/react-router';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  Calling02Icon,
  FavouriteIcon,
  HeadphonesIcon,
  Location04Icon,
  ReloadIcon,
  ShoppingCart02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import TopHeading from './top-header';
import { SearchInput } from '../ui/Search-input';
import Dropdown from '../ui/Dropdown';
import { useState } from 'react';
import type { Option } from '../../lib/type';

export default function Heading() {
  return (
    <div>
      <TopHeading />

      <div className="bg-primary text-white flex items-center justify-between border-t border-white/20">
        <div className="md:w-[70%] w-[95%] mx-auto flex items-center justify-between py-3 gap-8">
          {/* logo */}
          <Link to="/" className="flex items-center justify-center gap-2">
            <svg
              width="38"
              height="38"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 0c13.255 0 24 10.745 24 24S37.255 48 24 48 0 37.255 0 24 10.745 0 24 0m0 12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12m0 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16"
                fill="#fff"
              />
            </svg>
            <h2 className="text-2xl font-semibold">SHAMIM</h2>
          </Link>

          {/* search */}
          <div className="flex-1 flex items-center justify-center">
            <SearchInput />
          </div>

          {/* profile cart */}
          <div className="flex items-center justify-center gap-6">
            <HugeiconsIcon icon={ShoppingCart02Icon} />
            <HugeiconsIcon icon={FavouriteIcon} />
            <HugeiconsIcon icon={UserIcon} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-foreground/10 py-1">
        <div className="w-[70%] mx-auto">
          <BottomHeader />
        </div>
      </div>
    </div>
  );
}

export const categoryOptions: Option[] = [
  { value: 'all', label: 'All Category' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'home-garden', label: 'Home & Garden' },
  { value: 'beauty', label: 'Beauty & Personal Care' },
  { value: 'sports', label: 'Sports & Outdoors' },
  { value: 'toys', label: 'Toys & Games' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'books', label: 'Books' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'health', label: 'Health & Wellness' },
];

function BottomHeader() {
  const [category, setCategory] = useState('all');
  return (
    <div className="flex items-center justify-between py-2 ">
      {/* all menus */}
      <div className="flex items-center justify-center gap-4 text-xs">
        <Dropdown
          label=""
          value={category}
          options={categoryOptions}
          onChange={setCategory}
          className="flex items-center text-foreground px-3.5 py-2.5 bg-muted rounded-xs"
        />
        <div className="flex items-center justify-center gap-1 text-foreground/60">
          <HugeiconsIcon className="size-5" icon={Location04Icon} />
          <p>Track Order</p>
        </div>
        <div className="flex items-center justify-center gap-1 text-foreground/60">
          <HugeiconsIcon className="size-5" icon={ReloadIcon} />
          <p>Compare</p>
        </div>
        <div className="flex items-center justify-center gap-1 text-foreground/60">
          <HugeiconsIcon className="size-5" icon={HeadphonesIcon} />
          <p>Customer support</p>
        </div>
        <div className="flex items-center justify-center gap-1 text-foreground/60">
          <HugeiconsIcon className="size-5" icon={AlertCircleIcon} />
          <p>Need Help</p>
        </div>
      </div>

      {/* cta call */}
      <div className="flex items-center justify-center gap-2 text-sm">
        <HugeiconsIcon icon={Calling02Icon} className="size-5" />
        <p>+1-202-555-0104</p>
      </div>
    </div>
  );
}
