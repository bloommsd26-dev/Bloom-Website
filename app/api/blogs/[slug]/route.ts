import { Blog } from '@/models/Blog';
import { successResponse, notFoundError } from '@/utils/api-response';
import { apiHandler } from '@/lib/api/handler';

async function getBlog(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const blog = await Blog.findOne({
    slug,
    status: 'published',
  });

  if (!blog) {
    return notFoundError('Blog post not found');
  }

  return successResponse(blog);
}

export const GET = apiHandler(getBlog);
