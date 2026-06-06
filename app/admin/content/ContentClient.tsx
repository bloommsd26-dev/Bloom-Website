'use client';

import { FormEvent, useCallback, useMemo, useState } from 'react';
import { BlogPost, BlogStatus, BlogForm, ApiResponse } from '../types';
import { emptyForm } from '../constants';
import { BlogSidebar } from '../components/BlogSidebar';
import { BlogEditor } from '../components/BlogEditor';
import { deleteBlogAction } from '@/lib/actions/admin';

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

  return (
    <div className="editorial-grid items-start">
      <BlogSidebar
        blogs={filteredBlogs}
        selectedBlogId={selectedBlogId}
        isLoading={false}
        statusFilter={statusFilter}
        onSelect={editPost}
        onNew={startNewPost}
        onFilterChange={setStatusFilter}
      />
      <div className="lg:col-span-7 lg:col-start-6">
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
  );
}
