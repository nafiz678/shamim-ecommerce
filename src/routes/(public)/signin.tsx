import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { supabaseClient } from "../../lib/supabase-client";
import AuthCard from "../../pages/auth/authentication";
import BreadcrumbHeading, {
  type BreadcrumbItemProps,
} from "../../pages/shop_page/breadcumb-heading";

export const Route = createFileRoute("/(public)/signin")({
  validateSearch: (search) => {
    return {
      redirect:
        typeof search.redirect === "string" && search.redirect.startsWith("/")
          ? search.redirect
          : "/",
      reason: typeof search.reason === "string" ? search.reason : undefined,
    };
  },

  beforeLoad: async ({ search }) => {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    if (session?.user) {
      throw redirect({
        to: search.redirect || "/",
        search: {
          reason: "authenticated",
        },
      });
    }
  },

  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { redirect, reason } = Route.useSearch();
  return (
    <>
      <BreadcrumbHeading items={breadcrumbs} />
      <main className="flex items-center justify-center bg-background px-4 py-18">
        <AuthCard
          reason={reason}
          onSuccess={() => {
            navigate({
              to: redirect || "/",
              replace: true,
            });
          }}
        />
      </main>
    </>
  );
}

const breadcrumbs: BreadcrumbItemProps[] = [
  { label: "Home", href: "/" },
  { label: "User Account", href: "/shop" },
  {
    label: "Sign In",
    href: "/signin",
    active: true,
  },
];
