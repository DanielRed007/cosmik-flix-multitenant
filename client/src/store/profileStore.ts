// src/store/authStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // Important for TS support
import { ProfileState } from '@/types/profile';

export const useProfileStore = create<ProfileState>()(
  devtools(
    (set) => ({
      profile: null,

      getProfile: async () => {
        const res = await fetch("/api/profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();

        console.log(res, "RXXX!")

        set({ profile: data})
      },
    }),
    {
      name: 'ProfileStore',
    }
  )
);