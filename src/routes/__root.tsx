import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import '../index.css';
import HotNews from '../components/shared/hot-news';
import Heading from '../components/shared/heading';
import Footer from '../components/shared/footer';

const RootLayout = () => (
  <>
    <HotNews />
    <Heading />
    <Outlet />
    <Footer />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
