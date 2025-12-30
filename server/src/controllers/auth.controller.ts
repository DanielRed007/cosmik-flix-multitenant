// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model";
import RefreshToken from "../models/RefreshToken.model";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokens";
import Profile from "../models/Profile.model";

const setRefreshCookie = (res: Response, token: string) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });
    const refreshToken = generateRefreshToken(user._id.toString());
    await Profile.create({_id: user._id,name, email});

    await RefreshToken.create({
      token: refreshToken,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    setRefreshCookie(res, refreshToken);

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Delete old refresh tokens
  await RefreshToken.deleteMany({ userId: user._id });

  const refreshToken = generateRefreshToken(user._id.toString());
  const accessToken = generateAccessToken(user._id.toString());
  await RefreshToken.create({
    token: refreshToken,
    userId: user._id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  setRefreshCookie(res, refreshToken);

  res.json({
    message: "Logged in successfully",
    user: { id: user._id, name: user.name, email: user.email },
    accessToken: accessToken,
  });
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (token) await RefreshToken.deleteOne({ token });
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};

export const refresh = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No token" });

  const stored = await RefreshToken.findOne({ token }).populate("userId");
  if (!stored || stored.expiresAt < new Date()) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }

  const newAccessToken = generateAccessToken(stored.userId._id.toString());
  res.json({ accessToken: newAccessToken });
};

export const me = async (req: Request, res: Response) => {
  // @ts-ignore – we'll add auth middleware next
  const user = await User.findById(req.userId).select("-password");
  res.json({ user });
};