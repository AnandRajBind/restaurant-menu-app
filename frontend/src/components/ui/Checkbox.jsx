import React, { forwardRef } from 'react';

export const Checkbox = forwardRef(
  ({ label, description, className = '', id, ...props }, ref) => {
    const checkboxId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex items-start space-x-3">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={`w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 mt-0.5 cursor-pointer ${className}`}
          {...props}
        />
        {label && (
          <div className="text-sm">
            <label htmlFor={checkboxId} className="font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
              {label}
            </label>
            {description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
