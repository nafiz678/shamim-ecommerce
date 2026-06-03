import { Link } from '@tanstack/react-router';
import { Badge } from '../../../components/ui/Badge/Badge';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import type { ProductProps } from '../../../lib/types';
import ProductsPage from './products-page';

export default function BestDeals({
  productList,
}: {
  productList: ProductProps[];
}) {
  return (
    <div className="">
      <div className="flex flex-col gap-3 min-[450px]:flex-row min-[450px]:items-center min-[450px]:justify-between min-[450px]:gap-1">
        <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 md:gap-5">
          <h2 className="text-base font-semibold md:text-lg">Best Deals</h2>

          <p className="text-xxs md:text-xs">Deal ends in</p>

          <Badge variant="discount" className="text-xxs font-normal md:text-xs">
            16d : 21h : 57m : 23s
          </Badge>
        </div>

        {/* browse all products */}
        <Link
          to="/shop"
          className="flex shrink-0 items-center justify-start gap-1 text-xs text-text-primary sm:justify-end "
        >
          <span className="whitespace-nowrap">Browse All Products</span>
          <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
        </Link>
      </div>

      <ProductsPage products={productList} />
    </div>
  );
}
