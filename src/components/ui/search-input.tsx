import { Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export function SearchInput() {
  return (
    <div className="w-full rounded-xs bg-white text-black px-2 py-1.5 shadow-sm sm:px-4 md:max-w-130 md:px-5 sm:py-2">
      <div className="flex items-center gap-2 sm:gap-3">
        <input
          name="search"
          type="text"
          placeholder="Search for anything..."
          className="w-full min-w-0 text-xs placeholder:text-muted-foreground outline-none"
        />

        <HugeiconsIcon
          icon={Search01Icon}
          strokeWidth={2.1}
          className="size-5 shrink-0 cursor-pointer md:size-6"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
