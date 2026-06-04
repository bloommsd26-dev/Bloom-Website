import Image from 'next/image';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  interactive?: boolean;
}

const variantClasses = {
  default: 'bg-white border border-neutral-200 rounded-lg',
  elevated: 'bg-white shadow-lg rounded-lg',
  outlined: 'border-2 border-neutral-300 rounded-lg',
};

export function Card({
  children,
  className,
  variant = 'default',
  interactive = false,
}: CardProps) {
  return (
    <div
      className={clsx(
        variantClasses[variant],
        interactive && 'transition-transform duration-200 hover:shadow-lg hover:scale-105',
        className
      )}
    >
      {children}
    </div>
  );
}

interface ProgramCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  activities?: string[];
  className?: string;
}

export function ProgramCard({
  title,
  description,
  icon,
  image,
  activities,
  className,
}: ProgramCardProps) {
  return (
    <Card variant="elevated" className={clsx('overflow-hidden hover:shadow-xl', className)}>
      {image && (
        <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        {icon && <div className="mb-4 text-3xl">{icon}</div>}
        <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-600 mb-4">{description}</p>
        {activities && activities.length > 0 && (
          <div className="border-t border-neutral-200 pt-4">
            <p className="font-heading text-sm font-semibold text-neutral-700 mb-2">Activities</p>
            <ul className="space-y-1">
              {activities.slice(0, 3).map((activity, index) => (
                <li key={index} className="text-sm text-neutral-600 flex items-start gap-2">
                  <span className="text-primary-600 font-bold">•</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
