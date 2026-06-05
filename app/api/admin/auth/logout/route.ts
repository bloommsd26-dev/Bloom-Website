import { successResponse, errorResponse } from '@/utils/api-response';
import { AUTH_COOKIE_NAME } from '@/utils/auth';
import { cookies } from 'next/headers';

/**
 * POST /api/admin/auth/logout
 * Securely clear the authentication cookie and sign the user out.
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);

    return successResponse(null, 'Logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
    return errorResponse('Logout failed', 500);
  }
}
