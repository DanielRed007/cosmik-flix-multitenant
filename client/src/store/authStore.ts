// src/store/authStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // Important for TS support

import { AuthState, User } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      login: (accessToken: string, user: User) =>
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
      name: 'AuthStore', // Appears in Redux DevTools dropdown
      // Optional: filter noisy actions
      // actionsDenylist: ['internal/*'],
      // enabled: process.env.NODE_ENV === 'development', // Disable in prod
    }
  )
);