
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

export interface MoviesState {
  movies: any;
  myList: any;
  searchResults: any;

  searchMovies: (data: any) => any;
  getMovies: () => any;
  getMoviesMyList: () => any;
}