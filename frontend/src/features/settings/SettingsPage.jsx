import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useTheme } from '../../hooks/useTheme';
import { api } from '../../services/api';
import { Sun, Moon, Server, Copy, Check, ShieldCheck, Cpu, Code2, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

export const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const [health, setHealth] = useState(null);
  const [isHealthLoading, setIsHealthLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const isDev = import.meta.env.MODE === 'development' || import.meta.env.DEV;
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
  const environmentName = import.meta.env.MODE
    ? import.meta.env.MODE.charAt(0).toUpperCase() + import.meta.env.MODE.slice(1)
    : 'Development';

  useEffect(() => {
    let isMounted = true;
    const checkBackendHealth = async () => {
      try {
        const res = await api.get('/health');
        if (isMounted && res.success) {
          setHealth(res.data);
        }
      } catch (err) {
        if (isMounted) {
          setHealth(null);
        }
      } finally {
        if (isMounted) {
          setIsHealthLoading(false);
        }
      }
    };

    checkBackendHealth();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyApiUrl = () => {
    navigator.clipboard.writeText(apiUrl);
    setCopied(true);
    toast.success('API Endpoint copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-slate-100">
          System & Preferences
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage interface theme, monitor backend health services, and inspect system configuration.
        </p>
      </div>

      {/* 1. Theme Settings Card */}
      <Card className="p-6 space-y-4 saas-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              {isDark ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-primary-600" />}
              <span>Interface Theme</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Current Theme:{' '}
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </span>
            </p>
          </div>

          <Button
            variant="outline"
            onClick={toggleTheme}
            leftIcon={isDark ? Sun : Moon}
            className="w-full sm:w-auto"
            aria-label="Switch theme preference"
          >
            Switch Theme
          </Button>
        </div>
      </Card>

      {/* 2. Backend Health Status Card */}
      <Card className="p-6 space-y-4 saas-card">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <Server className="w-4 h-4 text-emerald-600" />
            <span>Backend Service Health</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">Real-time Check</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Backend Status */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Backend Service</span>
            {isHealthLoading ? (
              <Badge variant="neutral">Checking...</Badge>
            ) : health ? (
              <Badge variant="success">🟢 Healthy</Badge>
            ) : (
              <Badge variant="neutral">Unknown</Badge>
            )}
          </div>

          {/* Database Status */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Database Status</span>
            {isHealthLoading ? (
              <Badge variant="neutral">Checking...</Badge>
            ) : health ? (
              <Badge variant="success">🟢 Connected</Badge>
            ) : (
              <Badge variant="neutral">Unknown</Badge>
            )}
          </div>

          {/* Authentication Status */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Authentication</span>
            <Badge variant="success">🟢 Active</Badge>
          </div>

          {/* API Status */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <span className="text-slate-500 dark:text-slate-400 font-medium">API Service</span>
            {isHealthLoading ? (
              <Badge variant="neutral">Checking...</Badge>
            ) : health ? (
              <Badge variant="success">🟢 Online</Badge>
            ) : (
              <Badge variant="neutral">Unknown</Badge>
            )}
          </div>
        </div>
      </Card>

      {/* 3 & 4. Environment & API Version Card */}
      <Card className="p-6 space-y-4 saas-card">
        <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center space-x-2">
          <Globe className="w-4 h-4 text-primary-600" />
          <span>Environment & API Info</span>
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-slate-500 dark:text-slate-400">Application Mode</span>
            <Badge variant={environmentName === 'Development' ? 'info' : 'success'}>
              {environmentName}
            </Badge>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-slate-500 dark:text-slate-400">API Specification Version</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100 font-mono">v1</span>
          </div>
        </div>
      </Card>

      {/* 5. Developer Information Card (Development Mode Only) */}
      {isDev && (
        <Card className="p-6 space-y-4 saas-card border-amber-200 dark:border-amber-900/40">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-amber-500" />
              <span>Developer Diagnostics</span>
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/60">
              Dev Mode Only
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Active API Base Endpoint:
            </span>
            <div className="flex items-center justify-between space-x-3">
              <code className="text-xs font-mono text-primary-600 dark:text-primary-400 truncate">
                {apiUrl}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyApiUrl}
                leftIcon={copied ? Check : Copy}
                aria-label="Copy API Base Endpoint to Clipboard"
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* 6. Application Architecture Information Card */}
      <Card className="p-6 space-y-4 saas-card">
        <h3 className="text-sm font-bold font-heading text-slate-900 dark:text-slate-100 flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-primary-500" />
          <span>Platform Stack Architecture</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">Frontend Engine</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">React 19</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">Backend Server</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">Express.js</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">Database Engine</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">MongoDB</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">Authentication</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">JWT + Refresh</span>
          </div>

          <div className="p-3 rounded-xl sm:col-span-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400">System Architecture</span>
            <span className="font-bold text-primary-600 dark:text-primary-400">Feature Based</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;
