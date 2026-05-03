import { Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export function SearchInput() {
  return (
    <div className="w-full max-w-130 rounded-xs bg-background px-5 py-2 shadow-sm">
      <div className="flex items-center gap-3">
        <input
          name="search"
          type="text"
          placeholder="Search for anything..."
          className="w-full bg-transparent text-xs text-slate-600 placeholder:text-slate-400 outline-none"
        />

        <HugeiconsIcon
          icon={Search01Icon}
          size={24}
          strokeWidth={2.1}
          className="shrink-0 text-foreground cursor-pointer md:size-6 size-5"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
