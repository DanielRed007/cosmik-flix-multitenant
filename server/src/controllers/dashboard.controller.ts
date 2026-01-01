// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import Profile from "../models/Profile.model";
import User from "../models/User.model";
import Movies from "../models/Movie.models"
import { thumbnailMovieFilters } from "../utils/filters/filters";
import { Movie } from "../types/movies";

export const getMovieCatalog = async (req: Request, res: Response) => {
  const { email } = req.body;
    try {
        const movies: Movie[] = await Movies.find();

        const movieThumbnails = thumbnailMovieFilters(movies)

        res.status(201).json(movieThumbnails);
    } catch (error) {
        console.log(error)
        res.status(500).json({error});
    }

};

