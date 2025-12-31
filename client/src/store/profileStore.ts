// src/store/authStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // Important for TS support

import { AuthState, SessionUser } from '../types/auth';

export const useProfileStore = create<AuthState>()(
  devtools(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,

      setProfile: (user: SessionUser) => (
        set(
            { user, isAuthenticated: true },
            false,
            'dashboard'
            )
        ),

    }),
    {
      name: 'ProfileStore',
    }
  )
);