'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';
import { Contact } from '@/models/Contact';
import { Admin } from '@/models/Admin';
import { verifyToken, AUTH_COOKIE_NAME } from '@/utils/auth';
import { cookies } from 'next/headers';
import { MessageStatus } from '@/app/admin/types';
import { AuthPayload } from '@/lib/utils/auth';

/**
 * Helper to ensure the request is authorized
 */
async function getAuthorizedAdmin(): Promise<AuthPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyToken(token);
}

/**
 * BLOG ACTIONS
 */

export async function deleteBlogAction(id: string): Promise<{ success: boolean }> {
  const admin = await getAuthorizedAdmin();
  if (!admin || !['super_admin', 'admin', 'editor'].includes(admin.role)) {
    throw new Error('Unauthorized');
  }

  await connectDB();
  await Blog.findByIdAndDelete(id);
  revalidatePath('/admin/content');
  revalidatePath('/blog');
  return { success: true };
}

/**
 * MESSAGE ACTIONS
 */

export async function updateMessageStatusAction(
  id: string,
  status: MessageStatus
): Promise<{ success: boolean }> {
  const admin = await getAuthorizedAdmin();
  if (!admin || !['super_admin', 'admin'].includes(admin.role)) {
    throw new Error('Unauthorized');
  }

  await connectDB();
  await Contact.findByIdAndUpdate(id, { status });
  revalidatePath('/admin/messages');
  return { success: true };
}

export async function deleteMessageAction(id: string): Promise<{ success: boolean }> {
  const admin = await getAuthorizedAdmin();
  if (!admin || !['super_admin', 'admin'].includes(admin.role)) {
    throw new Error('Unauthorized');
  }

  await connectDB();
  await Contact.findByIdAndDelete(id);
  revalidatePath('/admin/messages');
  return { success: true };
}

/**
 * ACCOUNT ACTIONS
 */

export async function deleteAccountAction(id: string): Promise<{ success: boolean }> {
  const admin = await getAuthorizedAdmin();
  if (!admin || admin.role !== 'super_admin') {
    throw new Error('Unauthorized');
  }

  await connectDB();
  await Admin.findByIdAndDelete(id);
  revalidatePath('/admin/accounts');
  return { success: true };
}
