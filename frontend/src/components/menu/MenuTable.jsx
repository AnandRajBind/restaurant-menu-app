import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/Table';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCurrency, getImageUrl } from '../../utils/helpers';
import { Edit2, Trash2 } from 'lucide-react';

export const MenuTable = ({ items, onEdit, onDelete, isAdmin }) => {
  return (
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
                <Button size="sm" variant="ghost" leftIcon={Edit2} onClick={() => onEdit(item)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" leftIcon={Trash2} onClick={() => onDelete(item._id, item.name)}>
                  Delete
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
