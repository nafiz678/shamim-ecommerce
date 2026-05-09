import {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "@hugeicons/core-free-icons";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "../../lib/utils";
import type { ReactNode } from "react";
import type { Order, Product, Stat } from "../../lib/types";

const stats: Stat[] = [
  { title: "Total Revenue", value: "$24,500", icon: DollarSign, trend: "+12%" },
  { title: "Orders", value: "1,240", icon: ShoppingCart, trend: "+8%" },
  { title: "Products", value: "320", icon: Package, trend: "+3%" },
  { title: "Customers", value: "890", icon: Users, trend: "+5%" },
];

const recentOrders: Order[] = [
  { id: "ORD-001", customer: "John Doe", status: "pending", amount: 120 },
  { id: "ORD-002", customer: "Sarah Khan", status: "shipped", amount: 340 },
  { id: "ORD-003", customer: "Alex Ray", status: "delivered", amount: 560 },
];

const products: Product[] = [
  { title: "iPhone 15 Pro", price: 1200, stock: 12, rating: 4.8 },
  { title: "MacBook Air M2", price: 999, stock: 8, rating: 4.9 },
  { title: "Sony Headphones", price: 199, stock: 34, rating: 4.6 },
];

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="border border-border rounded-2xl shadow-sm hover:shadow-md transition">
      {children}
    </div>
  );
}

function CardHeader({ title }: { title: string }) {
  return (
    <div className="p-5 border-b border-border">
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  );
}

function CardContent({ children }: { children: ReactNode }) {
  return <div className="p-5 space-y-3">{children}</div>;
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="bg-white border border-border rounded-2xl shadow-sm hover:shadow-md transition p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{stat.title}</p>
        <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
        <p className="text-xs text-green-600 mt-1 font-medium">{stat.trend}</p>
      </div>

      <div className="p-3 rounded-xl bg-gray-50 border border-border">
        <HugeiconsIcon icon={stat.icon} className="w-5 h-5 text-gray-700" />
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-xl text-sm font-medium transition border",
        active
          ? "bg-black text-white border-black"
          : "text-gray-600 hover:text-black border-border",
      )}
    >
      {children}
    </button>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<"orders" | "products">("orders");

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-500">
              Real-time overview of your ecommerce system
            </p>
          </div>

          <button className="px-4 py-2 rounded-xl border border-border bg-white flex items-center gap-2 hover:shadow-sm transition">
            <HugeiconsIcon icon={TrendingUp} className="w-4 h-4" />
            Analytics
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <StatCard key={s.title} stat={s} />
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-2">
          <TabButton active={tab === "orders"} onClick={() => setTab("orders")}>
            Orders
          </TabButton>

          <TabButton
            active={tab === "products"}
            onClick={() => setTab("products")}
          >
            Products
          </TabButton>
        </div>

        {/* ORDERS */}
        {tab === "orders" && (
          <Card>
            <CardHeader title="Recent Orders" />
            <CardContent>
              {recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between py-3 border-b last:border-none border-border"
                >
                  <div>
                    <p className="font-medium">{o.customer}</p>
                    <p className="text-xs text-gray-500">{o.id}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold">${o.amount}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* PRODUCTS */}
        {tab === "products" && (
          <Card>
            <CardHeader title="Top Products" />
            <CardContent>
              {products.map((p) => (
                <div
                  key={p.title}
                  className="flex items-center justify-between py-3 border-b last:border-none border-border"
                >
                  <div>
                    <p className="font-medium">{p.title}</p>
                    <p className="text-xs text-gray-500">
                      Stock: {p.stock} • ⭐ {p.rating}
                    </p>
                  </div>

                  <span className="font-semibold">${p.price}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
