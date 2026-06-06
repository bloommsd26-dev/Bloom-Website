import { Container } from '@/components/layout/Container';
import { BlogCard } from '@/components/cards/BlogCard';
import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import { generateBreadcrumbSchema } from '@/lib/utils/schema';
import { getPublishedBlogs } from '@/lib/db/blog-fetcher';

export const metadata: Metadata = generateMetadata(
  'Blog | Bloom',
  'Weekly records, student perspectives, and community stories from the rooms Bloom works in.'
);

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="pt-24 pb-20 bg-white">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">Blog</p>
            <h1 className="accent-statement mb-8 text-6xl sm:text-8xl">Recorded trust.</h1>
            <p className="story-copy text-espresso/80">
              Our blog is a collection of updates from our sessions—what we planned, what actually
              happened, and what we are carrying into the next visit.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white pt-0">
        <Container>
          <div className="max-w-5xl mx-auto space-y-24">
            {blogs.length > 0 ? (
              blogs.map((blog: any) => (
                <BlogCard
                  key={blog._id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  slug={blog.slug}
                  coverImage={blog.coverImage}
                  author={blog.author}
                  date={blog.createdAt}
                  readingTime={blog.readingTime}
                  category={blog.category}
                />
              ))
            ) : (
              <div className="py-24 text-center border-t border-espresso/10 rounded-3xl bg-horchata/5">
                <p className="story-copy mx-auto text-espresso/30 italic">
                  New field notes are being prepared by the team.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
