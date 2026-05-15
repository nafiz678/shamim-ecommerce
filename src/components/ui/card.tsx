import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="border border-border rounded-2xl shadow-sm hover:shadow-md transition">
      {children}
    </div>
  );
}

export function CardHeader({ title }: { title: string }) {
  return (
    <div className="p-5 border-b border-border">
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  );
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="p-5 space-y-3">{children}</div>;
}
