import { Container } from '@/components/layout/Container';
import { BlogCard } from '@/components/cards/BlogCard';
import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = generateMetadata(
  'Field Notes | Bloom',
  'Weekly records, student perspectives, and community stories from the rooms Bloom works in.'
);

async function getBlogs() {
  try {
    await connectDB();
    const blogs = await Blog.find({ status: 'published' }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <section className="pt-24 pb-20 bg-white">
        <Container>
          <div className="max-w-4xl">
            <p className="eyebrow">Field Notes</p>
            <h1 className="accent-statement mb-8 text-6xl sm:text-8xl">Recorded trust.</h1>
            <p className="story-copy">
              Our blog is a collection of field notes from our sessions—what we planned, what
              actually happened, and what we are carrying into the next visit.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding bg-white pt-0">
        <Container>
          <div className="max-w-5xl mx-auto space-y-16">
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
              <div className="py-20 text-center border-t border-espresso/10">
                <p className="story-copy mx-auto text-espresso/40">
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
