// components/SessionProvider.tsx
'use client';

import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';


type SessionProviderProps = {
  initialSession: {
    user: {
      id: string;
      name?: string;
      email: string;
    };
    accessToken?: string;
  } | null;
};

export function SessionProvider({ initialSession }: SessionProviderProps) {
  const { login, logout } = useAuthStore();

  useEffect(() => {
    if (initialSession?.user) {
      // Safe now — we checked it exists
      login(initialSession.accessToken ?? null, initialSession.user);
    } else {
      logout();
    }
  }, [initialSession, login, logout]);

  return null;
}