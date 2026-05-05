import Button from '../ui/Button';
import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowRight02Icon, X } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function HotNews() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const [visible, setVisible] = useState(true);

  if (pathname !== '/') return null;

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-linear ${
        visible ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="relative bg-foreground text-background flex items-center justify-between">
        <div className="lg:w-[70%] w-[85%] mx-auto min-[350px]:flex-row flex-col gap-1 flex items-center justify-between py-3 ">
          {/* black friday */}
          <div className="flex items-center gap-2 ">
            <div className="bg-badge text-foreground md:px-2 md:py-2 px-1 py-1.5 -rotate-4 flex items-center justify-center">
              <span className="md:font-medium text-sm md:text-base leading-[100%]">
                Black
              </span>
            </div>
            <p className="md:text-lg text-sm">Friday</p>
          </div>
          {/* offer */}
          <div className="flex items-center justify-center gap-1.5 ">
            <span className="md:text-xs text-xxs">Up to</span>
            <span className="md:text-3xl text-xl font-medium text-accent">
              59%
            </span>
            <span className="font-medium md:text-base sm:text-sm text-xxs">
              OFF
            </span>
          </div>
          {/* cta */}
          <Link to="/shop" className="">
            <Button
              rightIcon={ArrowRight02Icon}
              variant="accent"
              className="cursor-pointer rounded-xs sm:text-xs text-xxs font-semibold md:px-4 sm:px-3! px-2! md:h-12 h-8!"
            >
              SHOP NOW
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="p-1 bg-[#303639] mr-0 rounded-sm cursor-pointer absolute right-1"
        >
          <HugeiconsIcon icon={X} className="md:size-4 size-3" />
        </button>
      </div>
    </div>
  );
}
