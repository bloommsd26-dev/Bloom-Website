import { Skeleton } from '@/components/ui/Skeleton';

export default function MessagesLoading() {
  return (
    <div className="space-y-8">
      {/* Page Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Messages List Skeleton */}
      <div className="rounded-3xl border border-espresso/10 bg-white overflow-hidden shadow-sm">
        <div className="divide-y divide-espresso/10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
