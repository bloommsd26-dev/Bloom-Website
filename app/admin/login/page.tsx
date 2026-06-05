'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AdminRole, ApiResponse } from '../types';

/**
 * Admin Login Page
 * Handles both standard authentication and initial account claiming.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  
  const [login, setLogin] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [isClaiming, setIsClaiming] = useState(false);
  const [claimData, setClaimData] = useState({ identifier: '', password: '', confirmPassword: '' });
  const [claimError, setClaimError] = useState('');
  const [isClaimingIn, setIsClaimingIn] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login),
      });
      const payload = (await response.json()) as ApiResponse<{
        admin: {
          name: string;
          role: AdminRole;
        };
      }>;

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.error || 'Invalid username or password');
      }

      window.localStorage.setItem('bloom_admin_name', payload.data.admin.name);
      window.localStorage.setItem('bloom_admin_role', payload.data.admin.role);
      
      router.push('/admin/content');
    } catch (authError) {
      setLoginError(
        authError instanceof Error ? authError.message : 'Invalid username or password'
      );
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleClaim(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setClaimError('');

    if (claimData.password !== claimData.confirmPassword) {
      setClaimError('Passwords do not match');
      return;
    }

    setIsClaimingIn(true);

    try {
      const response = await fetch('/api/admin/auth/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: claimData.identifier,
          password: claimData.password,
        }),
      });
      const payload = (await response.json()) as ApiResponse<{
        admin: {
          name: string;
          role: AdminRole;
        };
      }>;

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.error || 'Failed to claim account');
      }

      window.localStorage.setItem('bloom_admin_name', payload.data.admin.name);
      window.localStorage.setItem('bloom_admin_role', payload.data.admin.role);
      
      router.push('/admin/content');
    } catch (authError) {
      setClaimError(authError instanceof Error ? authError.message : 'Failed to claim account');
    } finally {
      setIsClaimingIn(false);
    }
  }

  return (
    <main className="min-h-screen bg-horchata/10 px-4 py-16 font-body flex items-center justify-center">
      <section className="w-full max-w-md rounded-3xl border border-espresso/10 bg-white p-10 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative w-12 h-12 mb-4">
            <Image src="/favicon.png" alt="Bloom Logo" fill className="object-contain" />
          </div>
          <h1 className="font-heading text-4xl font-black uppercase tracking-tighter text-espresso mb-2">
            Bloom
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-espresso/40">
            {isClaiming ? 'Setup Your Credentials' : 'Administrative Access'}
          </p>
        </div>

        {!isClaiming ? (
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
              >
                Email or Username
              </label>
              <input
                id="username"
                type="text"
                value={login.username}
                onChange={(event) =>
                  setLogin((current) => ({ ...current, username: event.target.value }))
                }
                className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon focus:bg-white outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={login.password}
                onChange={(event) =>
                  setLogin((current) => ({ ...current, password: event.target.value }))
                }
                className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon focus:bg-white outline-none transition-all"
                required
              />
            </div>

            {loginError && (
              <p className="rounded-2xl bg-red-50 p-4 text-center text-xs font-bold text-red-600 border border-red-100">
                {loginError}
              </p>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full rounded-full bg-espresso py-5 text-xs font-black uppercase tracking-[0.3em] text-white transition hover:bg-ink disabled:opacity-50 shadow-xl"
              >
                {isLoggingIn ? 'Verifying...' : 'Enter Dashboard'}
              </button>
              <button
                type="button"
                onClick={() => setIsClaiming(true)}
                className="w-full text-[10px] font-bold uppercase tracking-widest text-espresso/40 hover:text-cinnamon transition-colors"
              >
                New Account? Claim Here
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleClaim} className="space-y-8">
            <p className="text-xs text-espresso/60 text-center leading-relaxed italic">
              "If an admin has created your account, enter your email/username below to set your
              permanent password."
            </p>

            <div className="space-y-2">
              <label
                htmlFor="claim-id"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
              >
                Email or Username
              </label>
              <input
                id="claim-id"
                type="text"
                value={claimData.identifier}
                onChange={(event) =>
                  setClaimData((current) => ({ ...current, identifier: event.target.value }))
                }
                className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon focus:bg-white outline-none transition-all"
                placeholder="The one shared by the lead"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="claim-pass"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
              >
                Set New Password
              </label>
              <input
                id="claim-pass"
                type="password"
                value={claimData.password}
                onChange={(event) =>
                  setClaimData((current) => ({ ...current, password: event.target.value }))
                }
                className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon focus:bg-white outline-none transition-all"
                required
                min={6}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="claim-confirm"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
              >
                Confirm Password
              </label>
              <input
                id="claim-confirm"
                type="password"
                value={claimData.confirmPassword}
                onChange={(event) =>
                  setClaimData((current) => ({
                    ...current,
                    confirmPassword: event.target.value,
                  }))
                }
                className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon focus:bg-white outline-none transition-all"
                required
              />
            </div>

            {claimError && (
              <p className="rounded-2xl bg-red-50 p-4 text-center text-xs font-bold text-red-600 border border-red-100">
                {claimError}
              </p>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isClaimingIn}
                className="w-full rounded-full bg-cinnamon py-5 text-xs font-black uppercase tracking-[0.3em] text-white transition hover:bg-cinnamon/90 disabled:opacity-50 shadow-xl"
              >
                {isClaimingIn ? 'Processing...' : 'Activate Account'}
              </button>
              <button
                type="button"
                onClick={() => setIsClaiming(false)}
                className="w-full text-[10px] font-bold uppercase tracking-widest text-espresso/40 hover:text-espresso transition-colors"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
