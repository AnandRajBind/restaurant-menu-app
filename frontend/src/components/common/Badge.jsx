import React from 'react';

export const Badge = ({ children, variant = 'neutral', className = '' }) => {
  const variants = {
    success: 'bg-secondary-50 dark:bg-secondary-950/60 text-secondary-700 dark:text-secondary-400 border-secondary-200 dark:border-secondary-900',
    warning: 'bg-accent-50 dark:bg-accent-950/60 text-accent-700 dark:text-accent-400 border-accent-200 dark:border-accent-900',
    danger: 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900',
    info: 'bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-400 border-primary-200 dark:border-primary-900',
    neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${
        variants[variant] || variants.neutral
      } ${className}`}
    >
      {children}
    </span>
  );
};
