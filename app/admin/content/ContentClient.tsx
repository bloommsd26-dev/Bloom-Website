'use client';

import { FormEvent, useCallback, useMemo, useState } from 'react';
import { BlogPost, BlogStatus, BlogForm, ApiResponse } from '../types';
import { emptyForm } from '../constants';
import { BlogEditor } from '../components/BlogEditor';
import { deleteBlogAction } from '@/lib/actions/admin';
import { DataTable } from '../components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { BLOG_STATUSES } from '@/lib/constants';

interface ContentClientProps {
  initialBlogs: BlogPost[];
}

export default function ContentClient({ initialBlogs }: ContentClientProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [statusFilter, setStatusFilter] = useState<'all' | BlogStatus>('all');
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const selectedBlog = useMemo(
    () => blogs.find((blog) => blog._id === selectedBlogId) || null,
    [blogs, selectedBlogId]
  );

  const filteredBlogs = useMemo(() => {
    if (statusFilter === 'all') return blogs;
    return blogs.filter((blog) => blog.status === statusFilter);
  }, [blogs, statusFilter]);

  const loadBlogs = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/blogs?status=all&limit=100');
      const payload = (await response.json()) as ApiResponse<{
        blogs: BlogPost[];
      }>;
      if (payload.success && payload.data) {
        setBlogs(payload.data.blogs);
      }
    } catch (e) {
      console.error('Failed to refresh blogs');
    }
  }, []);

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

  async function handleSave(event: FormEvent) {
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

  async function deletePost() {
    if (!selectedBlogId || !window.confirm('Delete this post permanently?')) return;
    setIsSaving(true);

    try {
      await deleteBlogAction(selectedBlogId);
      setBlogs((prev) => prev.filter((b) => b._id !== selectedBlogId));
      setNotice('Post deleted.');
      startNewPost();
    } catch (deleteError) {
      setError('Failed to delete post');
    } finally {
      setIsSaving(false);
    }
  }

  const columns: ColumnDef<BlogPost>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <span className="font-bold line-clamp-1">{row.getValue('title')}</span>,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <span className="px-2 py-0.5 rounded-md bg-horchata/10 text-espresso/60 text-[8px] font-black uppercase tracking-widest">
          {row.getValue('category')}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as BlogStatus;
        return (
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
              status === 'published' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      accessorKey: 'updatedAt',
      header: 'Modified',
      cell: ({ row }) => (
        <span className="tabular-nums text-espresso/40">
          {new Date(row.getValue('updatedAt') || '').toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-heading text-4xl font-black uppercase tracking-tighter text-espresso">
            CMS Content
          </h2>
          <div className="flex items-center gap-4 mt-2">
            {(['all', ...BLOG_STATUSES] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`text-[10px] font-black uppercase tracking-widest transition ${
                  statusFilter === status ? 'text-cinnamon' : 'text-espresso/30 hover:text-espresso'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={startNewPost}
          className="rounded-full bg-espresso text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest transition hover:bg-ink shadow-lg active:scale-[0.98]"
        >
          Create New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5">
          <DataTable
            columns={columns}
            data={filteredBlogs}
            onRowClick={editPost}
            selectedRowId={selectedBlogId || undefined}
          />
        </div>
        <div className="lg:col-span-7">
          <BlogEditor
            selectedBlog={selectedBlog}
            form={form}
            isSaving={isSaving}
            onSave={handleSave}
            onDelete={deletePost}
            onClear={startNewPost}
            setForm={setForm}
            notice={notice}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
