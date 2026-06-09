import { connectDB } from '@/db/connect';
import { errorResponse } from '@/utils/api-response';
import { logger } from '@/utils/logger';
import * as Sentry from '@sentry/nextjs';

type ApiHandler = (request: Request, ...args: any[]) => Promise<Response>;

/**
 * Standard API Route Handler Wrapper
 * Automatically handles:
 * 1. Database connection
 * 2. Error catching and logging
 * 3. Consistent error responses
 * 4. Sentry error reporting
 */
export function apiHandler(handler: ApiHandler) {
  return async (request: Request, ...args: any[]) => {
    try {
      await connectDB();
      return await handler(request, ...args);
    } catch (error: any) {
      const message = error?.message || 'An unexpected error occurred';
      const status = error?.status || 500;

      // Log error with context
      logger.error(`[API ERROR] ${request.method} ${request.url}`, {
        message,
        status,
        stack: error?.stack,
      });

      // Report to Sentry if it's a server error
      if (status >= 500) {
        Sentry.captureException(error);
      }

      return errorResponse(message, status);
    }
  };
}
