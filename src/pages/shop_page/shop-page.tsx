import { Menu01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { useEffect, useMemo, useState } from 'react';
import ShopHeading from './shop-heading';

import type { ProductProps } from '../../lib/type';
import SearchAndSort from './search-sort';
import ShopSidebar from './shop-sidebar';
import ProductsCard from '../../components/ui/products-card';
import { HugeiconsIcon } from '@hugeicons/react';

export type SortBy = 'popular' | 'price-low-high' | 'price-high-low' | 'rating';

export default function ShopPage() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('popular');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'Electronics Devices',
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    'All Price',
  );

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch('/dummy_data/shop-products.json', {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to load products: ${res.status}`);
        }

        const data: unknown = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid products JSON format');
        }

        setProducts(data as ProductProps[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    if (!isMobileSidebarOpen) return;

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileSidebarOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarOpen]);

  const finalProducts = useMemo(() => {
    const normalQuery = query.trim().toLowerCase();

    const filteredProducts = products.filter((product) => {
      if (!normalQuery) return true;
      return (
        product.title.toLowerCase().includes(normalQuery) ||
        product.category.toLowerCase().includes(normalQuery) ||
        product.description?.toLowerCase().includes(normalQuery)
      );
    });

    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return a.price - b.price;

        case 'price-high-low':
          return b.price - a.price;

        case 'rating':
          return (b.rating ?? 0) - (a.rating ?? 0);

        case 'popular':
        default:
          return (b.reviews_count ?? 0) - (a.reviews_count ?? 0);
      }
    });
  }, [products, query, sortBy]);

  const activeFilterText = query ? `Search: ${query}` : 'No active filters';

  return (
    <section>
      <ShopHeading />

      <div className="md:w-[70%] w-[95%] mx-auto pt-10 min-h-screen">
        <div className="grid grid-cols-12 items-start justify-center gap-5">
          <aside className="hidden md:block md:col-span-3">
            <ShopSidebar
              onCategoryChange={setSelectedCategory}
              selectedCategory={selectedCategory}
              onPriceRangeChange={setSelectedPriceRange}
              selectedPriceRange={selectedPriceRange}
            />
          </aside>

          <main className="col-span-12 md:col-span-9">
            <div className="mb-6">
              <div className="flex items-center gap-3 md:block">
                <button
                  type="button"
                  aria-label="Open product filters"
                  aria-expanded={isMobileSidebarOpen}
                  aria-controls="mobile-shop-filters"
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="inline-flex sm:size-10 size-8 shrink-0 items-center justify-center rounded-sm border border-border bg-background text-foreground transition-colors hover:bg-muted md:hidden"
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

              <div className="bg-muted w-full px-4 text-xs py-2 mt-2.5 rounded-sm flex items-center justify-start gap-3">
                <p className="text-foreground/70">Active filters:</p>
                <div>{activeFilterText}</div>
              </div>
            </div>

            {isLoading && (
              <div className="flex items-center justify-center h-1/2">
                Loading...
              </div>
            )}

            {!isLoading && error && (
              <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {!isLoading && !error && finalProducts.length === 0 && (
              <div className="rounded-sm border border-border p-6 text-center text-sm text-foreground/60">
                No products found.
              </div>
            )}

            {!isLoading && !error && finalProducts.length > 0 && (
              <div className="grid lg:grid-cols-4 grid-cols-2 items-center justify-center gap-3 py-4">
                {finalProducts.slice(0, 24).map((product) => (
                  <ProductsCard key={product.id} product={product} featured />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-foreground/40 transition-opacity duration-300 md:hidden ${
          isMobileSidebarOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={() => setIsMobileSidebarOpen(false)}
      />

      <aside
        id="mobile-shop-filters"
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
        className={`fixed left-0 top-0 z-50 h-dvh w-[85%] max-w-sm bg-background shadow-xl transition-transform duration-300 ease-out md:hidden ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
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
