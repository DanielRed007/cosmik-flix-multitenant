// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import Profile from "../models/Profile.model";
import User from "../models/User.model";
import Movies from "../models/Movie.models"

export const getMovieCatalog = async (req: Request, res: Response) => {
  const { email } = req.body;
    try {
        const movies = await Movies.find();

        const filterMovies = movies.slice(0,30)

        res.status(201).json(filterMovies);
    } catch (error) {
        console.log(error)
        res.status(500).json({error});
    }

};

