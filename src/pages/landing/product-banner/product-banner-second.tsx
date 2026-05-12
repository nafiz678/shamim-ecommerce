import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons";
import { Badge } from "../../../components/ui/badge";
import Button from "../../../components/ui/button";

export default function ProductBannerSecond() {
  return (
    <section className="md:w-9/12 w-[98%] mx-auto rounded py-9">
      <div className="mx-auto flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden bg-secondary/20 rounded px-5 py-7 sm:px-8 sm:py-8 md:py-0 md:pl-16 md:pr-8">
        <div className="z-10 flex flex-col items-start space-y-3 sm:space-y-4 md:space-y-4 max-w-full md:max-w-none">
          <Badge
            variant="best_deals"
            className="px-3 py-2 text-xxs font-semibold leading-none"
          >
            SAVE UP TO $200.00
          </Badge>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Macbook Pro
          </h1>

          <p className="text-sm sm:text-base md:text-xl max-w-full sm:max-w-[75%] md:max-w-8/12">
            Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage
          </p>

          <Button
            href="/shop"
            variant="secondary"
            rightIcon={ArrowRight02FreeIcons}
            size="lg"
            className="mt-1"
            iconClass="size-5 md:size-6"
          >
            Shop Now
          </Button>
        </div>

        <div className="relative mt-8 md:mt-0 flex h-full w-full flex-1 items-center justify-center md:justify-end">
          <div className="absolute left-2 top-0 z-20 grid size-20 sm:size-24 md:size-32 place-items-center rounded-full border-4 sm:border-[5px] md:border-[6px] border-background bg-[#ffc8a3] text-base sm:text-lg md:text-[22px] font-bold tracking-[-0.04em] text-foreground md:-left-6 md:top-0.75">
            $1999
          </div>

          <img
            src="/assets/images/products/laptop.png"
            alt="MacBook Pro"
            className="w-[85%] sm:w-[70%] md:w-auto object-contain"
            loading="eager"
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}
