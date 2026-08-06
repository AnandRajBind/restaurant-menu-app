import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatDate } from '../utils/helpers';
import { User, Mail, Shield, Calendar, Key } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          User Profile & Security
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Review your account credentials and system authorization level.
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 font-bold text-2xl flex items-center justify-center border border-primary-200 dark:border-primary-900">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{user?.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant={user?.role === 'Admin' ? 'info' : 'neutral'}>
                {user?.role} Role
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-slate-500">
              <Mail className="w-4 h-4" />
              <span>Email Address</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{user?.email}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-slate-500">
              <Shield className="w-4 h-4" />
              <span>System Role</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{user?.role}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2 text-slate-500">
              <Key className="w-4 h-4" />
              <span>User ID</span>
            </div>
            <span className="font-mono text-slate-900 dark:text-slate-100">{user?._id || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2 text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Member Since</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              {formatDate(user?.createdAt) || 'Recently'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default ProfilePage;
