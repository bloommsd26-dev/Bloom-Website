import { Container } from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ImpactLoading() {
  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="max-w-3xl space-y-6">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-3/4" />
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center space-y-3">
                <Skeleton className="h-12 w-20 mx-auto" />
                <Skeleton className="h-6 w-32 mx-auto" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <Skeleton className="h-12 w-1/2 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="rounded-lg border border-neutral-200 overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" className="w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
