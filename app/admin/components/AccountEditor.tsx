'use client';

import React, { FormEvent } from 'react';
import { AdminAccount, AdminForm, AdminRole } from '../types';
import { rolesList, permissionsList } from '../constants';

interface AccountEditorProps {
  selectedAccount: AdminAccount | null;
  form: AdminForm;
  isSaving: boolean;
  onSave: (e: FormEvent) => void;
  onDelete: () => void;
  onClear: () => void;
  setForm: React.Dispatch<React.SetStateAction<AdminForm>>;
  notice: string;
  error: string;
}

export function AccountEditor({
  selectedAccount,
  form,
  isSaving,
  onSave,
  onDelete,
  onClear,
  setForm,
  notice,
  error,
}: AccountEditorProps) {
  return (
    <form
      onSubmit={onSave}
      className="rounded-3xl border border-espresso/10 bg-white p-8 shadow-sm flex-1"
    >
      <div className="flex flex-col gap-6 border-b border-espresso/5 pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="eyebrow mb-2">{selectedAccount ? 'Edit account' : 'New account'}</p>
          <h2 className="font-heading text-4xl font-bold text-espresso leading-tight">
            {selectedAccount ? selectedAccount.name : 'Manage admin access'}
          </h2>
        </div>
        {selectedAccount && (
          <button
            type="button"
            onClick={onDelete}
            className="rounded-full bg-red-50 px-6 py-2 text-xs font-bold uppercase tracking-widest text-red-600 transition hover:bg-red-100"
          >
            Delete Account
          </button>
        )}
      </div>

      {(notice || error) && (
        <div className="mt-8 space-y-4">
          {notice && (
            <p className="rounded-2xl bg-green-50 px-6 py-4 text-sm font-bold text-green-700 border border-green-100">
              {notice}
            </p>
          )}
          {error && (
            <p className="rounded-2xl bg-red-50 px-6 py-4 text-sm font-bold text-red-700 border border-red-100">
              {error}
            </p>
          )}
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="acc-name"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
          >
            Full Name
          </label>
          <input
            id="acc-name"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon focus:bg-white outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="acc-email"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
          >
            Email Address
          </label>
          <input
            id="acc-email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon focus:bg-white outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="acc-username"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
          >
            Username
          </label>
          <input
            id="acc-username"
            value={form.username}
            onChange={(event) =>
              setForm((current) => ({ ...current, username: event.target.value }))
            }
            className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon focus:bg-white outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="acc-password"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
          >
            Password {selectedAccount ? '(Leave blank to keep current)' : '(Optional)'}
          </label>
          <input
            id="acc-password"
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({ ...current, password: event.target.value }))
            }
            className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon focus:bg-white outline-none transition-all"
            autoComplete="new-password"
            placeholder={!selectedAccount ? 'User can set this later' : ''}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="acc-role"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
          >
            Assigned Role
          </label>
          <select
            id="acc-role"
            value={form.role}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                role: event.target.value as AdminRole,
              }))
            }
            className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon focus:bg-white outline-none transition-all appearance-none cursor-pointer"
          >
            {rolesList.map((role) => (
              <option key={role} value={role}>
                {role.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/30 ml-2">
            Granular Permissions
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {permissionsList.map((permission) => (
              <label
                key={permission}
                className="flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-horchata/20 px-6 py-4 transition-all hover:border-cinnamon/20 hover:bg-horchata/5 group"
              >
                <input
                  type="checkbox"
                  checked={form.permissions.includes(permission)}
                  onChange={() =>
                    setForm((current) => ({
                      ...current,
                      permissions: current.permissions.includes(permission)
                        ? current.permissions.filter((p) => p !== permission)
                        : [...current.permissions, permission],
                    }))
                  }
                  className="h-5 w-5 rounded-full border-horchata text-cinnamon focus:ring-cinnamon accent-cinnamon"
                />
                <span className="text-xs font-bold uppercase tracking-widest text-espresso/60 group-hover:text-espresso transition-colors">
                  {permission.replace('manage_', '').replace('_', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col-reverse gap-4 border-t border-espresso/5 pt-8 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClear}
          className="rounded-full border-2 border-espresso/10 px-8 py-3 text-xs font-bold uppercase tracking-widest text-espresso hover:bg-horchata/10 transition-all"
        >
          Clear Form
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-espresso px-12 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-ink disabled:opacity-50 shadow-lg"
        >
          {isSaving ? 'Saving...' : selectedAccount ? 'Update Account' : 'Create Account'}
        </button>
      </div>
    </form>
  );
}
