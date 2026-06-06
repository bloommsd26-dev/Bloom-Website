import { put } from '@vercel/blob';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';
import { errorResponse, successResponse } from '@/utils/api-response';

export const dynamic = 'force-dynamic';

async function uploadImage(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return errorResponse('No file provided', 400);
    }

    // Explicitly check for token
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('[UPLOAD ERROR] BLOB_READ_WRITE_TOKEN is missing');
      return errorResponse('Server configuration error: Upload token missing', 500);
    }

    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    return successResponse(blob);
  } catch (error: any) {
    console.error('[UPLOAD API ERROR]:', error);
    return errorResponse(`Server Error: ${error.message || 'Failed to upload image'}`, 500);
  }
}

// Restricted to roles that can manage content
export const POST = apiHandler(withRole('super_admin', 'admin', 'editor')(uploadImage));
