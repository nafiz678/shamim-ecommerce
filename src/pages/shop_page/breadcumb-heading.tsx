import { ArrowRight01Icon, Home01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "../../lib/utils";
import { Link } from "@tanstack/react-router";

export type BreadcrumbItemProps = {
  label: string;
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
};

type BreadcrumbProps = {
  items: BreadcrumbItemProps[];
  className?: string;
  containerClassName?: string;
};

export default function BreadcrumbHeading({
  items,
  className,
  containerClassName,
}: BreadcrumbProps) {
  return (
    <div className={cn("bg-muted w-full", containerClassName)}>
      <nav className={cn("md:w-[70%] w-[95%] mx-auto py-5", className)}>
        <ol className="flex items-center md:gap-2 gap-1 sm:text-xs text-xxs font-medium text-foreground/60 flex-wrap">
          {items.map((item, index) => (
            <li
              key={item.label}
              className="flex items-center sm:gap-3 gap-1.5 text-nowrap"
            >
              {index > 0 && (
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="text-foreground/60 size-4"
                />
              )}

              <Link
                to={item.href}
                className={cn(
                  "inline-flex items-center gap-2 transition-colors",
                  item.active
                    ? "text-text-primary"
                    : "text-foreground/60 hover:text-text-primary",
                )}
              >
                {/* Default Home Icon for first item */}
                {index === 0 && !item.icon && (
                  <HugeiconsIcon icon={Home01Icon} className="size-4" />
                )}

                {/* Custom Icon */}
                {item.icon}

                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
