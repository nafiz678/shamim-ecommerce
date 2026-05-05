import { Link } from '@tanstack/react-router';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
  AlertCircleIcon,
  Calling02Icon,
  HeadphonesIcon,
  Location04Icon,
  ReloadIcon,
} from '@hugeicons/core-free-icons';
import TopHeading from './top-header';
import Dropdown from '../ui/Dropdown';
import { useState } from 'react';
import type { Option } from '../../lib/type';
import { HeaderLogo } from '../icons/Icon';
import { SearchInput } from '../ui/search-input';
import HeaderActions from './heading-popover';

export default function Heading() {
  return (
    <div>
      <TopHeading />

      <div className="bg-primary text-background flex items-center justify-between border-t border-border/20">
        <div className="lg:w-[70%] w-[95%] mx-auto flex items-center justify-between py-3 md:gap-8 gap-4">
          {/* logo */}
          <Link
            to="/"
            className="flex shrink-0 items-center justify-center gap-2"
          >
            <HeaderLogo className="size-6 md:size-10" />
            <h2 className="text-lg font-semibold md:text-2xl">SHAMIM</h2>
          </Link>

          {/* search */}
          <div className="flex w-full flex-1 items-center justify-center sm:w-auto">
            <SearchInput />
          </div>

          {/* profile cart */}
          <div className="shrink-0">
            <HeaderActions />
          </div>
        </div>
      </div>

      <BottomHeader />
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
    <div className="flex items-center justify-between border-b border-border py-1">
      <div className="lg:w-[70%] w-[95%] mx-auto">  
        <div className="flex flex-col gap-3 py-2 md:flex-row md:items-center md:justify-between">
          {/* all menus */}
          <div className="flex max-w-full flex-wrap items-center gap-2 sm:gap-3 text-xxs md:gap-4 md:text-xs">
            <Dropdown
              label=""
              value={category}
              options={categoryOptions}
              onChange={setCategory}
              className="flex items-center whitespace-nowrap rounded-xs bg-muted px-2 py-1.5 text-foreground sm:px-3 md:px-3.5 md:py-2.5"
              itemClassName="text-xxs"
              dropdownWidth="content"
              align="left"
            />

            {quickLinks.map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap text-foreground/60 hover:text-foreground"
              >
                <HugeiconsIcon
                  className="size-3 sm:size-4 md:size-5"
                  icon={icon}
                />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* cta call */}
          <button
            type="button"
            className="flex cursor-pointer items-center justify-start gap-2 text-xs md:justify-center md:text-sm"
          >
            <HugeiconsIcon icon={Calling02Icon} className="size-4 md:size-5" />
            <span className="whitespace-nowrap">+1-202-555-0104</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const quickLinks: { label: string; icon: IconSvgElement }[] = [
  {
    label: 'Track Order',
    icon: Location04Icon,
  },
  {
    label: 'Compare',
    icon: ReloadIcon,
  },
  {
    label: 'Customer support',
    icon: HeadphonesIcon,
  },
  {
    label: 'Need Help',
    icon: AlertCircleIcon,
  },
];
