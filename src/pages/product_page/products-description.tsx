import { HugeiconsIcon } from '@hugeicons/react';
import {
  DeliveryTruck01Icon,
  CustomerSupportIcon,
  CreditCardIcon,
  Handshake,
  StarAward02Icon,
} from '@hugeicons/core-free-icons';

const navItems = [
  'DESCRIPTION',
  'ADDITIONAL INFORMATION',
  'SPECIFICATION',
  'REVIEW',
];

const features = [
  { icon: StarAward02Icon, label: 'Free 1 Year Warranty' },
  { icon: DeliveryTruck01Icon, label: 'Free Shipping & Fasted Delivery' },
  { icon: Handshake, label: '100% Money-back guarantee' },
  { icon: CustomerSupportIcon, label: '24/7 Customer support' },
  { icon: CreditCardIcon, label: 'Secure payment method' },
];

const shipping = [
  { title: 'Courier:', text: '2 -4 days, free shipping' },
  { title: 'Local Shipping:', text: 'up to one week, $19.00' },
  { title: 'UPS Ground Shipping:', text: '4 -6 days, $29.00' },
  { title: 'Unishop Global Export:', text: '3 -4 days, $39.00' },
];

export default function ProductDetailsTabs() {
  return (
    <main className="w-[95%] lg:w-[70%] mx-auto py-10 sm:py-20">
      <section className="w-full overflow-hidden border border-border">
        <nav className="border-b border-border overflow-x-auto">
          <div className="py-2.5 flex h-auto items-end justify-start sm:justify-center gap-0 min-w-max px-3 sm:px-4 lg:px-0">
            {navItems.map((item) => (
              <button
                key={item}
                className={`relative lg:h-full px-4 sm:px-5 pt-5 text-center text-xxs sm:text-xs font-medium tracking-[0.35px] text-nowrap ${
                  item === 'DESCRIPTION'
                    ? 'text-foreground'
                    : 'text-foreground/70'
                }`}
              >
                {item}

                {item === 'DESCRIPTION' && (
                  <span className="absolute -bottom-2.5 left-0 h-0.75 w-full bg-secondary" />
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-10 px-4 sm:px-6 lg:px-12 pb-6 sm:pb-8 lg:pb-12 pt-6 sm:pt-8 lg:pt-14">
          <section className="md:col-span-2 lg:col-span-6">
            <h2 className="mb-3 lg:mb-4 text-sm font-semibold leading-6 lg:leading-6 text-foreground">
              Description
            </h2>

            <p className="text-xxs sm:text-xs font-normal leading-5 lg:leading-5 tracking-[0.01px] text-foreground/70">
              The most powerful MacBook Pro ever is here. With the blazing-fast
              M1 Pro or M1 Max chip — the first Apple silicon designed for pros
              — you get groundbreaking performance and amazing battery life. Add
              to that a stunning Liquid Retina XDR display, the best camera and
              audio ever in a Mac notebook, and all the ports you need. The
              first notebook of its kind, this MacBook Pro is a beast. M1 Pro
              takes the exceptional performance of the M1 architecture to a
              whole new level for pro users.
            </p>

            <p className="mt-3 lg:mt-4 text-xxs sm:text-xs font-normal leading-5 lg:leading-5 tracking-[0.01px] text-[#5F6C72]">
              Even the most ambitious projects are easily handled with up to 10
              CPU cores, up to 16 GPU cores, a 16-core Neural Engine, and
              dedicated encode and decode media engines that support H.264,
              HEVC, and ProRes codecs.
            </p>
          </section>

          <section className="pl-0 lg:pl-0.5 pr-0 lg:pr-10 lg:col-span-3">
            <h2 className="mb-4 lg:mb-6 text-sm lg:text-base font-semibold leading-6 text-foreground">
              Feature
            </h2>

            <div className="space-y-3 lg:space-y-5">
              {features.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 lg:gap-3">
                  <span className="flex size-5 shrink-0 items-center justify-center text-secondary">
                    <HugeiconsIcon
                      icon={icon}
                      className="size-5 lg:size-7"
                      strokeWidth={1.75}
                    />
                  </span>

                  <span className="text-xxs sm:text-xs font-normal leading-5">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t md:border-t-0 lg:col-span-3 lg:border-l border-border pt-6 md:pt-0 pl-0 lg:pl-4">
            <h2 className="mb-4 lg:mb-6 text-xxs sm:text-sm font-semibold">
              Shipping Information
            </h2>

            <div className="space-y-3 lg:space-y-5">
              {shipping.map((item) => (
                <p
                  key={item.title}
                  className="text-xxs sm:text-xs text-foreground/70"
                >
                  <span className="font-medium text-foreground">
                    {item.title}
                  </span>{' '}
                  <span>{item.text}</span>
                </p>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
