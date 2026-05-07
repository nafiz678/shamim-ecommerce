import Button from '../../../components/ui/button';
import { ArrowRight02FreeIcons } from '@hugeicons/core-free-icons';
import type { ProductProps } from '../../../lib/types';
import ProductsCard from '../../../components/ui/products-card';

export default function ComputerAccessories({
  productList,
}: {
  productList: ProductProps[];
}) {
  return (
    <div className="sm:pt-10 pt-4">
      <section className="sm:pt-16 pt-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Right products section */}
          <div className="col-span-12 lg:col-span-9">
            {/* Header */}
            <div className="md:mb-6 mb-2 flex md:items-center items-start justify-between flex-col md:flex-row ">
              <h2 className="text-lg text-nowrap font-semibold text-foreground">
                Computer Accessories
              </h2>

              <div className="sm:items-center items-end md:gap-3 gap-0 flex sm:flex-row flex-col">
                <div className="flex items-center justify-center md:gap-3 gap-1.5">
                  {productTabs.map((tab) => (
                    <button
                      key={tab}
                      className={
                        tab === 'All Product'
                          ? 'border-b-2 cursor-pointer border-secondary pb-1 px-1 font-semibold text-foreground md:text-xs text-xxs pt-2 md:pt-0 text-nowrap'
                          : 'text-foreground/40 md:text-xs text-xxs pt-2 md:pt-0 pb-1 hover:text-foreground hover:border-b-2 cursor-pointer border-secondary text-nowrap'
                      }
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <button className="pb-1 cursor-pointer font-medium text-secondary text-xs pt-2 md:pt-0">
                  Browse All Product →
                </button>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:gap-5 gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {productList.map((product) => (
                <ProductsCard featured key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Left featured banner */}
          <div className="col-span-12 lg:col-span-3">
            <div className="space-y-4">
              {/* Earbuds banner */}
              <div className="overflow-hidden rounded-sm bg-[#F7E99A] px-6 py-7 text-center flex items-center justify-center flex-col">
                <img
                  src="/assets/images/brands/computer.png"
                  alt="Xiaomi True Wireless Earbuds"
                  className="w-28 h-24"
                />

                <h3 className="mx-auto text-xl font-semibold text-foreground">
                  Xiaomi True Wireless Earbuds
                </h3>

                <p className="mx-auto mt-2 text-xs text-foreground/50">
                  Escape the noise, It’s time to hear the magic with Xiaomi
                  Earbuds.
                </p>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="text-xs text-foreground/50">Only for:</span>
                  <span className="rounded-sm bg-background px-4 py-2 text-sm font-semibold text-foreground">
                    $299 USD
                  </span>
                </div>

                <Button
                  variant="secondary"
                  rightIcon={ArrowRight02FreeIcons}
                  className="mt-3 w-full rounded-sm bg-secondary/90 px-7 py-5 text-xs font-semibold uppercase tracking-wide text-background hover:bg-secondary"
                >
                  Shop Now
                </Button>
              </div>

              {/* Summer sales banner */}
              <div className="overflow-hidden rounded-sm bg-[#124261] px-3 py-7 text-center">
                <span className="inline-block rounded-sm bg-background/10 px-4 py-2 text-xxs font-medium uppercase text-background">
                  Summer Sales
                </span>

                <h3 className="mt-5 text-xl font-semibold uppercase leading-none text-background">
                  37% Discount
                </h3>

                <p className="mt-2 text-sm leading-6 text-background">
                  only for{' '}
                  <span className="font-semibold text-badge">SmartPhone</span>{' '}
                  product.
                </p>

                <Button
                  variant="secondary"
                  rightIcon={ArrowRight02FreeIcons}
                  className="mt-5 w-full rounded-sm bg-text-primary px-7 py-5 text-xs font-semibold uppercase tracking-wide text-background hover:bg-text-primary/90"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const productTabs: string[] = [
  'All Product',
  'Keyboard & Mouse',
  'Headphone',
  'Webcam',
  'Printer',
];
