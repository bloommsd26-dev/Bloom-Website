import { Container } from '@/components/layout/Container';
import { BlogCard } from '@/components/cards/BlogCard';
import type { Metadata } from 'next';
import { generateMetadata } from '@/utils/seo';

export const metadata: Metadata = generateMetadata(
  'Blog',
  'Field notes, session stories, and volunteer reflections from Bloom.'
);

const blogPosts = [
  {
    title: 'The First Time She Took the Front Row',
    slug: 'shy-to-strong-journey',
    excerpt: 'A Voice Room note about confidence that arrived one sentence at a time.',
    author: 'Sarah Patel',
    date: new Date('2026-03-01'),
    readingTime: 5,
    category: 'inspiration',
    coverImage: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'What We Learned From One Math Notebook',
    slug: 'tutoring-transforms-academics',
    excerpt: 'Homework Tables are less about speed and more about finding the exact place a child got lost.',
    author: 'Arjun Kumar',
    date: new Date('2026-02-25'),
    readingTime: 7,
    category: 'education',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'The Work Before the Visit',
    slug: 'volunteer-hours-impact',
    excerpt: 'Sorting worksheets, assigning roles, packing supplies: the quiet preparation behind Bloom sessions.',
    author: 'Priya Singh',
    date: new Date('2026-02-20'),
    readingTime: 6,
    category: 'impact',
    coverImage: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl">
            <p className="text-primary-600 font-semibold uppercase tracking-widest mb-4">Field Notes</p>
            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6">
              What the sessions teach us
            </h1>
            <p className="text-xl text-neutral-600">
              Short reflections from the rooms, notebooks, sorting tables, and conversations that shape Bloom.
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
