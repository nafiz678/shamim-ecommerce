import { useEffect, useMemo, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart02Icon,
  FavouriteIcon,
  UserIcon,
  Cancel01Icon,
  ArrowRight02FreeIcons,
} from "@hugeicons/core-free-icons";

import LoginPopover from "./login-popover";
import { useAppSelector } from "../../store/hooks";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

type PopoverType = "cart" | "user" | null;

const cartItems = [
  {
    id: 1,
    title: "Canon EOS 1500D DSLR Camera Body+ 18-55 mm",
    quantity: 1,
    price: 1500,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Simple Mobile 5G LTE Galaxy 12 Mini 512GB Gaming Phone",
    quantity: 2,
    price: 269,
    image: "/placeholder.svg",
  },
];

export default function HeaderActions() {
  const [activePopover, setActivePopover] = useState<PopoverType>(null);

  const {
    user,
    isAuthenticated,
    isLoading: isAuthLoading,
  } = useAppSelector((state) => state.auth);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, []);

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
      if (event.key === "Escape") {
        setActivePopover(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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
      if (event.key === "Escape") {
        setActivePopover(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center justify-center gap-2 md:gap-5"
    >
      <div className="relative">
        <button
          aria-label="Open shopping cart"
          aria-expanded={activePopover === "cart"}
          onClick={() => togglePopover("cart")}
          className="relative flex items-center justify-center outline-none transition-opacity hover:opacity-80"
        >
          <HugeiconsIcon
            className="size-5 cursor-pointer md:size-6"
            icon={ShoppingCart02Icon}
          />

          <span className="absolute -right-2 -top-2 flex size-3 items-center justify-center rounded-full bg-background dark:bg-white text-xxs font-semibold leading-none text-primary sm:size-4 md:size-5">
            {cartItems.length}
          </span>
        </button>

        <CartPopover
          isOpen={activePopover === "cart"}
          subtotal={subtotal}
          onClose={() => setActivePopover(null)}
        />
      </div>

      <button
        type="button"
        aria-label="Open favourites"
        className="flex items-center justify-center outline-none transition-opacity hover:opacity-80"
      >
        <HugeiconsIcon
          className="size-5 cursor-pointer md:size-6"
          icon={FavouriteIcon}
        />
      </button>

      <div className="relative">
        <button
          type="button"
          aria-label="Open account menu"
          aria-expanded={activePopover === "user"}
          onClick={() => togglePopover("user")}
          className="relative flex items-center justify-center outline-none transition-opacity hover:opacity-80"
        >
          <HugeiconsIcon
            className="size-5 cursor-pointer md:size-6"
            icon={UserIcon}
          />

          {isAuthenticated && (
            <span className="absolute -right-1 -top-1 size-2 rounded-full bg-green-500" />
          )}
        </button>

        <LoginPopover
          isOpen={activePopover === "user"}
          user={user}
          isAuthLoading={isAuthLoading}
          onClose={() => setActivePopover(null)}
        />
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
      className={cn(
        "absolute right-0 top-9 z-50 w-65 origin-top-right rounded-sm border border-border bg-background p-4 shadow-lg transition-all duration-300 ease-out sm:w-80",
        isOpen
          ? "visible translate-y-0 scale-100 opacity-100"
          : "invisible -translate-y-2 scale-95 opacity-0",
      )}
    >
      <h3 className="mb-4 text-sm font-medium text-foreground">
        Shopping Cart{" "}
        <span className="text-foreground/60">
          ({String(cartItems.length).padStart(2, "0")})
        </span>
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
                {item.quantity} x{" "}
                <span className="font-semibold text-text-primary">
                  ${item.price.toLocaleString()}
                </span>
              </p>
            </div>

            <button
              type="button"
              aria-label={`Remove ${item.title}`}
              className="mt-1 flex size-5 shrink-0 cursor-pointer items-center justify-center text-foreground/65 transition-colors hover:text-foreground"
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
        className="flex h-11 w-full flex-row items-center justify-center gap-2 bg-primary px-4 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-primary/90"
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
