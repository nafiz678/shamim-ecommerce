import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Toaster } from "sonner";
import {
  Bell,
  ChartRoseIcon,
  ChevronRight,
  DashboardSquare03Icon,
  Layout04Icon,
  LogOut,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "../../lib/utils";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { useState } from "react";
import { Input } from "../../stories/Input/Input";

type NavItem = {
  title: string;
  to: string;
  icon: IconSvgElement;
};

const SIDEBAR_WIDTH = 270;
const SIDEBAR_COLLAPSED_WIDTH = 75;

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    to: "/admin/dashboard",
    icon: DashboardSquare03Icon,
  },
  {
    title: "Orders",
    to: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    to: "/admin/products",
    icon: Package,
  },
  {
    title: "Users",
    to: "/admin/users",
    icon: Users,
  },
  {
    title: "Notifications",
    to: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    to: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout() {
  const isMobile = useIsMobile();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  const isSidebarOpen = isMobile ? mobileSidebarOpen : true;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border/60 bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out",
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0",
          )}
          style={{
            width: desktopCollapsed
              ? `${SIDEBAR_COLLAPSED_WIDTH}px`
              : `${SIDEBAR_WIDTH}px`,
          }}
        >
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-border/60 px-4">
            <Link
              to="/admin/dashboard"
              className="flex min-w-0 items-center gap-3"
            >
              <div
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-2xl bg-secondary/60 shadow-sm",
                  desktopCollapsed ? "size-11 " : "size-11 ",
                )}
              >
                <HugeiconsIcon icon={ChartRoseIcon} className="size-5" />
              </div>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  desktopCollapsed ? "opacity-0" : "opacity-100",
                )}
              >
                <h2 className="whitespace-nowrap text-sm font-semibold tracking-tight">
                  Admin Panel
                </h2>

                <p className="whitespace-nowrap text-xs text-muted-foreground">
                  Management Dashboard
                </p>
              </div>
            </Link>

            {/* Mobile Close */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/60 transition-colors hover:bg-muted lg:hidden"
            >
              <HugeiconsIcon icon={Layout04Icon} className="size-4" />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-3 py-5">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.to || pathname.startsWith(`${item.to}/`);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={cn(
                      "group flex items-center transition-all duration-200",
                      desktopCollapsed
                        ? "justify-start px-3.5 py-3 rounded-xl"
                        : "justify-between px-3 py-3 rounded-xl",
                      isActive
                        ? "bg-secondary/50 text-foreground shadow-sm"
                        : "hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <HugeiconsIcon
                        icon={Icon}
                        className={cn(
                          "shrink-0 transition-transform duration-200",
                          desktopCollapsed
                            ? "size-5"
                            : "size-5 group-hover:scale-110",
                        )}
                      />

                      <span
                        className={cn(
                          "whitespace-nowrap text-sm font-medium transition-all duration-300",
                          desktopCollapsed ? "opacity-0" : "opacity-100",
                        )}
                      >
                        {item.title}
                      </span>
                    </div>

                    {!desktopCollapsed && (
                      <HugeiconsIcon
                        icon={ChevronRight}
                        className={cn(
                          "size-4 transition-all duration-200",
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                        )}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="border-t border-border/60 p-3">
            <button
              type="button"
              className={cn(
                "flex w-full items-center rounded-2xl text-sm font-medium transition-all duration-200 hover:bg-destructive/10 hover:text-destructive",
                desktopCollapsed
                  ? "justify-center px-2 py-3"
                  : "gap-3 px-4 py-3",
              )}
            >
              <HugeiconsIcon icon={LogOut} className="size-5 shrink-0" />

              {!desktopCollapsed && (
                <span className="whitespace-nowrap">Logout</span>
              )}
            </button>
          </div>
        </aside>

        {/* Main Layout */}
        <div
          className="flex min-h-screen flex-1 flex-col transition-all duration-300 ease-in-out"
          style={{
            paddingLeft: 0,
            marginLeft:
              typeof window !== "undefined" && window.innerWidth >= 1024
                ? desktopCollapsed
                  ? `${SIDEBAR_COLLAPSED_WIDTH}px`
                  : `${SIDEBAR_WIDTH}px`
                : "0px",
          }}
        >
          {isMobile && (
            <div
              className={cn(
                "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
                isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}
          {/* Topbar */}
          <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-3.5">
              {/* Left */}
              <div className="flex items-center gap-3">
                {/* Desktop Toggle */}
                <button
                  type="button"
                  onClick={() => setDesktopCollapsed((prev) => !prev)}
                  className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/60 transition-colors hover:bg-muted lg:inline-flex cursor-pointer"
                >
                  <HugeiconsIcon
                    icon={desktopCollapsed ? Layout04Icon : Layout04Icon}
                    className="size-4"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 transition-colors hover:bg-muted lg:hidden"
                >
                  <HugeiconsIcon icon={Layout04Icon} className="size-5" />
                </button>

                <div>
                  <h1 className="text-base font-semibold tracking-tight">
                    Admin Dashboard
                  </h1>

                  <p className="text-xs text-muted-foreground">
                    Manage your platform efficiently
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="hidden items-center gap-2 rounded-2xl border border-border/60 bg-muted/40 px-3 md:flex">
                  <HugeiconsIcon
                    icon={Search}
                    className="size-4 text-muted-foreground cursor-pointer"
                  />

                  <Input
                    type="text"
                    placeholder="Search..."
                    className="h-10 w-52 bg-transparent text-sm outline-none placeholder:text-muted-foreground border-0"
                  />
                </div>

                {/* User */}
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 px-3 py-2 transition-colors hover:bg-muted cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 text-sm font-semibold">
                    N
                  </div>

                  <div className="hidden text-left md:block">
                    <p className="text-sm font-medium leading-none">Nafiz</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Administrator
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-3 ">
            <div className="w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
}
