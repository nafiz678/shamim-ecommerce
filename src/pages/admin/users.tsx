import { useEffect, useMemo, useState } from "react";
import { supabaseClient } from "../../lib/supabase-client";
import { cn } from "../../lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Activity,
  Calendar,
  Mail,
  MoreHorizontal,
  RefreshCw,
  Search,
  Shield,
  UserCheck,
  Users,
  UserX,
} from "@hugeicons/core-free-icons";
import { Badge } from "../../components/ui/Badge/Badge";
import type { Tables } from "../../lib/supabase";

type Profile = Tables<"profiles">;

type Role = "admin" | "moderator" | "user";
type UserStatus = "active" | "inactive" | "banned";

function formatDate(date: string | null) {
  if (!date) return "N/A";
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function RoleBadge({ role }: { role: Role }) {
  return (
    <Badge
      className={cn(
        "capitalize rounded-2xl! border border-border text-xs!",
        role === "admin" && "bg-primary/90 text-background! hover:bg-primary",
        role === "moderator" &&
          "bg-secondary text-background hover:bg-secondary/90",
        role === "user" && "bg-muted text-text",
      )}
    >
      {role}
    </Badge>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize border border-border bg-muted text-text",
      )}
    >
      <span
        className={cn(
          "mr-2 h-1.5 w-1.5 rounded-full",
          status === "active" && "bg-green-500",
          status === "inactive" && "bg-yellow-500",
          status === "banned" && "bg-red-500",
        )}
      />
      {status}
    </span>
  );
}

function StatsCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text/60">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-foreground">{value}</h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-text">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DashboardUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  async function fetchUsers() {
    try {
      setLoading(true);

      const { data, error } = await supabaseClient.from("profiles").select("*");

      if (error) {
        console.error(error.message);
        return;
      }

      setUsers(data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await fetchUsers();
    setRefreshing(false);
  }

  /* ---------------- filters ---------------- */

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchMatch =
        user.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const roleMatch = roleFilter === "all" || user.role === roleFilter;
      const statusMatch =
        statusFilter === "all" || user.status === statusFilter;

      return searchMatch && roleMatch && statusMatch;
    });
  }, [users, search, roleFilter, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      admins: users.filter((u) => u.role === "admin").length,
      banned: users.filter((u) => u.status === "banned").length,
    };
  }, [users]);

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Users Dashboard</h1>
            <p className="mt-1 text-sm text-text/60">
              Manage platform users, permissions, and statuses.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            <HugeiconsIcon
              icon={RefreshCw}
              className={cn("h-4 w-4", refreshing && "animate-spin")}
            />
            Refresh
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Total Users"
            value={stats.total}
            icon={<HugeiconsIcon icon={Users} className="h-5 w-5" />}
          />
          <StatsCard
            title="Active Users"
            value={stats.active}
            icon={<HugeiconsIcon icon={UserCheck} className="h-5 w-5" />}
          />
          <StatsCard
            title="Admins"
            value={stats.admins}
            icon={<HugeiconsIcon icon={Shield} className="h-5 w-5" />}
          />
          <StatsCard
            title="Banned Users"
            value={stats.banned}
            icon={<HugeiconsIcon icon={UserX} className="h-5 w-5" />}
          />
        </div>

        {/* FILTERS */}
        <div className="rounded-2xl border border-border bg-background p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <HugeiconsIcon
                icon={Search}
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text/40"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="h-12 w-full rounded-xl border border-border bg-muted pl-11 pr-4 text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-12 rounded-xl border border-border bg-muted px-4 text-sm"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-12 rounded-xl border border-border bg-muted px-4 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  {[
                    "User",
                    "Role",
                    "Status",
                    "Joined",
                    "Last Active",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase text-text/60"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {loading ? (
                  [...Array(6)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan={6} className="px-6 py-5">
                        <div className="h-12 animate-pulse rounded-xl bg-muted" />
                      </td>
                    </tr>
                  ))
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-20 text-center text-text/60"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/50">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted font-bold">
                            {user.full_name?.slice(0, 2).toUpperCase() || "U"}
                          </div>

                          <div>
                            <h3 className="font-semibold">
                              {user.full_name || "Unnamed User"}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-text/60">
                              <HugeiconsIcon
                                icon={Mail}
                                className="h-3.5 w-3.5"
                              />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <RoleBadge role={user.role as Role} />
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={user.status as UserStatus} />
                      </td>

                      <td className="px-6 py-5 text-sm text-text/60">
                        <div className="flex items-center gap-2">
                          <HugeiconsIcon icon={Calendar} className="h-4 w-4" />
                          {formatDate(user.created_at)}
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-text/60">
                        <div className="flex items-center gap-2">
                          <HugeiconsIcon icon={Activity} className="h-4 w-4" />
                          {formatDate(user.last_seen_at)}
                        </div>
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button className="h-10 w-10 rounded-lg border border-border hover:bg-muted flex items-center justify-center text-text cursor-pointer">
                          <HugeiconsIcon
                            icon={MoreHorizontal}
                            className="size-5"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
