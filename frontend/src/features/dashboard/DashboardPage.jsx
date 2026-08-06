import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { DashboardStats } from './DashboardStats';
import { StatsSkeleton, TableSkeleton } from '../../components/common/SkeletonLoader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { EmptyState } from '../../components/common/EmptyState';
import { menuService } from '../../services/menuService';
import { formatCurrency, getImageUrl } from '../../utils/helpers';
import { MENU_CATEGORIES, SORT_OPTIONS } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';
import { useDebounce } from '../../hooks/useDebounce';
import { Search, Plus, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const DashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availableFilter, setAvailableFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt:desc');
  const [page, setPage] = useState(1);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 8,
        sortBy,
      };
      if (debouncedSearch.trim()) params.search = debouncedSearch.trim();
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (availableFilter !== '') params.available = availableFilter;

      const res = await menuService.getAll(params);
      if (res.success && res.data) {
        setItems(res.data.items || []);
        setPagination(res.data.pagination || {});
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, selectedCategory, availableFilter, sortBy]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleDeleteItem = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await menuService.delete(id);
        toast.success('Menu item deleted successfully!');
        fetchDashboardData();
      } catch (err) {
        toast.error(err.message || 'Failed to delete menu item.');
      }
    }
  };

  const totalItemsCount = pagination.totalItems || items.length;
  const availableItemsCount = items.filter((i) => i.available).length;
  const soldOutItemsCount = items.filter((i) => !i.available).length;
  const categoriesCount = Array.from(new Set(items.map((i) => i.category))).length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 saas-card bg-gradient-to-r from-primary-900/10 via-primary-600/10 to-transparent border-primary-200 dark:border-primary-900/40">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Management Portal &bull; {user?.role} Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 font-heading">
            Welcome back, {user?.name || 'Manager'}!
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Executive overview of restaurant menu inventory, stock availability, and catalog metrics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link to="/menu">
            <Button variant="primary" rightIcon={ArrowRight}>
              Manage Full Menu
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      {loading && items.length === 0 ? (
        <StatsSkeleton />
      ) : (
        <DashboardStats
          totalItems={totalItemsCount}
          availableItems={availableItemsCount}
          soldOutItems={soldOutItemsCount}
          categoriesCount={categoriesCount}
        />
      )}

      {/* Restaurant Menu Data Table Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-heading">
              Restaurant Menu Inventory
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live catalog data table with search, category filtering, price sorting, and availability metrics.
            </p>
          </div>

          {isAdmin && (
            <Link to="/menu">
              <Button size="sm" variant="primary" leftIcon={Plus}>
                Add Menu Item
              </Button>
            </Link>
          )}
        </div>

        {/* Control Bar: Search, Category Pills, Filters & Sort */}
        <div className="saas-card p-4 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Bar Input */}
            <div className="w-full md:w-80">
              <Input
                placeholder="Search food by name or description..."
                leftIcon={Search}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Filter & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Select
                value={availableFilter}
                onChange={(e) => {
                  setAvailableFilter(e.target.value);
                  setPage(1);
                }}
                options={[
                  { label: 'All Availability', value: '' },
                  { label: 'Available Only', value: 'true' },
                  { label: 'Sold Out Only', value: 'false' },
                ]}
              />

              <Select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                options={SORT_OPTIONS}
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Data Table / Skeletons / Error / Empty States */}
        {loading ? (
          <TableSkeleton rows={6} />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchDashboardData} />
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Details</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                {isAdmin && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="flex items-center space-x-3">
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
                      <p className="font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
                      <p className="text-xs text-slate-500 line-clamp-1 max-w-xs">{item.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="neutral">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="font-extrabold text-primary-600 dark:text-primary-400">
                    {formatCurrency(item.price)}
                  </TableCell>
                  <TableCell>
                    {item.available ? (
                      <Badge variant="success">Available</Badge>
                    ) : (
                      <Badge variant="danger">Sold Out</Badge>
                    )}
                  </TableCell>
                  {isAdmin && (
                    <TableCell className="text-right space-x-2">
                      <Link to="/menu">
                        <Button size="sm" variant="ghost" leftIcon={Edit2}>
                          Manage
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="danger"
                        leftIcon={Trash2}
                        onClick={() => handleDeleteItem(item._id, item.name)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Pagination Footer */}
        {!loading && !error && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <p className="text-slate-500">
              Page <span className="font-bold text-slate-900 dark:text-slate-100">{pagination.currentPage}</span> of{' '}
              <span className="font-bold text-slate-900 dark:text-slate-100">{pagination.totalPages}</span> ({pagination.totalItems} total items)
            </p>

            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                leftIcon={ChevronLeft}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((p) => p + 1)}
                rightIcon={ChevronRight}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
