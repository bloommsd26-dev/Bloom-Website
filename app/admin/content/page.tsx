import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';
import ContentClient from './ContentClient';
import { serialize } from '@/utils/helpers';
import { BlogDTO } from '@/lib/types';

/**
 * Admin Content Page (Server Component)
 * Fetches blog posts directly from the database for the CMS.
 */
export default async function AdminContentPage() {
  await connectDB();

  const blogsRaw = await Blog.find({}).sort({ createdAt: -1 }).lean();
  const blogs = serialize(blogsRaw) as BlogDTO[];

  return <ContentClient initialBlogs={blogs} />;
}
