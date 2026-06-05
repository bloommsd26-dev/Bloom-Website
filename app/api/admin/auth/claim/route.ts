import { Admin } from '@/models/Admin';
import { hashPassword, generateToken, AUTH_COOKIE_NAME } from '@/utils/auth';
import { successResponse, errorResponse, validationError } from '@/utils/api-response';
import { cookies } from 'next/headers';
import { apiHandler } from '@/lib/api/handler';

async function claimAccount(request: Request) {
  const body = await request.json();
  const { identifier, password } = body;

  if (!identifier || !password) {
    return validationError('Email/Username and password are required');
  }

  if (password.length < 6) {
    return validationError('Password must be at least 6 characters long');
  }

  // Find admin by email or username
  const admin = await Admin.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  }).select('+passwordHash');

  if (!admin) {
    return errorResponse('No invitation found for this identifier', 404);
  }

  // Check if account is already claimed
  if (admin.passwordHash) {
    return errorResponse('This account has already been claimed', 400);
  }

  // Set password and save
  admin.passwordHash = await hashPassword(password);
  await admin.save();

  // Generate token for immediate login
  const token = await generateToken(
    {
      id: String(admin._id),
      email: admin.email,
      role: admin.role,
    },
    '7d'
  );

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return successResponse(
    {
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    },
    'Account claimed successfully. Welcome to Bloom!',
    200
  );
}

export const POST = apiHandler(claimAccount);
