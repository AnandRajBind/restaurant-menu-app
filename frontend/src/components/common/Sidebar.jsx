import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Utensils, Grid, User, Settings, Shield, Palette } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navigationItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Menu Management', path: '/menu', icon: Utensils },
    { name: 'Categories', path: '/categories', icon: Grid },
    { name: 'My Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Design System', path: '/design-system', icon: Palette },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="mobile-sidebar"
        aria-label="Main Navigation"
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between p-4">
          {/* Navigation Links */}
          <div className="space-y-6">
            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Main Navigation
              </p>
              <nav className="space-y-1" aria-label="Main Navigation Links">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      end={item.path === '/'}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 ${
                          isActive
                            ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* User Info Badge Footer */}
          {user && (
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate">
                  {user.name}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-primary-400">
                  <Shield className="w-2.5 h-2.5 mr-0.5" aria-hidden="true" />
                  {user.role}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
