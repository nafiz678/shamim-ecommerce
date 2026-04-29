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
      <div className="grid grid-cols-12 gap-6">
        {/* Left featured banner */}
        <div className="col-span-12 lg:col-span-3">
          <div className="relative h-full min-h-100 overflow-hidden rounded-sm bg-[#F2DC6D] px-6 pt-12 text-center space-y-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#BE4646]">
              Computer & Accessories
            </p>

            <h3 className="text-2xl font-semibold leading-tight">
              32% Discount
            </h3>

            <p className="text-xs text-foreground/50">
              For all electronics products
            </p>

            <div className="mb-8 flex items-center justify-center gap-1">
              <span className="text-[10px] font-medium ">Offers ends in:</span>

              <span className="rounded-sm bg-background px-1 py-0.5 text-[10px] font-medium uppercase ">
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
        <div className="col-span-12 lg:col-span-9">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg text-nowrap font-semibold text-foreground">
              Featured Products
            </h2>

            <div className="hidden items-center gap-3 lg:flex">
              <button className="border-b-2 cursor-pointer border-secondary pb-1 px-1 font-semibold text-foreground text-xs text-nowrap">
                All Product
              </button>
              <button className="text-foreground/40 text-xs pb-1 hover:text-foreground hover:border-b-2 cursor-pointer border-secondary ">
                Smart Phone
              </button>
              <button className="text-foreground/40 text-xs pb-1 hover:text-foreground hover:border-b-2 cursor-pointer border-secondary ">
                Laptop
              </button>
              <button className="text-foreground/40 text-xs pb-1 hover:text-foreground hover:border-b-2 cursor-pointer border-secondary ">
                Headphone
              </button>
              <button className="text-foreground/40 text-xs pb-1 hover:text-foreground hover:border-b-2 cursor-pointer border-secondary ">
                TV
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
      </div>
    </section>
  );
}
