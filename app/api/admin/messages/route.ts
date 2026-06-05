import { connectDB } from '@/db/connect';
import { Contact } from '@/models/Contact';
import { successResponse, errorResponse } from '@/utils/api-response';
import { parsePaginationParams } from '@/utils/helpers';
import { withRole } from '@/lib/middleware/auth';

async function getMessages(request: Request) {
  try {
    await connectDB();

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
  } catch (error) {
    console.error('Error fetching messages:', error);
    return errorResponse('Failed to fetch messages', 500);
  }
}

export const GET = withRole('super_admin', 'admin', 'editor')(getMessages);
