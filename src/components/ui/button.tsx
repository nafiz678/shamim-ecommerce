import type { ButtonHTMLAttributes, ReactNode } from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "../../lib/utils";

type Variant = "accent" | "secondary" | "outline" | "ghost" | "dark" | "link";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: IconSvgElement;
  rightIcon?: IconSvgElement;
  iconClass?: string;
}

export default function Button({
  children,
  className,
  variant = "accent",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  iconClass,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xs transition-all duration-200 ease-out cursor-pointer";

  const variants: Record<Variant, string> = {
    accent: "bg-accent/95 text-black hover:bg-accent",
    secondary: "bg-secondary/95 text-background hover:bg-secondary",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
    ghost: "text-gray-800 hover:bg-gray-100",
    dark: "bg-black text-background hover:bg-gray-900",
    link: `relative text-foreground after:absolute after:left-1 after:bottom-1 after:h-[1.5px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-[calc(100%-0.5rem)] hover:bg-foreground/5 `,
  };

  const sizes: Record<Size, string> = {
    sm: "h-8 px-2 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        className,
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
      {...props}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        leftIcon && (
          <HugeiconsIcon
            icon={leftIcon}
            size={16}
            className={cn(iconClass, "shrink-0")}
            aria-hidden="true"
          />
        )
      )}

      <span>{children}</span>

      {!loading && rightIcon && (
        <HugeiconsIcon
          icon={rightIcon}
          size={16}
          className={iconClass}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
