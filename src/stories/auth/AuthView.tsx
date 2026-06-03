import { Input } from "../Input/Input";
import { Button } from "../Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, ViewOffSlashIcon } from "@hugeicons/core-free-icons";
import type { AuthViewProps } from "./auth.type";

export default function AuthView({
  mode,
  email,
  password,
  fullName,
  showPassword,
  loading,
  error,
  onChange,
  onSubmit,
  onTogglePassword,
  onSwitchMode,
}: AuthViewProps) {
  const isSignup = mode === "signup";

  return (
    <div className="w-full max-w-md mx-auto rounded-sm border border-border bg-background p-5 shadow-lg">
      {/* Header */}
      <h2 className="mb-4 text-center text-base font-semibold">
        {isSignup ? "Create Account" : "Sign In"}
      </h2>

      {/* FORM */}
      <div className="space-y-3">
        {/* Full name */}
        {isSignup && (
          <Input
            placeholder="Full name"
            value={fullName}
            onChange={(e) => onChange?.("fullName", e.target.value)}
          />
        )}

        {/* Email */}
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => onChange?.("email", e.target.value)}
        />

        {/* Password */}
        <div className="relative">
          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => onChange?.("password", e.target.value)}
            className="pr-10"
          />

          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <HugeiconsIcon
              icon={showPassword ? ViewIcon : ViewOffSlashIcon}
              className="size-4"
            />
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
            {error}
          </p>
        )}

        {/* Submit */}
        <Button
          onClick={onSubmit}
          disabled={loading}
          variant="secondary"
          className="w-full"
        >
          {loading
            ? isSignup
              ? "Creating..."
              : "Signing in..."
            : isSignup
              ? "Create Account"
              : "Sign In"}
        </Button>

        {/* Switch */}
        <button
          onClick={onSwitchMode}
          className="w-full text-xs text-foreground/60 hover:text-foreground"
        >
          {isSignup ? "Already have an account?" : "Create new account"}
        </button>
      </div>
    </div>
  );
}
