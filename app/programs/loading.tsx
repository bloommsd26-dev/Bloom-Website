import { Container } from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProgramsLoading() {
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

      <section className="section-padding">
        <Container>
          <div className="flex flex-col items-center mb-12 space-y-4">
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
          </div>
          <div className="space-y-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-12">
                <div className="space-y-4">
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" className="w-5/6" />
                  <div className="space-y-2 pt-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </div>
                </div>
                <Skeleton className="h-80 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
