'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { AUTH_COOKIE_NAME } from '@/lib/utils/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminRole, setAdminRole] = React.useState<string | null>(null);

  React.useEffect(() => {
    setAdminRole(window.localStorage.getItem('bloom_admin_role'));
  }, []);

  // If we are on the login page, don't show the admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navLinks = [
    { href: '/admin/content', label: 'Content', roles: ['super_admin', 'admin', 'editor'] },
    { href: '/admin/messages', label: 'Messages', roles: ['super_admin', 'admin'] },
    { href: '/admin/accounts', label: 'Admin Accounts', roles: ['super_admin'] },
  ].filter(link => !adminRole || link.roles.includes(adminRole));

  async function handleLogout() {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error('Sign out error:', e);
    }

    deleteCookie(AUTH_COOKIE_NAME);
    window.localStorage.removeItem('bloom_admin_name');
    window.localStorage.removeItem('bloom_admin_role');
    router.push('/admin/login');
  }

  return (
    <main className="min-h-screen bg-horchata/5 font-body">
      <section className="border-b border-espresso/10 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="eyebrow mb-2">Internal Dashboard</p>
            <h1 className="font-heading text-4xl font-black uppercase tracking-tighter text-espresso">
              Bloom Control
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-1 rounded-full bg-horchata/20 p-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition ${
                    pathname.startsWith(link.href)
                      ? 'bg-espresso text-white shadow-md'
                      : 'text-espresso/50 hover:text-espresso'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-6 border-l border-espresso/10 pl-6">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-espresso px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-ink"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </section>
    </main>
  );
}
