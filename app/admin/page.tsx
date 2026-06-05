'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

type BlogStatus = 'draft' | 'published';
type AdminRole = 'super_admin' | 'admin' | 'editor' | 'viewer';

type AdminAccount = {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: AdminRole;
  permissions: string[];
  createdAt?: string;
};

type AdminForm = {
  name: string;
  email: string;
  username: string;
  password?: string;
  role: AdminRole;
  permissions: string[];
};

type MessageStatus = 'new' | 'read' | 'replied' | 'archived';

type Message = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
};

type BlogPost = {
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

const emptyAccountForm: AdminForm = {
  name: '',
  email: '',
  username: '',
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

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminRole, setAdminRole] = useState<AdminRole | ''>('');
  const [activeTab, setActiveTab] = useState<'blogs' | 'accounts' | 'messages'>('blogs');
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

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [messageStatusFilter, setMessageStatusFilter] = useState<'all' | MessageStatus>('all');
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

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

  const selectedMessage = useMemo(
    () => messages.find((msg) => msg._id === selectedMessageId) || null,
    [messages, selectedMessageId]
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

  const loadMessages = useCallback(
    async (authToken = token, status = messageStatusFilter) => {
      setIsLoadingMessages(true);
      setError('');

      try {
        const url = `/api/admin/messages?status=${status}&limit=100`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const payload = (await response.json()) as ApiResponse<{
          messages: Message[];
        }>;

        if (!response.ok || !payload.success || !payload.data) {
          throw new Error(payload.error || 'Unable to load messages');
        }

        setMessages(payload.data.messages);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load messages');
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [token, messageStatusFilter]
  );

  useEffect(() => {
    if (token) {
      void loadBlogs(token);
      if (adminRole === 'super_admin') {
        void loadAccounts(token);
      }
      void loadMessages(token);
    }
  }, [loadBlogs, loadAccounts, loadMessages, token, adminRole]);

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
      username: acc.username || '',
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

  async function updateMessageStatus(id: string, status: MessageStatus) {
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const payload = (await response.json()) as ApiResponse<unknown>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Unable to update message');
      }

      setNotice('Message updated.');
      await loadMessages();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to update message');
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteMessage() {
    if (!selectedMessageId || !window.confirm('Delete this message permanently?')) return;

    setError('');
    setNotice('');

    try {
      const response = await fetch(`/api/admin/messages/${selectedMessageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const payload = (await response.json()) as ApiResponse<unknown>;

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || 'Unable to delete message');
      }

      setNotice('Message deleted.');
      setSelectedMessageId(null);
      await loadMessages();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete message');
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
    setMessages([]);
    setActiveTab('blogs');
    startNewPost();
    startNewAccount();
    setSelectedMessageId(null);
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-horchata/10 px-4 py-16 font-body">
        <section className="mx-auto max-w-md rounded-3xl border border-espresso/10 bg-white p-10 shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="font-heading text-4xl font-black uppercase tracking-tighter text-espresso mb-2">
              Bloom
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-espresso/40">
              Administrative Access
            </p>
          </div>

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

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full rounded-full bg-espresso py-5 text-xs font-black uppercase tracking-[0.3em] text-white transition hover:bg-ink disabled:opacity-50 shadow-xl"
            >
              {isLoggingIn ? 'Verifying...' : 'Enter Dashboard'}
            </button>
          </form>
        </section>
      </main>
    );
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
              <button
                type="button"
                onClick={() => setActiveTab('blogs')}
                className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition ${
                  activeTab === 'blogs'
                    ? 'bg-espresso text-white shadow-md'
                    : 'text-espresso/50 hover:text-espresso'
                }`}
              >
                Content
              </button>
              {(adminRole === 'super_admin' || adminRole === 'admin') && (
                <button
                  type="button"
                  onClick={() => setActiveTab('messages')}
                  className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition ${
                    activeTab === 'messages'
                      ? 'bg-espresso text-white shadow-md'
                      : 'text-espresso/50 hover:text-espresso'
                  }`}
                >
                  Messages
                </button>
              )}
              {adminRole === 'super_admin' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('accounts')}
                  className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition ${
                    activeTab === 'accounts'
                      ? 'bg-espresso text-white shadow-md'
                      : 'text-espresso/50 hover:text-espresso'
                  }`}
                >
                  Admin Accounts
                </button>
              )}
            </div>
            <div className="flex items-center gap-6 border-l border-espresso/10 pl-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-espresso/40">
                {adminName}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (activeTab === 'blogs') void loadBlogs();
                  else if (activeTab === 'accounts') void loadAccounts();
                  else void loadMessages();
                }}
                className="text-[10px] font-bold uppercase tracking-widest text-espresso hover:text-cinnamon transition-colors"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-espresso px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-ink"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="rounded-3xl border border-espresso/10 bg-white p-6 shadow-sm h-fit sticky top-32">
          {activeTab === 'blogs' ? (
            <>
              <div className="flex items-center justify-between gap-4 mb-8">
                <h2 className="font-heading text-xl font-black uppercase tracking-tighter text-espresso">
                  Posts
                </h2>
                <button
                  type="button"
                  onClick={startNewPost}
                  className="rounded-full bg-cinnamon px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-cinnamon/90"
                >
                  New
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {(['all', 'published', 'draft'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition ${
                      statusFilter === status
                        ? 'border-cinnamon bg-cinnamon text-white'
                        : 'border-espresso/10 bg-white text-espresso/40 hover:border-espresso/20'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {isLoadingBlogs &&
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="rounded-2xl border border-espresso/5 p-4 space-y-3">
                      <Skeleton className="h-4 w-3/4 rounded-full" />
                      <div className="flex justify-between">
                        <Skeleton className="h-2 w-12 rounded-full" />
                        <Skeleton className="h-2 w-12 rounded-full" />
                      </div>
                    </div>
                  ))}
                {!isLoadingBlogs && filteredBlogs.length === 0 && (
                  <p className="text-xs font-bold uppercase tracking-widest text-espresso/20 py-10 text-center">
                    No posts found.
                  </p>
                )}
                {filteredBlogs.map((blog) => (
                  <button
                    key={blog._id}
                    type="button"
                    onClick={() => editPost(blog)}
                    className={`w-full rounded-2xl border p-5 text-left transition-all ${
                      selectedBlogId === blog._id
                        ? 'border-cinnamon bg-horchata/10 ring-1 ring-cinnamon'
                        : 'border-espresso/5 bg-white hover:border-espresso/20 hover:shadow-md'
                    }`}
                  >
                    <span className="block font-heading text-base font-bold text-espresso leading-tight mb-2">
                      {blog.title}
                    </span>
                    <span className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-espresso/40">
                      <span className={blog.status === 'published' ? 'text-green-600' : ''}>
                        {blog.status}
                      </span>
                      <span>{blog.readingTime || 1} min</span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : activeTab === 'messages' ? (
            <>
              <div className="flex items-center justify-between gap-4 mb-8">
                <h2 className="font-heading text-xl font-black uppercase tracking-tighter text-espresso">
                  Messages
                </h2>
              </div>

              <div className="grid grid-cols-4 gap-1 mb-6">
                {(['all', 'new', 'read', 'replied'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setMessageStatusFilter(status as any);
                      void loadMessages(token, status as any);
                    }}
                    className={`rounded-full border py-2 text-[8px] font-black uppercase tracking-widest transition ${
                      messageStatusFilter === status
                        ? 'border-cinnamon bg-cinnamon text-white'
                        : 'border-espresso/10 bg-white text-espresso/40 hover:border-espresso/20'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {isLoadingMessages &&
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="rounded-2xl border border-espresso/5 p-4 space-y-3">
                      <Skeleton className="h-4 w-1/2 rounded-full" />
                      <Skeleton className="h-2 w-3/4 rounded-full" />
                    </div>
                  ))}
                {!isLoadingMessages && messages.length === 0 && (
                  <p className="text-xs font-bold uppercase tracking-widest text-espresso/20 py-10 text-center">
                    No messages.
                  </p>
                )}
                {messages.map((msg) => (
                  <button
                    key={msg._id}
                    type="button"
                    onClick={() => {
                      setSelectedMessageId(msg._id);
                      if (msg.status === 'new') void updateMessageStatus(msg._id, 'read');
                    }}
                    className={`w-full rounded-2xl border p-5 text-left transition-all ${
                      selectedMessageId === msg._id
                        ? 'border-cinnamon bg-horchata/10 ring-1 ring-cinnamon'
                        : 'border-espresso/5 bg-white hover:border-espresso/20 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="block font-heading text-sm font-bold text-espresso leading-tight line-clamp-1">
                        {msg.name}
                      </span>
                      {msg.status === 'new' && (
                        <span className="w-2 h-2 bg-cinnamon rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-espresso/60 line-clamp-1 mb-3">{msg.subject}</p>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-espresso/30">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between gap-4 mb-8">
                <h2 className="font-heading text-xl font-black uppercase tracking-tighter text-espresso">
                  Admins
                </h2>
                <button
                  type="button"
                  onClick={startNewAccount}
                  className="rounded-full bg-cinnamon px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-cinnamon/90"
                >
                  New
                </button>
              </div>

              <div className="space-y-3">
                {isLoadingAccounts &&
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="rounded-2xl border border-espresso/5 p-4 space-y-3">
                      <Skeleton className="h-4 w-1/2 rounded-full" />
                      <div className="flex justify-between">
                        <Skeleton className="h-2 w-20 rounded-full" />
                        <Skeleton className="h-2 w-10 rounded-full" />
                      </div>
                    </div>
                  ))}
                {!isLoadingAccounts && accounts.length === 0 && (
                  <p className="text-xs font-bold uppercase tracking-widest text-espresso/20 py-10 text-center">
                    No accounts found.
                  </p>
                )}
                {accounts.map((acc) => (
                  <button
                    key={acc._id}
                    type="button"
                    onClick={() => editAccount(acc)}
                    className={`w-full rounded-2xl border p-5 text-left transition-all ${
                      selectedAccountId === acc._id
                        ? 'border-cinnamon bg-horchata/10 ring-1 ring-cinnamon'
                        : 'border-espresso/5 bg-white hover:border-espresso/20 hover:shadow-md'
                    }`}
                  >
                    <span className="block font-heading text-base font-bold text-espresso mb-2">
                      {acc.name}
                    </span>
                    <span className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-espresso/40">
                      <span>{acc.email}</span>
                      <span className="text-cinnamon">{acc.role.replace('_', ' ')}</span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </aside>

        {activeTab === 'blogs' ? (
          <form
            onSubmit={handleSave}
            className="rounded-3xl border border-espresso/10 bg-white p-8 shadow-sm"
          >
            <div className="flex flex-col gap-6 border-b border-espresso/5 pb-8 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow mb-2">{selectedBlog ? 'Edit post' : 'New post'}</p>
                <h2 className="font-heading text-4xl font-bold text-espresso leading-tight">
                  {selectedBlog ? selectedBlog.title : 'Create CMS content'}
                </h2>
              </div>
              {selectedBlog && (
                <button
                  type="button"
                  onClick={() => void deletePost()}
                  className="rounded-full bg-red-50 px-6 py-2 text-xs font-bold uppercase tracking-widest text-red-600 transition hover:bg-red-100"
                >
                  Delete Post
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
              <div className="lg:col-span-2 space-y-2">
                <label
                  htmlFor="title"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
                >
                  Post Title
                </label>
                <input
                  id="title"
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, title: event.target.value }))
                  }
                  className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-lg font-bold text-espresso focus:border-cinnamon focus:bg-white outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="author"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
                >
                  Author
                </label>
                <input
                  id="author"
                  value={form.author}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, author: event.target.value }))
                  }
                  className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
                >
                  Publication Status
                </label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, status: event.target.value as BlogStatus }))
                  }
                  className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="lg:col-span-2 space-y-2">
                <label
                  htmlFor="content"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
                >
                  Post Content
                </label>
                <RichTextEditor
                  content={form.content}
                  onChange={(html) => setForm((current) => ({ ...current, content: html }))}
                />
              </div>
            </div>

            <div className="mt-12 flex flex-col-reverse gap-4 border-t border-espresso/5 pt-8 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={startNewPost}
                className="rounded-full border-2 border-espresso/10 px-8 py-3 text-xs font-bold uppercase tracking-widest text-espresso hover:bg-horchata/10 transition-all"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-full bg-espresso px-12 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-ink disabled:opacity-50 shadow-lg hover:shadow-xl active:translate-y-0.5"
              >
                {isSaving ? 'Saving...' : selectedBlog ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </form>
        ) : activeTab === 'messages' ? (
          <div className="rounded-3xl border border-espresso/10 bg-white p-8 shadow-sm h-full min-h-[600px] flex flex-col">
            {selectedMessage ? (
              <>
                <div className="flex flex-col gap-6 border-b border-espresso/5 pb-8 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="eyebrow mb-2">Message from {selectedMessage.name}</p>
                    <h2 className="font-heading text-4xl font-bold text-espresso leading-tight">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex gap-4 mt-4 text-xs font-bold uppercase tracking-widest text-espresso/40">
                      <span>{selectedMessage.email}</span>
                      <span>•</span>
                      <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => void deleteMessage()}
                      className="rounded-full bg-red-50 px-6 py-2 text-xs font-bold uppercase tracking-widest text-red-600 transition hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="flex-1 py-10">
                  <div className="field-note bg-horchata/5 border-horchata/30 mb-10">
                    <p className="text-xl text-espresso/80 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/30">
                      Quick Actions
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                        onClick={() => void updateMessageStatus(selectedMessage._id, 'replied')}
                        className="rounded-full bg-cinnamon px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-cinnamon/90 shadow-md"
                      >
                        Reply via Email
                      </a>
                      {selectedMessage.status !== 'archived' && (
                        <button
                          onClick={() => void updateMessageStatus(selectedMessage._id, 'archived')}
                          className="rounded-full border-2 border-espresso/10 px-8 py-3 text-xs font-bold uppercase tracking-widest text-espresso hover:bg-horchata/10 transition-all"
                        >
                          Archive
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-horchata/20 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">✉️</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-espresso mb-2">
                  No message selected
                </h3>
                <p className="text-espresso/40 max-w-xs">
                  Select an inquiry from the sidebar to view details and take action.
                </p>
              </div>
            )}
          </div>
        ) : (
          <form
            onSubmit={handleAccountSave}
            className="rounded-3xl border border-espresso/10 bg-white p-8 shadow-sm"
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
                  onClick={() => void deleteAccount()}
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
                  value={accountForm.name}
                  onChange={(event) =>
                    setAccountForm((current) => ({ ...current, name: event.target.value }))
                  }
                  className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all"
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
                  value={accountForm.email}
                  onChange={(event) =>
                    setAccountForm((current) => ({ ...current, email: event.target.value }))
                  }
                  className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all"
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
                  value={accountForm.username}
                  onChange={(event) =>
                    setAccountForm((current) => ({ ...current, username: event.target.value }))
                  }
                  className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="acc-password"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
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
                  className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all"
                  required={!selectedAccount}
                  autoComplete="new-password"
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
                  value={accountForm.role}
                  onChange={(event) =>
                    setAccountForm((current) => ({
                      ...current,
                      role: event.target.value as AdminRole,
                    }))
                  }
                  className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all appearance-none cursor-pointer"
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
                        checked={accountForm.permissions.includes(permission)}
                        onChange={() =>
                          setAccountForm((current) => ({
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
                onClick={startNewAccount}
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
        )}
      </section>
    </main>
  );
}
