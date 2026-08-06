import React from 'react';

export const CardSkeleton = () => {
  return (
    <div className="saas-card overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-slate-800 w-full" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
        </div>
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
      </div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="saas-card overflow-hidden animate-pulse p-4 space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3 w-1/3">
            <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
              <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            </div>
          </div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20" />
        </div>
      ))}
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="saas-card p-5 space-y-3 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="w-5 h-5 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
};
