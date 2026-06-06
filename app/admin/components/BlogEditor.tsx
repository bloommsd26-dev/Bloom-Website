'use client';

import React, { FormEvent, useRef, useState } from 'react';
import { BlogPost, BlogForm, BlogStatus } from '../types';
import { RichTextEditor } from '@/components/ui/RichTextEditor';
import { categories } from '../constants';
import Image from 'next/image';

interface BlogEditorProps {
  selectedBlog: BlogPost | null;
  form: BlogForm;
  isSaving: boolean;
  onSave: (e: FormEvent) => void;
  onDelete: () => void;
  onClear: () => void;
  setForm: React.Dispatch<React.SetStateAction<BlogForm>>;
  notice: string;
  error: string;
}

export function BlogEditor({
  selectedBlog,
  form,
  isSaving,
  onSave,
  onDelete,
  onClear,
  setForm,
  notice,
  error,
}: BlogEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`/api/admin/upload`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.data.url) {
        setForm((prev) => ({ ...prev, coverImage: result.data.url }));
      } else {
        const errorMsg = result.error || 'Failed to upload image';
        console.error('[UPLOAD CLIENT ERROR]:', errorMsg);
        alert(`Upload Failed: ${errorMsg}`);
      }
    } catch (uploadError) {
      console.error('Upload error:', uploadError);
      alert('Error uploading image. Check console for details.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={onSave}
      className="rounded-3xl border border-espresso/10 bg-white p-8 shadow-sm flex-1"
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
            onClick={onDelete}
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
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
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
            onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))}
            className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="category"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
          >
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(event) =>
              setForm((current) => ({ ...current, category: event.target.value }))
            }
            className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all appearance-none cursor-pointer capitalize"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2 space-y-2">
          <label
            htmlFor="excerpt"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
          >
            Short Excerpt (Required)
          </label>
          <textarea
            id="excerpt"
            value={form.excerpt}
            onChange={(event) =>
              setForm((current) => ({ ...current, excerpt: event.target.value }))
            }
            className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all min-h-[100px] resize-none"
            placeholder="A brief summary of the post for cards and search results..."
            required
          />
        </div>

        <div className="space-y-4">
          <label
            htmlFor="coverImage"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
          >
            Featured Image
          </label>
          <div className="flex flex-col gap-4">
            {form.coverImage ? (
              <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-espresso/10 group">
                <Image src={form.coverImage} alt="Preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, coverImage: '' }))}
                  className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="h-48 w-full flex flex-col items-center justify-center border-2 border-dashed border-horchata/30 rounded-2xl bg-horchata/5 cursor-pointer hover:border-cinnamon/20 hover:bg-white transition-all"
              >
                <span className="text-2xl mb-2">🖼️</span>
                <p className="text-xs font-bold text-espresso/40">
                  {isUploading ? 'Uploading...' : 'Click to upload featured image'}
                </p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="tags"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
          >
            Tags (comma separated)
          </label>
          <input
            id="tags"
            value={form.tags}
            onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
            className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all"
            placeholder="education, initiative, study"
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

        <div className="lg:col-span-2 mt-8 pt-8 border-t border-espresso/5 space-y-8">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-espresso/30 mb-6">
              SEO & Discovery (Optional)
            </h3>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="seoTitle"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
                >
                  Meta Title
                </label>
                <input
                  id="seoTitle"
                  value={form.seoTitle}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, seoTitle: event.target.value }))
                  }
                  className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all"
                  placeholder="Defaults to post title..."
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="seoDescription"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2"
                >
                  Meta Description
                </label>
                <input
                  id="seoDescription"
                  value={form.seoDescription}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, seoDescription: event.target.value }))
                  }
                  className="w-full bg-horchata/5 border-2 border-horchata/30 rounded-2xl px-6 py-4 text-espresso focus:border-cinnamon outline-none transition-all"
                  placeholder="Defaults to excerpt..."
                />
              </div>
            </div>
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
          className="rounded-full bg-espresso px-12 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-ink disabled:opacity-50 shadow-lg hover:shadow-xl active:translate-y-0.5"
        >
          {isSaving ? 'Saving...' : selectedBlog ? 'Update Post' : 'Publish Post'}
        </button>
      </div>
    </form>
  );
}
