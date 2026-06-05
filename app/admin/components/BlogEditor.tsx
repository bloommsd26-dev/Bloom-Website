'use client';

import React, { FormEvent } from 'react';
import { BlogPost, BlogForm, BlogStatus } from '../types';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

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
