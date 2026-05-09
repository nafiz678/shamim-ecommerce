import { createFileRoute } from "@tanstack/react-router";
import ShopPage from "../../../pages/shop_page/shop-page";

export const Route = createFileRoute("/(public)/shop/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ShopPage />;
}
