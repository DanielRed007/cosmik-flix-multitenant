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

export const searchMovies = async (req: any, res: Response) => {
  try {
    const { title, year } = req.body.query;

    const matchStage: any = {};

    if (title && typeof title === 'string' && title.trim() !== '') {
      matchStage.title = { $regex: title.trim(), $options: 'i' };
    }

    if (year && !isNaN(Number(year))) {
      matchStage.year = Number(year);
    }

    const results = await Movies.aggregate([
      { $match: matchStage },
      {
        $project: {
          _id: 1,
          stringId: 1,
          title: 1,
          year: 1,
          poster: 1,
          genres: 1,
          runtime: 1,
          plot: 1,
          "imdb.rating": 1,
          "imdb.votes": 1,
          genreMatchCount: 1,
        },
      },
      { $sort: { 'imdb.rating': -1, year: -1 } }, // Better: highest rated first
      { $limit: 50 },
    ]);

    const searchResults = thumbnailMovieFilters(results);

    res.status(200).json(searchResults);
  } catch (error: any) {
    console.error('Search movies error:', error);
    res.status(500).json({ message: 'Server error during search', error: error.message });
  }
};
