import HotNews from "../shared/hot-news";
import Heading from "../shared/heading";
import SessionTimer from "../../pages/shop_page/session-check";
import { Outlet } from "@tanstack/react-router";
import Footer from "../shared/footer";

export default function MainLayout() {
  return (
    <>
      <HotNews />
      <Heading />
      <SessionTimer />
      <Outlet />
      <Footer />
    </>
  );
}
