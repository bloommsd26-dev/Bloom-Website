import { Skeleton } from '@/components/ui/Skeleton';

export default function AccountsLoading() {
  return (
    <div className="space-y-8">
      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>

      <div className="editorial-grid items-start">
        {/* Admin List Sidebar Skeleton */}
        <div className="lg:col-span-4 rounded-3xl border border-espresso/10 bg-white p-6 shadow-sm h-fit space-y-6">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-espresso/5 p-5 space-y-3">
                <Skeleton className="h-5 w-32" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Editor Skeleton */}
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="rounded-3xl border border-espresso/10 bg-white p-8 shadow-sm space-y-10">
            <div className="flex justify-between items-start border-b border-espresso/5 pb-8">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-10 w-24 rounded-full" />
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-12 w-full rounded-2xl" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-12 w-full rounded-2xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-12 w-full rounded-2xl" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-12 w-full rounded-2xl" />
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-3 w-24" />
                <div className="flex flex-wrap gap-3">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-32 rounded-full" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-14 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
