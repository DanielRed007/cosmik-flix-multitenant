// lib/auth.ts
import { jwtVerify } from 'jose'; // Lightweight JWT verification (no full jsonwebtoken needed)
import { NextRequest } from 'next/server';

// Your JWT secret (use a strong one in production!)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);
const REFRESH_SECRET = new TextEncoder().encode(process.env.REFRESH_SECRET!);

// Types
export interface SessionUser {
  id: string;
  name?: string;
  email: string;
  // Add any other fields you include in your JWT payload
}

export interface Session {
  user: SessionUser;
  accessToken?: string; // Optional: fresh token if refreshed
}

/**
 * Verifies a JWT token using jose (fast, modern, no subdependencies)
 */
async function verifyToken(token: string, secret: any){
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

/**
 * Main function: Get valid session from request (used in middleware, server components, etc.)
 * - First tries to verify access token from Authorization header (if present)
 * - Falls back to refresh token in httpOnly cookie + calls /api/refresh internally
 */
export async function getServerSession(req?: NextRequest) {
  let accessToken: string | null = null;

  // 1. Check Authorization header (e.g., from client fetch with Bearer token)
  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      accessToken = authHeader.substring(7);
    }
  }

  // 2. Try to verify access token first
  if (accessToken) {
    const user = await verifyToken(accessToken, JWT_SECRET);
    if (user) {
      return { user };
    }
  }

  // 3. No valid access token → try refresh token from cookie
  const refreshToken = req?.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return null; // No session at all
  }

  // Verify refresh token
  const refreshPayload = await verifyToken(refreshToken, REFRESH_SECRET);
  if (!refreshPayload) {
    return null;
  }

  // Call internal refresh endpoint to get new access token
  try {
    const refreshRes = await fetch(new URL('/api/refresh', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        cookie: `refreshToken=${refreshToken}`, // Forward the cookie
      },
    });

    if (!refreshRes.ok) return null;

    const data = await refreshRes.json();
    const newAccessToken = data.accessToken;

    // Verify the new access token
    const user = await verifyToken(newAccessToken, JWT_SECRET);
    if (!user) return null;

    return {
      user,
      accessToken: newAccessToken, // Optional: useful if you want to set it in headers downstream
    };
  } catch {
    return null;
  }
}