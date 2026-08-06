import React from 'react';
import { Card } from '../../components/ui/Card';
import { Utensils, CheckCircle, XCircle, Grid } from 'lucide-react';

export const DashboardStats = ({ totalItems = 0, availableItems = 0, soldOutItems = 0, categoriesCount = 0 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Total Items */}
      <Card className="space-y-2 border-l-4 border-l-primary-600">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-bold uppercase tracking-wider">Total Menu Items</span>
          <Utensils className="w-5 h-5 text-primary-600" />
        </div>
        <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
          {totalItems}
        </p>
        <span className="text-[11px] text-slate-500">Active catalog items</span>
      </Card>

      {/* Available Items */}
      <Card className="space-y-2 border-l-4 border-l-secondary-600">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-bold uppercase tracking-wider">Available Items</span>
          <CheckCircle className="w-5 h-5 text-secondary-600" />
        </div>
        <p className="text-3xl font-extrabold text-secondary-600 font-heading">
          {availableItems}
        </p>
        <span className="text-[11px] text-slate-500">Ready for customer ordering</span>
      </Card>

      {/* Sold Out Items */}
      <Card className="space-y-2 border-l-4 border-l-red-600">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-bold uppercase tracking-wider">Sold Out Items</span>
          <XCircle className="w-5 h-5 text-red-600" />
        </div>
        <p className="text-3xl font-extrabold text-red-600 font-heading">
          {soldOutItems}
        </p>
        <span className="text-[11px] text-slate-500">Stock update needed</span>
      </Card>

      {/* Categories Count */}
      <Card className="space-y-2 border-l-4 border-l-accent-500">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-bold uppercase tracking-wider">Active Categories</span>
          <Grid className="w-5 h-5 text-accent-500" />
        </div>
        <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
          {categoriesCount}
        </p>
        <span className="text-[11px] text-slate-500">Menu classifications</span>
      </Card>
    </div>
  );
};

export default DashboardStats;
