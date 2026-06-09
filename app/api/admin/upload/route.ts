import { put } from '@vercel/blob';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';
import { errorResponse, successResponse } from '@/utils/api-response';
import { env } from '@/lib/env';

export const dynamic = 'force-dynamic';

async function uploadImage(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return errorResponse('No file provided', 400);
  }

  // Explicitly check for token
  if (!env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('Server configuration error: Upload token missing');
  }

  const blob = await put(file.name, file, {
    access: 'public',
    addRandomSuffix: true,
  });

  return successResponse(blob);
}

// Restricted to roles that can manage content
export const POST = apiHandler(withRole('super_admin', 'admin', 'editor')(uploadImage));
