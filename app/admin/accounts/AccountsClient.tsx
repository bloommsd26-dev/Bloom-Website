'use client';

import { useMemo, useState } from 'react';
import { AdminAccount, AdminForm, ApiResponse } from '../types';
import { emptyAccountForm } from '../constants';
import { AccountSidebar } from '../components/AccountSidebar';
import { AccountEditor } from '../components/AccountEditor';
import { deleteAccountAction } from '@/lib/actions/admin';

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

  return (
    <div className="editorial-grid items-start">
      <AccountSidebar
        accounts={accounts}
        selectedAccountId={selectedAccountId}
        isLoading={false}
        onSelect={editAccount}
        onNew={startNewAccount}
      />
      <div className="lg:col-span-7 lg:col-start-6">
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
  );
}
