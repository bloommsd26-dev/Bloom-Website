import { Container } from '@/components/layout/Container';
import { BlogCardSkeleton } from '@/components/ui/Skeleton';

export default function BlogLoading() {
  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="h-6 w-24 bg-primary-100 rounded-full animate-pulse" />
            <div className="h-16 w-full sm:w-3/4 bg-neutral-200 rounded animate-pulse" />
            <div className="h-12 w-full bg-neutral-200 rounded animate-pulse" />
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
