import { connectDB } from '@/db/connect';
import { Admin } from '@/models/Admin';
import { hashPassword, comparePasswords, generateToken } from '@/utils/auth';
import { successResponse, errorResponse, validationError } from '@/utils/api-response';
import { validateEmail } from '@/utils/helpers';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return validationError('Email and password are required');
    }

    if (!validateEmail(email)) {
      return validationError('Please provide a valid email address');
    }

    const admin = await Admin.findOne({ email }).select('+passwordHash');

    if (!admin) {
      return errorResponse('Invalid email or password', 401);
    }

    const isPasswordValid = await comparePasswords(password, admin.passwordHash);

    if (!isPasswordValid) {
      return errorResponse('Invalid email or password', 401);
    }

    const token = generateToken(
      {
        id: admin._id,
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
