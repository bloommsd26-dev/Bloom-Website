import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';
import { generateMetadata as createSeoMetadata } from '@/utils/seo';

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  try {
    await connectDB();
    const blogs = await Blog.find({ status: 'published' }).select('slug').lean();
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

type BlogDetail = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author?: string;
  category?: string;
  readingTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: Date;
};

const demoBlogSlugs = ['introducing-bloom', 'tutoring-changes-lives', 'power-of-platform'];

async function getBlog(slug: string): Promise<BlogDetail | null> {
  if (demoBlogSlugs.includes(slug)) {
    return null;
  }

  try {
    await connectDB();

    const blog = await Blog.findOne({ slug, status: 'published' })
      .select(
        'title slug excerpt content coverImage author category readingTime seoTitle seoDescription createdAt'
      )
      .lean<BlogDetail | null>();

    return blog;
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return createSeoMetadata('Blog post', 'Bloom field note.');
  }

  return createSeoMetadata(blog.seoTitle || blog.title, blog.seoDescription || blog.excerpt);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const publishedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <>
      <section className="pt-16 pb-12 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            {blog.category && <p className="eyebrow mb-4">{blog.category}</p>}
            <h1 className="font-heading text-5xl sm:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            <p className="story-copy text-xl">{blog.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-500">
              {blog.author && <span>{blog.author}</span>}
              {publishedDate && <span>{publishedDate}</span>}
              {blog.readingTime && <span>{blog.readingTime} min read</span>}
            </div>
          </div>
        </Container>
      </section>

      {blog.coverImage && (
        <section className="pb-12 bg-white">
          <Container>
            <div className="relative h-80 overflow-hidden rounded-lg border border-neutral-200 shadow-lg sm:h-[28rem]">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
              />
            </div>
          </Container>
        </section>
      )}

      <section className="section-padding pt-8">
        <Container size="md">
          <article className="space-y-6 text-lg leading-relaxed text-neutral-700">
            {blog.content.split(/\n{2,}/).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        </Container>
      </section>
    </>
  );
}
