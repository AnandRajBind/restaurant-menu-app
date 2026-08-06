import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Compass, Home, Utensils } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 text-center">
      <Card className="max-w-md p-8 space-y-6">
        <div className="w-16 h-16 rounded-xl bg-primary-100 dark:bg-primary-950 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-spin" />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-extrabold font-heading text-primary-600">404</h1>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Page Not Found</h2>
          <p className="text-xs text-slate-500">
            The route or resource you requested could not be located.
          </p>
        </div>

        <div className="flex justify-center space-x-3 pt-2">
          <Link to="/">
            <Button variant="primary" leftIcon={Home}>
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/menu">
            <Button variant="outline" leftIcon={Utensils}>
              View Menu
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
export default NotFoundPage;
