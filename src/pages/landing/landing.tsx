import { useEffect, useMemo, useState } from 'react';
import type { ProductProps } from '../../lib/type';
import BestDeals from './Best-Deals/best-deals';
import Categories from './Categories/categories';
import ComputerAccessories from './Computer-accessories/computer-accessories';
import FeaturedSection from './Featured-section/featured-section';
import Hero from './Hero/hero';
import ProductBannerFirst from './Product-banner/product-banner-first';
import ProductBannerSecond from './Product-banner/product-banner-second';
import ProductBanner from './Product-banner/product-banner';
import BLogs from './blog/blogs';
import NewsLatter from './new-latter';

export default function Landing() {
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

  const productList = useMemo(() => products.slice(0, 8), [products]);

  if (isLoading) {
    return <div className="pt-5">Loading</div>;
  }

  if (error) {
    return <div className="pt-5 text-red-500">{error}</div>;
  }
  return (
    <main className="pt-6">
      <div className="w-[70%] mx-auto">
        <Hero />
        <BestDeals productList={products} />
        <Categories />
        <FeaturedSection productList={productList} />
        <ProductBannerFirst />
        <ComputerAccessories productList={productList} />
      </div>
      <ProductBannerSecond />
      <div className="w-[70%] mx-auto">
        <ProductBanner />
      </div>
      <BLogs />
      <NewsLatter />
    </main>
  );
}
