'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Skeleton } from '@/components/ui/Skeleton';

/**
 * Admin Root Page
 * Handles initial routing to the default administrative section.
 */
export default function AdminRoot() {
  const router = useRouter();

  useEffect(() => {
    // In a future phase, we can determine the default route on the server
    // For now, we redirect everyone to the content management section
    router.replace('/admin/content');
  }, [router]);

  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="editorial-grid items-start">
        <div className="rounded-3xl border border-espresso/10 bg-white p-6 shadow-sm h-96 lg:col-span-4" />
        <div className="lg:col-span-7 lg:col-start-6 rounded-3xl border border-espresso/10 bg-white p-8 shadow-sm h-[600px]" />
      </div>
    </div>
  );
}
