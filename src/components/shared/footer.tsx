import { Apple, ArrowRight02FreeIcons, Play } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '../../lib/utils';
import { FooterLogo } from '../icons/Icon';

export default function Footer() {
  return (
    <footer className="bg-[#191C1F]">
      <div className="w-[70%] mx-auto">
        <div className=" items-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-between gap-10 py-18">
          <section className="space-y-4 text-background">
            <a href="/" className="mb-3 flex items-center gap-3 cursor-pointer">
              <FooterLogo />
              <h2 className="text-2xl font-bold ">SHAMIM</h2>
            </a>

            <div>
              <p className="text-xs font-medium leading-5 text-background/50">
                Customer Supports:
              </p>
              <p className="text-sm font-medium leading-6 cursor-pointer">
                (629) 555-0129
              </p>
            </div>
            <p className="text-xs font-medium text-background/50">
              4517 Washington Ave.
              <br />
              <span className="text-nowrap">Manchester, Kentucky 39495</span>
            </p>
            <p className="text-sm font-medium cursor-pointer">info@kinbo.com</p>
          </section>

          <section className="text-background">
            <h3 className="mb-6 text-sm uppercase ">Top Category</h3>
            <ul className="space-y-3 text-xs">
              {categories.map((item) => (
                <li
                  key={item}
                  className={`cursor-pointer ${item === 'Accessories' ? 'flex items-center gap-1' : ''}`}
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
                <li className="cursor-pointer" key={item}>
                  {item}
                </li>
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
    <button className="flex items-center gap-4 rounded-[3px] bg-[#30373b] px-3 py-3 text-left transition hover:bg-[#353d42] min-w-full cursor-pointer">
      {isApple ? (
        <HugeiconsIcon
          icon={Apple}
          className="size-8 fill-background text-background"
        />
      ) : (
        <HugeiconsIcon
          icon={Play}
          className="size-8 fill-background text-background"
        />
      )}
      <span className="leading-none">
        <span className="block text-xxs">Get it now</span>
        <span className="mt-1 block text-base text-nowrap">
          {isApple ? 'App Store' : 'Google Play'}
        </span>
      </span>
    </button>
  );
}
