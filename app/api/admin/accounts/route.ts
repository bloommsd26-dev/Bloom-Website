import { Admin } from '@/models/Admin';
import { hashPassword } from '@/utils/auth';
import { successResponse, validationError } from '@/utils/api-response';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';

async function getAdmins() {
  const admins = await Admin.find({}).sort({ createdAt: -1 });
  return successResponse(admins);
}

async function createAdmin(request: Request) {
  const body = await request.json();
  const { name, email, username, password, role, permissions } = body;

  if (!name || !email || !username || !role) {
    return validationError('Name, email, username, and role are required');
  }

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
}

export const GET = apiHandler(withRole('super_admin')(getAdmins));
export const POST = apiHandler(withRole('super_admin')(createAdmin));
