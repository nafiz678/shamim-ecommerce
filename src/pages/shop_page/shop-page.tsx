import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { useEffect, useMemo, useState } from "react";
import type { ProductProps } from "../../lib/types";

import SearchAndSort from "./search-sort";
import ShopSidebar from "./shop-sidebar";
import ProductsCard from "../../components/ui/products-card";

import { HugeiconsIcon } from "@hugeicons/react";

import BreadcrumbHeading, {
  type BreadcrumbItemProps,
} from "./breadcumb-heading";
import { apiFetch } from "../../lib/api-fetch";

export type SortBy = "popular" | "price-low-high" | "price-high-low" | "rating";

const breadcrumbs: BreadcrumbItemProps[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Shop Grid", href: "/shop/grid" },
  {
    label: "Electronics Devices",
    href: "/shop/grid/electronics-devices",
    active: true,
  },
];

export default function ShopPage() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("popular");

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Electronics Devices",
  );

  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    "All Price",
  );

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await apiFetch<{
          success: boolean;
          message: string;
          data: ProductProps[];
        }>("/products");

        if (!data.success) {
          throw new Error(data.message || "Failed to load products");
        }

        if (!Array.isArray(data.data)) {
          throw new Error("Invalid products JSON format");
        }

        setProducts(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    if (!isMobileSidebarOpen) return;

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileSidebarOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

  const finalProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    let filteredProducts = [...products];

    // Search filter
    if (normalizedQuery) {
      filteredProducts = filteredProducts.filter((product) => {
        return (
          product.title.toLowerCase().includes(normalizedQuery) ||
          product.brand?.toLowerCase().includes(normalizedQuery) ||
          product.category_id?.toLowerCase().includes(normalizedQuery) ||
          product.description?.toLowerCase().includes(normalizedQuery)
        );
      });
    }

    // Category filter
    if (
      selectedCategory &&
      selectedCategory !== "All Categories" &&
      selectedCategory !== "Electronics Devices"
    ) {
      filteredProducts = filteredProducts.filter((product) =>
        product.category_id
          ?.toLowerCase()
          .includes(selectedCategory.toLowerCase()),
      );
    }

    // Price filter
    if (selectedPriceRange && selectedPriceRange !== "All Price") {
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.price;

        switch (selectedPriceRange) {
          case "Under $50":
            return price < 50;

          case "$50 - $100":
            return price >= 50 && price <= 100;

          case "$100 - $500":
            return price >= 100 && price <= 500;

          case "Above $500":
            return price > 500;

          default:
            return true;
        }
      });
    }

    // Sorting
    return filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return a.price - b.price;

        case "price-high-low":
          return b.price - a.price;

        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);

        case "popular":
        default:
          return b.rating - a.rating;
      }
    });
  }, [products, query, sortBy, selectedCategory, selectedPriceRange]);

  const activeFilters = [
    query && `Search: "${query}"`,
    selectedCategory &&
      selectedCategory !== "Electronics Devices" &&
      `Category: ${selectedCategory}`,
    selectedPriceRange &&
      selectedPriceRange !== "All Price" &&
      `Price: ${selectedPriceRange}`,
  ].filter(Boolean);

  return (
    <section>
      <BreadcrumbHeading
        items={breadcrumbs}
        className="max-w-7xl"
        containerClassName="bg-background"
      />

      <div className="mx-auto min-h-screen w-[95%] pt-10 md:w-[70%]">
        <div className="grid grid-cols-12 items-start gap-5">
          {/* Desktop Sidebar */}
          <aside className="hidden md:col-span-3 md:block">
            <ShopSidebar
              onCategoryChange={setSelectedCategory}
              selectedCategory={selectedCategory}
              onPriceRangeChange={setSelectedPriceRange}
              selectedPriceRange={selectedPriceRange}
            />
          </aside>

          {/* Main Content */}
          <main className="col-span-12 md:col-span-9">
            <div className="mb-6">
              <div className="flex items-center gap-3 md:block">
                <button
                  type="button"
                  aria-label="Open product filters"
                  aria-expanded={isMobileSidebarOpen}
                  aria-controls="mobile-shop-filters"
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-sm border border-border bg-background text-foreground transition-colors hover:bg-muted sm:size-10 md:hidden"
                >
                  <HugeiconsIcon
                    icon={Menu01Icon}
                    className="size-5"
                    aria-hidden="true"
                  />
                </button>

                <div className="min-w-0 flex-1">
                  <SearchAndSort
                    query={query}
                    setQuery={setQuery}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                </div>
              </div>

              {/* Active Filters */}
              <div className="mt-2.5 flex flex-wrap items-center gap-2 rounded-sm bg-muted px-4 py-2 text-xs">
                <p className="text-foreground/70">Active filters:</p>

                {activeFilters.length > 0 ? (
                  activeFilters.map((filter, idx) => (
                    <span
                      key={idx}
                      className="rounded-sm bg-background px-2 py-1 text-foreground/80"
                    >
                      {filter}
                    </span>
                  ))
                ) : (
                  <span className="text-foreground/50">No active filters</span>
                )}
              </div>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="flex h-[50vh] items-center justify-center">
                <p className="text-sm text-foreground/60">
                  Loading products...
                </p>
              </div>
            )}

            {/* Error */}
            {!isLoading && error && (
              <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Empty */}
            {!isLoading && !error && finalProducts.length === 0 && (
              <div className="rounded-sm border border-border p-6 text-center text-sm text-foreground/60">
                No products found.
              </div>
            )}

            {/* Products */}
            {!isLoading && !error && finalProducts.length > 0 && (
              <div className="grid grid-cols-2 gap-3 py-4 lg:grid-cols-4">
                {finalProducts.slice(0, 24).map((product) => (
                  <ProductsCard key={product.id} product={product} featured />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          isMobileSidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside
        id="mobile-shop-filters"
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
        className={`fixed left-0 top-0 z-50 h-dvh w-[85%] max-w-sm bg-background shadow-xl transition-transform duration-300 ease-out md:hidden ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="text-base font-semibold text-foreground">Filters</h2>

            <button
              type="button"
              aria-label="Close product filters"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="inline-flex size-9 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-muted"
            >
              <HugeiconsIcon
                icon={Cancel01Icon}
                className="size-5"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5">
            <ShopSidebar
              onCategoryChange={setSelectedCategory}
              selectedCategory={selectedCategory}
              onPriceRangeChange={setSelectedPriceRange}
              selectedPriceRange={selectedPriceRange}
            />
          </div>
        </div>
      </aside>
    </section>
  );
}
