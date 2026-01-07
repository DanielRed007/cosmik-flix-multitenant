import {
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Check } from "lucide-react";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import { useProfileStore } from "@/store/profileStore";

export function MovieCardThumbnail({ movie }: { movie: Movie }) {
  const {
    title,
    year,
    poster,
    genres,
    runtime,
    imdb: { rating },
    id
  } = movie;

  const [isAdded, setIsAdded] = useState(false);
  const [action, setAction] = useState("add")
  const { profile ,updateMoviesList } = useProfileStore();

  const includedOnMovieList = (movieId: string, profile: any) => profile && profile.favoriteMoviesList?.includes(movieId) 

  useEffect(() => {
    if(includedOnMovieList(id, profile)){
      setIsAdded(true)
      setAction("remove")
    }
 
  },[setIsAdded, setAction])

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-2xl p-0 border-0 rounded-none group relative">
      <div className="relative aspect-[2/3] bg-muted">
        {poster ? (
          <Image
            src={poster}
            alt={`Poster for ${title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
            No poster
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsAdded(!isAdded);
            updateMoviesList(movie.id, action)
          }}
          className="absolute top-2 right-2 z-10 flex size-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white transition-all hover:bg-black/70 hover:scale-110"
          aria-label={isAdded ? "Remove from list" : "Add to list"}
        >
          <div className="relative size-5">

            <Plus
              className={`absolute inset-0 size-5 transition-all duration-300 ${
                isAdded
                  ? "scale-0 rotate-90 opacity-0"
                  : "scale-100 rotate-0 opacity-100"
              }`}
            />

            <Check
              className={`absolute inset-0 size-5 text-green-400 transition-all duration-300 ${
                isAdded
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 -rotate-90 opacity-0"
              }`}
            />
          </div>
        </button>


        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-x-0 bottom-0 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 pb-4 px-3">
            <CardTitle className="text-base leading-tight text-white drop-shadow-lg line-clamp-2">
              {title}
            </CardTitle>
            <CardDescription className="text-sm font-medium text-white/90 drop-shadow-md mt-1">
              {year}
              {runtime && <span> • {runtime} min</span>}
            </CardDescription>

            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {genres && genres.map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="text-xs py-0.5 bg-white/20 text-white border-white/30 backdrop-blur-sm"
                >
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="flex items-center text-sm font-medium mt-3 text-white drop-shadow-md">
              <Star className="size-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{rating && rating.toFixed(1)}</span>
              <span className="ml-1 text-white/80">IMDb</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}