import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-espresso text-white hover:bg-ink active:scale-[0.98]',
  secondary: 'bg-cinnamon text-white hover:bg-cinnamon/90 active:scale-[0.98]',
  outline:
    'border-2 border-espresso text-espresso hover:bg-espresso hover:text-white active:scale-[0.98]',
  ghost: 'text-espresso/60 hover:text-espresso active:scale-[0.98] px-0',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]',
};

const sizeStyles = {
  sm: 'px-6 py-2.5 text-xs font-bold uppercase tracking-widest',
  md: 'px-8 py-3.5 text-sm font-bold uppercase tracking-widest',
  lg: 'px-12 py-5 text-base font-bold uppercase tracking-widest',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'font-heading transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 inline-flex items-center justify-center gap-2 rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
