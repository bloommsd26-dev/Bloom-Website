import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { BlogCard } from '@/components/cards/BlogCard';
import { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';

export const metadata: Metadata = generateMetadata(
  'Blog',
  'Stories of impact, updates from Bloom, and insights into our work empowering children through education and mentorship.'
);

const blogPosts = [
  {
    title: 'From Shy to Strong: One Student\'s Journey',
    slug: 'shy-to-strong-journey',
    excerpt: 'How our personality development program helped a quiet 8th grader find her voice and confidence.',
    content: 'Full content here...',
    author: 'Sarah Patel',
    date: new Date('2026-03-01'),
    readingTime: 5,
    category: 'inspiration',
    coverImage: '/blog/journey.jpg',
  },
  {
    title: 'Tutoring That Transforms: Academic Success Stories',
    slug: 'tutoring-transforms-academics',
    excerpt: 'Our tutoring programs are helping children improve grades and discover their academic potential.',
    content: 'Full content here...',
    author: 'Arjun Kumar',
    date: new Date('2026-02-25'),
    readingTime: 7,
    category: 'education',
    coverImage: '/blog/tutoring.jpg',
  },
  {
    title: 'What 1200+ Volunteer Hours Mean',
    slug: 'volunteer-hours-impact',
    excerpt: 'A look at the dedication behind our volunteer community and the tangible change they create.',
    content: 'Full content here...',
    author: 'Priya Singh',
    date: new Date('2026-02-20'),
    readingTime: 6,
    category: 'impact',
    coverImage: '/blog/volunteers.jpg',
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <p className="text-primary-600 font-semibold uppercase tracking-widest mb-4">Stories & Updates</p>
            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
              From Our Community
            </h1>
            <p className="text-xl text-neutral-600">
              Stories of impact, insights from our work, and updates about Bloom's mission to empower children.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                slug={post.slug}
                author={post.author}
                date={post.date}
                readingTime={post.readingTime}
                category={post.category}
                coverImage={post.coverImage}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
