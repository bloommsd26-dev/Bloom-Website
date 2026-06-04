import { Container } from '@/components/layout/Container';
import { BlogCard } from '@/components/cards/BlogCard';
import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';
import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';

export const metadata: Metadata = generateMetadata(
  'Blog',
  'Field notes, session stories, and volunteer reflections from Bloom.'
);

export const revalidate = 3600; // Revalidate every hour

type BlogListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  author?: string;
  category?: string;
  readingTime?: number;
  createdAt?: Date;
};

const demoBlogSlugs = ['introducing-bloom', 'tutoring-changes-lives', 'power-of-platform'];

async function getPublishedBlogs(): Promise<BlogListItem[]> {
  try {
    await connectDB();

    const blogs = await Blog.find({
      status: 'published',
      slug: { $nin: demoBlogSlugs },
    })
      .sort({ createdAt: -1 })
      .select('title slug excerpt coverImage author category readingTime createdAt')
      .lean<BlogListItem[]>();

    return blogs.map((blog) => ({
      ...blog,
      _id: String(blog._id),
    }));
  } catch (error) {
    console.error('Error loading published blogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getPublishedBlogs();

  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Field Notes</p>
            <h1 className="font-heading text-5xl sm:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              What the sessions teach us
            </h1>
            <p className="story-copy text-xl">
              Short reflections from the rooms, notebooks, sorting tables, and conversations that shape Bloom.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard
                  key={post._id}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  author={post.author}
                  date={post.createdAt}
                  readingTime={post.readingTime}
                  category={post.category}
                  coverImage={post.coverImage}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-neutral-200 bg-white p-8 text-center">
              <h2 className="font-heading text-2xl font-semibold text-neutral-900">
                No published field notes yet
              </h2>
              <p className="mt-3 text-neutral-600">
                Published CMS posts will appear here automatically.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
