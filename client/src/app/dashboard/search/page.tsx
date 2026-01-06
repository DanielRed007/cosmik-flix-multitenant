'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { useMoviesStore } from '@/store/moviesStore';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button'; // ← Added Button import

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);

export default function SearchPage() {
  const { isAuthenticated } = useAuthStore();
  const { searchMovies, searchResults } = useMoviesStore();
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState<string | undefined>(undefined);
  const [year, setYear] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/sign-in');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>;
  }

  const handleSearch = () => {
    searchMovies({
      query: query.trim(),
      genreId: genre && genre !== 'all' ? Number(genre) : undefined,
      year: year && year !== 'all' ? Number(year) : undefined,
    });
  };

  return (
    <div className="p-4 space-y-8">
      <Card className="bg-electric-green-dark border-green-900">
        <CardHeader>
          <CardTitle className="text-5xl font-bold text-white">Search Movies</CardTitle>
          <CardDescription className="text-green-200">
            Find movies by title, genre, or release year
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-white">
          {/* Search Form */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Title Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-300 h-4 w-4" />
              <Input
                placeholder="Search by title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 bg-green-900/50 border-green-700 text-white placeholder:text-green-400 focus:border-green-500"
              />
            </div>

            {/* Genre Dropdown */}
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="w-full md:w-64 bg-green-900/50 border-green-700 text-white">
                <SelectValue placeholder="All Genres" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map((g) => (
                    <SelectItem key={g.id} value={String(g.id)}>
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Year Dropdown */}
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-full md:w-48 bg-green-900/50 border-green-700 text-white">
                <SelectValue placeholder="Any Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Any Year</SelectItem>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-500 text-white font-medium"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          {/* Results */}
          {searchResults && searchResults.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {searchResults.map((movie: Movie) => (
                <MovieCardThumbnail key={movie.id} movie={movie} />
              ))}
            </div>
          )}

          {searchResults && searchResults.length === 0 && (
            <div className="flex h-64 items-center justify-center text-green-300">
              No movies found matching your criteria.
            </div>
          )}

          {/* Optional: Show message when no search has been performed yet */}
          {!searchResults && (
            <div className="flex h-64 items-center justify-center text-green-300">
              Enter search criteria and click "Search" to find movies.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}