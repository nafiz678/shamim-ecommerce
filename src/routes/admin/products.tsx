import { createFileRoute } from "@tanstack/react-router";
import AdminProducts from "../../pages/admin/admin-product/admin-product";

export const Route = createFileRoute("/admin/products")({
  component: ProductsPage,
});

function ProductsPage() {
  return <AdminProducts />;
}
