// lib/auth.ts
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

// Your JWT secret (use a strong one in production!)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
const REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET!);

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
async function verifyToken(token: string, secret: Uint8Array) {
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
export async function getServerSession() {
  const refreshToken = (await cookies()).get('refreshToken')?.value;

  if (!refreshToken) return null;

  // Verify refresh token
  const refreshPayload = await verifyToken(refreshToken, REFRESH_SECRET);
  if (!refreshPayload) return null;

  // Refresh logic (internal fetch – use relative URL)
  try {
    const res = await fetch('/api/refresh', {  // Relative = same origin, cookies auto-sent
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) return null;

    const { accessToken } = await res.json();

    const user = await verifyToken(accessToken, JWT_SECRET);
    if (!user) return null;

    return { user, accessToken };
  } catch (err) {
    console.error('Refresh failed:', err);
    return null;
  }
}