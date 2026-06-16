import { connectDB } from '@/db/connect';
import { Volunteer } from '@/models/Volunteer';
import { validateServerAuth } from '@/lib/middleware/auth';
import { redirect } from 'next/navigation';
import VolunteersClient from './VolunteersClient';
import { serialize } from '@/utils/helpers';

export const dynamic = 'force-dynamic';

export default async function VolunteersPage() {
  const session = await validateServerAuth('super_admin', 'admin');
  if (!session) redirect('/admin/login');

  await connectDB();
  const volunteersRaw = await Volunteer.find({}).sort({ createdAt: -1 }).lean();
  const volunteers = serialize(volunteersRaw);

  return <VolunteersClient initialVolunteers={volunteers} />;
}
