// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import Profile from "../models/Profile.model";
import Movies from "../models/Movie.models"
import User from "../models/User.model";
import { mapProfileResponse, thumbnailMovieFilters } from "../utils/filters/filters";
import { Types } from "mongoose";

export const getMyProfile = async (req: Request, res: Response) => {
  const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const user = await User.findOne({ email });

        // @ts-ignore – we'll add auth middleware next
        const profile = await Profile.findOne({user})

        res.status(201).json(profile);
    } catch (error) {
        console.log(error)
        res.status(500).json({error});
    }

};

// PATCH /api/profile --
export const updateMyProfile = async (req: Request, res: Response) => {
  try {
    // In the future: get email from authenticated user (JWT middleware)
    const { email, name, city, zipCode, age, favoriteGenres, favoriteMoviesList } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find the profile by email
    const profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update only the fields that are provided (partial update)
    if (name !== undefined) profile.name = name;
    if (city !== undefined) profile.city = city;
    if (zipCode !== undefined) profile.zipCode = zipCode;
    if (age !== undefined) profile.age = age;
    if (Array.isArray(favoriteGenres)) profile.favoriteGenres = favoriteGenres;
    if (Array.isArray(favoriteMoviesList)) profile.favoriteMoviesList = favoriteMoviesList;

    // Save updated profile
    await profile.save();

    // Respond with updated profile (clean, no password or internals)
    res.status(200).json({
      message: "Profile updated successfully",
      profile: {
        name: profile.name,
        email: profile.email,
        city: profile.city,
        zipCode: profile.zipCode,
        age: profile.age,
        favoriteGenres: profile.favoriteGenres,
        favoriteMoviesList: profile.favoriteMoviesList,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};

export const updateMyMovieList = async (req: any, res: Response) => {
  try {
    const { movieId, action } = req.body as { movieId: string; action: "add" | "remove" };

    if (!movieId || !action) {
      return res.status(400).json({ message: "movieId and action are required" });
    }

    if (!["add", "remove"].includes(action)) {
      return res.status(400).json({ message: "action must be 'add' or 'remove'" });
    }

    const email = req.user?.email;
    if (!email) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (!profile.favoriteMoviesList) {
      profile.favoriteMoviesList = [];
    }

    if (action === "add") {
      if (!profile.favoriteMoviesList.includes(movieId)) {
        profile.favoriteMoviesList.push(movieId);
      } else {
        return res.status(200).json({
          message: "Movie already in favorites",
          profile: mapProfileResponse(profile),
        });
      }
    } else if (action === "remove") {
      profile.favoriteMoviesList = profile.favoriteMoviesList.filter(
        (id) => id !== movieId
      );
    }

    // Save updated profile
    await profile.save();

    // Send back clean profile data
    return res.status(200).json({
      message: "Favorites updated successfully",
      profile: mapProfileResponse(profile),
    });
  } catch (error) {
    console.error("Error updating movie list:", error);
    return res.status(500).json({ message: "Server error while updating favorites" });
  }
};

export const getMyMovieList = async (req: any, res: Response) => {
  const { ids } = req.body as { ids: string[] };

  if (!Array.isArray(ids)) {
    return Response.json({ error: "Invalid or empty ids" }, { status: 400 });
  }

  const objectIds = ids
    .filter(id => Types.ObjectId.isValid(id)) // safety: only valid hex strings
    .map(id => new Types.ObjectId(id));

  if (objectIds.length === 0) {
    return res.status(200).json([]); // no valid IDs → empty list
  }

  const recommendedMovies = await Movies.aggregate([
      {
        $match: {
          _id: { $in: objectIds },
        }
      },

      {
          $sort: {
          "imdb.rating": -1,
          year: -1
          }
      },

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
          genreMatchCount: 1
          }
      }
    ]);

    const movieThumbnails = thumbnailMovieFilters(recommendedMovies);

    res.status(200).json(movieThumbnails);
}
