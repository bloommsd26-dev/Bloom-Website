import { connectDB } from '@/db/connect';
import { Admin } from '@/models/Admin';
import { hashPassword, generateToken } from '@/utils/auth';
import { successResponse, errorResponse, validationError } from '@/utils/api-response';

/**
 * POST /api/admin/auth/claim
 * Claim an admin account by setting a password for the first time.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return validationError('Email/Username and password are required');
    }

    if (password.length < 6) {
      return validationError('Password must be at least 6 characters long');
    }

    await connectDB();

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
    const token = generateToken(
      {
        id: String(admin._id),
        email: admin.email,
        role: admin.role,
      },
      '7d'
    );

    return successResponse(
      {
        token,
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
  } catch (error) {
    console.error('Account claiming error:', error);
    return errorResponse('Failed to claim account', 500);
  }
}
