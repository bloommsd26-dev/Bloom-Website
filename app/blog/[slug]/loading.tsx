import { Container } from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function BlogPostLoading() {
  return (
    <>
      <section className="pt-20 pb-12 bg-neutral-50">
        <Container size="md">
          <div className="space-y-6">
            <Skeleton className="h-6 w-32 rounded-full" />
            <Skeleton className="h-16 w-full" />
            <div className="flex items-center gap-4">
              <Skeleton variant="circle" className="h-10 w-10" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container size="md">
          <Skeleton className="h-96 w-full mb-12" />
          <div className="space-y-4 max-w-none">
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-5/6" />
            <br />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-4/5" />
            <br />
            <Skeleton variant="text" />
            <Skeleton variant="text" className="w-11/12" />
          </div>
        </Container>
      </section>
    </>
  );
}
