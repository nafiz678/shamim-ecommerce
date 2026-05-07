import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthUser = {
    id: string;
    email: string | null;
    fullName: string | null;
};

type AuthState = {
    user: AuthUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
};

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
};

type SetAuthPayload = {
    user: AuthUser | null;
    accessToken: string | null;
};

const authSlice = createSlice({
    name: 'auth',
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
    },
});

export const { setAuth, clearAuth, setAuthLoading } = authSlice.actions;

export default authSlice.reducer;