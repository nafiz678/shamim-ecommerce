import type { ProductProps } from '../../../lib/type';
import Button from '../../../components/ui/Button';
import { ArrowRight02FreeIcons } from '@hugeicons/core-free-icons';
import ProductsCard from '../../../components/ui/products-card';

export default function FeaturedSection({
  productList,
}: {
  productList: ProductProps[];
}) {
  return (
    <section className="pt-16">
      <div className="grid grid-cols-12 md:gap-6 gap-2">
        {/* Left featured banner */}
        <div className="md:col-span-3 col-span-5">
          <div className="relative h-full min-h-full overflow-hidden rounded-sm bg-[#F2DC6D] px-6 pt-12 text-center space-y-2.5">
            <p className="text-xxs font-semibold uppercase tracking-wide text-[#BE4646]">
              Computer & Accessories
            </p>

            <h3 className="text-2xl font-semibold leading-tight">
              32% Discount
            </h3>

            <p className="text-xs text-foreground/50">
              For all electronics products
            </p>

            <div className="mb-8 flex items-center justify-center gap-1">
              <span className="text-xxs font-medium ">Offers ends in:</span>

              <span className="rounded-sm bg-background px-1 py-0.5 text-xxs font-medium uppercase ">
                Ends of Christmas
              </span>
            </div>

            <Button
              variant="secondary"
              rightIcon={ArrowRight02FreeIcons}
              className="px-7 py-5 rounded-sm uppercase"
            >
              Shop Now
            </Button>

            <img
              src="/assets/images/brands/featured-banner.png"
              alt="Computer and accessories"
              className="absolute bottom-0 left-0 h-[55%] w-full object-cover object-bottom"
            />
          </div>
        </div>

        {/* Right products section */}
        <div className="md:col-span-9 col-span-7">
          {/* Header */}
          <div className="mb-6 flex md:flex-row flex-col h-20 items-center justify-between">
            <h2 className="text-lg text-nowrap font-semibold text-foreground">
              Featured Products
            </h2>

            <div className="flex md:items-center items-end gap-3 md:flex-row flex-col">
              <div className="flex items-center justify-center md:gap-3 gap-1">
                {productTabs.map(({ label, active }) => (
                  <button
                    key={label}
                    className={
                      active
                        ? 'border-b-2 cursor-pointer  border-secondary pb-1 px-1 font-semibold text-foreground md:text-xs sm:text-xxs text-[8px] text-nowrap'
                        : 'text-foreground/40 md:text-xs sm:text-xxs text-[8px] pb-1 hover:text-foreground hover:border-b-2 cursor-pointer border-secondary text-nowrap'
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button className="md:pb-1 cursor-pointer font-medium text-secondary md:text-xs text-xxs">
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
