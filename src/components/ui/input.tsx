import * as React from 'react';
import { cn } from '../../lib/utils';

export type InputProps = React.ComponentProps<'input'> & {
  error?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        aria-invalid={error || props['aria-invalid']}
        className={cn(
          'h-10 w-full rounded-sm border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors',
          'placeholder:text-foreground/45',
          'focus:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-60',
          'aria-invalid:border-red-500',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
