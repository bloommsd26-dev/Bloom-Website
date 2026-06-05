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
    <Link href={`/blog/${slug}`} className={clsx("group block border-t border-espresso/10 pt-12 transition-all hover:bg-horchata/5 px-6 -mx-6 rounded-3xl", className)}>
      <article className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <p className="font-heading text-[10px] font-bold uppercase tracking-[0.25em] text-cinnamon bg-horchata/10 px-4 py-1.5 rounded-full">
            {category || 'Field Note'}
          </p>
          {readingTime && <span className="text-[10px] font-bold text-espresso/30 uppercase tracking-widest">{readingTime} min read</span>}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className={clsx("lg:col-span-7", !coverImage && "lg:col-span-12")}>
            <h3 className="font-heading text-3xl sm:text-4xl font-bold text-espresso mb-6 group-hover:text-cinnamon transition-colors leading-[1.1] tracking-tight">
              {title}
            </h3>
            <p className="story-copy text-lg line-clamp-3 mb-8 text-espresso/70">
              {excerpt}
            </p>
            <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40">
              {author && <span>By {author}</span>}
              {formattedDate && <span className="tabular-nums">{formattedDate}</span>}
            </div>
          </div>
          
          {coverImage && (
            <div className="lg:col-span-5 lg:col-start-8 relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg transform group-hover:scale-[1.02] transition-all duration-700">
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/5 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500" />
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
