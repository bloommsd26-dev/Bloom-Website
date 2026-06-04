import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';
import { successResponse, errorResponse, notFoundError } from '@/utils/api-response';

const demoBlogSlugs = ['introducing-bloom', 'tutoring-changes-lives', 'power-of-platform'];

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    const { slug } = await params;

    if (demoBlogSlugs.includes(slug)) {
      return notFoundError('Blog post not found');
    }

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
