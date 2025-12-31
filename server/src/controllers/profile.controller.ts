// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import Profile from "../models/Profile.model";
import User from "../models/User.model";

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

// PATCH /api/profile - Update authenticated user's profile (partial update)
export const updateMyProfile = async (req: Request, res: Response) => {
  try {
    // In the future: get email from authenticated user (JWT middleware)
    // For now: temporarily using email from body (same as your getMyProfile)
    const { email, name, city, zipCode, age, favoriteGenres } = req.body;

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
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error while updating profile" });
  }
};