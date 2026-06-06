'use client';

import { AdminAccount } from '../types';
import { Skeleton } from '@/components/ui/Skeleton';

interface AccountSidebarProps {
  accounts: AdminAccount[];
  selectedAccountId: string | null;
  isLoading: boolean;
  onSelect: (acc: AdminAccount) => void;
  onNew: () => void;
}

export function AccountSidebar({
  accounts,
  selectedAccountId,
  isLoading,
  onSelect,
  onNew,
}: AccountSidebarProps) {
  return (
    <aside className="rounded-3xl border border-espresso/10 bg-white p-6 shadow-sm h-fit sticky top-32">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2 className="font-heading text-xl font-black uppercase tracking-tighter text-espresso">
          Admins
        </h2>
        <button
          type="button"
          onClick={onNew}
          className="rounded-full bg-cinnamon px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-cinnamon/90"
        >
          New
        </button>
      </div>

      <div className="space-y-3">
        {isLoading &&
          [...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-espresso/5 p-4 space-y-3">
              <Skeleton className="h-4 w-1/2 rounded-full" />
              <div className="flex justify-between">
                <Skeleton className="h-2 w-20 rounded-full" />
                <Skeleton className="h-2 w-10 rounded-full" />
              </div>
            </div>
          ))}
        {!isLoading && accounts.length === 0 && (
          <p className="text-xs font-bold uppercase tracking-widest text-espresso/20 py-10 text-center">
            No accounts found.
          </p>
        )}
        {accounts.map((acc) => (
          <button
            key={acc._id}
            type="button"
            onClick={() => onSelect(acc)}
            className={`w-full rounded-2xl border p-5 text-left transition-all ${
              selectedAccountId === acc._id
                ? 'border-cinnamon bg-horchata/10 ring-1 ring-cinnamon'
                : 'border-espresso/5 bg-white hover:border-espresso/20 hover:shadow-md'
            }`}
          >
            <span className="block font-heading text-base font-bold text-espresso leading-tight mb-2 truncate">
              {acc.name}
            </span>
            <span className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-espresso/40 overflow-hidden">
              <span className="truncate flex-1" title={acc.email}>
                {acc.email}
              </span>
              <span className="text-cinnamon shrink-0">{acc.role.replace('_', ' ')}</span>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
