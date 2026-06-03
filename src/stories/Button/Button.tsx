import * as React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, type LinkProps } from "@tanstack/react-router";

import { cn } from "../../lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { IconSvgElement } from "@hugeicons/react";

export type ButtonVariant =
  | "accent"
  | "secondary"
  | "outline"
  | "ghost"
  | "dark"
  | "link";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;

  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;

  leftIcon?: IconSvgElement;
  rightIcon?: IconSvgElement;

  iconClass?: string;

  /**
   * If provided, renders TanStack Router Link instead of button
   */
  href?: LinkProps["to"];
  linkProps?: Omit<LinkProps, "to">;
}

const variants: Record<ButtonVariant, string> = {
  accent: "bg-accent/95 text-black hover:bg-accent",
  secondary: "bg-secondary/95 text-background hover:bg-secondary",
  outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
  ghost: "text-gray-800 hover:bg-gray-100",
  dark: "bg-black text-background hover:bg-gray-900",
  link: "relative text-foreground after:absolute after:left-1 after:bottom-1 after:h-[1.5px] after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-[calc(100%-0.5rem)] hover:bg-foreground/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xs transition-all duration-200 ease-out cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "accent",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      iconClass,
      disabled,
      href,
      ...props
    },
    ref,
  ) => {
    const content = (
      <>
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon && (
            <HugeiconsIcon
              icon={leftIcon}
              size={16}
              className={cn("shrink-0", iconClass)}
            />
          )
        )}

        <span>{children}</span>

        {!loading && rightIcon && (
          <HugeiconsIcon
            icon={rightIcon}
            size={16}
            className={cn("shrink-0", iconClass)}
          />
        )}
      </>
    );

    const classes = cn(base, variants[variant], sizes[size], className);

    if (href !== undefined) {
      return (
        <Link to={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
