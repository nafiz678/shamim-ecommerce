import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  id: string;
  email: string | null;
  fullName: string | null;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authNotice: "authenticated" | null;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  authNotice: null,
};

type SetAuthPayload = {
  user: AuthUser | null;
  accessToken: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<SetAuthPayload>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = Boolean(action.payload.user);
      state.isLoading = false;
    },

    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },

    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setAuthNotice(state, action: PayloadAction<AuthState["authNotice"]>) {
      state.authNotice = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setAuthLoading, setAuthNotice } =
  authSlice.actions;

export default authSlice.reducer;
