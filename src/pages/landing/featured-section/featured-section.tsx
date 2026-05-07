import type { ProductProps } from '../../../lib/types';
import Button from '../../../components/ui/button';
import { ArrowRight02FreeIcons } from '@hugeicons/core-free-icons';
import ProductsCard from '../../../components/ui/products-card';

export default function FeaturedSection({
  productList,
}: {
  productList: ProductProps[];
}) {
  return (
    <section className="pt-10 md:pt-16">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
        {/* Left featured banner */}
        <div className="md:col-span-3 col-span-12">
          <div className="flex flex-col items-center overflow-hidden rounded-sm bg-[#F2DC6D] px-4 md:py-0 py-6 text-center md:px-0 md:pt-12">
            <div className="space-y-2.5 px-2">
              <p className="text-xxs font-semibold uppercase tracking-wide text-destructive">
                Computer & Accessories
              </p>

              <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
                32% Discount
              </h3>

              <p className="text-xs text-muted-foreground">
                For all electronics products
              </p>

              <div className="mb-6 flex flex-wrap items-center justify-center gap-1 md:mb-8">
                <span className="text-xxs font-medium">Offers ends in:</span>

                <span className="rounded-sm bg-background px-1 py-0.5 text-xxs font-medium uppercase">
                  Ends of Christmas
                </span>
              </div>

              <Button
                variant="secondary"
                rightIcon={ArrowRight02FreeIcons}
                className="rounded-sm px-7 py-5 uppercase"
              >
                Shop Now
              </Button>
            </div>

            <img
              src="/assets/images/brands/featured-banner.png"
              alt="Computer and accessories"
              className="hidden object-cover object-bottom md:block"
            />
          </div>
        </div>

        {/* Right products section */}
        <div className="md:col-span-9 col-span-12">
          {/* Header */}
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between md:mb-6 md:h-20 md:items-center">
            <h2 className="whitespace-nowrap text-base font-semibold text-foreground sm:text-lg">
              Featured Products
            </h2>

            <div className="flex flex-col gap-3 sm:items-end md:flex-row md:items-center">
              <div className="flex max-w-full items-center gap-2 overflow-x-auto md:justify-center md:gap-3">
                {productTabs.map(({ label, active }) => (
                  <button
                    key={label}
                    className={
                      active
                        ? 'cursor-pointer whitespace-nowrap border-b-2 border-secondary px-1 pb-1 text-sxs font-semibold text-foreground sm:text-xxs md:text-xs'
                        : 'cursor-pointer whitespace-nowrap border-secondary pb-1 text-sxs text-muted-foreground hover:border-b-2 hover:text-foreground sm:text-xxs md:text-xs'
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button className="cursor-pointer whitespace-nowrap text-left text-xxs font-medium text-secondary sm:text-right md:pb-1 md:text-xs">
                Browse All Product →
              </button>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {productList.map((product) => (
              <ProductsCard featured key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const productTabs: { label: string; active: boolean }[] = [
  {
    label: 'All Product',
    active: true,
  },
  {
    label: 'Smart Phone',
    active: false,
  },
  {
    label: 'Laptop',
    active: false,
  },
  {
    label: 'Headphone',
    active: false,
  },
  {
    label: 'TV',
    active: false,
  },
];
