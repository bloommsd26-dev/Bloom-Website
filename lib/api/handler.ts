import { connectDB } from '@/db/connect';
import { errorResponse } from '@/utils/api-response';

type ApiHandler = (request: Request, ...args: any[]) => Promise<Response>;

/**
 * Standard API Route Handler Wrapper
 * Automatically handles:
 * 1. Database connection
 * 2. Error catching and logging
 * 3. Consistent error responses
 */
export function apiHandler(handler: ApiHandler) {
  return async (request: Request, ...args: any[]) => {
    try {
      await connectDB();
      return await handler(request, ...args);
    } catch (error: any) {
      console.error(`[API ERROR] ${request.method} ${request.url}:`, error);

      const message = error?.message || 'An unexpected error occurred';
      const status = error?.status || 500;

      return errorResponse(message, status);
    }
  };
}
