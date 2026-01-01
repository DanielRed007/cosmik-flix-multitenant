
export interface Movie {
  title: string;
  year: number;
  poster?: string | null;
  genres: string[];
  runtime?: number;
  imdb: {
    rating: number;
    votes: number;
  };
};