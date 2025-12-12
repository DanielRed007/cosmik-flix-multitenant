// src/models/RefreshToken.model.ts
import { Schema, model } from "mongoose";

const refreshTokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  expiresAt: { type: Date, required: true },
});

export default model("RefreshToken", refreshTokenSchema);