import { Contact } from '@/models/Contact';
import { successResponse } from '@/utils/api-response';
import { parsePaginationParams } from '@/utils/helpers';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';

async function getMessages(request: Request) {
  const { searchParams } = new URL(request.url);
  const { page, limit, skip } = parsePaginationParams(searchParams);
  const status = searchParams.get('status');

  const query: any = {};
  if (status && status !== 'all') {
    query.status = status;
  }

  const messages = await Contact.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });

  const total = await Contact.countDocuments(query);

  return successResponse({
    messages,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
}

export const GET = apiHandler(withRole('super_admin', 'admin')(getMessages));
