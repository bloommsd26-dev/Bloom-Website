import { connectDB } from '@/db/connect';
import { Admin } from '@/models/Admin';
import { hashPassword } from '@/utils/auth';
import { successResponse, errorResponse, validationError } from '@/utils/api-response';
import { withRole } from '@/lib/middleware/auth';

/**
 * GET /api/admin/accounts
 * List all admin accounts
 * Only accessible by super_admin
 */
async function getAdmins(_request: Request) {
  try {
    await connectDB();
    const admins = await Admin.find({}).sort({ createdAt: -1 });
    return successResponse(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    return errorResponse('Failed to fetch admin accounts', 500);
  }
}

/**
 * POST /api/admin/accounts
 * Create a new admin account
 * Only accessible by super_admin
 */
async function createAdmin(request: Request) {
  try {
    const body = await request.json();
    const { name, email, username, password, role, permissions } = body;

    if (!name || !email || !username || !role) {
      return validationError('Name, email, username, and role are required');
    }

    await connectDB();

    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }],
    });
    if (existingAdmin) {
      return validationError('Admin with this email or username already exists');
    }

    const passwordHash = password ? await hashPassword(password) : undefined;
    const newAdmin = await Admin.create({
      name,
      email,
      username,
      passwordHash,
      role,
      permissions: permissions || [],
    });

    const adminResponse = newAdmin.toObject();
    delete adminResponse.passwordHash;

    return successResponse(adminResponse, 'Admin account created successfully', 201);
  } catch (error) {
    console.error('Error creating admin:', error);
    return errorResponse('Failed to create admin account', 500);
  }
}

export const GET = withRole('super_admin')(getAdmins);
export const POST = withRole('super_admin')(createAdmin);
