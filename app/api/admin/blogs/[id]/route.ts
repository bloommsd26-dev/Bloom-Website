import { Blog } from '@/models/Blog';
import { successResponse, validationError, notFoundError } from '@/utils/api-response';
import { calculateReadingTime, generateSlug } from '@/utils/helpers';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';
import { revalidatePath, revalidateTag } from 'next/cache';
import { del } from '@vercel/blob';
import { blogSchema } from '@/lib/validations';
import { logger } from '@/utils/logger';

async function updateBlog(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const result = blogSchema.safeParse(body);

  if (!result.success) {
    return validationError(result.error.issues[0].message);
  }

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
  } = result.data;

  const existingBlog = await Blog.findById(id);
  if (!existingBlog) {
    return notFoundError('Blog post not found');
  }

  const slug = generateSlug(title);
  const duplicateBlog = await Blog.findOne({ slug, _id: { $ne: id } });
  if (duplicateBlog) {
    return validationError('A blog with this title already exists');
  }

  // Handle image cleanup if image is being changed
  if (
    coverImage &&
    existingBlog.coverImage &&
    existingBlog.coverImage !== coverImage &&
    existingBlog.coverImage.includes('public.blob.vercel-storage.com')
  ) {
    try {
      await del(existingBlog.coverImage);
    } catch (error) {
      logger.error('[CLEANUP ERROR] Failed to delete old image from Vercel Blob', error);
    }
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

  revalidateTag('blogs');
  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);

  return successResponse({ blog }, 'Blog post updated successfully');
}

async function deleteBlog(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 1. Find the blog first to get the image URL
  const blog = await Blog.findById(id);

  if (!blog) {
    return notFoundError('Blog post not found');
  }

  // 2. If there's a cover image from Vercel Blob, delete it
  if (blog.coverImage && blog.coverImage.includes('public.blob.vercel-storage.com')) {
    try {
      await del(blog.coverImage);
    } catch (error) {
      logger.error('[CLEANUP ERROR] Failed to delete image from Vercel Blob', error);
      // We continue with blog deletion even if image deletion fails
    }
  }

  // 3. Delete the blog post from database
  await Blog.findByIdAndDelete(id);

  revalidateTag('blogs');
  revalidatePath('/blog');

  return successResponse({ blogId: id }, 'Blog post deleted successfully');
}

export const PATCH = apiHandler(withRole('super_admin', 'admin', 'editor')(updateBlog));
export const DELETE = apiHandler(withRole('super_admin', 'admin', 'editor')(deleteBlog));
