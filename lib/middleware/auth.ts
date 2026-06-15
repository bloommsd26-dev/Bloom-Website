import { verifyToken } from '@/utils/auth';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import { errorResponse } from '@/utils/api-response';
import { cookies } from 'next/headers';

export function withAuth(handler: Function) {
  return async (request: Request, ...args: any[]) => {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

      if (!token) {
        return errorResponse('Missing or invalid authentication', 401);
      }

      const decoded = await verifyToken(token);

      if (!decoded) {
        return errorResponse('Invalid or expired token', 401);
      }

      // We no longer mutate the request object.
      // Handlers can re-verify the token from cookies if they need user info.
      return handler(request, ...args);
    } catch (error) {
      console.error('Authentication error:', error);
      return errorResponse('Authentication failed', 401);
    }
  };
}

export function withRole(...roles: string[]) {
  return (handler: Function) => {
    return async (request: Request, ...args: any[]) => {
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

        if (!token) {
          return errorResponse('Missing or invalid authentication', 401);
        }

        const decoded = await verifyToken(token);

        if (!decoded) {
          return errorResponse('Invalid or expired token', 401);
        }

        if (!roles.includes(decoded.role)) {
          return errorResponse('Insufficient permissions', 403);
        }

        return handler(request, ...args);
      } catch (error) {
        console.error('Authorization error:', error);
        return errorResponse('Authorization failed', 401);
      }
    };
  };
}

/**
 * Validates authentication and roles for Server Components.
 * Redirects or throws if unauthorized.
 */
export async function validateServerAuth(...allowedRoles: string[]) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const decoded = await verifyToken(token);

  if (!decoded) {
    return null;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
    return null;
  }

  return decoded;
}
