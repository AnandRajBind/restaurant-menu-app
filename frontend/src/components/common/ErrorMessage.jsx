import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const ErrorMessage = ({
  title = 'Something went wrong',
  message = 'Failed to load requested data.',
  onRetry,
}) => {
  return (
    <div className="saas-card p-6 text-center max-w-lg mx-auto my-8 border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 mb-3">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h3 className="text-base font-bold text-red-900 dark:text-red-300 mb-1">{title}</h3>
      <p className="text-xs text-red-600 dark:text-red-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
