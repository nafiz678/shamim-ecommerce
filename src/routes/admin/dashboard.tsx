import { createFileRoute } from "@tanstack/react-router";
import AdminDashboard from "../../pages/admin/dashboard";

export const Route = createFileRoute("/admin/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return <AdminDashboard />;
}
