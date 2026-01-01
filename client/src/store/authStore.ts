// src/store/authStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // Important for TS support

import { AuthState, SessionUser } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      loginUser: async (email: string, password: string) => {
        
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), password }),
          credentials: 'include',
        });

        const data = await res.json();

        set({accessToken: data.accessToken, user: data.user, isAuthenticated: true})
      },

      login: (accessToken: string, user: SessionUser) =>
        set(
          { accessToken, user, isAuthenticated: true },
          false,
          'dashboard'
        ),

      logout: () =>
        set(
          { accessToken: null, user: null, isAuthenticated: false },
          false,
          'auth/logout'
        ),

      setAccessToken: (accessToken: string) =>
        set({ accessToken }, false, 'auth/setAccessToken'),
    }),
    {
      name: 'AuthStore',
    }
  )
);