import {
  Menu01Icon,
  Cancel01Icon,
  ProductLoadingIcon,
} from "@hugeicons/core-free-icons";
import { useEffect, useMemo, useState } from "react";
import type { CategoryProp, ProductProps } from "../../lib/types";

import SearchAndSort from "./search-sort";
import ShopSidebar from "./shop-sidebar";
import ProductsCard from "../../components/ui/products-card";

import { HugeiconsIcon } from "@hugeicons/react";

import BreadcrumbHeading, {
  type BreadcrumbItemProps,
} from "./breadcumb-heading";
import { apiFetch } from "../../lib/api-fetch";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/ui/button";

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
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("popular");

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 5000,
  });

  const {
    data: productsData = [],
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery<ProductProps[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await apiFetch<{
        success: boolean;
        data: ProductProps[];
      }>("/products");

      return data.data;
    },
  });

  const { data: categoriesData = [] } = useQuery<CategoryProp[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await apiFetch<{
        success: boolean;
        data: CategoryProp[];
      }>("/categories");

      return data.data;
    },
  });

  const availableBrands = useMemo(() => {
    return Array.from(
      new Set(productsData.map((product) => product.brand).filter(Boolean)),
    ) as string[];
  }, [productsData]);

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

    let filtered = [...(productsData ?? [])];

    /*
     * Search
     */
    if (normalizedQuery) {
      filtered = filtered.filter((product) => {
        return (
          product.title.toLowerCase().includes(normalizedQuery) ||
          product.description?.toLowerCase().includes(normalizedQuery) ||
          product.brand?.toLowerCase().includes(normalizedQuery)
        );
      });
    }

    /*
     * Category Filter
     */
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category_id === selectedCategory,
      );
    }

    /*
     * Brand Filter
     */
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand || ""),
      );
    }

    /*
     * Price Range Filter
     */
    filtered = filtered.filter((product) => {
      return product.price >= priceRange.min && product.price <= priceRange.max;
    });

    /*
     * Sorting
     */
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return a.price - b.price;

        case "price-high-low":
          return b.price - a.price;

        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);

        case "popular":
        default:
          return (b.rating ?? 0) - (a.rating ?? 0);
      }
    });

    return filtered;
  }, [
    productsData,
    query,
    selectedCategory,
    selectedBrands,
    priceRange,
    sortBy,
  ]);

  const activeFilters = [
    query && `Search: "${query}"`,

    selectedCategory &&
      `Category: ${
        categoriesData.find((c) => c.id === selectedCategory)?.name
      }`,

    selectedBrands.length > 0 && `Brands: ${selectedBrands.join(", ")}`,

    (priceRange.min > 0 || priceRange.max < 5000) &&
      `Price: $${priceRange.min} - $${priceRange.max}`,
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
              categories={categoriesData}
              brands={availableBrands}
              selectedCategory={selectedCategory}
              selectedBrands={selectedBrands}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onBrandChange={setSelectedBrands}
              onPriceRangeChange={setPriceRange}
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
            {isProductsLoading && (
              <div className="flex h-[50vh] items-center justify-center">
                <p className="text-sm text-foreground/60">
                  Loading products...
                </p>
              </div>
            )}

            {/* Error */}
            {!isProductsLoading && productsError && (
              <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {productsError.message}
              </div>
            )}

            {/* Empty State */}
            {!isProductsLoading &&
              !productsError &&
              finalProducts.length === 0 && (
                <div className="flex min-h-70 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-6 py-12 text-center shadow-sm">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm">
                    <HugeiconsIcon
                      icon={ProductLoadingIcon}
                      className="size-8 text-foreground/50"
                    />
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">
                    No products found
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/60">
                    We couldn&apos;t find any products matching your current
                    filters or search query. Try adjusting the filters or
                    searching with different keywords.
                  </p>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setQuery("");
                      setSelectedCategory(null);
                      setPriceRange({ min: 0, max: 5000 });
                    }}
                    className="mt-6 rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02] hover:opacity-90 active:scale-[0.98] cursor-pointer"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}

            {/* Products */}
            {!isProductsLoading &&
              !productsError &&
              finalProducts.length > 0 && (
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
              categories={categoriesData}
              brands={availableBrands}
              selectedCategory={selectedCategory}
              selectedBrands={selectedBrands}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onBrandChange={setSelectedBrands}
              onPriceRangeChange={setPriceRange}
            />
          </div>
        </div>
      </aside>
    </section>
  );
}
