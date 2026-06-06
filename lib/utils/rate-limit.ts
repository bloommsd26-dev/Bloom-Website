import { NextRequest } from 'next/server';

/**
 * Basic Rate Limiting Utility (In-Memory)
 * Note: In a production serverless environment (Vercel), this Map will reset
 * when the serverless function cold-starts. For persistent rate limiting,
 * connect this to Upstash Redis.
 */

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

/**
 * Check if the current request exceeds the rate limit
 */
export async function checkRateLimit(
  request: NextRequest,
  options: RateLimitOptions = { limit: 5, windowMs: 60000 } // 5 requests per minute
): Promise<{ success: boolean; remaining: number; reset: number }> {
  // Get IP address (handled by Next.js headers)
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const now = Date.now();

  const userStats = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  // Reset if window has passed
  if (now - userStats.lastReset > options.windowMs) {
    userStats.count = 0;
    userStats.lastReset = now;
  }

  userStats.count++;
  rateLimitMap.set(ip, userStats);

  const remaining = Math.max(0, options.limit - userStats.count);
  const reset = userStats.lastReset + options.windowMs;

  return {
    success: userStats.count <= options.limit,
    remaining,
    reset,
  };
}
