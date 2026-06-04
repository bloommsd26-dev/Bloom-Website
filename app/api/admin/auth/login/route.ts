import { connectDB } from '@/db/connect';
import { Admin } from '@/models/Admin';
import { comparePasswords, generateToken } from '@/utils/auth';
import { successResponse, errorResponse, validationError } from '@/utils/api-response';
import { validateEmail } from '@/utils/helpers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password } = body;
    const login = String(username || email || '').trim();

    if (!login || !password) {
      return validationError('Username and password are required');
    }

    const envUsername = process.env.ADMIN_USERNAME;
    const envEmail = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD;
    const matchesEnvLogin = login === envUsername || login === envEmail;

    if (envPassword && matchesEnvLogin && password === envPassword) {
      const adminEmail = envEmail || `${envUsername || 'admin'}@bloom.local`;
      const token = generateToken(
        {
          id: 'env-admin',
          email: adminEmail,
          role: 'super_admin',
        },
        '7d'
      );

      return successResponse({
        token,
        admin: {
          id: 'env-admin',
          name: envUsername || 'Bloom Admin',
          email: adminEmail,
          role: 'super_admin',
        },
      });
    }

    if (!validateEmail(login)) {
      return errorResponse('Invalid username or password', 401);
    }

    await connectDB();

    const admin = await Admin.findOne({ email: login }).select('+passwordHash');

    if (!admin) {
      return errorResponse('Invalid email or password', 401);
    }

    const isPasswordValid = await comparePasswords(password, admin.passwordHash);

    if (!isPasswordValid) {
      return errorResponse('Invalid email or password', 401);
    }

    const token = generateToken(
      {
        id: String(admin._id),
        email: admin.email,
        role: admin.role,
      },
      '7d'
    );

    return successResponse({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('Login failed', 500);
  }
}
