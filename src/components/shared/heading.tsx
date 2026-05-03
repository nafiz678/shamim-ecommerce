import { Link } from '@tanstack/react-router';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
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
import { HeaderLogo } from '../icons/Icon';

export default function Heading() {
  return (
    <div>
      <TopHeading />

      <div className="bg-primary text-white flex items-center justify-between border-t border-white/20">
        <div className="lg:w-[70%] w-[95%] mx-auto flex items-center justify-between py-3 md:gap-8 gap-4">
          {/* logo */}
          <Link to="/" className="flex items-center justify-center gap-2">
            <HeaderLogo />
            <h2 className="md:text-2xl text-xl font-semibold">SHAMIM</h2>
          </Link>

          {/* search */}
          <div className="flex-1 flex items-center justify-center">
            <SearchInput />
          </div>

          {/* profile cart */}
          <div className="flex items-center justify-center gap-2 md:gap-5">
            <div className="relative">
              <HugeiconsIcon
                className="size-5 md:size-6"
                icon={ShoppingCart02Icon}
              />

              <span className="absolute -right-2 -top-2 flex size-3 sm:size-4 md:size-5 items-center justify-center rounded-full bg-background text-xxs font-semibold leading-none text-[#1f6f98]">
                2
              </span>
            </div>

            <HugeiconsIcon className="size-5 md:size-6" icon={FavouriteIcon} />

            <HugeiconsIcon className="size-5 md:size-6" icon={UserIcon} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-foreground/10 py-1">
        <div className="lg:w-[70%] w-[95%] mx-auto">
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
    <div className="flex md:items-center items-end flex-col md:flex-row justify-between py-2">
      {/* all menus */}
      <div className="flex items-center flex-wrap sm:justify-center justify-end md:gap-4 gap-1.5 md:text-xs sm:text-xxs text-[8px]">
        <Dropdown
          label=""
          value={category}
          options={categoryOptions}
          onChange={setCategory}
          className="flex items-center text-foreground md:px-3.5 px-1.5 md:py-2.5 py-1.5 bg-muted rounded-xs text-nowrap"
        />
        {quickLinks.map(({ label, icon }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-1 text-foreground/60 cursor-pointer"
          >
            <HugeiconsIcon className="md:size-5 size-3" icon={icon} />
            <p className="text-nowrap">{label}</p>
          </div>
        ))}
      </div>

      {/* cta call */}
      <div className="flex items-center justify-center gap-2 md:text-sm cursor-pointer text-xs">
        <HugeiconsIcon icon={Calling02Icon} className="md:size-5 size-4" />
        <p className="text-nowrap">+1-202-555-0104</p>
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
