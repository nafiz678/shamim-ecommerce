import { createFileRoute } from "@tanstack/react-router";
import DashboardUsers from "../../pages/admin/users";

export const Route = createFileRoute("/admin/users")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardUsers />;
}
