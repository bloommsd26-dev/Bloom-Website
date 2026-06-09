'use client';

import { Message, MessageStatus } from '../types';
import { Skeleton } from '@/components/ui/Skeleton';
import { MESSAGE_STATUSES } from '@/lib/constants';

interface MessageSidebarProps {
  messages: Message[];
  selectedMessageId: string | null;
  isLoading: boolean;
  statusFilter: 'all' | MessageStatus;
  onSelect: (msg: Message) => void;
  onFilterChange: (status: 'all' | MessageStatus) => void;
}

export function MessageSidebar({
  messages,
  selectedMessageId,
  isLoading,
  statusFilter,
  onSelect,
  onFilterChange,
}: MessageSidebarProps) {
  return (
    <aside className="rounded-3xl border border-espresso/10 bg-white p-6 shadow-sm h-fit sticky top-32">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2 className="font-heading text-xl font-black uppercase tracking-tighter text-espresso">
          Messages
        </h2>
      </div>

      <div className="grid grid-cols-5 gap-1 mb-6">
        {(['all', ...MESSAGE_STATUSES] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onFilterChange(status)}
            className={`rounded-full border py-2 text-[8px] font-black uppercase tracking-widest transition ${
              statusFilter === status
                ? 'border-cinnamon bg-cinnamon text-white'
                : 'border-espresso/10 bg-white text-espresso/40 hover:border-espresso/20'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {isLoading &&
          [...Array(5)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-espresso/5 p-4 space-y-3">
              <Skeleton className="h-4 w-1/2 rounded-full" />
              <Skeleton className="h-2 w-3/4 rounded-full" />
            </div>
          ))}
        {!isLoading && messages.length === 0 && (
          <p className="text-xs font-bold uppercase tracking-widest text-espresso/20 py-10 text-center">
            No messages.
          </p>
        )}
        {messages.map((msg) => (
          <button
            key={msg._id}
            type="button"
            onClick={() => onSelect(msg)}
            className={`w-full rounded-2xl border p-5 text-left transition-all ${
              selectedMessageId === msg._id
                ? 'border-cinnamon bg-horchata/10 ring-1 ring-cinnamon'
                : 'border-espresso/5 bg-white hover:border-espresso/20 hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-start gap-2 mb-2">
              <span className="block font-heading text-sm font-bold text-espresso leading-tight line-clamp-1">
                {msg.name}
              </span>
              {msg.status === 'new' && <span className="w-2 h-2 bg-cinnamon rounded-full" />}
            </div>
            <p className="text-xs text-espresso/60 line-clamp-1 mb-3">{msg.subject}</p>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-espresso/30">
              {new Date(msg.createdAt).toLocaleDateString()}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
