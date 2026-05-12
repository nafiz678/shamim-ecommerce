import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import Button from "../../../components/ui/button";
import FeatureBar from "./feature-bar";

export default function Hero() {
  return (
    <>
      <div className="flex items-center flex-col md:flex-row justify-between gap-5">
        {/* left box */}
        <div className="bg-muted rounded-md relative">
          <div className="md:pl-14 pl-8 md:pr-8 pr-4 py-8 md:py-16 lg:py-16 xl:py-8 flex md:items-center items-end justify-center">
            {/* text section */}
            <div className="space-y-3 w-[50%]">
              <div className="flex items-center justify-start gap-2 text-xs text-[#2484C2]">
                <span className="w-6 bg-[#2484C2] h-0.5" />
                <p>THE BEST PLACE TO PLAY</p>
              </div>
              <h2 className="md:text-4xl sm:text-2xl text-xl font-semibold">
                Xbox Consoles
              </h2>
              <p className="text-[13px] text-foreground/80">
                Save up to 50% on select Xbox games. Get 3 months of PC Game
                Pass for $2 USD.
              </p>

              <Button
                href="/shop"
                rightIcon={ArrowRight02Icon}
                variant="secondary"
                className="px-5 text-nowrap"
              >
                SHOP NOW
              </Button>
            </div>

            {/* image section */}
            <div className="w-[50%]">
              <img
                src="/assets/images/banners/first-consol.png"
                alt="TWS Buds"
                width={320}
                height={320}
                loading="eager"
                className="size-full object-contain "
              />
            </div>
          </div>

          <span className="bg-text-primary text-background size-18 absolute top-10 right-10 flex items-center justify-center rounded-full font-semibold">
            $299
          </span>
        </div>

        {/* right side */}
        <div className="space-y-5 lg:w-2/5 w-full">
          {/* top */}
          <div className="relative flex items-center justify-center bg-[#191C1F] text-background rounded-md overflow-hidden px-4">
            {/* title section */}
            <div className="p-3 space-y-4 py-8">
              <span className="uppercase text-xs tracking-tight text-accent">
                summer section
              </span>
              <h3 className="text-xl">New Google Pixel 6 Pro</h3>
              <Button
                href="/shop"
                rightIcon={ArrowRight02Icon}
                className="rounded-xs text-xs"
                variant="secondary"
                size="sm"
              >
                SHOP NOW
              </Button>
            </div>
            <div></div>

            {/* image section */}
            <div className="w-45">
              <img
                src="/assets/images/banners/second-pixel.png"
                alt="Google Pixel 6 Pro"
                width={220}
                height={220}
                loading="lazy"
                decoding="async"
                className="w-55 object-contain absolute top-10 -right-10"
              />
            </div>
            <div className="bg-badge absolute top-5 right-5 py-1.5 px-2 text-foreground text-sm font-semibold rounded-sm">
              29% OFF
            </div>
          </div>

          {/* bottom */}
          <div className="flex items-center justify-center md:gap-2 gap-10 bg-muted py-7 px-6">
            {/* image section */}
            <div className="">
              <img
                src="/assets/images/banners/third-buds.png"
                alt="TWS Buds"
                width={220}
                height={220}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-contain "
              />
            </div>

            {/* text section */}
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Xiaomi FlipBuds Pro</h3>
              <p className="text-text-primary">$299 USD</p>
              <Button
                href="/shop"
                rightIcon={ArrowRight02Icon}
                className="rounded-xs text-xs font-semibold"
                variant="secondary"
                size="sm"
              >
                SHOP NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
      <FeatureBar />
    </>
  );
}
