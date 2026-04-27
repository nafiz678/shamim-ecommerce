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

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
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
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [enabled, handler, ref]);
}

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  className = '',
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(
      0,
      options.findIndex((option) => option.value === value),
    ),
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonId = useId();
  const listboxId = useId();

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? options[0],
    [options, value],
  );

  const close = useCallback(() => setOpen(false), []);
  const openMenu = useCallback(() => {
    setActiveIndex(
      Math.max(
        0,
        options.findIndex((option) => option.value === value),
      ),
    );
    setOpen(true);
  }, [options, value]);

  useOutsideClick(rootRef, close, open);

  useEffect(() => {
    if (!open) return;

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
          if (next) onChange(next.value);
          close();
          break;
        }
        case 'Tab': {
          close();
          break;
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, close, onChange, open, options]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => (open ? close() : openMenu())}
        className="inline-flex items-center md:gap-2 gap-1.5 rounded-md md:px-1.5 px-0.5 font-medium outline-none transition-all duration-300"
      >
        <span>{label}</span>
        <span className="sr-only">Selected value:</span>
        <span>{selectedOption?.label}</span>
        <HugeiconsIcon
          icon={ChevronDown}
          className={`md:size-4 size-3 transition-transform duration-200 ease-out ${open ? 'rotate-180' : 'rotate-0'}`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`absolute left-0 top-[calc(100%+8px)] z-20 min-w-42 origin-top rounded-xl border border-white/10 bg-[#0f4f85] p-1.5 shadow-2xl shadow-black/20 ring-1 ring-black/10 transition-all duration-200 ease-out will-change-transform ${
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0'
        }`}
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
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    onChange(option.value);
                    close();
                  }}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-left transition-colors duration-150 ${
                    isActive ? 'bg-background/12 text-white' : 'text-white/85'
                  } ${isSelected ? 'font-semibold' : 'font-normal'}`}
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
