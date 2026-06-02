'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { Card } from './Card';

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  author: string;
  date: Date;
  readingTime: number;
  category?: string;
  className?: string;
}

export function BlogCard({
  title,
  excerpt,
  slug,
  coverImage,
  author,
  date,
  readingTime,
  category,
  className,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Card
        variant="elevated"
        className={clsx(
          'overflow-hidden h-full transition-all duration-300 group-hover:shadow-xl',
          className
        )}
      >
        {coverImage && (
          <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-3">
            {category && (
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                {category}
              </span>
            )}
            <span className="text-xs text-neutral-500">{readingTime} min read</span>
          </div>
          <h3 className="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-neutral-600 text-sm mb-4 line-clamp-3 flex-grow">
            {excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-100 pt-4">
            <span>{author}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
