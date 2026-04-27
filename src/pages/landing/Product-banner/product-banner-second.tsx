import { ArrowRight02FreeIcons } from '@hugeicons/core-free-icons';
import { Badge } from '../../../components/ui/badge';
import Button from '../../../components/ui/Button';

export default function ProductBannerSecond() {
  return (
    <section className="w-9/12 mx-auto rounded py-9">
      <div className="mx-auto flex items-center justify-between overflow-hidden bg-secondary/20 rounded pl-16 pr-8">
        <div className="z-10 flex flex-col items-start space-y-4">
          <Badge
            variant="best_deals"
            className="px-3 py-2 text-[10px] font-semibold leading-none"
          >
            SAVE UP TO $200.00
          </Badge>

          <h1 className="text-4xl font-semibold ">Macbook Pro</h1>

          <p className="text-xl max-w-8/12  ">
            Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage
          </p>

          <Button
            variant="secondary"
            rightIcon={ArrowRight02FreeIcons}
            size='lg'
            className=""
            iconClass='size-6'
          >
            Shop Now
          </Button>
        </div>

        <div className="relative flex h-full flex-1 items-center justify-end">
          <div className="absolute -left-6 top-0.75 z-20 grid size-32 place-items-center rounded-full border-[6px] border-white bg-[#ffc8a3] text-[22px] font-bold tracking-[-0.04em] text-[#151515]">
            $1999
          </div>

          <img
            src="/assets/images/products/laptop.png"
            alt="MacBook Pro"
            className=" object-contain"
            loading="eager"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}
