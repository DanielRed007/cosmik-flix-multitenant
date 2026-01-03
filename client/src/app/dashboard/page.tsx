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

export default function Dashboard() {
  const { isAuthenticated, user } = useAuthStore();
  const { movies, getMovies } = useMoviesStore();
  const { getProfile } = useProfileStore();
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/sign-in');
    }

    getProfile();
    getMovies();
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>; // or a loader
  }

  return (
  <div className="p-4 space-y-4">
    {/* Responsive layout: stacked on small/medium, side-by-side only on lg+ */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left: Recent Movies */}
      <Card className="lg:col-span-2 h-full min-h-80 bg-transparent border-transparent">
        <CardHeader className="pb-0">
          <CardTitle className="text-5xl font-bold">Featured</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 h-full">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-3 gap-3 auto-rows-fr h-full overflow-y-auto">
            {movies && movies?.map((movie: Movie) => (
              <MovieCardThumbnail key={movie._id} movie={movie} />
            ))}
          </div>

          {movies && movies.length === 0 && (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No movies yet
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right: Compact Metrics */}
      <div className="grid grid-cols-2 gap-3 auto-rows-fr">
        <Card className="flex flex-col items-center justify-center p-4 text-center">
          <CardTitle className="text-base">Metric 1</CardTitle>
          <p className="text-2xl font-bold mt-1">1,234</p>
          <CardDescription className="text-xs mt-1">Sales</CardDescription>
        </Card>

        <Card className="flex flex-col items-center justify-center p-4 text-center">
          <CardTitle className="text-base">Metric 2</CardTitle>
          <p className="text-2xl font-bold mt-1">567</p>
          <CardDescription className="text-xs mt-1">Users</CardDescription>
        </Card>

        <Card className="flex flex-col items-center justify-center p-4 text-center">
          <CardTitle className="text-base">Metric 3</CardTitle>
          <p className="text-2xl font-bold mt-1">89%</p>
          <CardDescription className="text-xs mt-1">Growth</CardDescription>
        </Card>

        <Card className="flex flex-col items-center justify-center p-4 text-center">
          <CardTitle className="text-base">Metric 4</CardTitle>
          <p className="text-2xl font-bold mt-1">$45k</p>
          <CardDescription className="text-xs mt-1">Revenue</CardDescription>
        </Card>
      </div>
    </div>
  </div>
);
}