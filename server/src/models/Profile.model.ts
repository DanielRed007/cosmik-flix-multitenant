// src/models/Profile.model.ts
import { Schema, model } from "mongoose";

const profileSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
}, { timestamps: true });

export default model("Profile", profileSchema);