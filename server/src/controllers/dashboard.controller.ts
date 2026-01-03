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
            {
                $match: {
                genres: { $in: favoriteGenres },
                poster: { $exists: true },
                "imdb.rating": { $gt: 0 },
                }
            },

            {
                $addFields: {
                genreMatchCount: {
                    $size: { $setIntersection: ["$genres", favoriteGenres] }
                },
                }
            },

            {
                $sort: {
                genreMatchCount: -1,
                "imdb.rating": -1,
                year: -1
                }
            },

            { $limit: 50 },

            {
                $project: {
                _id: 1,              // explicitly remove the ObjectId (prevents serialization issues too)
                stringId: 1,          // this will be your key
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

        const movieThumbnails = thumbnailMovieFilters(recommendedMovies);

        res.status(201).json(movieThumbnails);
    } catch (error) {
        console.log(error)
        res.status(500).json({error});
    }

};

