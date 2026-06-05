import { Program } from '@/models/Program';
import { successResponse } from '@/utils/api-response';
import { apiHandler } from '@/lib/api/handler';

async function getPrograms(request: Request) {
  const { searchParams } = new URL(request.url);
  const focusArea = searchParams.get('focusArea');

  const query: any = {};
  if (focusArea) query.focusArea = focusArea;

  const programs = await Program.find(query).sort({ focusArea: 1 });

  return successResponse({ programs });
}

export const GET = apiHandler(getPrograms);
