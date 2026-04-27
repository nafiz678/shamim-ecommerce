import { Apple, ArrowRight, Play } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

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

const categories = [
  'Computer & Laptop',
  'SmartPhone',
  'Headphone',
  'Accessories',
  'Camera & Photo',
  'TV & Homes',
];

const links = [
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
    <button className="flex h-18.5 w-47 items-center gap-4 rounded-[3px] bg-[#30373b] px-5 text-left transition hover:bg-[#353d42]">
      {isApple ? (
        <HugeiconsIcon icon={Apple} className="size-9 fill-white text-white" />
      ) : (
        <HugeiconsIcon icon={Play} className="h-9 w-9 fill-white text-white" />
      )}
      <span className="leading-none">
        <span className="block text-[12px] font-medium text-[#d7dee2]">
          Get it now
        </span>
        <span className="mt-2 block text-[16px] font-semibold text-white">
          {isApple ? 'App Store' : 'Google Play'}
        </span>
      </span>
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#171c1f]">
      <div className=" text-[#8c979e]">
        <div className="mx-auto flex min-h-108 max-w-352 items-start justify-between gap-16 px-8 pb-20 pt-19.5">
          <section className="w-70">
            <div className="mb-7 flex items-center gap-3">
              <span className="relative flex h-12.75 w-12.75 items-center justify-center rounded-full bg-[#ff8128]">
                <span className="h-6.25 w-6.25 rounded-full border-[6px] border-[#171c1f]" />
              </span>
              <h2 className="text-[32px] font-extrabold tracking-[-1.2px] text-white">
                SHAMIM
              </h2>
            </div>

            <p className="text-[14px] font-medium leading-6 text-[#7f8a91]">
              Customer Supports:
            </p>
            <p className="mb-4 text-[22px] font-medium leading-7 text-white">
              (629) 555-0129
            </p>
            <p className="mb-4 text-[17px] font-medium leading-7 text-[#a7afb5]">
              4517 Washington Ave.
              <br />
              Manchester, Kentucky 39495
            </p>
            <p className="text-[18px] font-medium text-white">info@kinbo.com</p>
          </section>

          <section className="w-47.5 pt-2">
            <h3 className="mb-6 text-[17px] font-bold uppercase tracking-[0.2px] text-white">
              Top Category
            </h3>
            <ul className="space-y-4.25 text-[15px] font-semibold">
              {categories.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  {item === 'Accessories' && (
                    <span className="h-0.5 w-6.5 bg-[#f1c500]" />
                  )}
                  {item !== 'Accessories' && <span className="w-6.5" />}
                  <span
                    className={
                      item === 'Accessories' ? 'text-white' : 'text-[#8f9aa1]'
                    }
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <a
              className="mt-4.25 flex items-center gap-3 pl-6.5 text-[15px] font-bold text-[#f1c500]"
              href="#"
            >
              Browse All Product{' '}
              <HugeiconsIcon icon={ArrowRight} className="h-5 w-5" />
            </a>
          </section>

          <section className="w-41.25 pt-2">
            <h3 className="mb-6 text-[17px] font-bold uppercase tracking-[0.2px] text-white">
              Quick Links
            </h3>
            <ul className="space-y-4.25 text-[15px] font-semibold text-[#8f9aa1]">
              {links.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="w-50 pt-2">
            <h3 className="mb-6 text-[17px] font-bold uppercase tracking-[0.2px] text-white">
              Download App
            </h3>
            <div className="space-y-3.5">
              <StoreButton type="play" />
              <StoreButton type="apple" />
            </div>
          </section>

          <section className="w-86.25 pt-2">
            <h3 className="mb-6 text-[17px] font-bold uppercase tracking-[0.2px] text-white">
              Popular Tag
            </h3>
            <div className="flex flex-wrap gap-2.25">
              {tags.map((tag) => (
                <a
                  key={tag}
                  href="#"
                  className="rounded-xs border border-[#30373d] px-3.25 py-2 text-[15px] font-semibold leading-none text-[#e0e5e8] transition hover:border-[#8a9399]"
                >
                  {tag}
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="border-t border-[#30373d] py-6.75 text-center">
          <p className="text-[15px] font-medium text-[#9aa3a8]">
            Kinbo - eCommerce Template © 2021. Design by Templatecookie
          </p>
        </div>
      </div>
    </footer>
  );
}
