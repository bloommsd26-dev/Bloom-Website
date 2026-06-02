import { connectDB } from '@/db/connect';
import { Program } from '@/models/Program';
import { successResponse, errorResponse } from '@/utils/api-response';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const focusArea = searchParams.get('focusArea');

    const query: any = {};
    if (focusArea) query.focusArea = focusArea;

    const programs = await Program.find(query).sort({ focusArea: 1 });

    return successResponse({ programs });
  } catch (error) {
    console.error('Error fetching programs:', error);
    return errorResponse('Failed to fetch programs', 500);
  }
}
