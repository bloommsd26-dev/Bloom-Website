import { Admin } from '@/models/Admin';
import { comparePasswords, generateToken } from '@/utils/auth';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import { successResponse, errorResponse, validationError } from '@/utils/api-response';
import { cookies } from 'next/headers';
import { apiHandler } from '@/lib/api/handler';
import { loginSchema } from '@/lib/validations';

async function loginAccount(request: Request) {
  const body = await request.json();

  // Normalize input for validation
  const loginInput = {
    login: String(body.login || body.username || body.email || '').trim(),
    password: body.password,
  };

  const result = loginSchema.safeParse(loginInput);

  if (!result.success) {
    return validationError(result.error.issues[0].message);
  }

  const { login, password } = result.data;

  const envUsername = process.env.ADMIN_USERNAME;
  const envEmail = process.env.ADMIN_EMAIL;
  const envPassword = process.env.ADMIN_PASSWORD;
  const matchesEnvLogin = login === envUsername || login === envEmail;

  if (envPassword && matchesEnvLogin && password === envPassword) {
    const adminEmail = envEmail || `${envUsername || 'admin'}@bloom.local`;
    const token = await generateToken(
      {
        id: 'env-admin',
        email: adminEmail,
        username: envUsername || 'admin',
        role: 'super_admin',
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

    return successResponse({
      admin: {
        id: 'env-admin',
        name: envUsername || 'Bloom Admin',
        email: adminEmail,
        role: 'super_admin',
      },
    });
  }

  const admin = await Admin.findOne({
    $or: [{ email: login }, { username: login }],
  }).select('+passwordHash');

  if (!admin) {
    return errorResponse('Invalid email/username or password', 401);
  }

  if (!admin.passwordHash) {
    return errorResponse('Account not yet activated. Please claim your account first.', 401);
  }

  const isPasswordValid = await comparePasswords(password, admin.passwordHash);

  if (!isPasswordValid) {
    return errorResponse('Invalid email/username or password', 401);
  }

  const token = await generateToken(
    {
      id: String(admin._id),
      email: admin.email,
      username: admin.username,
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

  return successResponse({
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
}

export const POST = apiHandler(loginAccount);
