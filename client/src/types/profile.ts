export interface ProfileState {
  profile: any;

  getProfile: () => void;
  getMovieList: (ids: string[]) => void;
  updateMoviesList: (movieId: string, action: string) => void;
}