import { Apple, ArrowRight02FreeIcons, Play } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '../../lib/utils';

export default function Footer() {
  return (
    <footer className="bg-[#191C1F]">
      <div className="w-[70%] mx-auto">
        <div className="flex items-start justify-between gap-10 py-18">
          <section className="space-y-4 text-background">
            <div className="mb-3 flex items-center gap-3">
              <svg
                width="38"
                height="38"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M48 24c0 13.255-10.745 24-24 24S0 37.255 0 24 10.745 0 24 0s24 10.745 24 24m-12 0c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12m-12 8a8 8 0 1 0 0-16 8 8 0 0 0 0 16"
                  fill="#fa8232"
                />
              </svg>
              <h2 className="text-2xl font-bold ">SHAMIM</h2>
            </div>

            <div>
              <p className="text-xs font-medium leading-5 text-[#7f8a91]">
                Customer Supports:
              </p>
              <p className="text-sm font-medium leading-6 ">(629) 555-0129</p>
            </div>
            <p className="text-xs font-medium text-background/50">
              4517 Washington Ave.
              <br />
              <span className="text-nowrap">Manchester, Kentucky 39495</span>
            </p>
            <p className="text-sm font-medium ">info@kinbo.com</p>
          </section>

          <section className="text-background">
            <h3 className="mb-6 text-sm uppercase ">Top Category</h3>
            <ul className="space-y-3 text-xs">
              {categories.map((item) => (
                <li
                  key={item}
                  className={`${item === 'Accessories' ? 'flex items-center gap-1' : ''}`}
                >
                  {item === 'Accessories' && (
                    <span className="h-px w-5 bg-badge" />
                  )}
                  <span
                    className={cn(
                      'text-nowrap',
                      item === 'Accessories'
                        ? 'text-background'
                        : 'text-background/50',
                    )}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <a
              className="mt-5 text-xs font-semibold text-badge text-nowrap flex items-center justify-start gap-2"
              href="#"
            >
              Browse All Product{' '}
              <HugeiconsIcon icon={ArrowRight02FreeIcons} className="h-5 w-5" />
            </a>
          </section>

          <section className="text-background pr-8">
            <h3 className="mb-6 text-sm uppercase text-nowrap">Quick Links</h3>
            <ul className="space-y-4 text-xs text-background/50">
              {links.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="text-background">
            <h3 className="mb-6 text-sm font-normal uppercase ">
              Download App
            </h3>
            <div className="space-y-3.5">
              <StoreButton type="play" />
              <StoreButton type="apple" />
            </div>
          </section>

          <section className="text-background">
            <h3 className="mb-6 text-sm uppercase">Popular Tag</h3>
            <div className="flex flex-wrap gap-2.25">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href="#"
                  className="rounded-xs border border-[#30373d] px-2 py-1.5 text-xs leading-none transition hover:border-[#8a9399]"
                >
                  {tag}
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="border-t border-[#30373d] py-4 text-center">
          <p className="text-xs font-medium text-background/60">
            Kinbo - eCommerce Template © 2021. Design by Templatecookie
          </p>
        </div>
      </div>
    </footer>
  );
}

const tags: string[] = [
  'Game',
  'iPhone',
  'TV',
  'Asus Laptops',
  'Macbook',
  'SSD',
  'Graphics Card',
  'Power Bank',
  'Smart TV',
  'Speaker',
  'Tablet',
  'Microwave',
  'Samsung',
];

const categories: string[] = [
  'Computer & Laptop',
  'SmartPhone',
  'Headphone',
  'Accessories',
  'Camera & Photo',
  'TV & Homes',
];

const links: string[] = [
  'Shop Product',
  'Shoping Cart',
  'Wishlist',
  'Compare',
  'Track Order',
  'Customer Help',
  'About Us',
];

function StoreButton({ type }: { type: string }) {
  const isApple = type === 'apple';
  return (
    <button className="flex items-center gap-4 rounded-[3px] bg-[#30373b] px-3 py-3 text-left transition hover:bg-[#353d42] min-w-full">
      {isApple ? (
        <HugeiconsIcon icon={Apple} className="size-8 fill-white text-white" />
      ) : (
        <HugeiconsIcon icon={Play} className="size-8 fill-white text-white" />
      )}
      <span className="leading-none">
        <span className="block text-[10px]">Get it now</span>
        <span className="mt-1 block text-base text-nowrap">
          {isApple ? 'App Store' : 'Google Play'}
        </span>
      </span>
    </button>
  );
}
