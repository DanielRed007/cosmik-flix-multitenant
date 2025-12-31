// src/models/Movie.model.ts
import { Schema, model } from "mongoose";

const movieSchema = new Schema({
  plot: { type: String },
  genres: [{ type: String }],
  runtime: { type: Number },
  cast: [{ type: String }],
  poster: { type: String },
  title: { type: String, required: true },
  fullplot: { type: String },
  languages: [{ type: String }],
  released: { type: Date },
  directors: [{ type: String }],
  rated: { type: String },
  awards: {
    wins: { type: Number },
    nominations: { type: Number },
    text: { type: String },
  },
  lastupdated: { type: String }, // Could be Date, but stored as string in the sample
  year: { type: Number },
  imdb: {
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number },
  },
  countries: [{ type: String }],
  type: { type: String }, // e.g., "movie"
  tomatoes: {
    viewer: {
      rating: { type: Number },
      numReviews: { type: Number },
      meter: { type: Number },
    },
    fresh: { type: Number },
    critic: {
      rating: { type: Number },
      numReviews: { type: Number },
      meter: { type: Number },
    },
    rotten: { type: Number },
    lastUpdated: { type: Date },
  },
  num_mflix_comments: { type: Number },
}, { timestamps: true });

export default model("Movie", movieSchema);