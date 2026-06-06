import { connectDB } from '@/db/connect';
import { Admin } from '@/models/Admin';
import AccountsClient from './AccountsClient';
import { serialize } from '@/utils/helpers';
import { AdminDTO } from '@/lib/types';
import { validateServerAuth } from '@/lib/middleware/auth';
import { redirect } from 'next/navigation';

/**
 * Admin Accounts Page (Server Component)
 * Manages administrative access and roles.
 */
export default async function AdminAccountsPage() {
  const session = await validateServerAuth('super_admin');
  if (!session) {
    redirect('/admin/login');
  }

  await connectDB();

  const accountsRaw = await Admin.find({}).sort({ createdAt: -1 }).lean();
  const accounts = serialize(accountsRaw) as AdminDTO[];

  return <AccountsClient initialAccounts={accounts} />;
}
