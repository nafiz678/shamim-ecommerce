import { useEffect, useMemo, useState } from 'react';
import ShopHeading from './shop-heading';

import type { ProductProps } from '../../lib/type';
import SearchAndSort from './search-sort';
import ShopSidebar from './shop-sidebar';
import ProductsCard from '../../components/ui/products-card';

export type SortBy = 'popular' | 'price-low-high' | 'price-high-low' | 'rating';

export default function ShopPage() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('popular');
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

  return (
    <section>
      <ShopHeading />

      <div className="md:w-[70%] w-[95%] mx-auto pt-10 min-h-screen">
        <div className="grid grid-cols-12 items-start justify-center gap-5">
          <aside className="md:col-span-3 col-span-4">
            <ShopSidebar
              onCategoryChange={setSelectedCategory}
              selectedCategory={selectedCategory}
              onPriceRangeChange={setSelectedPriceRange}
              selectedPriceRange={selectedPriceRange}
            />
          </aside>

          <main className="md:col-span-9 col-span-8">
            <div className="mb-6">
              <SearchAndSort
                query={query}
                setQuery={setQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              <div className="bg-muted w-full px-4 text-xs py-2 mt-2.5 rounded-sm flex items-center justify-start gap-3">
                <p className="text-foreground/70">Active filters:</p>
                <div>{query ? `Search: ${query}` : 'No active filters'}</div>
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
    </section>
  );
}
