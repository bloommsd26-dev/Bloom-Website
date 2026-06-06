import { put } from '@vercel/blob';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';
import { errorResponse, successResponse } from '@/utils/api-response';

async function uploadImage(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return errorResponse('Filename is required', 400);
    }

    if (!request.body) {
      return errorResponse('No file data provided', 400);
    }

    // Explicitly check for token to give better error message if missing
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('[UPLOAD ERROR] BLOB_READ_WRITE_TOKEN is missing');
      return errorResponse('Server configuration error: Upload token missing', 500);
    }

    const blob = await put(filename, request.body, {
      access: 'public',
      addRandomSuffix: true, // Prevent filename collisions
    });

    return successResponse(blob);
  } catch (error: any) {
    console.error('[UPLOAD API ERROR]:', error);
    return errorResponse(error.message || 'Failed to upload image', 500);
  }
}

// Restricted to roles that can manage content
export const POST = apiHandler(withRole('super_admin', 'admin', 'editor')(uploadImage));
