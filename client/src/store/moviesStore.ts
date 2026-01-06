// src/store/moviesStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // Important for TS support
import { MoviesState, SearchMoviesQuery } from '@/types/movie';
import { useProfileStore } from './profileStore';

export const useMoviesStore = create<MoviesState>()(
  devtools(
    (set) => ({
      movies: null,
      myList: null,
      searchResults: null,

      searchMovies: async (query: SearchMoviesQuery) => {


        const res = await fetch('/api/dashboard/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
          credentials: 'include',
        });

        const data = await res.json();

        console.log({data});
        set({ searchResults: data});
      },

      getMovies: async () => {
        
        const res = await fetch('/api/dashboard', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await res.json();

        set({ movies: data})
      },

      getMoviesMyList: async () => {

        await useProfileStore.getState().getProfile()
        const currentMyList = useProfileStore.getState().profile.favoriteMoviesList;
        
        const res = await fetch('/api/profile/my-list', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: currentMyList }),
          credentials: 'include',
        });

        const data = await res.json();

        set({ myList: data})
      },
    }),
    {
      name: 'MoviesStore',
    }
  )
);