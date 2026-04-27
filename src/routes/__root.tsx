import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";
import HotNews from "../components/shared/hot-news";
import Heading from "../components/shared/heading";

const RootLayout = () => (
  <>
    <HotNews />
    <Heading />
    <Outlet />
    <div className="min-h-screen"/>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
