import { supabaseClient } from './supabase-client';

const API_URL = import.meta.env.VITE_API_URL as string;

export async function authApiFetch<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const {
        data: { session },
    } = await supabaseClient.auth.getSession();

    const token = session?.access_token;

    if (!token) {
        throw new Error('You must be logged in');
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(json?.message || 'Request failed');
    }

    return json as T;
}