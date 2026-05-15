import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowExpandIcon,
  ArrowRight02FreeIcons,
  ViewIcon,
} from "@hugeicons/core-free-icons";

import { supabaseClient } from "../../lib/supabase-client";
import Button from "../ui/button";
import type {
  BackendSignupResponse,
  LoginPopoverProps,
  SignedInViewProps,
} from "../../lib/types";
import { Input } from "../ui/input";
import { Link } from "@tanstack/react-router";
import { cn } from "../../lib/utils";
import { getUserRole } from "../../features/auth/get-roles";

type AuthMode = "login" | "signup";

const API_URL = import.meta.env.VITE_API_URL as string;

export default function LoginPopover({
  isOpen,
  user,
  isAuthLoading,
  onClose,
}: LoginPopoverProps) {
  const [mode, setMode] = useState<AuthMode>("login");

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isLoginMode = mode === "login";

  const title = user
    ? "My Account"
    : isLoginMode
      ? "Sign in to your account"
      : "Create your account";

  const resetMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
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

    if (!trimmedEmail) return "Email is required";

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      return "Enter a valid email address";
    }

    if (!password) return "Password is required";

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!isLoginMode && trimmedName.length < 2) {
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

    return json.data;
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

      if (isLoginMode) {
        await loginUser();

        resetForm();
        onClose();
        return;
      }

      await createUserWithBackend();
      await loginUser();

      resetForm();
      onClose();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Authentication failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    resetMessages();

    try {
      setIsSubmitting(true);

      const { error } = await supabaseClient.auth.signOut();

      if (error) throw error;

      resetForm();
      onClose();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Logout failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    resetMessages();
    setPassword("");
    setShowPassword(false);
    setMode((current) => (current === "login" ? "signup" : "login"));
  };

  return (
    <div
      className={cn(
        "absolute right-0 top-9 z-50 w-72 origin-top-right border border-border bg-background p-5 shadow-lg transition-all duration-300 ease-out sm:w-80",
        isOpen
          ? "visible translate-y-0 scale-100 opacity-100"
          : "invisible -translate-y-2 scale-95 opacity-0",
      )}
    >
      <h3 className="mb-5 text-center text-base font-semibold text-foreground">
        {title}
      </h3>

      {isAuthLoading ? (
        <AuthSkeleton />
      ) : user ? (
        <SignedInView
          user={user}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          onClose={onClose}
          onLogout={handleLogout}
        />
      ) : (
        <>
          <form className="space-y-4" onSubmit={handleAuthSubmit}>
            {!isLoginMode && (
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
                  placeholder="Your name"
                  disabled={isSubmitting}
                  error={!!errorMessage && !fullName.trim()}
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
                placeholder="Email"
                disabled={isSubmitting}
                error={!!errorMessage && !email.trim()}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormField>

            <FormField
              id="password"
              label="Password"
              error={!!errorMessage && !password}
            >
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete={
                    isLoginMode ? "current-password" : "new-password"
                  }
                  value={password}
                  disabled={isSubmitting}
                  error={!!errorMessage && !password}
                  className="pr-10"
                  onChange={(event) => setPassword(event.target.value)}
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                  disabled={isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-foreground/50 transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <HugeiconsIcon icon={ViewIcon} className="size-4" />
                </button>
              </div>
            </FormField>

            <AuthMessage type="error" message={errorMessage} />
            <AuthMessage type="success" message={successMessage} />

            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting}
              rightIcon={ArrowRight02FreeIcons}
              className="w-full font-semibold uppercase disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? isLoginMode
                  ? "Logging in..."
                  : "Creating account..."
                : isLoginMode
                  ? "Login"
                  : "Create Account"}
            </Button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-foreground/10" />

            <span className="text-xs text-foreground/60">
              {isLoginMode ? "Don't have account" : "Already registered"}
            </span>

            <span className="h-px flex-1 bg-foreground/10" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={switchMode}
            disabled={isSubmitting}
            className="w-full border-2 border-secondary/60 text-secondary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoginMode ? "Create Account" : "Back to Login"}
          </Button>
        </>
      )}

      {!user && (
        <Link
          to="/signin"
          search={{ redirect: "/", reason: "" }}
          className="absolute top-6 right-6"
          title="Expand login page"
        >
          <HugeiconsIcon
            icon={ArrowExpandIcon}
            className="text-foreground size-4"
          />
        </Link>
      )}
    </div>
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
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "mb-2 block text-xs font-medium transition-colors",
          error ? "text-red-600" : "text-foreground/80",
        )}
      >
        {label}
      </label>

      {children}
    </div>
  );
}

function AuthSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-10 animate-pulse bg-foreground/10" />
      <div className="h-10 animate-pulse bg-foreground/10" />
      <div className="h-11 animate-pulse bg-foreground/10" />
    </div>
  );
}

function SignedInView({
  user,
  isSubmitting,
  errorMessage,
  onClose,
  onLogout,
}: SignedInViewProps) {
  const [role, setRole] = useState<string | null>(null);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadRole() {
      if (!user?.id) {
        setLoadingRole(false);
        return;
      }

      const fetchedRole = await getUserRole(user.id);

      if (!mounted) return;

      setRole(fetchedRole);
      setLoadingRole(false);
    }

    loadRole();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  const displayName =
    typeof user.fullName === "string" ? user.fullName : user.email;

  const isAdmin = role === "admin";

  return (
    <div>
      <div className="border border-border bg-foreground/5 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-foreground/50">
              Signed in as
            </p>

            <p className="mt-1 truncate text-sm font-semibold text-foreground">
              {displayName}
            </p>

            {user.email && (
              <p className="mt-1 truncate text-xs text-foreground/60">
                {user.email}
              </p>
            )}
          </div>

          {!loadingRole && role && (
            <div
              className={cn(
                "border px-2 py-1 text-xxs font-bold uppercase tracking-wider",
                isAdmin
                  ? "border-secondary bg-secondary/10 text-secondary"
                  : "border-border bg-muted text-foreground/70",
              )}
            >
              {role}
            </div>
          )}
        </div>
      </div>

      <AuthMessage type="error" message={errorMessage} />

      {isAdmin ? (
        <Button
          href="/admin/dashboard"
          variant="secondary"
          rightIcon={ArrowRight02FreeIcons}
          className="mt-4 w-full font-semibold uppercase"
        >
          Admin Panel
        </Button>
      ) : (
        <Button
          variant="secondary"
          onClick={onClose}
          rightIcon={ArrowRight02FreeIcons}
          className="mt-4 w-full font-semibold uppercase"
        >
          My Account
        </Button>
      )}

      <Button
        variant="outline"
        onClick={onLogout}
        disabled={isSubmitting}
        className="mt-3 w-full border-2 border-secondary/60 uppercase text-secondary disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
}

function AuthMessage({
  type,
  message,
}: {
  type: "error" | "success";
  message: string | null;
}) {
  if (!message) return null;

  const className =
    type === "error"
      ? "border-red-200 bg-red-50 text-red-600"
      : "border-green-200 bg-green-50 text-green-700";

  return (
    <p className={`rounded-sm border px-3 py-2 text-xs ${className}`}>
      {message}
    </p>
  );
}
