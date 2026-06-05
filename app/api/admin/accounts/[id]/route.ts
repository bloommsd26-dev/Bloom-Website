import { Admin } from '@/models/Admin';
import { hashPassword } from '@/utils/auth';
import { successResponse, notFoundError } from '@/utils/api-response';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';

async function getAdmin(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await Admin.findById(id);

  if (!admin) {
    return notFoundError('Admin account not found');
  }

  return successResponse(admin);
}

async function updateAdmin(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { name, email, username, password, role, permissions } = body;

  const admin = await Admin.findById(id).select('+passwordHash');
  if (!admin) {
    return notFoundError('Admin account not found');
  }

  if (name) admin.name = name;
  if (email) admin.email = email;
  if (username) admin.username = username;
  if (role) admin.role = role;
  if (permissions) admin.permissions = permissions;
  if (password) {
    admin.passwordHash = await hashPassword(password);
  }

  await admin.save();

  const adminResponse = admin.toObject();
  delete adminResponse.passwordHash;

  return successResponse(adminResponse, 'Admin account updated successfully');
}

async function deleteAdmin(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const admin = await Admin.findById(id);
  if (!admin) {
    return notFoundError('Admin account not found');
  }

  await Admin.findByIdAndDelete(id);

  return successResponse(null, 'Admin account deleted successfully');
}

export const GET = apiHandler(withRole('super_admin')(getAdmin));
export const PATCH = apiHandler(withRole('super_admin')(updateAdmin));
export const DELETE = apiHandler(withRole('super_admin')(deleteAdmin));
