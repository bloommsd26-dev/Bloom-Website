import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rect' | 'circle';
}

export function Skeleton({ className, variant = 'rect' }: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 w-full rounded',
    rect: 'h-full w-full rounded-lg',
    circle: 'h-full w-full rounded-full',
  };

  return (
    <div
      className={clsx(
        'animate-pulse bg-neutral-200',
        variantClasses[variant],
        className
      )}
    />
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden h-full">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-2">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" className="w-2/3" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export function ProgramCardSkeleton() {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white shadow-lg overflow-hidden h-full">
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-2">
          <Skeleton variant="text" />
          <Skeleton variant="text" className="w-5/6" />
        </div>
        <div className="border-t border-neutral-200 pt-4 space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
