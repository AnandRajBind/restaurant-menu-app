import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Checkbox } from '../../components/ui/Checkbox';
import { Modal } from '../../components/ui/Modal';
import { MENU_CATEGORIES } from '../../utils/constants';
import { getImageUrl } from '../../utils/helpers';
import { Image as ImageIcon } from 'lucide-react';

export const MenuFormModal = ({ isOpen, onClose, onSubmit, initialData, isLoading }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        category: initialData.category || 'Mains',
        available: initialData.available !== undefined ? initialData.available : true,
      });
      setImagePreview(getImageUrl(initialData.image));
    } else {
      reset({
        name: '',
        description: '',
        price: '',
        category: 'Mains',
        available: true,
      });
      setImagePreview(null);
    }
  }, [initialData, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Menu Item' : 'Add New Menu Item'}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Item Name"
          placeholder="e.g. Margherita Pizza"
          {...register('name', { required: 'Item name is required' })}
          error={errors.name?.message}
        />

        <Textarea
          label="Description"
          placeholder="Fresh basil, ripe tomatoes, creamy mozzarella..."
          {...register('description', { required: 'Description is required' })}
          error={errors.description?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price ($)"
            type="number"
            step="0.01"
            placeholder="14.99"
            {...register('price', { required: 'Price is required', min: 0 })}
            error={errors.price?.message}
          />

          <Select
            label="Category"
            options={MENU_CATEGORIES.filter((c) => c !== 'All')}
            {...register('category')}
          />
        </div>

        <Checkbox
          label="Available for Ordering"
          description="Toggle whether item is active or out of stock"
          {...register('available')}
        />

        {/* Image File Upload */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Food Image Upload
          </label>
          <div className="flex items-center space-x-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-14 h-14 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <div className="w-14 h-14 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-dashed border-slate-300 dark:border-slate-700">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              {...register('image')}
              onChange={handleImageChange}
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            {initialData ? 'Save Changes' : 'Create Item'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
