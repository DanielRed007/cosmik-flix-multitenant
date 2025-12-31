// src/models/Profile.model.ts

import { Schema, model } from "mongoose";

const profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    city: {
      type: String,
      default: null, // optional
      trim: true,
    },
    zipCode: {
      type: String,
      default: null, // optional
      trim: true,
    },
    age: {
      type: Number,
      default: null, // optional
      min: [13, "Age must be at least 13"],
      max: [120, "Age must be realistic"],
    },
    favoriteGenres: {
      type: [String], // Array of strings
      default: [],    // Empty array if nothing selected
      enum: [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "Horror",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Thriller",
        "Western",
      ], // Optional: restricts to valid genres (recommended!)
    },
  },
  { timestamps: true }
);

export default model("Profile", profileSchema);