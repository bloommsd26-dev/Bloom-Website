'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
    <div className="flex items-center justify-center min-h-[50vh]">
      <p className="text-xs font-bold uppercase tracking-widest text-espresso/40">
        Loading Dashboard...
      </p>
    </div>
  );
}
