import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bloom.org';

  const staticPages = [
    '',
    '/about',
    '/programs',
    '/blog',
    '/impact',
    '/volunteer',
    '/donate',
    '/contact',
  ];

  let dynamicPages: string[] = [];

  try {
    await connectDB();
    const blogs = await Blog.find({ status: 'published' }).select('slug updatedAt').lean();
    dynamicPages = blogs.map(
      (blog) => `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    );
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  ${dynamicPages.join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
