import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { StatsSkeleton, TableSkeleton } from '../../components/common/SkeletonLoader';
import { menuService } from '../../services/menuService';
import { formatCurrency, getImageUrl } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';
import { Utensils, CheckCircle, XCircle, Grid, ArrowRight, ShieldCheck } from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await menuService.getAll({ limit: 50 });
        if (res.success && res.data) {
          setItems(res.data.items || []);
        }
      } catch (err) {
        // Silently handle error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalItems = items.length;
  const availableItems = items.filter((i) => i.available).length;
  const soldOutItems = items.filter((i) => !i.available).length;
  const categories = Array.from(new Set(items.map((i) => i.category))).length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 saas-card bg-gradient-to-r from-primary-900/10 via-primary-600/10 to-transparent border-primary-200 dark:border-primary-900/40">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Management Portal &bull; {user?.role} Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Welcome back, {user?.name || 'Manager'}!
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Overview of restaurant menu inventory, availability status, and categories.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/menu">
            <Button variant="primary" rightIcon={ArrowRight}>
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      {loading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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

          <Card className="space-y-2 border-l-4 border-l-accent-500">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Active Categories</span>
              <Grid className="w-5 h-5 text-accent-500" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
              {categories}
            </p>
            <span className="text-[11px] text-slate-500">Menu classifications</span>
          </Card>
        </div>
      )}

      {/* Recent Items */}
      <Card>
        <CardHeader
          title="Recent Menu Catalog Items"
          subtitle="Latest items added to the menu inventory"
          action={
            <Link to="/menu" className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">
              View All
            </Link>
          }
        />

        {loading ? (
          <TableSkeleton rows={5} />
        ) : items.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No menu items found.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.slice(0, 5).map((item) => (
              <div key={item._id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-800"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="font-extrabold text-primary-600 text-sm">
                    {formatCurrency(item.price)}
                  </span>
                  {item.available ? (
                    <Badge variant="success">Available</Badge>
                  ) : (
                    <Badge variant="danger">Sold Out</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
export default DashboardPage;
