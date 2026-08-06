import React, { useState, useEffect, useCallback } from 'react';
import { menuService } from '../../services/menuService';
import { MENU_CATEGORIES, SORT_OPTIONS } from '../../utils/constants';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { MenuCard } from './MenuCard';
import { MenuTable } from './MenuTable';
import { MenuFormModal } from './MenuFormModal';
import { CardSkeleton, TableSkeleton } from '../../components/common/SkeletonLoader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { EmptyState } from '../../components/common/EmptyState';
import { useAuth } from '../../hooks/useAuth';
import { useDebounce } from '../../hooks/useDebounce';
import { Search, Plus, LayoutGrid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const MenuPage = () => {
  const { isAdmin } = useAuth();
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

  // Filters & Search State
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 350);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availableFilter, setAvailableFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt:desc');
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Delete Confirmation Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchMenuItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: 9,
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
      setError(err.message || 'Failed to load menu catalog');
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, selectedCategory, availableFilter, sortBy]);

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleFormSubmit = async (formDataInput) => {
    setModalLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', formDataInput.name);
      formData.append('description', formDataInput.description);
      formData.append('price', formDataInput.price);
      formData.append('category', formDataInput.category);
      formData.append('available', formDataInput.available);

      if (formDataInput.image && formDataInput.image[0]) {
        formData.append('image', formDataInput.image[0]);
      }

      if (editingItem) {
        await menuService.update(editingItem._id, formData);
        toast.success('Menu item updated successfully!');
      } else {
        await menuService.create(formData);
        toast.success('Menu item created successfully!');
      }

      handleCloseModal();
      fetchMenuItems();
    } catch (err) {
      toast.error(err.message || 'Operation failed. Please try again.');
    } finally {
      setModalLoading(false);
    }
  };

  const promptDeleteItem = (id, name) => {
    setItemToDelete({ id, name });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleteLoading(true);
    try {
      await menuService.delete(itemToDelete.id);
      toast.success(`"${itemToDelete.name}" deleted successfully!`);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      fetchMenuItems();
    } catch (err) {
      toast.error(err.message || 'Failed to delete menu item.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-slate-100">
            Menu Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Browse, search, filter, update, and manage restaurant offerings.
          </p>
        </div>

        {isAdmin && (
          <Button variant="primary" leftIcon={Plus} onClick={handleOpenCreateModal}>
            Add Menu Item
          </Button>
        )}
      </div>

      {/* Control Bar */}
      <div className="saas-card p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80">
            <Input
              placeholder="Search by name or description..."
              leftIcon={Search}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

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

            <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg p-1 bg-slate-50 dark:bg-slate-900">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-primary-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-800 text-primary-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
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

      {/* Content */}
      {loading ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <TableSkeleton rows={6} />
        )
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchMenuItems} />
      ) : items.length === 0 ? (
        <EmptyState />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <MenuCard
              key={item._id}
              item={item}
              onEdit={handleOpenEditModal}
              onDelete={promptDeleteItem}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ) : (
        <MenuTable
          items={items}
          onEdit={handleOpenEditModal}
          onDelete={promptDeleteItem}
          isAdmin={isAdmin}
        />
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

      {/* Create / Edit Form Modal */}
      <MenuFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        isLoading={modalLoading}
      />

      {/* Custom Delete Confirmation Dialog Modal */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Menu Item"
        message={`Are you sure you want to delete "${itemToDelete?.name}"? This item will be permanently removed from the restaurant menu.`}
        confirmText="Delete Item"
        isLoading={deleteLoading}
      />
    </div>
  );
};

export default MenuPage;
