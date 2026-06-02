'use client';

import clsx from 'clsx';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={clsx('mb-12', alignClasses[align], className)}>
      {subtitle && (
        <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
