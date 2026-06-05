import { Blog } from '@/models/Blog';
import { successResponse } from '@/utils/api-response';
import { parsePaginationParams } from '@/utils/helpers';
import { apiHandler } from '@/lib/api/handler';

const demoBlogSlugs = ['introducing-bloom', 'tutoring-changes-lives', 'power-of-platform'];

async function getBlogs(request: Request) {
  const { searchParams } = new URL(request.url);
  const { page, limit, skip } = parsePaginationParams(searchParams);
  const category = searchParams.get('category');

  const query: any = {
    status: 'published',
    slug: { $nin: demoBlogSlugs },
  };

  if (category && category !== 'all') {
    query.category = category;
  }

  const blogs = await Blog.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });

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
}

export const GET = apiHandler(getBlogs);
