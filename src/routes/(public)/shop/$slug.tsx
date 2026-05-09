import { createFileRoute } from "@tanstack/react-router";
import BreadcrumbHeading, { type BreadcrumbItemProps } from "../../../pages/shop_page/breadcumb-heading";
import { requirePrivateRoute } from "../../../lib/route-guards";
import ProductsDetailsPage from "../../../pages/product_page/product-page";
import ProductDetailsTabs from "../../../pages/product_page/products-description";
import RelatedProducts from "../../../pages/product_page/related-products";


export const Route = createFileRoute("/(public)/shop/$slug")({
  beforeLoad: async ({ location }) => {
    await requirePrivateRoute({
      locationHref: location.href,
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <BreadcrumbHeading items={breadcrumbs} />
      <ProductsDetailsPage />
      <ProductDetailsTabs />
      <RelatedProducts />
    </section>
  );
}

const breadcrumbs: BreadcrumbItemProps[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Shop Grid", href: "/shop" },
  {
    label: "Electronics Devices",
    href: "/shop",
  },
  {
    label: "Macbook Pro",
    href: "/shop",
    active: true,
  },
];
