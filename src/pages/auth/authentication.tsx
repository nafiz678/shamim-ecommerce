import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight02FreeIcons,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import { supabaseClient } from "../../lib/supabase-client";
import { Input } from "../../components/ui/input";
import Button from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { AppleIcon, GoogleIcon } from "../../components/icons/Icon";

type AuthMode = "signin" | "signup";

type BackendSignupResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
  };
};

type SignInCardProps = {
  redirectTo?: string;
  reason?: string;
  onSuccess: () => void | Promise<void>;
};

const API_URL = import.meta.env.VITE_API_URL as string;

export default function AuthCard({ reason, onSuccess }: SignInCardProps) {
  const [mode, setMode] = useState<AuthMode>("signin");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSignInMode = mode === "signin";

  const resetMessages = () => {
    setErrorMessage(null);
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    resetMessages();
  };

  const validateForm = () => {
    const trimmedEmail = email.trim();
    const trimmedName = fullName.trim();

    if (!trimmedEmail) return "Email address is required";

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      return "Enter a valid email address";
    }

    if (!password) return "Password is required";

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!isSignInMode && trimmedName.length < 2) {
      return "Full name must be at least 2 characters";
    }

    return null;
  };

  const loginUser = async () => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) throw error;
  };

  const createUserWithBackend = async () => {
    if (!API_URL) {
      throw new Error("Missing VITE_API_URL environment variable");
    }

    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
      }),
    });

    const json = (await response.json()) as BackendSignupResponse;

    if (!response.ok || !json.success) {
      throw new Error(json.message || "Failed to create account");
    }
  };

  const handleAuthSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetMessages();

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      if (!isSignInMode) {
        await createUserWithBackend();
      }

      await loginUser();

      resetForm();
      await onSuccess();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Authentication failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (mode: AuthMode) => {
    if (isSubmitting) return;

    setMode(mode);
    setPassword("");
    setShowPassword(false);
    resetMessages();
  };

  const handleOAuthLogin = () => {
    alert("Provider login is currently disable by owner");
  };

  return (
    <section className="w-full max-w-[23%] mx-auto overflow-hidden rounded-sm border border-border bg-background shadow-2xl shadow-foreground/10">
      <div className="grid grid-cols-2 border-b border-border">
        <Button
          variant="ghost"
          onClick={() => switchMode("signin")}
          disabled={isSubmitting}
          className={cn(
            "relative text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
            isSignInMode ? "text-foreground" : "text-foreground/50!",
          )}
        >
          Sign In
          {isSignInMode && (
            <span className="absolute bottom-0 left-0 h-0.75 w-full bg-secondary" />
          )}
        </Button>

        <Button
          variant="ghost"
          onClick={() => switchMode("signup")}
          disabled={isSubmitting}
          className={cn(
            "relative text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
            !isSignInMode ? "text-foreground" : "text-foreground/50!",
          )}
        >
          Sign Up
          {!isSignInMode && (
            <span className="absolute bottom-0 left-0 h-1 w-full bg-secondary" />
          )}
        </Button>
      </div>

      <div className="px-6 py-4">
        {reason === "protected" && (
          <div className="mb-6 rounded-sm border border-primary/20 bg-primary/5 px-4 py-3 text-center text-sm text-foreground/70">
            Please sign in first to view this page.
          </div>
        )}

        <form className="space-y-1" onSubmit={handleAuthSubmit}>
          {!isSignInMode && (
            <FormField
              id="fullName"
              label="Full Name"
              error={!!errorMessage && !fullName.trim()}
            >
              <Input
                id="fullName"
                type="text"
                autoComplete="name"
                value={fullName}
                disabled={isSubmitting}
                error={!!errorMessage && !fullName.trim()}
                className="h-9! rounded-none"
                onChange={(event) => setFullName(event.target.value)}
              />
            </FormField>
          )}

          <FormField
            id="email"
            label="Email Address"
            error={!!errorMessage && !email.trim()}
          >
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              disabled={isSubmitting}
              error={!!errorMessage && !email.trim()}
              className="h-9! rounded-none"
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormField>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label
                htmlFor="password"
                className={cn(
                  "text-xxs font-medium transition-colors",
                  !!errorMessage && !password
                    ? "text-red-600"
                    : "text-foreground",
                )}
              >
                Password
              </label>

              {isSignInMode && (
                <Button
                  size="sm"
                  variant="link"
                  disabled={isSubmitting}
                  onClick={() => {
                    setErrorMessage(
                      "Password reset is disabled until SMTP email is configured.",
                    );
                  }}
                  className="text-xxs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Forget Password
                </Button>
              )}
            </div>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete={
                  isSignInMode ? "current-password" : "new-password"
                }
                value={password}
                disabled={isSubmitting}
                error={!!errorMessage && !password}
                className="h-9! rounded-none pr-12"
                onChange={(event) => setPassword(event.target.value)}
              />

              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((current) => !current)}
                disabled={isSubmitting}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full p-1.5 text-foreground/70 transition-all duration-300 hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer "
              >
                <span className="relative flex size-5 items-center justify-center overflow-hidden">
                  {/* Show Icon */}
                  <HugeiconsIcon
                    icon={ViewOffSlashIcon}
                    className={cn(
                      "absolute size-5 transition-all duration-300 ease-out",
                      showPassword
                        ? "scale-0 rotate-90 opacity-0"
                        : "scale-100 rotate-0 opacity-100",
                    )}
                  />

                  {/* Hide Icon */}
                  <HugeiconsIcon
                    icon={ViewIcon}
                    className={cn(
                      "absolute size-5 transition-all duration-300 ease-out",
                      showPassword
                        ? "scale-100 rotate-0 opacity-100"
                        : "scale-0 -rotate-90 opacity-0",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <Button
            variant="secondary"
            disabled={isSubmitting}
            rightIcon={ArrowRight02FreeIcons}
            className="w-full mt-4 justify-center rounded-xs font-bold uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-60 text-xs"
          >
            {isSubmitting
              ? isSignInMode
                ? "Signing in..."
                : "Creating account..."
              : isSignInMode
                ? "Sign In"
                : "Sign Up"}
          </Button>
        </form>

        <div className="my-3 mt-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-xs text-foreground/60">or</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* provider login */}
        <div className="space-y-2.5">
          {/* Google Login */}
          <button
            type="button"
            onClick={handleOAuthLogin}
            className="relative flex h-10 w-full items-center justify-center rounded-xs border border-border bg-background px-2 sm:text-xs text-xxs font-medium text-foreground/70 transition-colors hover:bg-muted cursor-pointer"
          >
            <div className="absolute left-4">
              <GoogleIcon />
            </div>

            <span>Continue with Google</span>
          </button>

          {/* Apple Login */}
          <button
            type="button"
            onClick={() => handleOAuthLogin}
            className="relative flex h-10 w-full items-center justify-center rounded-xs border border-border bg-background px-2 sm:text-xs text-xxs font-medium text-foreground/70 transition-colors hover:bg-muted cursor-pointer"
          >
            <div className="absolute left-4">
              <AppleIcon />
            </div>

            <span>Continue with Apple</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function FormField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "mb-3 block text-xxs font-medium transition-colors",
          error ? "text-red-600" : "text-foreground",
        )}
      >
        {label}
      </label>

      {children}
    </div>
  );
}
