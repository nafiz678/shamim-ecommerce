export type AuthMode = "signin" | "signup";

export type AuthViewProps = {
  mode: AuthMode;

  // form state
  fullName?: string;
  email: string;
  password: string;

  showPassword?: boolean;
  loading?: boolean;

  error?: string | null;

  // signed state
  user?: {
    fullName?: string;
    email: string;
    role?: "user" | "admin";
  };

  // actions (storybook only mock)
  onChange?: (field: string, value: string) => void;
  onSubmit?: () => void;
  onTogglePassword?: () => void;
  onSwitchMode?: () => void;
  onLogout?: () => void;
};
