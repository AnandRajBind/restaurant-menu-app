import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 py-4 text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} GourmetBite Restaurant Menu System. All rights reserved.</p>
        <p className="font-mono text-[11px]">SaaS Engine v1.0.0 &bull; Node.js + React + MongoDB</p>
      </div>
    </footer>
  );
};
