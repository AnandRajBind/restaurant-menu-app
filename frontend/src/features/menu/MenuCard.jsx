import React from 'react';
import { Button } from '../../components/ui/Button';
import { formatCurrency, formatDate, getImageUrl } from '../../utils/helpers';
import { Edit2, Trash2, User } from 'lucide-react';

export const MenuCard = ({ item, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="saas-card overflow-hidden group flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md transition-all duration-300">
      <div>
        {/* Food Image Presentation */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
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

          {/* Category Overlay Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-950/70 backdrop-blur-md text-white border border-white/10 shadow-xs">
            {item.category}
          </div>

          {/* Live Availability Pulse Badge */}
          <div className="absolute top-3 right-3">
            {item.available ? (
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/20 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-red-950/80 backdrop-blur-md text-red-400 border border-red-500/20 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>Sold Out</span>
              </span>
            )}
          </div>
        </div>

        {/* Info & Typography */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">
              {item.name}
            </h4>
            <span className="font-heading font-extrabold text-sm text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/80 px-2.5 py-1 rounded-lg border border-primary-200/50 dark:border-primary-900/50 shrink-0">
              {formatCurrency(item.price)}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Staff & Metadata Attribution */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span className="inline-flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{item.createdBy?.name || 'Chef'}</span>
            </span>
            {item.createdAt && <span>{formatDate(item.createdAt)}</span>}
          </div>
        </div>
      </div>

      {/* Admin Action Footer */}
      {isAdmin && (
        <div className="px-5 py-3 bg-slate-50/60 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-2">
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

export default MenuCard;
