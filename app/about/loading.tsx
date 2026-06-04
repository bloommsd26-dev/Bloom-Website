import { Container } from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function AboutLoading() {
  return (
    <>
      <section className="pt-16 pb-20 bg-gradient-to-b from-primary-50 to-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-3/4" />
            </div>
            <Skeleton className="h-96 w-full rounded-lg shadow-lg" />
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-6 w-24 mx-auto rounded-full" />
              <Skeleton className="h-12 w-3/4 mx-auto" />
            </div>
            <div className="space-y-4">
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" className="w-5/6" />
            </div>
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </Container>
      </section>

      <section className="section-padding bg-neutral-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-neutral-200 space-y-4">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton variant="text" />
                <Skeleton variant="text" className="w-5/6" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
