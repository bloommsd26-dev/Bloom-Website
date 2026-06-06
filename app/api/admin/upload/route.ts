import { put } from '@vercel/blob';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';
import { errorResponse, successResponse } from '@/utils/api-response';

async function uploadImage(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (!filename) {
    return errorResponse('Filename is required', 400);
  }

  if (!request.body) {
    return errorResponse('No body provided', 400);
  }

  try {
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return successResponse(blob);
  } catch (error) {
    console.error('Blob upload error:', error);
    return errorResponse('Failed to upload image to Vercel Blob', 500);
  }
}

// Restricted to roles that can manage content
export const POST = apiHandler(withRole('super_admin', 'admin', 'editor')(uploadImage));
