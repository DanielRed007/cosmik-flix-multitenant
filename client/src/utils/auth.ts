// lib/auth.ts
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Types
export interface SessionUser {
  id: string;
  name?: string;
  email: string;
  // Add any other fields you include in your JWT payload
}

export type Session = {
  user: {
    id: string;
    name?: string;
    email: string;
    // add other fields if needed
  };
  accessToken?: string;
} | null;

/**
 * Verifies a JWT token using jose (fast, modern, no subdependencies)
 */
async function verifyToken(token: string, secret: string) {
  try {
    const decoded = await jwt.verify(token, secret); ;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Main function: Get valid session from request (used in middleware, server components, etc.)
 * - First tries to verify access token from Authorization header (if present)
 * - Falls back to refresh token in httpOnly cookie + calls /api/refresh internally
 */
export async function getServerSession() {
  const refreshToken = (await cookies()).get('refreshToken')?.value;
  if (!refreshToken) return null;

  // Verify refresh token
  const refreshPayload = await verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET!);
  if (!refreshPayload) return null;

  // Refresh logic (internal fetch – use relative URL)
  try {
    const res = await fetch('/api/refresh', {  // Relative = same origin, cookies auto-sent
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      console.log('Refresh failed:', res.status, await res.text());
      return null;
    }

    const { accessToken } = await res.json();

    const user = await verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET!);
    if (!user) return null;

    return { user, accessToken };
  } catch (err) {
    console.error('Refresh failed:', err);
    return null;
  }
}