import ProductsCard from './products-card';
import type { ProductProps } from '../../../lib/type';
import { FeaturedProductCard } from './featured-product-card';

type ProductsPageProps = {
  products: ProductProps[];
};

export default function ProductsPage({ products }: ProductsPageProps) {
  const featuredProduct = products[0];
  const productList = products.slice(1, 10);

  if (!featuredProduct) {
    return <div className="pt-5">No products found.</div>;
  }

  return (
    <section className="pt-5">
      <div className="grid grid-cols-12 items-center justify-center border border-border">
        <FeaturedProductCard product={featuredProduct} />

        <div className="col-span-9 grid grid-cols-4">
          {productList.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}