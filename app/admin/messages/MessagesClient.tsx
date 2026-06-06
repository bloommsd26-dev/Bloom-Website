'use client';

import { useMemo, useState } from 'react';
import { Message, MessageStatus } from '../types';
import { MessageSidebar } from '../components/MessageSidebar';
import { MessageDetail } from '../components/MessageDetail';
import { updateMessageStatusAction, deleteMessageAction } from '@/lib/actions/admin';

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

  return (
    <div className="editorial-grid items-start">
      <MessageSidebar
        messages={filteredMessages}
        selectedMessageId={selectedMessageId}
        isLoading={false}
        statusFilter={statusFilter}
        onSelect={(msg) => {
          setSelectedMessageId(msg._id);
          if (msg.status === 'new') void handleUpdateStatus(msg._id, 'read');
        }}
        onFilterChange={setStatusFilter}
      />
      <div className="lg:col-span-7 lg:col-start-6">
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
  );
}
