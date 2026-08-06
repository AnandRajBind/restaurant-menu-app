import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useTheme } from '../hooks/useTheme';
import { api } from '../services/api';
import { Settings, Sun, Moon, Server, Activity, ShieldCheck } from 'lucide-react';

export const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const [health, setHealth] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await api.get('/health');
        if (res.success) {
          setHealth(res.data);
        }
      } catch (err) {
        // Handle error
      }
    };
    fetchHealth();
  }, []);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          System & Theme Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Configure application preferences and monitor API service status.
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
              {isDark ? <Moon className="w-4 h-4 text-accent-400" /> : <Sun className="w-4 h-4 text-primary-600" />}
              <span>Interface Theme</span>
            </h3>
            <p className="text-xs text-slate-500">
              Toggle between Dark Mode (`slate-950`) and Light Mode (`slate-50`).
            </p>
          </div>
          <Button variant="outline" onClick={toggleTheme}>
            {isDark ? 'Switch to Light' : 'Switch to Dark'}
          </Button>
        </div>
      </Card>

      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
          <Server className="w-4 h-4 text-secondary-600" />
          <span>Backend API Health & Environment</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500">API Endpoint</span>
            <span className="font-mono text-slate-900 dark:text-slate-100">
              {import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-slate-500">Service Status</span>
            <Badge variant="success">Online & Operational</Badge>
          </div>

          {health && (
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Uptime</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {Math.round(health.uptime || 0)}s
              </span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
export default SettingsPage;
