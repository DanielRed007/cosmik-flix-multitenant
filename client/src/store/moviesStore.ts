// src/store/moviesStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // Important for TS support
import { MoviesState } from '@/types/movie';

export const useMoviesStore = create<MoviesState>()(
  devtools(
    (set) => ({
      movies: null,

      getMovies: async () => {
        
        const res = await fetch('/api/dashboard', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await res.json();

        set({ movies: data})
      },
    }),
    {
      name: 'MoviesStore',
    }
  )
);