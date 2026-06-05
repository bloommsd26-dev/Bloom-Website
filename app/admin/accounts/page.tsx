import { connectDB } from '@/db/connect';
import { Admin } from '@/models/Admin';
import AccountsClient from './AccountsClient';
import { serialize } from '@/utils/helpers';
import { AdminDTO } from '@/lib/types';

/**
 * Admin Accounts Page (Server Component)
 * Manages administrative access, roles, and permissions.
 */
export default async function AdminAccountsPage() {
  await connectDB();
  
  const accountsRaw = await Admin.find({}).sort({ createdAt: -1 }).lean();
  const accounts = serialize(accountsRaw) as AdminDTO[];

  return <AccountsClient initialAccounts={accounts} />;
}
