import { connectDB } from '@/db/connect';
import { Blog } from '@/models/Blog';
import { Contact } from '@/models/Contact';
import { Volunteer } from '@/models/Volunteer';
import { Program } from '@/models/Program';
import { validateServerAuth } from '@/lib/middleware/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

/**
 * Admin Dashboard Page (Server Component)
 * Provides an overview of site metrics and quick navigation.
 */
export default async function AdminDashboardPage() {
  const session = await validateServerAuth('super_admin', 'admin', 'editor', 'viewer');
  if (!session) {
    redirect('/admin/login');
  }

  await connectDB();

  const [totalBlogs, draftBlogs, totalMessages, newMessages, totalVolunteers, totalPrograms] =
    await Promise.all([
      Blog.countDocuments({}),
      Blog.countDocuments({ status: 'draft' }),
      Contact.countDocuments({}),
      Contact.countDocuments({ status: 'new' }),
      Volunteer.countDocuments({}),
      Program.countDocuments({}),
    ]);

  const stats = [
    {
      label: 'Blog Posts',
      value: totalBlogs,
      detail: `${totalBlogs - draftBlogs} published`,
      href: '/admin/content',
      color: 'bg-green-50 text-green-700 border-green-100',
    },
    {
      label: 'New Messages',
      value: newMessages,
      detail: `of ${totalMessages} total`,
      href: '/admin/messages',
      color: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      label: 'Volunteers',
      value: totalVolunteers,
      detail: 'total applications',
      href: '/admin/messages', // Or wherever volunteers are managed in future
      color: 'bg-purple-50 text-purple-700 border-purple-100',
    },
    {
      label: 'Programs',
      value: totalPrograms,
      detail: 'active focus areas',
      href: '/',
      color: 'bg-orange-50 text-orange-700 border-orange-100',
    },
  ];

  return (
    <div className="space-y-10 animate-fadeInUp">
      <div>
        <h2 className="eyebrow mb-2">Welcome back, {session.email.split('@')[0]}</h2>
        <h1 className="font-heading text-4xl font-black uppercase tracking-tighter text-espresso">
          Dashboard Overview
        </h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`group rounded-3xl border p-8 transition-all hover:shadow-xl active:scale-[0.98] ${stat.color}`}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tighter tabular-nums">
                {stat.value}
              </span>
              <span className="text-xs font-bold opacity-60">{stat.detail}</span>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Manage {stat.label} →
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-4xl border border-espresso/10 bg-white p-10 shadow-sm">
            <h3 className="font-heading text-2xl font-bold text-espresso mb-6">Quick Actions</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/admin/content"
                className="flex items-center gap-4 p-6 rounded-3xl bg-horchata/5 border border-espresso/5 hover:border-cinnamon/20 hover:bg-white transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-cinnamon/10 text-cinnamon flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  ✍️
                </div>
                <div>
                  <p className="font-bold text-espresso">Write a Post</p>
                  <p className="text-xs text-espresso/40">Share a new field note</p>
                </div>
              </Link>
              <Link
                href="/admin/accounts"
                className="flex items-center gap-4 p-6 rounded-3xl bg-horchata/5 border border-espresso/5 hover:border-cinnamon/20 hover:bg-white transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-espresso/5 text-espresso flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👥
                </div>
                <div>
                  <p className="font-bold text-espresso">Team Access</p>
                  <p className="text-xs text-espresso/40">Manage admin accounts</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-4xl border border-espresso/10 bg-white p-10 shadow-sm">
            <h3 className="font-heading text-xl font-bold text-espresso mb-6">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-espresso/40 font-bold uppercase tracking-widest text-[10px]">
                  Database
                </span>
                <span className="flex items-center gap-2 text-green-600 font-bold">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between text-sm pt-4 border-t border-espresso/5">
                <span className="text-espresso/40 font-bold uppercase tracking-widest text-[10px]">
                  Auth System
                </span>
                <span className="text-espresso font-bold">JWT / Secure</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-4 border-t border-espresso/5">
                <span className="text-espresso/40 font-bold uppercase tracking-widest text-[10px]">
                  Backups
                </span>
                <span className="text-espresso font-bold italic">Configured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
