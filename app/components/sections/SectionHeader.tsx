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
      {subtitle && <p className="eyebrow mb-3">{subtitle}</p>}
      <h2 className="font-heading text-4xl sm:text-5xl font-bold leading-tight text-neutral-900 mb-4">
        {title}
      </h2>
      {description && <p className="story-copy max-w-2xl mx-auto">{description}</p>}
    </div>
  );
}
