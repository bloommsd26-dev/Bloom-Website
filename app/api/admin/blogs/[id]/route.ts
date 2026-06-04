import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';
import {
  successResponse,
  errorResponse,
  validationError,
  notFoundError,
} from '@/utils/api-response';
import { calculateReadingTime, generateSlug } from '@/utils/helpers';
import { withRole } from '@/lib/middleware/auth';

async function updateBlog(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await _request.json();
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

    if (status && !['draft', 'published'].includes(status)) {
      return validationError('Invalid blog status');
    }

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return notFoundError('Blog post not found');
    }

    const slug = generateSlug(title);
    const duplicateBlog = await Blog.findOne({ slug, _id: { $ne: id } });
    if (duplicateBlog) {
      return validationError('A blog with this title already exists');
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        excerpt,
        content,
        author,
        tags: Array.isArray(tags) ? tags : [],
        category: category || 'updates',
        coverImage: coverImage || '',
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || excerpt,
        status: status || 'draft',
        readingTime: calculateReadingTime(content),
      },
      { new: true, runValidators: true }
    );

    return successResponse({ blog }, 'Blog post updated successfully');
  } catch (error) {
    console.error('Error updating blog:', error);
    return errorResponse('Failed to update blog post', 500);
  }
}

async function deleteBlog(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return notFoundError('Blog post not found');
    }

    return successResponse({ blogId: id }, 'Blog post deleted successfully');
  } catch (error) {
    console.error('Error deleting blog:', error);
    return errorResponse('Failed to delete blog post', 500);
  }
}

export const PATCH = withRole('super_admin', 'admin', 'editor')(updateBlog);
export const DELETE = withRole('super_admin', 'admin', 'editor')(deleteBlog);
