// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
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

        res.status(201).json({profile, works: "Yeah this works"});
    } catch (error) {
        console.log(error)
        res.status(500).json({error});
    }

};