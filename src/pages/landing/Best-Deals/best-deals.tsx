import { Link } from '@tanstack/react-router';
import { Badge } from '../../../components/ui/badge';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import ProductsPage from './products-page';

export default function BestDeals() {
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-5">
          <h2 className="text-lg font-semibold">Best Deals</h2>
          <p className="text-xs">Deal ends in </p>
          <Badge variant="default" className="text-xs font-base">
            16d : 21h : 57m : 23s
          </Badge>
        </div>
        {/* browse all products */}
        <Link
          to="/shop"
          className="flex items-center justify-end gap-1 text-text-primary text-xs "
        >
          Browse All Products{' '}
          <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
        </Link>
      </div>

      <ProductsPage />  
    </div>
  );
}
