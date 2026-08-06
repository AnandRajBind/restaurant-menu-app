import React, { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className = '',
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const errorId = inputId ? `${inputId}-error` : undefined;

    const renderRightIcon = () => {
      if (!RightIcon) return null;
      if (typeof RightIcon === 'function' || (typeof RightIcon === 'object' && RightIcon.$$typeof)) {
        // If it's a Component function or a JSX Element
        if (React.isValidElement(RightIcon)) {
          return RightIcon;
        }
        const Component = RightIcon;
        return <Component className="w-4 h-4" aria-hidden="true" />;
      }
      return RightIcon;
    };

    return (
      <div className="space-y-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {LeftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <LeftIcon className="w-4 h-4" aria-hidden="true" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`saas-input ${LeftIcon ? 'pl-10' : 'pl-3.5'} ${
              RightIcon ? 'pr-10' : 'pr-3.5'
            } ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
            {...props}
          />
          {RightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-10">
              {renderRightIcon()}
            </div>
          )}
        </div>
        {error ? (
          <p id={errorId} className="text-xs text-red-500 font-medium mt-1">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
