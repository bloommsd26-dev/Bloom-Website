import { connectDB } from '@/db/connect';
import { Contact } from '@/models/Contact';
import MessagesClient from './MessagesClient';
import { serialize } from '@/utils/helpers';
import { ContactDTO } from '@/lib/types';
import { validateServerAuth } from '@/lib/middleware/auth';
import { redirect } from 'next/navigation';

/**
 * Admin Messages Page (Server Component)
 * Fetches community inquiries directly from the database.
 */
export default async function AdminMessagesPage() {
  const session = await validateServerAuth('super_admin', 'admin');
  if (!session) {
    redirect('/admin/login');
  }

  await connectDB();

  const messagesRaw = await Contact.find({}).sort({ createdAt: -1 }).lean();
  const messages = serialize(messagesRaw) as ContactDTO[];

  return <MessagesClient initialMessages={messages} />;
}
