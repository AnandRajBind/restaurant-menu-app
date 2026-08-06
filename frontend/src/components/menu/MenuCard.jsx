import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCurrency, getImageUrl } from '../../utils/helpers';
import { Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

export const MenuCard = ({ item, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="saas-card overflow-hidden group flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
      <div>
        {/* Image Surface */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={getImageUrl(item.image)}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
            }}
          />
          <div className="absolute top-3 left-3">
            <Badge variant="neutral">{item.category}</Badge>
          </div>
          <div className="absolute top-3 right-3">
            {item.available ? (
              <Badge variant="success">Available</Badge>
            ) : (
              <Badge variant="danger">Sold Out</Badge>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-heading font-bold text-base text-slate-900 dark:text-slate-100">
              {item.name}
            </h4>
            <span className="font-extrabold text-primary-600 dark:text-primary-400 font-heading text-base">
              {formatCurrency(item.price)}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Admin Action Footer */}
      {isAdmin && (
        <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-2">
          <Button size="sm" variant="ghost" leftIcon={Edit2} onClick={() => onEdit(item)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" leftIcon={Trash2} onClick={() => onDelete(item._id, item.name)}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
