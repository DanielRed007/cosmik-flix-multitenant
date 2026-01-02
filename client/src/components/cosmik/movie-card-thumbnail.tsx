import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";
import { Movie } from "@/types/movie";

export function MovieCardThumbnail({ movie }: { movie: Movie }) {
  const {
    title,
    year,
    poster,
    genres,
    runtime,
    imdb: { rating },
  } = movie;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-[2/3] bg-muted">
        {poster ? (
          <Image
            src={poster}
            alt={`Poster for ${title}`}
            fill
            className="object-cover"
            unoptimized // For external URLs like media-amazon.com
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
            No poster
          </div>
        )}
      </div>

      <CardHeader className="">
        <CardTitle className="text-md p-0 m-0">{title}</CardTitle>
        <CardDescription className="text-base font-medium">
          {year} {runtime && <span className="text-muted-foreground">• {runtime} min</span>}
        </CardDescription>
      </CardHeader>

      <CardContent className="">
        <div className="flex flex-wrap gap-1">
          {genres.map((genre) => (
            <Badge key={genre} variant="secondary">
              {genre}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center text-sm font-medium">
          <Star className="size-4 fill-primary text-primary" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-muted-foreground">IMDb</span>
        </div>
      </CardFooter>
    </Card>
  );
}