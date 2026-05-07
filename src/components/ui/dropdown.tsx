import { ChevronDown } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '../../lib/utils';

type Option = {
  value: string;
  label: string;
};

type DropdownAlign = 'left' | 'right';
type DropdownWidth = 'trigger' | 'content' | 'auto';

type DropdownProps = {
  label?: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;

  /**
   * Trigger button styling.
   */
  triggerClassName?: string;

  /**
   * Dropdown menu wrapper styling.
   * Use this for background, border, shadow, etc.
   */
  menuClassName?: string;

  /**
   * Dropdown item styling.
   */
  itemClassName?: string;

  /**
   * Active item styling.
   */
  activeItemClassName?: string;

  /**
   * Selected item styling.
   */
  selectedItemClassName?: string;

  /**
   * Dropdown alignment.
   * Default: right
   */
  align?: DropdownAlign;

  /**
   * Dropdown width behavior.
   *
   * trigger: same width as trigger
   * content: grows based on content
   * auto: at least trigger width, but grows if content needs more space
   *
   * Default: auto
   */
  dropdownWidth?: DropdownWidth;
};

function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;

      if (!target || !ref.current || ref.current.contains(target)) return;

      handler();
    };

    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [enabled, handler, ref]);
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  className,
  triggerClassName,
  menuClassName,
  itemClassName,
  activeItemClassName,
  selectedItemClassName,
  align = 'right',
  dropdownWidth = 'auto',
}: DropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedIndex = useMemo(
    () => options.findIndex((option) => option.value === value),
    [options, value],
  );

  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, selectedIndex),
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonId = useId();
  const listboxId = useId();

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setActiveIndex(Math.max(0, selectedIndex));
    setOpen(true);
  }, [selectedIndex]);

  const selectOption = useCallback(
    (nextValue: string) => {
      onChange(nextValue);
      close();
    },
    [close, onChange],
  );

  useOutsideClick(rootRef, close, open);

  useEffect(() => {
    if (!open || options.length === 0) return;

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape': {
          event.preventDefault();
          close();
          break;
        }

        case 'ArrowDown': {
          event.preventDefault();
          setActiveIndex((prev) => (prev + 1) % options.length);
          break;
        }

        case 'ArrowUp': {
          event.preventDefault();
          setActiveIndex(
            (prev) => (prev - 1 + options.length) % options.length,
          );
          break;
        }

        case 'Home': {
          event.preventDefault();
          setActiveIndex(0);
          break;
        }

        case 'End': {
          event.preventDefault();
          setActiveIndex(options.length - 1);
          break;
        }

        case 'Enter':
        case ' ': {
          event.preventDefault();

          const next = options[activeIndex];

          if (next) {
            selectOption(next.value);
          }

          break;
        }

        case 'Tab': {
          close();
          break;
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, close, open, options, selectOption]);

  const menuAlignmentClassName = align === 'left' ? 'left-0' : 'right-0';

  const menuWidthClassName = {
    trigger: 'w-full',
    content: 'w-max min-w-max',
    auto: 'w-max min-w-full',
  }[dropdownWidth];

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <button
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => {
          if (open) {
            close();
          } else {
            openMenu();
          }
        }}
        className={cn(
          'flex w-full cursor-pointer items-center justify-between gap-1.5 rounded-md px-0.5 font-medium outline-none transition-all duration-300 md:gap-2 md:px-1.5',
          triggerClassName,
        )}
      >
        <span className="min-w-0 flex-1 truncate text-left">
          <span className="sr-only">Selected value:</span>
          {selectedOption?.label ?? label}
        </span>

        <HugeiconsIcon
          icon={ChevronDown}
          className={cn(
            'size-3 shrink-0 transition-transform duration-200 ease-out md:size-4',
            open ? 'rotate-180' : 'rotate-0',
          )}
          aria-hidden="true"
        />
      </button>

      <div
        className={cn(
          'absolute top-full z-20 mt-2 origin-top rounded-xl border border-border bg-primary p-1.5 shadow-2xl ring-1 ring-border transition-all duration-200 ease-out will-change-transform',
          menuAlignmentClassName,
          menuWidthClassName,
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-95 opacity-0',
          menuClassName,
        )}
      >
        <ul
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          className="max-h-64 overflow-auto outline-none"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                  }}
                  onClick={() => {
                    selectOption(option.value);
                  }}
                  className={cn(
                    'flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-left text-sm whitespace-nowrap transition-colors duration-150',
                    isActive ? 'bg-background text-primary' : 'text-background',
                    isSelected ? 'font-semibold' : 'font-normal',
                    itemClassName,
                    isActive && activeItemClassName,
                    isSelected && selectedItemClassName,
                  )}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
