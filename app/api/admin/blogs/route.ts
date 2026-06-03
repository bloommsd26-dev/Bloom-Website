import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';
import { successResponse, errorResponse, validationError } from '@/utils/api-response';
import { generateSlug, calculateReadingTime, parsePaginationParams } from '@/utils/helpers';
import { verifyToken } from '@/utils/auth';

function authenticateAdminRequest(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const decoded = verifyToken(authHeader.substring(7));
  if (!decoded || !['admin', 'editor'].includes(decoded.role)) {
    return null;
  }

  return decoded;
}

export async function GET(request: Request) {
  try {
    if (!authenticateAdminRequest(request)) {
      return errorResponse('Unauthorized', 401);
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'published';
    const { page, limit, skip } = parsePaginationParams(searchParams);

    if (!['draft', 'published', 'all'].includes(status)) {
      return validationError('Invalid blog status');
    }

    const query: any = {};
    if (status !== 'all') query.status = status;

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

export async function POST(request: Request) {
  try {
    if (!authenticateAdminRequest(request)) {
      return errorResponse('Unauthorized', 401);
    }

    await connectDB();

    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      author,
      tags,
      category,
      coverImage,
      seoTitle,
      seoDescription,
      status,
    } = body;

    if (!title || !excerpt || !content || !author) {
      return validationError('Title, excerpt, content, and author are required');
    }

    const slug = generateSlug(title);
    const readingTime = calculateReadingTime(content);

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return validationError('A blog with this title already exists');
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      author,
      tags: tags || [],
      category: category || 'updates',
      coverImage: coverImage || '',
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      status: status || 'draft',
      readingTime,
    });

    return successResponse({ blogId: blog._id }, 'Blog post created successfully', 201);
  } catch (error) {
    console.error('Error creating blog:', error);
    return errorResponse('Failed to create blog post', 500);
  }
}
