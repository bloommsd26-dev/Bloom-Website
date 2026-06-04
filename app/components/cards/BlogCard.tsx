import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { Card } from './Card';

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  author?: string;
  date?: Date | string;
  readingTime?: number;
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
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

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
          <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
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
            {readingTime && <span className="text-xs text-neutral-500">{readingTime} min read</span>}
          </div>
          <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-neutral-600 text-sm mb-4 line-clamp-3 flex-grow">
            {excerpt}
          </p>
          {(author || formattedDate) && (
            <div className="flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-100 pt-4">
              {author && <span>{author}</span>}
              {formattedDate && <span>{formattedDate}</span>}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
