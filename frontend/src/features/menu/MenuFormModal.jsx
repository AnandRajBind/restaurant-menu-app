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
import { Image as ImageIcon, Upload } from 'lucide-react';

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
  }, [initialData, reset, isOpen]);

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
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        {/* Item Name */}
        <Input
          label="Item Name"
          placeholder="e.g. Margherita Pizza"
          {...register('name', { required: 'Item name is required' })}
          error={errors.name?.message}
        />

        {/* Description */}
        <Textarea
          label="Description"
          placeholder="Fresh basil, ripe tomatoes, creamy mozzarella..."
          {...register('description', { required: 'Description is required' })}
          error={errors.description?.message}
        />

        {/* Price & Category */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price ($)"
            type="number"
            step="0.01"
            placeholder="14.99"
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price cannot be negative' },
            })}
            error={errors.price?.message}
          />

          <Select
            label="Category"
            options={MENU_CATEGORIES.filter((c) => c !== 'All')}
            {...register('category')}
          />
        </div>

        {/* Availability Toggle */}
        <Checkbox
          label="Available for Ordering"
          description="Toggle whether item is active or out of stock"
          {...register('available')}
        />

        {/* Image File Upload & Preview */}
        <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Food Image Upload
          </label>
          <div className="flex items-center space-x-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Food Preview"
                className="w-16 h-16 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shadow-xs shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 border border-dashed border-slate-300 dark:border-slate-700 shrink-0">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}

            <div className="space-y-1 flex-1">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                {...register('image')}
                onChange={handleImageChange}
                className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400">
                Supported formats: JPG, PNG, WEBP, GIF (Max 5MB)
              </p>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <Button variant="ghost" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading} leftIcon={Upload}>
            {initialData ? 'Save Changes' : 'Create Menu Item'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default MenuFormModal;
