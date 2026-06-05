import { connectDB } from '@/db/connect';
import { Admin } from '@/models/Admin';
import { hashPassword } from '@/utils/auth';
import { successResponse, errorResponse, notFoundError } from '@/utils/api-response';
import { withRole } from '@/lib/middleware/auth';

/**
 * GET /api/admin/accounts/[id]
 * Get details of a specific admin account
 */
async function getAdmin(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const admin = await Admin.findById(id);

    if (!admin) {
      return notFoundError('Admin account not found');
    }

    return successResponse(admin);
  } catch (error) {
    console.error('Error fetching admin:', error);
    return errorResponse('Failed to fetch admin account', 500);
  }
}

/**
 * PATCH /api/admin/accounts/[id]
 * Update an admin account
 */
async function updateAdmin(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, username, password, role, permissions } = body;

    await connectDB();

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
  } catch (error) {
    console.error('Error updating admin:', error);
    return errorResponse('Failed to update admin account', 500);
  }
}

/**
 * DELETE /api/admin/accounts/[id]
 * Remove an admin account
 */
async function deleteAdmin(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();

    const admin = await Admin.findById(id);
    if (!admin) {
      return notFoundError('Admin account not found');
    }

    // Prevent deleting the last super_admin or oneself if needed
    // For now, simple delete
    await Admin.findByIdAndDelete(id);

    return successResponse(null, 'Admin account deleted successfully');
  } catch (error) {
    console.error('Error deleting admin:', error);
    return errorResponse('Failed to delete admin account', 500);
  }
}

export const GET = withRole('super_admin')(getAdmin);
export const PATCH = withRole('super_admin')(updateAdmin);
export const DELETE = withRole('super_admin')(deleteAdmin);
