import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons";
import {
  AmazonLogoIcon,
  GoogleLogoIcon,
  PhilipsLogoIcon,
  SamsungLogoIcon,
  ToshibaLogoIcon,
} from "../../components/icons/Icon";
import { Button } from "../../components/ui/Button";

export default function NewsLatter() {
  return (
    <section className="w-full bg-primary py-10 sm:py-12 lg:py-14 text-background">
      <div className="flex w-full flex-col items-center px-5 text-center">
        <h2 className="m-0 text-xl font-medium sm:text-3xl lg:text-2xl">
          Subscribe to our newsletter
        </h2>

        <p className="mt-3 md:w-2/6 w-4/6 text-xxs font-medium tracking-[0.01em] text-background/55 sm:text-xs">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
          libero et cursus. Donec non quam urna. Quisque vitae porta ipsum.
        </p>

        <form className="mt-7 flex w-full max-w-full items-center justify-center overflow-hidden rounded bg-background pr-2 shadow-xl sm:h-11 md:max-w-130 lg:mt-8 lg:h-14 lg:max-w-3/8">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>

          <input
            id="newsletter-email"
            type="email"
            placeholder="Email address"
            className="min-w-0 flex-1 border-0 bg-background px-4 text-xxs font-medium text-foreground/70 outline-none placeholder:text-foreground/50 sm:px-7 sm:text-base py-4"
          />

          <Button
            rightIcon={ArrowRight02FreeIcons}
            className="shrink-0 text-nowrap rounded px-3 text-xxs sm:px-4 sm:text-xs md:text-sm"
            variant="secondary"
            iconClass="size-4 md:size-6"
          >
            SUBSCRIBE
          </Button>
        </form>

        <div className="mt-8 h-px w-full max-w-110 bg-background/15 lg:mt-8" />

        <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-4 text-background/50 sm:gap-x-8 sm:gap-y-5 lg:flex-nowrap lg:gap-12">
          {partnerLogos.map(({ name, Icon, className }) => (
            <span key={name} className="flex shrink-0 opacity-60">
              <Icon
                className={className}
                aria-label={`${name} logo`}
                role="img"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const partnerLogos = [
  {
    name: "Google",
    Icon: GoogleLogoIcon,
    className: "h-auto w-13.5 sm:w-16 lg:w-18",
  },
  {
    name: "Amazon",
    Icon: AmazonLogoIcon,
    className: "h-auto w-13 sm:w-16 lg:w-18",
  },
  {
    name: "Philips",
    Icon: PhilipsLogoIcon,
    className: "h-auto w-13 sm:w-16 lg:w-18",
  },
  {
    name: "Toshiba",
    Icon: ToshibaLogoIcon,
    className: "h-auto w-13 sm:w-16 lg:w-18",
  },
  {
    name: "Samsung",
    Icon: SamsungLogoIcon,
    className: "h-auto w-13 sm:w-16 lg:w-18",
  },
] as const;
