import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../index.css";
import Header from "../components/shared/header";
import HotNews from "../components/shared/hot-news";

const RootLayout = () => (
  <>
    <HotNews />
    <Header />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
