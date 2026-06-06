import { Skeleton } from '@/components/ui/Skeleton';

export default function AdminLoading() {
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

      {/* Grid Skeleton matched to Editorial Grid */}
      <div className="editorial-grid items-start">
        {/* Sidebar Skeleton */}
        <div className="rounded-3xl border border-espresso/10 bg-white p-6 shadow-sm space-y-6 lg:col-span-4">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Skeleton className="h-8 w-full rounded-full" />
            <Skeleton className="h-8 w-full rounded-full" />
            <Skeleton className="h-8 w-full rounded-full" />
          </div>
          <div className="space-y-3 pt-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-espresso/5 p-4 space-y-3">
                <Skeleton className="h-4 w-3/4 rounded-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-2 w-12 rounded-full" />
                  <Skeleton className="h-2 w-12 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Skeleton */}
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="rounded-3xl border border-espresso/10 bg-white p-8 shadow-sm space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-12 w-full rounded-2xl" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-12 w-full rounded-2xl" />
              </div>
            </div>
            <Skeleton className="h-[400px] w-full rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
