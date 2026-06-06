import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME, verifyToken } from '@/lib/utils/auth';
import { checkRateLimit } from '@/lib/utils/rate-limit';

/**
 * Next.js Edge Middleware
 * Handles:
 * 1. Protection of administrative routes
 * 2. Rate limiting for public form submissions
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- 1. Rate Limiting for Public Forms ---
  if (
    request.method === 'POST' &&
    (pathname === '/api/contact' || pathname === '/api/volunteers')
  ) {
    const { success, remaining, reset } = await checkRateLimit(request, {
      limit: 5,
      windowMs: 60000,
    });

    if (!success) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'Too many requests. Please try again in a minute.',
        }),
        {
          status: 429,
          headers: {
            'content-type': 'application/json',
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      );
    }
  }

  // --- 2. Admin Route Protection ---
  const isPublicAdminRoute =
    pathname.startsWith('/admin/login') || pathname.startsWith('/api/admin/auth');

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (isPublicAdminRoute) {
      return NextResponse.next();
    }

    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (!token) {
      return handleUnauthorized(request, pathname);
    }

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
  if (pathname.startsWith('/api/admin')) {
    return new NextResponse(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  const loginUrl = new URL('/admin/login', request.url);
  return NextResponse.redirect(loginUrl);
}

/**
 * Configure which paths the middleware runs on
 */
export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*', '/api/contact', '/api/volunteers'],
};
