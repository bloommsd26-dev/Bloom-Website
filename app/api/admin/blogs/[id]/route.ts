import { Blog } from '@/models/Blog';
import { successResponse, validationError, notFoundError } from '@/utils/api-response';
import { calculateReadingTime, generateSlug } from '@/utils/helpers';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';
import { revalidatePath } from 'next/cache';

async function updateBlog(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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

  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);

  return successResponse({ blog }, 'Blog post updated successfully');
}

async function deleteBlog(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    return notFoundError('Blog post not found');
  }

  revalidatePath('/blog');

  return successResponse({ blogId: id }, 'Blog post deleted successfully');
}

export const PATCH = apiHandler(withRole('super_admin', 'admin', 'editor')(updateBlog));
export const DELETE = apiHandler(withRole('super_admin', 'admin', 'editor')(deleteBlog));
