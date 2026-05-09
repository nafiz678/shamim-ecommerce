import type { ProductProps } from "../../lib/types";
import BestDeals from "./best-Deals/best-deals";
import Categories from "./categories/categories";
import ComputerAccessories from "./computer-accessories/computer-accessories";
import FeaturedSection from "./featured-section/featured-section";
import Hero from "./hero/hero";
import ProductBannerFirst from "./product-banner/product-banner-first";
import ProductBannerSecond from "./product-banner/product-banner-second";
import ProductBanner from "./product-banner/product-banner";
import BLogs from "./blog/blogs";
import NewsLatter from "./news-latter";
import { useQuery } from "@tanstack/react-query";
import {
  BestDealsSkeleton,
  ComputerAccessoriesSkeleton,
  FeaturedSectionSkeleton,
} from "../../components/shared/loader/loader";
import { apiFetch } from "../../lib/api-fetch";

type ProductsResponse = {
  success: boolean;
  message: string;
  data: ProductProps[];
};

export default function Landing() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => apiFetch<ProductsResponse>("/products"),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    select: (response) => ({
      products: response.data,
      productList: response.data.slice(0, 8),
    }),
  });

  const products = data?.products ?? [];
  const productList = data?.productList ?? [];

  return (
    <main className="pt-6">
      <div className="lg:w-[70%] w-[95%] mx-auto">
        <Hero />

        {isError ? (
          <LandingError
            message={
              error instanceof Error ? error.message : "Something went wrong"
            }
            onRetry={() => void refetch()}
          />
        ) : (
          <>
            {isPending ? (
              <BestDealsSkeleton />
            ) : (
              <BestDeals productList={products} />
            )}

            <Categories />

            {isPending ? (
              <FeaturedSectionSkeleton />
            ) : (
              <FeaturedSection productList={productList} />
            )}

            <ProductBannerFirst />

            {isPending ? (
              <ComputerAccessoriesSkeleton />
            ) : (
              <ComputerAccessories productList={productList} />
            )}
          </>
        )}
      </div>

      <ProductBannerSecond />

      <div className="md:w-[70%] w-[95%] mx-auto">
        <ProductBanner />
      </div>

      <BLogs />
      <NewsLatter />
    </main>
  );
}

function LandingError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Unable to load products
        </h2>

        <p className="mt-2 text-sm text-red-600">{message}</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
