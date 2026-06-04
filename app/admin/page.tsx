'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

type BlogStatus = 'draft' | 'published';
type AdminRole = 'super_admin' | 'admin' | 'editor' | 'viewer';

type AdminAccount = {
  _id: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: string[];
  createdAt?: string;
};

type AdminForm = {
  name: string;
  email: string;
  password?: string;
  role: AdminRole;
  permissions: string[];
};

type BlogPost = {
  // ... rest of types ...
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  tags: string[];
  category: string;
  seoTitle?: string;
  seoDescription?: string;
  status: BlogStatus;
  readingTime?: number;
  updatedAt?: string;
};

type BlogForm = {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  status: BlogStatus;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

const emptyForm: BlogForm = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  author: 'Bloom Team',
  tags: '',
  category: 'updates',
  seoTitle: '',
  seoDescription: '',
  status: 'draft',
};

const categories = ['updates', 'education', 'mentorship', 'inspiration', 'impact', 'volunteering'];

const emptyAccountForm: AdminForm = {
  name: '',
  email: '',
  password: '',
  role: 'viewer',
  permissions: [],
};

const permissionsList = [
  'manage_blogs',
  'manage_programs',
  'manage_donations',
  'manage_volunteers',
  'manage_impact',
  'manage_admins',
  'manage_settings',
];

const rolesList: AdminRole[] = ['super_admin', 'admin', 'editor', 'viewer'];

