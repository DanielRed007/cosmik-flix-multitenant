'use client'; // Only needed in App Router

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // App Router
import { useAuthStore } from '@/store/authStore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MovieCardThumbnail } from '@/components/cosmik/movie-card-thumbnail';
import { Movie } from '@/types/movie';
import { useProfileStore } from '@/store/profileStore';
import { useMoviesStore } from '@/store/moviesStore';

export default function MyList() {
  const { isAuthenticated, user } = useAuthStore();
  const { myList, getMoviesMyList } = useMoviesStore();
  const { getProfile } = useProfileStore();
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/sign-in');
    }

    getProfile();
    getMoviesMyList();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>; // or a loader
  }

  return (
  <div className="p-4 space-y-4">
    {/* Responsive layout: stacked on small/medium, side-by-side only on lg+ */}
    <div className="grid gap-4">
      {/* Left: Recent Movies */}
      <Card className="lg:col-span-2 h-full min-h-80 bg-transparent border-0 shadow-none">
        <CardHeader className="pb-0">
          <CardTitle className="text-5xl text-white font-bold">My List</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 h-full">
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-4 gap-3 auto-rows-fr h-full overflow-y-auto">
            {myList && myList?.map((movie: Movie) => (
              <MovieCardThumbnail key={movie.id} movie={movie} />
            ))}
          </div>

          {myList && myList.length === 0 && (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No movies yet
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  </div>
);
}