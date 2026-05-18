import {
  createFileRoute,
  notFound,
  useLoaderData,
} from "@tanstack/react-router";
import BreadcrumbHeading, {
  type BreadcrumbItemProps,
} from "../../../pages/shop_page/breadcumb-heading";
import { requirePrivateRoute } from "../../../lib/route-guards";
import ProductsDetailsPage from "../../../pages/product_page/product-page";
import ProductDetailsTabs from "../../../pages/product_page/products-description";
import RelatedProducts from "../../../pages/product_page/related-products";
import { apiFetch } from "../../../lib/api-fetch";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const Route = createFileRoute("/(public)/shop/$slug")({
  beforeLoad: async ({ location }) => {
    await requirePrivateRoute({
      locationHref: location.href,
    });
  },
  loader: async ({ params }) => {
    const res = await apiFetch<ApiResponse<ProductDetailsProps>>(
      `/products/${params.slug}`,
    );
    if (!res.success || !res.data) {
      throw notFound();
    }
    return { product: res.data };
  },

  component: RouteComponent,
});

function RouteComponent() {
  const { product } = useLoaderData({
    from: "/(public)/shop/$slug",
  });
  console.log(product);
  return (
    <section>
      <BreadcrumbHeading items={breadcrumbs} />
      <ProductsDetailsPage product={product} />
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

export type ProductDetailsProps = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  old_price: number | null;
  images: string[] | null;
  rating: number;
  stock: number;
  brand: string | null;
  category?: {
    id: string;
    name: string;
    slug: string;
    image_url: string | null;
  } | null;
};
