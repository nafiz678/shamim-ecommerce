import ProductsCard from './products-card';
import { useEffect, useMemo, useState } from 'react';
import type { ProductProps } from '../../../lib/type';
import { FeaturedProductCard } from './featured-product-card';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch('/dummy_data/products.json', {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: ProductProps[] = await res.json();
        setProducts(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  const featuredProduct = products[0];
  const productList = useMemo(() => products.slice(1, 9), [products]);

  if (isLoading) {
    return <div className="pt-5">Loading products...</div>;
  }

  if (error) {
    return <div className="pt-5 text-red-500">{error}</div>;
  }

  if (!featuredProduct) {
    return <div className="pt-5">No products found.</div>;
  }
  return (
    <div className="pt-5">
      <div className="border border-border grid grid-cols-12 items-center justify-center">
        {/* left side */}
        <FeaturedProductCard product={featuredProduct} />
        {/* right side */}
        <div className="col-span-9 grid grid-cols-4">
          {productList.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
