import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';
import { successResponse, errorResponse, notFoundError } from '@/utils/api-response';

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;

    const blog = await Blog.findOne({
      slug,
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
