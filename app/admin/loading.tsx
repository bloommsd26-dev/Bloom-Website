import { Skeleton } from '@/components/ui/Skeleton';

export default function DashboardLoading() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-10 w-64" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-3xl border border-espresso/10 bg-white p-8 space-y-4">
            <Skeleton className="h-3 w-20" />
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-12 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-3 w-32 mt-6" />
          </div>
        ))}
      </div>

      {/* Grid Content Skeleton */}
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-4xl border border-espresso/10 bg-white p-10 space-y-6">
            <Skeleton className="h-8 w-40" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-6 rounded-3xl bg-horchata/5 border border-espresso/5"
                >
                  <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-4xl border border-espresso/10 bg-white p-10 space-y-8">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between pt-4 border-t border-espresso/5 first:border-t-0 first:pt-0"
                >
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
