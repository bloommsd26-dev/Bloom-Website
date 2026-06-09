import { connectDB } from './connect';
import { Blog } from '../models/Blog';
import { unstable_cache } from 'next/cache';
import { BlogDTO } from '../types';
import { serialize } from '../utils/helpers';
import { DEMO_BLOG_SLUGS } from '../constants';

/**
 * Fetch all published blogs with caching
 */
export const getPublishedBlogs = unstable_cache(
  async () => {
    try {
      await connectDB();
      const blogsRaw = await Blog.find({
        status: 'published',
        slug: { $nin: DEMO_BLOG_SLUGS },
      })
        .sort({ createdAt: -1 })
        .lean();
      return serialize(blogsRaw) as BlogDTO[];
    } catch (error) {
      console.error('Error fetching blogs in fetcher:', error);
      return [];
    }
  },
  ['blogs-list'],
  { tags: ['blogs', 'blogs-list'] }
);

/**
 * Fetch a single blog by slug with caching
 */
export const getBlogBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      try {
        await connectDB();
        const blogRaw = await Blog.findOne({ slug, status: 'published' }).lean();
        if (!blogRaw) return null;
        return serialize(blogRaw) as BlogDTO;
      } catch (error) {
        console.error(`Error fetching blog ${slug} in fetcher:`, error);
        return null;
      }
    },
    [`blog-detail-${slug}`],
    { tags: ['blogs', `blog-${slug}`] }
  )();
