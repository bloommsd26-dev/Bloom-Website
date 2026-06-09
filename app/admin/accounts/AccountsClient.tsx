'use client';

import { useMemo, useState } from 'react';
import { AdminAccount, AdminForm, ApiResponse } from '../types';
import { emptyAccountForm } from '../constants';
import { AccountEditor } from '../components/AccountEditor';
import { deleteAccountAction } from '@/lib/actions/admin';
import { DataTable } from '../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';

interface AccountsClientProps {
  initialAccounts: AdminAccount[];
}

export default function AccountsClient({ initialAccounts }: AccountsClientProps) {
  const [accounts, setAccounts] = useState<AdminAccount[]>(initialAccounts);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [form, setForm] = useState<AdminForm>(emptyAccountForm);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const selectedAccount = useMemo(
    () => accounts.find((acc) => acc._id === selectedAccountId) || null,
    [accounts, selectedAccountId]
  );

  async function loadAccounts() {
    try {
      const response = await fetch('/api/admin/accounts');
      const payload = (await response.json()) as ApiResponse<AdminAccount[]>;
      if (payload.success && payload.data) {
        setAccounts(payload.data);
      }
    } catch (e) {
      console.error('Failed to refresh accounts');
    }
  }

  function startNewAccount() {
    setSelectedAccountId(null);
    setForm(emptyAccountForm);
    setNotice('');
    setError('');
  }

  function editAccount(acc: AdminAccount) {
    setSelectedAccountId(acc._id);
    setForm({
      name: acc.name,
      email: acc.email,
      username: acc.username,
      password: '',
      role: acc.role,
    });
    setNotice('');
    setError('');
  }

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    setIsSaving(true);
    setNotice('');
    setError('');

    const body = { ...form };
    if (!body.password) delete body.password;

    try {
      const response = await fetch(
        selectedAccountId ? `/api/admin/accounts/${selectedAccountId}` : '/api/admin/accounts',
        {
          method: selectedAccountId ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const payload = (await response.json()) as ApiResponse<unknown>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Unable to save account');
      }

      setNotice(selectedAccountId ? 'Account updated.' : 'Account created.');
      await loadAccounts();
      if (!selectedAccountId) {
        setForm(emptyAccountForm);
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save account');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedAccountId || !window.confirm('Delete this admin account permanently?')) return;
    setIsSaving(true);

    try {
      await deleteAccountAction(selectedAccountId);
      setAccounts((prev) => prev.filter((acc) => acc._id !== selectedAccountId));
      setNotice('Account deleted.');
      startNewAccount();
    } catch (err) {
      setError('Failed to delete account.');
    } finally {
      setIsSaving(false);
    }
  }

  const columns: ColumnDef<AdminAccount>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <span className="font-bold">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'username',
      header: 'Username',
      cell: ({ row }) => <span className="text-espresso/60">@{row.getValue('username')}</span>,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <span className="px-3 py-1 rounded-full bg-horchata/20 text-espresso/40 text-[10px] font-black uppercase tracking-widest">
          {row.getValue('role')}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-espresso">
            Team Management
          </h2>
          <p className="text-xs text-espresso/40 mt-1 uppercase font-bold tracking-widest">
            Control access and roles
          </p>
        </div>
        <button
          onClick={startNewAccount}
          className="rounded-full bg-espresso text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest transition hover:bg-ink shadow-lg active:scale-[0.98]"
        >
          Invite New Admin
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <DataTable
            columns={columns}
            data={accounts}
            onRowClick={editAccount}
            selectedRowId={selectedAccountId || undefined}
          />
        </div>
        <div className="lg:col-span-5 sticky top-32">
          <AccountEditor
            selectedAccount={selectedAccount}
            form={form}
            isSaving={isSaving}
            onSave={handleSave}
            onDelete={handleDelete}
            onClear={startNewAccount}
            setForm={setForm}
            notice={notice}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
