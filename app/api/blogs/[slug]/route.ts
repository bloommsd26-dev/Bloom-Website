import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';
import { successResponse, errorResponse, notFoundError } from '@/utils/api-response';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    await connectDB();

    const blog = await Blog.findOne({
      slug: params.slug,
      status: 'published',
    });

    if (!blog) {
      return notFoundError('Blog post not found');
    }

    return successResponse({ blog });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return errorResponse('Failed to fetch blog post', 500);
  }
}
