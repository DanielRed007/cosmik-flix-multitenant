import { ObjectId } from "mongoose";

export interface Movie {
  _id: ObjectId;
  title: string;
  year: number;
  poster?: string | null;
  genres: string[];
  runtime?: number;
  imdb: {
    rating: number;
    votes: number;
  };
};