import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`saas-card p-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, className = '' }) => {
  return (
    <div className={`flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 ${className}`}>
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
};

export default Card;
