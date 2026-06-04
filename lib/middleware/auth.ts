import { verifyToken } from '@/utils/auth';
import { errorResponse } from '@/utils/api-response';

export function withAuth(handler: Function) {
  return async (request: Request, ...args: any[]) => {
    try {
      const authHeader = request.headers.get('authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse('Missing or invalid authorization header', 401);
      }

      const token = authHeader.substring(7);
      const decoded = verifyToken(token);

      if (!decoded) {
        return errorResponse('Invalid or expired token', 401);
      }

      // Attach user to request context
      (request as any).user = decoded;

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
        const authHeader = request.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return errorResponse('Missing or invalid authorization header', 401);
        }

        const token = authHeader.substring(7);
        const decoded = verifyToken(token);

        if (!decoded) {
          return errorResponse('Invalid or expired token', 401);
        }

        if (!roles.includes(decoded.role)) {
          return errorResponse('Insufficient permissions', 403);
        }

        (request as any).user = decoded;

        return handler(request, ...args);
      } catch (error) {
        console.error('Authorization error:', error);
        return errorResponse('Authorization failed', 401);
      }
    };
  };
}
