import { createFileRoute } from '@tanstack/react-router';
import ProductsDetailsPage from '../../pages/product_page/product-page';
import ProductDetailsTabs from '../../pages/product_page/products-description';
import RelatedProducts from '../../pages/product_page/related-products';
import ProductHeading from '../../pages/product_page/product-heading';

export const Route = createFileRoute('/shop/$productId')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <ProductHeading />
      <ProductsDetailsPage />
      <ProductDetailsTabs />
      <RelatedProducts />
    </section>
  );
}
