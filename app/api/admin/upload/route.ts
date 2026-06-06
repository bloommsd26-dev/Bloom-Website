import { put } from '@vercel/blob';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';
import { errorResponse, successResponse } from '@/utils/api-response';

export const dynamic = 'force-dynamic';

async function uploadImage(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return errorResponse('Filename is required', 400);
    }

    // Read the request body as a blob - more reliable in some serverless environments
    const blobData = await request.blob();
    
    if (!blobData || blobData.size === 0) {
      return errorResponse('No file data provided or file is empty', 400);
    }

    // Explicitly check for token
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('[UPLOAD ERROR] BLOB_READ_WRITE_TOKEN is missing in environment');
      return errorResponse('Server configuration error: Upload token missing. Please redeploy the app.', 500);
    }

    const blob = await put(filename, blobData, {
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
