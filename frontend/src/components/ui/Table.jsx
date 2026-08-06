import React from 'react';

export const Table = ({ children, className = '' }) => {
  return (
    <div className="w-full overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl saas-card">
      <table className={`w-full text-left text-sm ${className}`}>{children}</table>
    </div>
  );
};

export const TableHeader = ({ children, className = '' }) => {
  return (
    <thead
      className={`bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200 dark:border-slate-800 ${className}`}
    >
      {children}
    </thead>
  );
};

export const TableBody = ({ children, className = '' }) => {
  return <tbody className={`divide-y divide-slate-200 dark:divide-slate-800 ${className}`}>{children}</tbody>;
};

export const TableRow = ({ children, className = '' }) => {
  return (
    <tr className={`hover:bg-slate-50/60 dark:hover:bg-slate-900/60 transition-colors ${className}`}>
      {children}
    </tr>
  );
};

export const TableHead = ({ children, className = '' }) => {
  return <th className={`px-5 py-3.5 ${className}`}>{children}</th>;
};

export const TableCell = ({ children, className = '' }) => {
  return <td className={`px-5 py-3.5 ${className}`}>{children}</td>;
};

export default Table;
