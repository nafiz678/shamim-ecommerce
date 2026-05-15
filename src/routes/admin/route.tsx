import { createFileRoute, redirect } from "@tanstack/react-router";
import { getUserRole } from "../../features/auth/get-roles";
import { supabaseClient } from "../../lib/supabase-client";
import AdminLayout from "../../components/layout/admin-layout";

async function getSessionUser() {
  const { data } = await supabaseClient.auth.getSession();
  return data.session?.user ?? null;
}

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const user = await getSessionUser();

    if (!user) {
      throw redirect({
        to: "/signin",
        search: {
          redirect: "/admin",
          reason: "protected",
        },
      });
    }

    const role = await getUserRole(user.id);
    
    if (role !== "admin") {
      throw redirect({ to: "/unauthorized" });
    }
  },

  component: AdminLayout,
});
