import { successResponse } from '@/utils/api-response';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import { cookies } from 'next/headers';
import { apiHandler } from '@/lib/api/handler';

/**
 * POST /api/admin/auth/logout
 * Securely clear the authentication cookie and sign the user out.
 */
async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);

  return successResponse(null, 'Logged out successfully');
}

export const POST = apiHandler(logout);
