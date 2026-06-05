import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

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
    <Link href={`/blog/${slug}`} className={clsx("group block border-t border-espresso/10 pt-8 transition-colors hover:bg-horchata/5", className)}>
      <article className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-cinnamon">
            {category || 'Field Note'}
          </p>
          {readingTime && <span className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest">{readingTime} min read</span>}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className={clsx("lg:col-span-8", !coverImage && "lg:col-span-12")}>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-espresso mb-4 group-hover:text-cinnamon transition-colors leading-tight">
              {title}
            </h3>
            <p className="story-copy text-base line-clamp-3 mb-6">
              {excerpt}
            </p>
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-espresso/40">
              {author && <span>By {author}</span>}
              {formattedDate && <span>{formattedDate}</span>}
            </div>
          </div>
          
          {coverImage && (
            <div className="lg:col-span-4 lg:col-start-9 relative aspect-[4/3] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
