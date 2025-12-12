// src/utils/generateTokens.ts
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, { expiresIn: 60 * 60 });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, { expiresIn: 60 * 60 });
};