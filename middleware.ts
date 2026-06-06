import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME, verifyToken } from '@/lib/utils/auth';

/**
 * Next.js Edge Middleware
 * Protects administrative routes and ensures unauthenticated users are redirected.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define paths that DO NOT require authentication
  const isPublicAdminRoute =
    pathname.startsWith('/admin/login') || pathname.startsWith('/api/admin/auth');

  // 2. Only run middleware on /admin and /api/admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // Allow public admin routes to pass through
    if (isPublicAdminRoute) {
      return NextResponse.next();
    }

    // 3. Retrieve the auth cookie
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    if (!token) {
      return handleUnauthorized(request, pathname);
    }

    // 4. Verify the token (Edge-compatible)
    const decoded = await verifyToken(token);

    if (!decoded) {
      return handleUnauthorized(request, pathname);
    }
  }

  return NextResponse.next();
}

/**
 * Helper to handle unauthorized access
 */
function handleUnauthorized(request: NextRequest, pathname: string) {
  // If it's an API request, return 401 Unauthorized
  if (pathname.startsWith('/api/admin')) {
    return new NextResponse(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  // If it's a page request, redirect to the login page
  const loginUrl = new URL('/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}

/**
 * Configure which paths the middleware runs on
 */
export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
