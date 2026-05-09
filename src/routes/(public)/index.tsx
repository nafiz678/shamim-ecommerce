import { createFileRoute } from "@tanstack/react-router";
import Landing from "../../pages/landing/landing";

export const Route = createFileRoute("/(public)/")({
  component: Index,
});

function Index() {
  return <Landing />;
}
