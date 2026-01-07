
export interface Movie {
  id: string;
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

export interface SearchMoviesQuery {
  title: string;
  genre: string | undefined;
  year: number | undefined;
}

export interface MoviesState {
  movies: any;
  myList: any;
  searchResults: any;

  searchMovies: (data: SearchMoviesQuery) => any;
  getMovies: () => any;
  getMoviesMyList: () => any;
}