function inputClassName(extra = '') {
  return `w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 ${extra}`;
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminRole, setAdminRole] = useState<AdminRole | ''>('');
  const [activeTab, setActiveTab] = useState<'blogs' | 'accounts'>('blogs');
  const [login, setLogin] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [statusFilter, setStatusFilter] = useState<'all' | BlogStatus>('all');
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);

  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [accountForm, setAccountForm] = useState<AdminForm>(emptyAccountForm);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const selectedBlog = useMemo(
    () => blogs.find((blog) => blog._id === selectedBlogId) || null,
    [blogs, selectedBlogId]
  );

  const selectedAccount = useMemo(
    () => accounts.find((acc) => acc._id === selectedAccountId) || null,
    [accounts, selectedAccountId]
  );

  const filteredBlogs = useMemo(() => {
    if (statusFilter === 'all') return blogs;
    return blogs.filter((blog) => blog.status === statusFilter);
  }, [blogs, statusFilter]);

  useEffect(() => {
    const storedToken = window.localStorage.getItem('bloom_admin_token');
    const storedName = window.localStorage.getItem('bloom_admin_name');
    const storedRole = window.localStorage.getItem('bloom_admin_role') as AdminRole | null;

    if (storedToken) {
      setToken(storedToken);
      setAdminName(storedName || 'Bloom Admin');
      setAdminRole(storedRole || 'admin');
    }
  }, []);

  const loadBlogs = useCallback(
    async (authToken = token) => {
      setIsLoadingBlogs(true);
      setError('');

      try {
        const response = await fetch('/api/admin/blogs?status=all&limit=100', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const payload = (await response.json()) as ApiResponse<{
          blogs: BlogPost[];
        }>;

        if (!response.ok || !payload.success || !payload.data) {
          throw new Error(payload.error || 'Unable to load CMS posts');
        }

        setBlogs(payload.data.blogs);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load CMS posts');
      } finally {
        setIsLoadingBlogs(false);
      }
    },
    [token]
  );

  const loadAccounts = useCallback(
    async (authToken = token) => {
      if (adminRole !== 'super_admin') return;

      setIsLoadingAccounts(true);
      setError('');

      try {
        const response = await fetch('/api/admin/accounts', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const payload = (await response.json()) as ApiResponse<AdminAccount[]>;

        if (!response.ok || !payload.success || !payload.data) {
          throw new Error(payload.error || 'Unable to load admin accounts');
        }

        setAccounts(payload.data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load admin accounts');
      } finally {
        setIsLoadingAccounts(false);
      }
    },
    [token, adminRole]
  );

  useEffect(() => {
    if (token) {
      void loadBlogs(token);
      if (adminRole === 'super_admin') {
        void loadAccounts(token);
      }
    }
  }, [loadBlogs, loadAccounts, token, adminRole]);

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
        token: string;
        admin: {
          name: string;
          role: AdminRole;
        };
      }>;

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.error || 'Invalid username or password');
      }

      window.localStorage.setItem('bloom_admin_token', payload.data.token);
      window.localStorage.setItem('bloom_admin_name', payload.data.admin.name);
      window.localStorage.setItem('bloom_admin_role', payload.data.admin.role);
      setToken(payload.data.token);
      setAdminName(payload.data.admin.name);
      setAdminRole(payload.data.admin.role);
      setLogin({ username: '', password: '' });
    } catch (authError) {
      setLoginError(
        authError instanceof Error ? authError.message : 'Invalid username or password'
      );
    } finally {
      setIsLoggingIn(false);
    }
  }

  function startNewPost() {
    setSelectedBlogId(null);
    setForm(emptyForm);
    setNotice('');
    setError('');
  }

  function editPost(blog: BlogPost) {
    setSelectedBlogId(blog._id);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      coverImage: blog.coverImage || '',
      author: blog.author,
      tags: blog.tags.join(', '),
      category: blog.category,
      seoTitle: blog.seoTitle || '',
      seoDescription: blog.seoDescription || '',
      status: blog.status,
    });
    setNotice('');
    setError('');
  }

  function startNewAccount() {
    setSelectedAccountId(null);
    setAccountForm(emptyAccountForm);
    setNotice('');
    setError('');
  }

  function editAccount(acc: AdminAccount) {
    setSelectedAccountId(acc._id);
    setAccountForm({
      name: acc.name,
      email: acc.email,
      password: '',
      role: acc.role,
      permissions: acc.permissions,
    });
    setNotice('');
    setError('');
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setNotice('');
    setError('');

    const body = {
      ...form,
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      const response = await fetch(
        selectedBlogId ? `/api/admin/blogs/${selectedBlogId}` : '/api/admin/blogs',
        {
          method: selectedBlogId ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      const payload = (await response.json()) as ApiResponse<unknown>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Unable to save post');
      }

      setNotice(selectedBlogId ? 'Post updated.' : 'Post created.');
      await loadBlogs();
      if (!selectedBlogId) {
        setForm(emptyForm);
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save post');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleAccountSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setNotice('');
    setError('');

    const body = { ...accountForm };
    if (!selectedAccountId && !body.password) {
      setError('Password is required for new accounts');
      setIsSaving(false);
      return;
    }
    if (!body.password) delete body.password;

    try {
      const response = await fetch(
        selectedAccountId ? `/api/admin/accounts/${selectedAccountId}` : '/api/admin/accounts',
        {
          method: selectedAccountId ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
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
        setAccountForm(emptyAccountForm);
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save account');
    } finally {
      setIsSaving(false);
    }
  }

  async function deletePost() {
    if (!selectedBlogId || !window.confirm('Delete this post permanently?')) return;

    setError('');
    setNotice('');

    try {
      const response = await fetch(`/api/admin/blogs/${selectedBlogId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const payload = (await response.json()) as ApiResponse<unknown>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Unable to delete post');
      }

      setNotice('Post deleted.');
      startNewPost();
      await loadBlogs();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete post');
    }
  }

  async function deleteAccount() {
    if (!selectedAccountId || !window.confirm('Delete this admin account permanently?')) return;

    setError('');
    setNotice('');

    try {
      const response = await fetch(`/api/admin/accounts/${selectedAccountId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const payload = (await response.json()) as ApiResponse<unknown>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Unable to delete account');
      }

      setNotice('Account deleted.');
      startNewAccount();
      await loadAccounts();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete account');
    }
  }

  function logout() {
    window.localStorage.removeItem('bloom_admin_token');
    window.localStorage.removeItem('bloom_admin_name');
    window.localStorage.removeItem('bloom_admin_role');
    setToken('');
    setAdminName('');
    setAdminRole('');
    setBlogs([]);
    setAccounts([]);
    setActiveTab('blogs');
    startNewPost();
    startNewAccount();
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-neutral-50 px-4 py-16">
        <section className="mx-auto max-w-md rounded-lg border border-neutral-200 bg-white p-8 shadow-lg">
          <p className="eyebrow mb-3">Bloom CMS</p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-neutral-900">
            Admin sign in
          </h1>
          <p className="mt-4 text-neutral-600">
            Use the admin username and password configured in the environment.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-neutral-700">
                Username or email
              </label>
              <input
                id="username"
                name="username"
                value={login.username}
                onChange={(event) =>
                  setLogin((current) => ({ ...current, username: event.target.value }))
                }
                className={inputClassName()}
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-neutral-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={login.password}
                onChange={(event) =>
                  setLogin((current) => ({ ...current, password: event.target.value }))
                }
                className={inputClassName()}
                autoComplete="current-password"
                required
              />
            </div>

            {loginError && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full rounded-lg bg-primary-600 px-5 py-3 font-body text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingIn ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="eyebrow mb-2">Bloom CMS</p>
            <h1 className="font-heading text-4xl font-bold leading-tight text-neutral-900">
              Content admin
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('blogs')}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${
                  activeTab === 'blogs'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Content
              </button>
              {adminRole === 'super_admin' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('accounts')}
                  className={`rounded-md px-4 py-1.5 text-sm font-semibold transition ${
                    activeTab === 'accounts'
                      ? 'bg-white text-neutral-900 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  Admin Accounts
                </button>
              )}
            </div>
            <div className="flex items-center gap-3 border-l border-neutral-200 pl-6">
              <p className="text-sm text-neutral-600">Signed in as {adminName}</p>
              <button
                type="button"
                onClick={() => (activeTab === 'blogs' ? void loadBlogs() : void loadAccounts())}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 transition hover:border-primary-600 hover:text-primary-600"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="rounded-lg border border-neutral-200 bg-white p-5">
          {activeTab === 'blogs' ? (
            <>
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-heading text-xl font-semibold text-neutral-900">Posts</h2>
                <button
                  type="button"
                  onClick={startNewPost}
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
                >
                  New
                </button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {(['all', 'published', 'draft'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-lg border px-3 py-2 text-sm font-semibold capitalize transition ${
                      statusFilter === status
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                {isLoadingBlogs &&
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="rounded-lg border border-neutral-200 p-4 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  ))}
                {!isLoadingBlogs && filteredBlogs.length === 0 && (
                  <p className="text-sm text-neutral-500">No posts in this view.</p>
                )}
                {filteredBlogs.map((blog) => (
                  <button
                    key={blog._id}
                    type="button"
                    onClick={() => editPost(blog)}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      selectedBlogId === blog._id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-200 bg-white hover:border-primary-200'
                    }`}
                  >
                    <span className="block font-heading text-base font-semibold text-neutral-900">
                      {blog.title}
                    </span>
                    <span className="mt-2 flex items-center justify-between gap-3 text-xs text-neutral-500">
                      <span className="capitalize">{blog.status}</span>
                      <span>{blog.readingTime || 1} min read</span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-heading text-xl font-semibold text-neutral-900">Admins</h2>
                <button
                  type="button"
                  onClick={startNewAccount}
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700"
                >
                  New
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {isLoadingAccounts &&
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="rounded-lg border border-neutral-200 p-4 space-y-2">
                      <Skeleton className="h-5 w-1/2" />
                      <div className="flex justify-between">
                        <Skeleton className="h-3 w-1/3" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  ))}
                {!isLoadingAccounts && accounts.length === 0 && (
                  <p className="text-sm text-neutral-500">No admin accounts found.</p>
                )}
                {accounts.map((acc) => (
                  <button
                    key={acc._id}
                    type="button"
                    onClick={() => editAccount(acc)}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      selectedAccountId === acc._id
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-200 bg-white hover:border-primary-200'
                    }`}
                  >
                    <span className="block font-heading text-base font-semibold text-neutral-900">
                      {acc.name}
                    </span>
                    <span className="mt-2 flex items-center justify-between gap-3 text-xs text-neutral-500">
                      <span>{acc.email}</span>
                      <span className="capitalize">{acc.role.replace('_', ' ')}</span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </aside>

        {activeTab === 'blogs' ? (
          <form onSubmit={handleSave} className="rounded-lg border border-neutral-200 bg-white p-6">
            <div className="flex flex-col gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow mb-2">{selectedBlog ? 'Edit post' : 'New post'}</p>
                <h2 className="font-heading text-3xl font-bold text-neutral-900">
                  {selectedBlog ? selectedBlog.title : 'Create CMS content'}
                </h2>
              </div>
              {selectedBlog && (
                <button
                  type="button"
                  onClick={() => void deletePost()}
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Delete
                </button>
              )}
            </div>

            {(notice || error) && (
              <div className="mt-5 space-y-3">
                {notice && (
                  <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                    {notice}
                  </p>
                )}
                {error && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                    {error}
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-neutral-700">
                  Title
                </label>
                <input
                  id="title"
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, title: event.target.value }))
                  }
                  className={inputClassName('text-base font-semibold')}
                  required
                />
              </div>

              <div>
                <label htmlFor="author" className="mb-2 block text-sm font-medium text-neutral-700">
                  Author
                </label>
                <input
                  id="author"
                  value={form.author}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, author: event.target.value }))
                  }
                  className={inputClassName()}
                  required
                />
              </div>

              <div>
                <label htmlFor="status" className="mb-2 block text-sm font-medium text-neutral-700">
                  Status
                </label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, status: event.target.value as BlogStatus }))
                  }
                  className={inputClassName()}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, category: event.target.value }))
                  }
                  className={inputClassName()}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="mb-2 block text-sm font-medium text-neutral-700">
                  Tags
                </label>
                <input
                  id="tags"
                  value={form.tags}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, tags: event.target.value }))
                  }
                  className={inputClassName()}
                  placeholder="education, field notes"
                />
              </div>

              <div className="lg:col-span-2">
                <label
                  htmlFor="excerpt"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, excerpt: event.target.value }))
                  }
                  className={inputClassName('min-h-24 resize-y')}
                  maxLength={300}
                  required
                />
              </div>

              <div className="lg:col-span-2">
                <label
                  htmlFor="content"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={form.content}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, content: event.target.value }))
                  }
                  className={inputClassName('min-h-72 resize-y font-mono leading-relaxed')}
                  required
                />
              </div>

              <div className="lg:col-span-2">
                <label
                  htmlFor="coverImage"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Cover image URL
                </label>
                <input
                  id="coverImage"
                  value={form.coverImage}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, coverImage: event.target.value }))
                  }
                  className={inputClassName()}
                />
              </div>

              <div>
                <label
                  htmlFor="seoTitle"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  SEO title
                </label>
                <input
                  id="seoTitle"
                  value={form.seoTitle}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, seoTitle: event.target.value }))
                  }
                  className={inputClassName()}
                  maxLength={60}
                />
              </div>

              <div>
                <label
                  htmlFor="seoDescription"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  SEO description
                </label>
                <input
                  id="seoDescription"
                  value={form.seoDescription}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, seoDescription: event.target.value }))
                  }
                  className={inputClassName()}
                  maxLength={160}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={startNewPost}
                className="rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-primary-600 hover:text-primary-600"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? 'Saving...' : selectedBlog ? 'Save changes' : 'Create post'}
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleAccountSave}
            className="rounded-lg border border-neutral-200 bg-white p-6"
          >
            <div className="flex flex-col gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow mb-2">{selectedAccount ? 'Edit account' : 'New account'}</p>
                <h2 className="font-heading text-3xl font-bold text-neutral-900">
                  {selectedAccount ? selectedAccount.name : 'Manage admin access'}
                </h2>
              </div>
              {selectedAccount && (
                <button
                  type="button"
                  onClick={() => void deleteAccount()}
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Delete
                </button>
              )}
            </div>

            {(notice || error) && (
              <div className="mt-5 space-y-3">
                {notice && (
                  <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
                    {notice}
                  </p>
                )}
                {error && (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                    {error}
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div>
                <label
                  htmlFor="acc-name"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Full Name
                </label>
                <input
                  id="acc-name"
                  value={accountForm.name}
                  onChange={(event) =>
                    setAccountForm((current) => ({ ...current, name: event.target.value }))
                  }
                  className={inputClassName()}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="acc-email"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Email Address
                </label>
                <input
                  id="acc-email"
                  type="email"
                  value={accountForm.email}
                  onChange={(event) =>
                    setAccountForm((current) => ({ ...current, email: event.target.value }))
                  }
                  className={inputClassName()}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="acc-password"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Password {selectedAccount && '(Leave blank to keep current)'}
                </label>
                <input
                  id="acc-password"
                  type="password"
                  value={accountForm.password}
                  onChange={(event) =>
                    setAccountForm((current) => ({ ...current, password: event.target.value }))
                  }
                  className={inputClassName()}
                  required={!selectedAccount}
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label
                  htmlFor="acc-role"
                  className="mb-2 block text-sm font-medium text-neutral-700"
                >
                  Role
                </label>
                <select
                  id="acc-role"
                  value={accountForm.role}
                  onChange={(event) =>
                    setAccountForm((current) => ({
                      ...current,
                      role: event.target.value as AdminRole,
                    }))
                  }
                  className={inputClassName()}
                >
                  {rolesList.map((role) => (
                    <option key={role} value={role}>
                      {role.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="mb-3 block text-sm font-medium text-neutral-700">
                  Permissions
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {permissionsList.map((permission) => (
                    <label
                      key={permission}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-neutral-200 px-4 py-3 transition hover:border-primary-200 hover:bg-neutral-50"
                    >
                      <input
                        type="checkbox"
                        checked={accountForm.permissions.includes(permission)}
                        onChange={() =>
                          setAccountForm((current) => ({
                            ...current,
                            permissions: current.permissions.includes(permission)
                              ? current.permissions.filter((p) => p !== permission)
                              : [...current.permissions, permission],
                          }))
                        }
                        className="h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-600"
                      />
                      <span className="text-sm text-neutral-700">
                        {permission.replace('manage_', '').replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={startNewAccount}
                className="rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-800 transition hover:border-primary-600 hover:text-primary-600"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? 'Saving...' : selectedAccount ? 'Update account' : 'Create account'}
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
