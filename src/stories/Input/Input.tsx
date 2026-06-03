import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const inputVariants = cva(
  [
    "flex w-full min-w-0 rounded-md border bg-transparent",
    "transition-all duration-200 outline-none",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "placeholder:text-foreground/40",
    "selection:bg-secondary",
    "md:text-sm",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border",
          "focus-visible:border-border",
          "focus-visible:ring-foreground/20",
          "focus-visible:ring-[3px]",
        ],

        ghost: [
          "border-transparent",
          "bg-transparent",
          "shadow-none",
          "focus-visible:border-border",
        ],

        error: [
          "border-red-500",
          "focus-visible:border-red-500",
          "focus-visible:ring-red-500/20",
        ],
      },

      inputSize: {
        sm: "h-8 px-2 text-sm",
        md: "h-9 px-3 text-base",
        lg: "h-11 px-4 text-base",
      },
    },

    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  },
);

export interface InputProps
  extends React.ComponentProps<"input">, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, ...props }, ref) => {
    return (
      <input
        ref={ref}
        data-slot="input"
        className={cn(inputVariants({ variant, inputSize }), className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
