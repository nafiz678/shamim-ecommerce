import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Shield02Icon,
  ShoppingBag02Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "../../stories/Button";

export const Route = createFileRoute("/(public)/unauthorized")({
  component: UnauthorizedPage,
});

function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-surface shadow-lg">
        {/* toP color */}
        <div className="h-2 w-full bg-primary" />

        <div className="p-8 sm:p-10">
          {/* ICON */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary/10">
            <HugeiconsIcon
              icon={Shield02Icon}
              className="size-10 text-secondary"
            />
          </div>

          {/* CONTENT */}
          <div className="mt-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
              Access Restricted
            </p>

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Admin Access Required
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-foreground/70 sm:text-base">
              You do not have permission to access this admin panel. This area
              is restricted to authorized administrators only.
            </p>
          </div>

          {/* ACTIONS */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Button
              href="/"
              className="group relative h-13 overflow-hidden border border-border bg-surface px-5 text-foreground transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
            >
              <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-300 group-hover:translate-x-0" />

              <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide">
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
                />

                <span>Back to Home</span>
              </span>
            </Button>

            <Button
              href="/shop"
              className="group relative h-13 overflow-hidden bg-secondary px-5 text-white transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20"
            >
              <span className="absolute inset-0 translate-y-full bg-primary transition-transform duration-300 group-hover:translate-y-0" />

              <span className="relative z-10 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-wide">
                <HugeiconsIcon
                  icon={ShoppingBag02Icon}
                  className="size-4 transition-transform duration-300 group-hover:scale-110"
                />

                <span>Continue Shopping</span>
              </span>
            </Button>
          </div>

          {/* FOOTER */}
          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-xs text-foreground/50">Unauthorized Access</p>
          </div>
        </div>
      </div>
    </div>
  );
}
