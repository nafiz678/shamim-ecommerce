import { Input } from "../../../stories/Input/Input";

export function TableHead({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

export function TableData({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <td
      className={`px-6 py-5 text-sm text-neutral-700 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </td>
  );
}

export function InputField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground/75">
        {label}
      </label>

      <Input
        {...props}
        className="h-10 w-full rounded-xl! border border-border px-4 text-sm transition-all duration-300 ease-in-out"
      />
    </div>
  );
}

export function CheckboxField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 text-sm text-neutral-600">
      <input
        {...props}
        type="checkbox"
        className="size-4 rounded border-neutral-300"
      />

      {label}
    </label>
  );
}

export function StatusBadge({ active }: { active: boolean }) {
  return (
    <div
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </div>
  );
}
