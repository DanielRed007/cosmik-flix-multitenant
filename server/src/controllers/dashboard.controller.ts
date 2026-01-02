// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import Profile from "../models/Profile.model";
import Movies from "../models/Movie.models"
import { thumbnailMovieFilters } from "../utils/filters/filters";

export const getMovieCatalog = async (req: any, res: Response) => {
    try {
        const userPreferences: any = await await Profile.findById(req.user._id).select('favoriteGenres').lean();

        const favoriteGenres: any[] = userPreferences?.favoriteGenres;

        const recommendedMovies = await Movies.aggregate([
            // Match movies that have at least one genre in common
            {
                $match: {
                genres: { $in: favoriteGenres },
                // Optional: ensure required fields exist
                poster: { $exists: true },
                "imdb.rating": { $gt: 0 },
                }
            },

            // Optional: Add a score based on how many matching genres (for better ranking)
            {
                $addFields: {
                genreMatchCount: {
                    $size: {
                    $setIntersection: ["$genres", favoriteGenres]
                    }
                }
                }
            },

            // Sort by: number of matching genres → IMDb rating → year
            {
                $sort: {
                genreMatchCount: -1,
                "imdb.rating": -1,
                year: -1
                }
            },

            // Optional: limit results
            { $limit: 50 },

            // Project only the fields you need for thumbnails
            {
                $project: {
                    title: 1,
                    year: 1,
                    poster: 1,
                    genres: 1,
                    runtime: 1,
                    plot: 1,
                    "imdb.rating": 1,
                    "imdb.votes": 1,
                    genreMatchCount: 1
                }
            }
        ]);

        const movieThumbnails = thumbnailMovieFilters(recommendedMovies)

        res.status(201).json(movieThumbnails);
    } catch (error) {
        console.log(error)
        res.status(500).json({error});
    }

};

