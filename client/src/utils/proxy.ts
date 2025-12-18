import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from './auth';
 // Your function to verify session/JWT from cookie

const protectedPaths = ['/dashboard', '/profile'];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (protectedPaths.some(p => path.startsWith(p))) {
    const session = await getServerSession(); // Verify httpOnly cookie or JWT
    if (!session) {
      const url = new URL('/dashboard', req.url);
      url.searchParams.set('callbackUrl', path); // Optional: redirect back after login
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Apply only to protected routes
};