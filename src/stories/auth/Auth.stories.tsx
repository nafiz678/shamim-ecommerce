import { useState } from "react";
import type { StoryObj, Meta } from "@storybook/tanstack-react";
import AuthView from "./AuthView";
import AuthSignedView from "./AuthSignedView";

const meta: Meta = {
  title: "Auth/Auth System",
};

export default meta;

export const SignIn: StoryObj = {
  render: () => {
    const [state, setState] = useState({
      email: "",
      password: "",
      fullName: "",
      showPassword: false,
      loading: false,
      error: null as string | null,
    });

    return (
      <AuthView
        mode="signin"
        email={state.email}
        password={state.password}
        fullName={state.fullName}
        showPassword={state.showPassword}
        loading={state.loading}
        error={state.error}
        onChange={(field, value) =>
          setState((prev) => ({ ...prev, [field]: value }))
        }
        onSubmit={() => alert("Sign in")}
        onTogglePassword={() =>
          setState((prev) => ({
            ...prev,
            showPassword: !prev.showPassword,
          }))
        }
        onSwitchMode={() => alert("switch mode")}
      />
    );
  },
};

export const SignUp: StoryObj = {
  render: () => {
    const [state, setState] = useState({
      email: "",
      password: "",
      fullName: "",
      showPassword: false,
      loading: false,
      error: null as string | null,
    });

    return (
      <AuthView
        mode="signup"
        email={state.email}
        password={state.password}
        fullName={state.fullName}
        showPassword={state.showPassword}
        loading={state.loading}
        error={state.error}
        onChange={(field, value) =>
          setState((prev) => ({ ...prev, [field]: value }))
        }
        onSubmit={() => alert("sign up")}
        onTogglePassword={() =>
          setState((prev) => ({
            ...prev,
            showPassword: !prev.showPassword,
          }))
        }
        onSwitchMode={() => alert("switch mode")}
      />
    );
  },
};

export const SignedIn: StoryObj = {
  render: () => (
    <AuthSignedView
      user={{
        fullName: "Nafizul Iqram",
        email: "nafis@example.com",
        role: "admin",
      }}
      onLogout={() => alert("logout")}
    />
  ),
};
