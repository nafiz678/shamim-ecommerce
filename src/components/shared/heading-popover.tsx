import { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ShoppingCart02Icon,
  FavouriteIcon,
  UserIcon,
  Cancel01Icon,
  ViewIcon,
  ArrowRight02FreeIcons,
} from '@hugeicons/core-free-icons';
import Button from '../ui/Button';

type PopoverType = 'cart' | 'user' | null;

const cartItems = [
  {
    id: 1,
    title: 'Canon EOS 1500D DSLR Camera Body+ 18-55 mm',
    quantity: 1,
    price: 1500,
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone',
    quantity: 2,
    price: 269,
    image: '/placeholder.svg',
  },
];

export default function HeaderActions() {
  const [activePopover, setActivePopover] = useState<PopoverType>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const togglePopover = (popover: Exclude<PopoverType, null>) => {
    setActivePopover((current) => (current === popover ? null : popover));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setActivePopover(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActivePopover(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center justify-center gap-2 md:gap-5"
    >
      {/* Cart Icon */}
      <div className="relative">
        <button
          type="button"
          aria-label="Open shopping cart"
          aria-expanded={activePopover === 'cart'}
          onClick={() => togglePopover('cart')}
          className="relative flex items-center justify-center outline-none transition-opacity hover:opacity-80"
        >
          <HugeiconsIcon
            className="size-5 cursor-pointer md:size-6"
            icon={ShoppingCart02Icon}
          />

          <span className="absolute -right-2 -top-2 flex size-3 items-center justify-center rounded-full bg-background text-xxs font-semibold leading-none text-primary sm:size-4 md:size-5">
            2
          </span>
        </button>

        <CartPopover
          isOpen={activePopover === 'cart'}
          subtotal={subtotal}
          onClose={() => setActivePopover(null)}
        />
      </div>

      {/* Favourite Icon */}
      <button
        type="button"
        className="flex items-center justify-center outline-none transition-opacity hover:opacity-80"
      >
        <HugeiconsIcon
          className="size-5 cursor-pointer md:size-6"
          icon={FavouriteIcon}
        />
      </button>

      {/* User Icon */}
      <div className="relative">
        <button
          type="button"
          aria-label="Open account menu"
          aria-expanded={activePopover === 'user'}
          onClick={() => togglePopover('user')}
          className="flex items-center justify-center outline-none transition-opacity hover:opacity-80"
        >
          <HugeiconsIcon
            className="size-5 cursor-pointer md:size-6"
            icon={UserIcon}
          />
        </button>

        <UserPopover isOpen={activePopover === 'user'} />
      </div>
    </div>
  );
}

function CartPopover({
  isOpen,
  subtotal,
  onClose,
}: {
  isOpen: boolean;
  subtotal: number;
  onClose: () => void;
}) {
  return (
    <div
      className={[
        'absolute right-0 top-9 z-50 w-65 origin-top-right border border-border bg-background p-4 shadow-lg transition-all duration-300 ease-out sm:w-80 rounded-sm',
        isOpen
          ? 'visible translate-y-0 scale-100 opacity-100'
          : 'invisible -translate-y-2 scale-95 opacity-0',
      ].join(' ')}
    >
      <h3 className="mb-4 text-sm font-medium text-foreground">
        Shopping Cart <span className="text-foreground/60">(02)</span>
      </h3>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="flex size-15 shrink-0 items-center justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="size-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="line-clamp-2 text-xs font-medium leading-5 text-foreground">
                {item.title}
              </h4>

              <p className="mt-1 text-xs text-foreground/60">
                {item.quantity} x{' '}
                <span className="font-semibold text-text-primary">
                  ${item.price.toLocaleString()}
                </span>
              </p>
            </div>

            <button
              type="button"
              aria-label={`Remove ${item.title}`}
              className="mt-1 flex size-5 shrink-0 items-center justify-center text-foreground/65 cursor-pointer transition-colors hover:text-foreground"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="my-4 flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs text-foreground/70">Sub-Total:</span>
        <span className="text-xs font-medium text-gray-900">
          ${subtotal.toFixed(2)} USD
        </span>
      </div>

      <Button
        variant="secondary"
        onClick={onClose}
        rightIcon={ArrowRight02FreeIcons}
        className="flex h-11 w-full items-center justify-center gap-2 bg-primary px-4 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-primary/90 flex-row"
      >
        Checkout Now
      </Button>

      <Button
        variant="outline"
        onClick={onClose}
        className="mt-3 w-full border-2 border-secondary/60 uppercase text-secondary"
      >
        View Cart
      </Button>
    </div>
  );
}

function UserPopover({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={[
        'absolute right-0 top-9 z-50 w-65 origin-top-right border bg-background p-5 shadow-lg transition-all duration-300 ease-out sm:w-80',
        isOpen
          ? 'visible translate-y-0 scale-100 opacity-100'
          : 'invisible -translate-y-2 scale-95 opacity-0',
      ].join(' ')}
    >
      <h3 className="mb-5 text-center text-base font-semibold text-foreground">
        Sign in to your account
      </h3>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder='Email'
            className="h-10 w-full border px-3 text-sm outline-none transition-colors border-border text-foreground placeholder:text-foreground/45"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-700"
            >
              Password
            </label>

            <button
              type="button"
              className="text-xs cursor-pointer font-medium text-[#2da5f3] hover:underline"
            >
              Forgot Password
            </button>
          </div>

          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder='Password'
              autoComplete="current-password"
              className="h-10 w-full border px-3 text-sm outline-none transition-colors border-border text-foreground placeholder:text-foreground/45"
            />

            <button
              type="button"
              aria-label="Show password"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 cursor-pointer transition-colors hover:text-foreground"
            >
              <HugeiconsIcon icon={ViewIcon} className="size-4" />
            </button>
          </div>
        </div>

        <Button
          variant="secondary"
          rightIcon={ArrowRight02FreeIcons}
          className="w-full uppercase font-semibold "
        >
          Login
        </Button>
      </form>

      <div className="my-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-foreground/10" />
        <span className="text-xs text-foreground/60">Don&apos;t have account</span>
        <span className="h-px flex-1 bg-foreground/10" />
      </div>

      <Button
        variant='outline'
        className="w-full border-2 border-secondary/60 text-secondary"
      >
        Create Account
      </Button>
    </div>
  );
}
