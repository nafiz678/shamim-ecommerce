import * as React from "react";
import { cn } from "../../lib/utils";

export type InputProps = React.ComponentProps<"input"> & {
  error?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        aria-invalid={error || props["aria-invalid"]}
        className={cn(
          "placeholder:text-foreground/40 selection:bg-secondary border-border flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-border focus-visible:ring-foreground/20 focus-visible:ring-[3px]",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
