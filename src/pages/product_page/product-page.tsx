import {
  Add01Icon,
  ArrowReloadHorizontalIcon,
  FavouriteIcon,
  MinusSignIcon,
  ShoppingCart02FreeIcons,
  Copy01Icon,
  TwitterIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useState } from 'react';
import ProductCarousel from './carousal/product-carousal';
import type { EmblaOptionsType } from 'embla-carousel';
import './carousal/carousal.css';
import { Badge } from '../../components/ui/badge';
import Dropdown from '../../components/ui/Dropdown';
import Button from '../../components/ui/Button';

export default function ProductsDetailsPage() {
  const [selectedSize, setSelectedSize] = useState(
    '14-inch-liquid-retina-xdr-display',
  );
  const [selectedMemory, setSelectedMemory] = useState('16gb-unified-memory');
  const [selectedStorage, setSelectedStorage] = useState('1tb-ssd-storage');
  const OPTIONS: EmblaOptionsType = { loop: true, dragFree: true };
  // grid items-start gap-8 lg:gap-12 py-4 sm:py-6 box-border grid-cols-1 lg:grid-cols-12 w-full
  return (
    <div className="w-full md:w-[90%] lg:w-[85%] xl:w-[70%] mx-auto flex lg:p-0 px-2">
      <div className="grid items-start gap-8 lg:gap-12 py-4 sm:py-6 box-border grid-cols-1 lg:grid-cols-12 w-full">
        {/* Left gallery */}
        <div className="col-span-6">
          <div className="flex w-full items-center justify-center">
            <div className="relative flex w-full items-center justify-center">
              <img
                src={'/assets/images/products/product-page.png'}
                alt="MacBook Pro"
                className="h-auto max-w-full rounded-md object-contain"
              />
            </div>
          </div>

          <ProductCarousel slides={ProductImage} options={OPTIONS} />
        </div>

        {/* Right details */}
        <div className="col-span-6 ">
          <div className="flex items-center gap-1">
            <div className="flex text-secondary text-lg leading-none tracking-[1px]">
              ★★★★★
            </div>
            <div className="text-xs text-[#27313d] font-semibold ml-0.5">
              4.7 Star Rating
            </div>
            <div className="text-xxs text-foreground/60">
              (21,671 User feedback)
            </div>
          </div>

          <h1 className="mt-1.5 text-base font-normal text-[#1d2733]">
            2020 Apple MacBook Pro with Apple M1 Chip (13-inch, 8GB RAM,
            <br />
            256GB SSD Storage) -Space Gray
          </h1>

          <div className="mt-3.5 grid grid-cols-2 gap-2 text-xxs leading-none">
            <div>
              <span className="text-foreground/60">Sku:</span>{' '}
              <span className="font-semibold text-[#1d2733]">A264671</span>
            </div>
            <div>
              <span className="text-foreground/60">Availability:</span>{' '}
              <span className="font-semibold text-[#17a24a]">In Stock</span>
            </div>
            <div>
              <span className="text-foreground/60">Brand:</span>{' '}
              <span className="font-semibold text-[#1d2733]">Apple</span>
            </div>
            <div>
              <span className="text-foreground/60">Category:</span>{' '}
              <span className="font-semibold text-[#1d2733]">
                Electronics Devices
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-[18px] leading-none font-semibold text-[#1787e8]">
              $1699
            </span>
            <span className="text-[12px] line-through text-[#9ba3ad]">
              $1999.00
            </span>
            <Badge variant="discount" className="bg-accent text-xxs font-bold">
              21% OFF
            </Badge>
          </div>

          <div className="mt-4.5 h-px bg-border w-full" />

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div>
              <div className="text-xxs font-medium mb-2">Color</div>
              <div className="flex gap-2.5 items-center">
                <div className="size-8 rounded-full border-2 border-secondary flex items-center justify-center">
                  <div className="size-5.5 rounded-full bg-foreground/40" />
                </div>
                <div className="size-5.5 rounded-full bg-foreground/40" />
              </div>
            </div>

            <div className="">
              <div className="text-xxs font-medium mb-2 text-foreground/80">
                Size
              </div>
              <Dropdown
                onChange={(value) => setSelectedSize(value)}
                options={sizeOptions}
                value={selectedSize}
                className="border border-border text-nowrap text-xxs text-foreground/60 py-2 rounded-xs"
              />
            </div>

            <div>
              <div className="text-xxs font-medium text-[#34404d] mb-2">
                Memory
              </div>
              <Dropdown
                onChange={(value) => setSelectedMemory(value)}
                options={memoryOptions}
                value={selectedMemory}
                className="border border-border text-nowrap text-xxs text-foreground/60 py-2 rounded-xs"
              />
            </div>

            <div>
              <div className="text-xxs font-medium text-[#34404d] mb-2">
                Storage
              </div>
              <Dropdown
                onChange={(value) => setSelectedStorage(value)}
                options={storageOptions}
                value={selectedStorage}
                className="border border-border text-nowrap text-xxs text-foreground/60 py-2 rounded-xs"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
            <div className="border-2 border-border flex items-center justify-between gap-7 px-2.5 py-2.5 sm:w-auto w-full">
              <HugeiconsIcon icon={MinusSignIcon} size={13} strokeWidth={1.9} />
              <span className="text-[12px]">01</span>
              <HugeiconsIcon icon={Add01Icon} size={13} strokeWidth={1.9} />
            </div>

            <Button
              variant="secondary"
              rightIcon={ShoppingCart02FreeIcons}
              className="text-sm font-semibold px-6 sm:px-8 lg:px-6 xl:px-14 rounded-xs w-full sm:w-auto whitespace-nowrap"
            >
              ADD TO CART
            </Button>

            <Button
              variant="outline"
              className="border-2 border-secondary/80 rounded-xs text-secondary font-semibold w-full sm:w-auto whitespace-nowrap"
            >
              BUY NOW
            </Button>
          </div>

          <div className="mt-6 flex sm:flex-row flex-col sm:items-center items-end justify-between text-xxs text-foreground/70 gap-3">
            <div className="flex items-center sm:flex-row flex-col sm:gap-5 gap-3">
              <div className="flex items-center gap-1 whitespace-nowrap">
                <HugeiconsIcon icon={FavouriteIcon} className="size-4" /> Add to
                Wishlist
              </div>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <HugeiconsIcon
                  icon={ArrowReloadHorizontalIcon}
                  size={13}
                  strokeWidth={1.7}
                />{' '}
                Add to Compare
              </div>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span>Share product:</span>
              <HugeiconsIcon
                icon={Copy01Icon}
                className="text-foreground/70 size-4 scale-y-[-1]"
              />
              <div className="size-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#a)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0"
                      fill="#fa8232"
                    />
                    <path
                      d="M9.041 15.933v-6.18h1.744l.231-2.176H9.041l.003-1.089c0-.567.054-.871.87-.871h1.09V3.441H9.26c-2.095 0-2.832 1.056-2.832 2.83v1.306H5.122v2.176h1.306v6.092a8 8 0 0 0 2.613.088"
                      fill="#fff"
                    />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h16v16H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <HugeiconsIcon
                icon={TwitterIcon}
                className="text-foreground/40 size-4 fill-foreground/60"
              />
              <div className="size-4">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#a)">
                    <path
                      d="M7.024.054C4.365.35 1.716 2.5 1.606 5.574c-.068 1.877.464 3.284 2.25 3.68.775-1.368-.25-1.67-.41-2.658C2.793 2.544 8.122-.22 10.91 2.609c1.93 1.96.66 7.986-2.452 7.36-2.981-.599 1.459-5.396-.92-6.338-1.935-.766-2.962 2.342-2.045 3.885C4.954 10.17 3.797 12.671 4.265 16c1.52-1.102 2.033-3.215 2.453-5.417.764.464 1.172.946 2.146 1.021 3.595.278 5.602-3.588 5.112-7.154C13.54 1.288 10.384-.321 7.024.054"
                      fill="#5f6c72"
                    />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M0 0h16v16H0z" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4.75 border border-border px-4 py-4">
            <div className="text-[8px] font-semibold text-[#1f2a35] mb-2">
              100% Guarantee Safe Checkout
            </div>
            <img
              src="/assets/images/products/Payment-Method.png"
              alt=""
              className="w-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductImage: { id: number; title: string; image: string }[] = [
  {
    id: 1,
    title: 'Electronics',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Fashion',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Home & Living',
    image: '/placeholder.svg',
  },
  {
    id: 4,
    title: 'Beauty',
    image: '/placeholder.svg',
  },
  {
    id: 5,
    title: 'Sports',
    image: '/placeholder.svg',
  },
  {
    id: 6,
    title: 'Toys',
    image: '/placeholder.svg',
  },
  {
    id: 7,
    title: 'Books',
    image: '/placeholder.svg',
  },
  {
    id: 8,
    title: 'Groceries',
    image: '/placeholder.svg',
  },
  {
    id: 9,
    title: 'Furniture',
    image: '/placeholder.svg',
  },
  {
    id: 10,
    title: 'Shoes',
    image: '/placeholder.svg',
  },
];

const sizeOptions: { label: string; value: string }[] = [
  { label: '13-inch Retina display', value: '13-inch-retina-display' },
  {
    label: '14-inch Liquid Retina XDR display',
    value: '14-inch-liquid-retina-xdr-display',
  },
  {
    label: '16-inch Liquid Retina XDR display',
    value: '16-inch-liquid-retina-xdr-display',
  },
];

const memoryOptions: { label: string; value: string }[] = [
  { label: '8GB unified memory', value: '8gb-unified-memory' },
  { label: '16GB unified memory', value: '16gb-unified-memory' },
  { label: '32GB unified memory', value: '32gb-unified-memory' },
];

const storageOptions: { label: string; value: string }[] = [
  { label: '256GB SSD Storage', value: '256gb-ssd-storage' },
  { label: '512GB SSD Storage', value: '512gb-ssd-storage' },
  { label: '1TB SSD Storage', value: '1tb-ssd-storage' },
  { label: '2TB SSD Storage', value: '2tb-ssd-storage' },
];
