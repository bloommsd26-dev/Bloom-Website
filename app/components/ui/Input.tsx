'use client';

import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
          {props.required && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        className={clsx(
          'w-full px-4 py-2 border rounded-lg transition-colors duration-200',
          'placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500',
          'disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-500',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-neutral-300 focus:border-primary-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-neutral-600">{helperText}</p>}
    </div>
  );
}
