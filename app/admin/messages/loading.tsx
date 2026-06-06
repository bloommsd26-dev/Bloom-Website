import { Skeleton } from '@/components/ui/Skeleton';

export default function MessagesLoading() {
  return (
    <div className="space-y-8">
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="editorial-grid items-start">
        {/* Messages List Skeleton */}
        <div className="lg:col-span-4 rounded-3xl border border-espresso/10 bg-white overflow-hidden shadow-sm h-fit">
          <div className="p-6 border-b border-espresso/5">
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="p-2">
            <div className="grid grid-cols-4 gap-1 mb-4 px-4 pt-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full rounded-full" />
              ))}
            </div>
            <div className="divide-y divide-espresso/10">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-2 w-2 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-48" />
                  <Skeleton className="h-2 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Message Detail Skeleton */}
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="rounded-3xl border border-espresso/10 bg-white p-8 shadow-sm min-h-[600px] space-y-8">
            <div className="flex justify-between items-start border-b border-espresso/5 pb-8">
              <div className="space-y-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-64" />
                <div className="flex gap-4">
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-32 w-full rounded-3xl" />
              <div className="space-y-4 pt-8">
                <Skeleton className="h-3 w-24" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-40 rounded-full" />
                  <Skeleton className="h-12 w-40 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
