import { Button } from "../Button";
import { cn } from "../../../lib/utils";

export default function AuthSignedView({
  user,
  onLogout,
}: {
  user: {
    fullName?: string;
    email: string;
    role?: "admin" | "user";
  };
  onLogout?: () => void;
}) {
  const isAdmin = user.role === "admin";

  return (
    <div className="w-full max-w-md mx-auto rounded-sm border border-border bg-background p-5 shadow-lg">
      <div className="mb-4 border border-border bg-foreground/5 p-4">
        <p className="text-xs text-foreground/50">Signed in as</p>

        <p className="mt-1 text-sm font-semibold">
          {user.fullName || user.email}
        </p>

        <p className="text-xs text-foreground/60">{user.email}</p>

        {user.role && (
          <span
            className={cn(
              "mt-2 inline-block border px-2 py-1 text-xxs uppercase",
              isAdmin
                ? "border-secondary text-secondary"
                : "border-border text-foreground/60",
            )}
          >
            {user.role}
          </span>
        )}
      </div>

      <Button variant="outline" className="w-full" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}
