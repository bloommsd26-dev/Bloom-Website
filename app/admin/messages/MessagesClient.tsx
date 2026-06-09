'use client';

import { useMemo, useState } from 'react';
import { Message, MessageStatus } from '../types';
import { MessageDetail } from '../components/MessageDetail';
import { updateMessageStatusAction, deleteMessageAction } from '@/lib/actions/admin';
import { DataTable } from '../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { MESSAGE_STATUSES } from '@/lib/constants';

interface MessagesClientProps {
  initialMessages: Message[];
}

export default function MessagesClient({ initialMessages }: MessagesClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | MessageStatus>('all');
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const selectedMessage = useMemo(
    () => messages.find((msg) => msg._id === selectedMessageId) || null,
    [messages, selectedMessageId]
  );

  const filteredMessages = useMemo(() => {
    if (statusFilter === 'all') return messages;
    return messages.filter((msg) => msg.status === statusFilter);
  }, [messages, statusFilter]);

  async function handleUpdateStatus(id: string, status: MessageStatus) {
    setIsSaving(true);
    setNotice('');
    setError('');

    try {
      await updateMessageStatusAction(id, status);
      setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, status } : m)));
      setNotice('Status updated.');
    } catch (err) {
      setError('Failed to update message.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedMessageId || !window.confirm('Delete this message permanently?')) return;
    setIsSaving(true);

    try {
      await deleteMessageAction(selectedMessageId);
      setMessages((prev) => prev.filter((m) => m._id !== selectedMessageId));
      setNotice('Message deleted.');
      setSelectedMessageId(null);
    } catch (err) {
      setError('Failed to delete message.');
    } finally {
      setIsSaving(false);
    }
  }

  const columns: ColumnDef<Message>[] = [
    {
      accessorKey: 'name',
      header: 'From',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status === 'new' && <span className="w-2 h-2 bg-cinnamon rounded-full" />}
          <span className="font-bold">{row.getValue('name')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'subject',
      header: 'Subject',
      cell: ({ row }) => <span className="text-espresso/60">{row.getValue('subject')}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            row.original.status === 'new'
              ? 'bg-cinnamon text-white'
              : 'bg-horchata/20 text-espresso/40'
          }`}
        >
          {row.getValue('status')}
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => (
        <span className="tabular-nums text-espresso/40">
          {new Date(row.getValue('createdAt')).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-espresso">
          Communication Hub
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-espresso/30 mr-2">
            Filter by:
          </span>
          {(['all', ...MESSAGE_STATUSES] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-full border px-6 py-2 text-[10px] font-black uppercase tracking-widest transition ${
                statusFilter === status
                  ? 'border-cinnamon bg-cinnamon text-white shadow-lg'
                  : 'border-espresso/10 bg-white text-espresso/40 hover:border-espresso/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8">
          <DataTable
            columns={columns}
            data={filteredMessages}
            onRowClick={(msg) => {
              setSelectedMessageId(msg._id);
              if (msg.status === 'new') void handleUpdateStatus(msg._id, 'read');
            }}
            selectedRowId={selectedMessageId || undefined}
          />
        </div>
        <div className="lg:col-span-4 sticky top-32">
          <MessageDetail
            selectedMessage={selectedMessage}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDelete}
            isSaving={isSaving}
          />
          {notice && (
            <p className="mt-4 p-4 rounded-2xl bg-green-50 text-green-700 text-xs font-bold border border-green-100 animate-fadeInUp">
              {notice}
            </p>
          )}
          {error && (
            <p className="mt-4 p-4 rounded-2xl bg-red-50 text-red-700 text-xs font-bold border border-red-100 animate-fadeInUp">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
