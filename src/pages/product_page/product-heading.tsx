import { ArrowRight01Icon, Home01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '../../lib/utils';

const breadcrumbs: { label: string; href: string; active?: boolean }[] = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Shop Grid', href: '/shop' },
  {
    label: 'Electronics Devices',
    href: '/shop',
  },
  {
    label: 'Macbook Pro',
    href: '/shop',
    active: true,
  },
];

export default function ProductHeading() {
  return (
    <div className="bg-muted w-full">
      <nav className="md:w-[70%] w-[95%] mx-auto py-5">
        <ol className="flex items-center md:gap-2 gap-1 sm:text-xxs text-sxs font-medium text-foreground/60">
          {breadcrumbs.map((item, index) => (
            <li
              key={item.href}
              className="flex items-center md:gap-1.5 gap-0.5"
            >
              {index > 0 && (
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="text-foreground/60 md:size-4 size-3"
                />
              )}

              <a
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center gap-2 transition-colors',
                  item.active
                    ? 'text-text-primary'
                    : 'text-foreground/60 hover:text-text-primary',
                )}
              >
                {index === 0 && (
                  <HugeiconsIcon
                    icon={Home01Icon}
                    className="md:size-4 size-3"
                  />
                )}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
