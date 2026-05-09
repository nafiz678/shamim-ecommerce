import { supabaseClient } from "./supabase-client";
import { redirect } from "@tanstack/react-router";

export async function getAuthSession() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  return session;
}

export async function requireAuthSession() {
  const session = await getAuthSession();

  if (!session?.user || !session.access_token) {
    return null;
  }

  return session;
}

type RequireAuthOptions = {
  locationHref: string;
};

export async function requirePrivateRoute({
  locationHref,
}: RequireAuthOptions) {
  const session = await requireAuthSession();

  if (!session) {
    throw redirect({
      to: "/signin",
      search: {
        redirect: locationHref,
        reason: "protected",
      },
    });
  }

  return session;
}
