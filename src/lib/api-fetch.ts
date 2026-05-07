const API_URL = import.meta.env.VITE_API_URL as string;

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(json?.message || 'Request failed');
    }

    return json as T;
}