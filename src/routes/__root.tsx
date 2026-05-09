import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../index.css";
import SessionTimer from "../pages/shop_page/session-check";

const RootLayout = () => (
  <>
    <SessionTimer />
    <Outlet />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
