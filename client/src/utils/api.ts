import { useAuthStore } from '../store/authStore';
import { LoginResponse } from '../types/auth';

const API_BASE = '/api'; // Or import.meta.env.VITE_API_URL in Vite

export const apiFetch = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const { accessToken } = useAuthStore.getState();

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...options.headers,
  });

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
    credentials: 'include', // Important for httpOnly cookies
  });

  // Handle 401 → attempt refresh
  if (response.status === 401) {
    const refreshResponse = await fetch(`${API_BASE}/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshResponse.ok) {
      const { accessToken: newAccessToken } = (await refreshResponse.json()) as {
        accessToken: string;
      };
      useAuthStore.getState().setAccessToken(newAccessToken);

      // Retry original request
      headers.set('Authorization', `Bearer ${newAccessToken}`);
      response = await fetch(`${API_BASE}${url}`, {
        ...options,
        headers,
        credentials: 'include',
      });
    } else {
      useAuthStore.getState().logout();
      window.location.href = '/login';
      throw new Error('Session expired. Please log in again.');
    }
  }

  if (!response.ok) {
    let errorMessage = 'Request failed';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Ignore if not JSON
    }
    throw new Error(errorMessage);
  }

  // Handle non-JSON responses (e.g., files)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>;
  }

  return response as unknown as Promise<T>;
};