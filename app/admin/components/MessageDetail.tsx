'use client';

import { Message, MessageStatus } from '../types';
import clsx from 'clsx';

interface MessageDetailProps {
  selectedMessage: Message | null;
  onUpdateStatus: (id: string, status: MessageStatus) => void;
  onDelete: () => void;
  isSaving?: boolean;
}

export function MessageDetail({
  selectedMessage,
  onUpdateStatus,
  onDelete,
  isSaving = false,
}: MessageDetailProps) {
  if (!selectedMessage) {
    return (
      <div className="rounded-3xl border border-espresso/10 bg-white p-8 shadow-sm h-full min-h-[600px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-horchata/20 rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">✉️</span>
        </div>
        <h3 className="font-heading text-2xl font-bold text-espresso mb-2">No message selected</h3>
        <p className="text-espresso/40 max-w-xs">
          Select an inquiry from the sidebar to view details and take action.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-espresso/10 bg-white p-8 shadow-sm h-full min-h-[600px] flex flex-col">
      <div className="flex flex-col gap-6 border-b border-espresso/5 pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="eyebrow mb-2">Message from {selectedMessage.name}</p>
          <h2 className="font-heading text-4xl font-bold text-espresso leading-tight">
            {selectedMessage.subject}
          </h2>
          <div className="flex flex-wrap gap-4 mt-4 text-xs font-bold uppercase tracking-widest text-espresso/40">
            <span className="truncate max-w-[250px] sm:max-w-none" title={selectedMessage.email}>
              {selectedMessage.email}
            </span>
            <span>•</span>
            <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onDelete}
            disabled={isSaving}
            className="rounded-full bg-red-50 px-6 py-2 text-xs font-bold uppercase tracking-widest text-red-600 transition hover:bg-red-100 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex-1 py-10">
        <div className="field-note bg-horchata/5 border-horchata/30 mb-10">
          <p className="text-xl text-espresso/80 leading-relaxed whitespace-pre-wrap">
            {selectedMessage.message}
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/30">
            Quick Actions
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
              onClick={(e) => {
                if (isSaving) e.preventDefault();
                else onUpdateStatus(selectedMessage._id, 'replied');
              }}
              className={clsx(
                'rounded-full bg-cinnamon px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-cinnamon/90 shadow-md',
                isSaving && 'opacity-50 cursor-not-allowed'
              )}
            >
              Reply via Email
            </a>
            {selectedMessage.status !== 'archived' && (
              <button
                onClick={() => onUpdateStatus(selectedMessage._id, 'archived')}
                disabled={isSaving}
                className="rounded-full border-2 border-espresso/10 px-8 py-3 text-xs font-bold uppercase tracking-widest text-espresso hover:bg-horchata/10 transition-all disabled:opacity-50"
              >
                Archive
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
