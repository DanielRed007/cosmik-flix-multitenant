// src/store/authStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // Important for TS support
import { ProfileState } from '@/types/profile';

export const useProfileStore = create<ProfileState>()(
  devtools(
    (set, get) => ({
      profile: null,

      getProfile: async () => {
        const res = await fetch("/api/profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();

        set({ profile: data})
      },

      updateMoviesList: async (movieId: string, action: 'add' | 'remove') => {
        const currentProfile = get().profile;

        if (!currentProfile) {
          console.warn("No profile loaded yet");
          return;
        }

        let updatedList = [...(currentProfile.favoriteMoviesList || [])];

        if (action === 'add') {
          if (!updatedList.includes(movieId)) {
            updatedList.push(movieId);
          }
        } else if (action === 'remove') {
          updatedList = updatedList.filter(id => id !== movieId);
        }

        set({
          profile: {
            ...currentProfile,
            favoriteMoviesList: updatedList,
          }
        });

        try {
          const res = await fetch("/api/profile/update-my-list", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ movieId, action }),
          });

          if (!res.ok) throw new Error("Failed to update list");

          const updatedData = await res.json();
          set({ profile: updatedData });
        } catch (error) {
          console.error(error);
        }
      },

    }),
    {
      name: 'ProfileStore',
    }
  )
);