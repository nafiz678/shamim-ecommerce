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
      <div className="relative bg-[#191C1F] text-white flex items-center justify-between">
        <div className="md:w-[70%] w-[85%] mx-auto flex items-center justify-between py-3">
          {/* black friday */}
          <div className="flex items-center gap-2">
            <div className="bg-[#F3DE6D] text-foreground px-2 py-1 -rotate-4">
              <span className="md:font-medium text-sm md:text-base">Black</span>
            </div>
            <p className="text-lg">Friday</p>
          </div>
          {/* offer */}
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-[11px]">Up to</span>
            <span className="text-3xl font-medium text-accent">59%</span>
            <span className="font-medium">OFF</span>
          </div>
          {/* cta */}
          <Link to="/shop">
            <Button
              rightIcon={ArrowRight02Icon}
              variant="accent"
              className="cursor-pointer rounded-xs text-xs font-semibold"
            >
              SHOP NOW
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="p-1 bg-[#303639] mr-0 rounded-sm cursor-pointer absolute right-1"
        >
          <HugeiconsIcon icon={X} className="size-4" />
        </button>
      </div>
    </div>
  );
}
