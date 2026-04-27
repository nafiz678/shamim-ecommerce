import Button from '../../../components/ui/Button';
import { ArrowRight02FreeIcons } from '@hugeicons/core-free-icons';
import ProductsCard from '../Best-Deals/products-card';
import type { ProductProps } from '../../../lib/type';

export default function ComputerAccessories({
  productList,
}: {
  productList: ProductProps[];
}) {
  return (
    <div className="pt-10">
      <section className="pt-16">
        <div className="grid grid-cols-12 gap-6">
          {/* Right products section */}
          <div className="col-span-12 lg:col-span-9">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg text-nowrap font-semibold text-foreground">
                Computer Accessories
              </h2>

              <div className="hidden items-center gap-3 lg:flex">
                <button className="border-b-2 cursor-pointer border-secondary pb-1 px-1 font-semibold text-foreground text-xs text-nowrap">
                  All Product
                </button>
                <button className="text-foreground/40 text-xs pb-1 hover:text-foreground hover:border-b-2 cursor-pointer border-secondary ">
                  Keyboard & Mouse
                </button>
                <button className="text-foreground/40 text-xs pb-1 hover:text-foreground hover:border-b-2 cursor-pointer border-secondary ">
                  Headphone
                </button>
                <button className="text-foreground/40 text-xs pb-1 hover:text-foreground hover:border-b-2 cursor-pointer border-secondary ">
                  Webcam
                </button>
                <button className="text-foreground/40 text-xs pb-1 hover:text-foreground hover:border-b-2 cursor-pointer border-secondary ">
                  Printer
                </button>
                <button className="pb-1 cursor-pointer font-medium text-secondary text-xs">
                  Browse All Product →
                </button>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
                <span className="inline-block rounded-sm bg-white/10 px-4 py-2 text-[10px] font-medium uppercase text-background">
                  Summer Sales
                </span>

                <h3 className="mt-5 text-xl font-semibold uppercase leading-none text-white">
                  37% Discount
                </h3>

                <p className="mt-2 text-sm leading-6 text-white">
                  only for{' '}
                  <span className="font-semibold text-[#EBC80C]">
                    SmartPhone
                  </span>{' '}
                  product.
                </p>

                <Button
                  variant="secondary"
                  rightIcon={ArrowRight02FreeIcons}
                  className="mt-5 w-full rounded-sm bg-text-primary px-7 py-5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-[#2DA5F3]/90"
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
