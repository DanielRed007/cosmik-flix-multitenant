import { Movie } from "../../types/movies";

export const thumbnailMovieFilters = (movieList : Movie[]) => {

    return movieList
        .slice(0,30)
        .filter((movie) => movie.poster)
        .map((movie) => {
            return {
                id: movie._id,
                title: movie.title,
                year: movie.year,
                poster:movie.poster,
                genres: movie.genres,
                runtime: movie.runtime,
                imdb: {
                    rating: movie.imdb?.rating,
                    votes: movie.imdb?.votes,
                },
            }
        })
}