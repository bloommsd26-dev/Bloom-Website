'use client';

import { BlogPost, BlogStatus } from '../types';
import { Skeleton } from '@/components/ui/Skeleton';

interface BlogSidebarProps {
  blogs: BlogPost[];
  selectedBlogId: string | null;
  isLoading: boolean;
  statusFilter: 'all' | BlogStatus;
  onSelect: (blog: BlogPost) => void;
  onNew: () => void;
  onFilterChange: (status: 'all' | BlogStatus) => void;
}

export function BlogSidebar({
  blogs,
  selectedBlogId,
  isLoading,
  statusFilter,
  onSelect,
  onNew,
  onFilterChange,
}: BlogSidebarProps) {
  return (
    <aside className="rounded-3xl border border-espresso/10 bg-white p-6 shadow-sm h-fit sticky top-32">
      <div className="flex items-center justify-between gap-4 mb-8">
        <h2 className="font-heading text-xl font-black uppercase tracking-tighter text-espresso">
          Posts
        </h2>
        <button
          type="button"
          onClick={onNew}
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
            onClick={() => onFilterChange(status)}
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
        {isLoading &&
          [...Array(5)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-espresso/5 p-4 space-y-3">
              <Skeleton className="h-4 w-3/4 rounded-full" />
              <div className="flex justify-between">
                <Skeleton className="h-2 w-12 rounded-full" />
                <Skeleton className="h-2 w-12 rounded-full" />
              </div>
            </div>
          ))}
        {!isLoading && blogs.length === 0 && (
          <p className="text-xs font-bold uppercase tracking-widest text-espresso/20 py-10 text-center">
            No posts found.
          </p>
        )}
        {blogs.map((blog) => (
          <button
            key={blog._id}
            type="button"
            onClick={() => onSelect(blog)}
            className={`w-full rounded-2xl border p-5 text-left transition-all ${
              selectedBlogId === blog._id
                ? 'border-cinnamon bg-horchata/10 ring-1 ring-cinnamon'
                : 'border-espresso/5 bg-white hover:border-espresso/20 hover:shadow-md'
            }`}
          >
            <span
              className="block font-heading text-base font-bold text-espresso leading-tight mb-2 line-clamp-2"
              title={blog.title}
            >
              {blog.title}
            </span>
            <span className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-espresso/40">
              <span className={blog.status === 'published' ? 'text-green-600' : ''}>
                {blog.status}
              </span>
              <span className="shrink-0">{blog.readingTime || 1} min</span>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
