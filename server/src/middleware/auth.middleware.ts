// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = (req.cookies.refreshToken || '').trim();

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token' });
  }

  try {
  const decoded = jwt.verify(refreshToken, (process.env.JWT_REFRESH_SECRET!).trim()) as { userId: string };

  const user = await User.findById(decoded.userId).select('-password');

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    (process.env.JWT_ACCESS_SECRET!).trim(),
    { expiresIn: '15m' }
  );

  if (req.path === '/me') {
    return res.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
      accessToken,
    });
  }

  (req as any).user = user;
  next();
  } catch (err: any) {
    console.error('❌ JWT Verify Error:', err.message);
    if (err.name === 'TokenExpiredError') {
      console.log('Token expired at:', err.expiredAt);
    }
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};