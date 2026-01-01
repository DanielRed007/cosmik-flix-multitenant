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

export default function Dashboard() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [movieList, setMovieList] = useState<Movie[]>([]); 

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/sign-in');
    }

    getMovies();
  }, [isAuthenticated, router]);

  const getMovies = async() => {
      const res = await fetch('/api/dashboard', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

      const data = await res.json();

      if (res.ok) {
        setMovieList(data)
      }
  }

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>; // or a loader
  }

  return (
  <div className="p-4 space-y-4">
    <h1 className="text-2xl font-bold">Dashboard</h1>

    {/* Responsive layout: stacked on small/medium, side-by-side only on lg+ */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Left: Recent Movies */}
      <Card className="lg:col-span-2 h-full min-h-80">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent / Featured Movies</CardTitle>
          <CardDescription className="text-sm">
            Notable or recently viewed titles
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 h-full">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 xl:grid-cols-3 gap-3 auto-rows-fr h-full overflow-y-auto">
            {movieList.map((movie) => (
              <MovieCardThumbnail key={movie.title} movie={movie} />
            ))}
          </div>

          {movieList.length === 0 && (
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