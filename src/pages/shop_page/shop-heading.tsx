import { ArrowRight01Icon, Home01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '../../lib/utils';

const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Shop Grid', href: '/shop/grid' },
  {
    label: 'Electronics Devices',
    href: '/shop/grid/electronics-devices',
    active: true,
  },
];

export default function ShopHeading() {
  return (
    <div className="bg-muted w-full">
      <nav aria-label="Breadcrumb" className="w-[70%] mx-auto py-5">
        <ol className="flex items-center gap-3 text-xs font-medium text-foreground/60">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center gap-3">
              {index > 0 && (
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="text-foreground/60 size-4"
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
                  <HugeiconsIcon icon={Home01Icon} className="size-4" />
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
