import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';
import { successResponse, errorResponse } from '@/utils/api-response';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const query: any = { status: 'published' };

    if (category) query.category = category;

    if (search) {
      query.$text = { $search: search };
    }

    const blogs = await Blog.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Blog.countDocuments(query);

    return successResponse({
      blogs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return errorResponse('Failed to fetch blogs', 500);
  }
}
