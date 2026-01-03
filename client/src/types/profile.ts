export interface ProfileState {
  profile: any;

  getProfile: () => void;
  updateMoviesList: (movieId: string, action: string) => void;
}