import React from 'react';
import { Button } from './Button';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Badge } from './Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Checkbox } from './Checkbox';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon, Utensils, CheckCircle, AlertTriangle, Plus, Trash2, Edit2, Search } from 'lucide-react';

export const DesignSystemShowcase = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="space-y-12 py-8 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            <Utensils className="w-4 h-4" />
            <span>Design System & Architecture Showcase</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            SaaS Restaurant Dashboard Design System
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            8px Grid System &bull; Deep Orange Primary &bull; Emerald Secondary &bull; Amber Accent &bull; Slate Neutral
          </p>
        </div>

        <Button variant="outline" onClick={toggleTheme} leftIcon={isDark ? Sun : Moon}>
          {isDark ? 'Light Theme' : 'Dark Theme'}
        </Button>
      </div>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">1. Color Palette Tokens</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="space-y-2 border-l-4 border-l-primary-600">
            <span className="text-xs font-bold uppercase text-slate-500">Primary (Deep Orange)</span>
            <div className="h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xs">
              #ea580c (primary-600)
            </div>
          </Card>
          <Card className="space-y-2 border-l-4 border-l-secondary-600">
            <span className="text-xs font-bold uppercase text-slate-500">Secondary (Emerald)</span>
            <div className="h-10 rounded-lg bg-secondary-600 flex items-center justify-center text-white font-bold text-xs">
              #059669 (secondary-600)
            </div>
          </Card>
          <Card className="space-y-2 border-l-4 border-l-accent-500">
            <span className="text-xs font-bold uppercase text-slate-500">Accent (Amber)</span>
            <div className="h-10 rounded-lg bg-accent-500 flex items-center justify-center text-white font-bold text-xs">
              #f59e0b (accent-500)
            </div>
          </Card>
          <Card className="space-y-2 border-l-4 border-l-slate-800">
            <span className="text-xs font-bold uppercase text-slate-500">Neutral (Slate)</span>
            <div className="h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
              #0f172a (slate-900)
            </div>
          </Card>
        </div>
      </section>

      {/* 2. Button Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">2. Button Components</h2>
        <Card className="flex flex-wrap gap-4 items-center">
          <Button variant="primary" leftIcon={Plus}>Primary (Deep Orange)</Button>
          <Button variant="secondary" leftIcon={CheckCircle}>Secondary (Emerald)</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger" leftIcon={Trash2}>Danger Button</Button>
          <Button variant="primary" isLoading>Loading...</Button>
        </Card>
      </section>

      {/* 3. Badges */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">3. Status Badges</h2>
        <Card className="flex flex-wrap gap-3 items-center">
          <Badge variant="success">Available (Emerald)</Badge>
          <Badge variant="warning">Low Stock (Amber)</Badge>
          <Badge variant="danger">Sold Out (Red)</Badge>
          <Badge variant="info">Special Menu (Deep Orange)</Badge>
          <Badge variant="neutral">Draft (Slate)</Badge>
        </Card>
      </section>

      {/* 4. Form Controls */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">4. Accessible Form Controls</h2>
        <Card className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Menu Item Name" placeholder="e.g. Margherita Pizza" leftIcon={Search} />
          <Select label="Category" options={['Mains', 'Appetizers', 'Desserts', 'Beverages']} />
          <Textarea label="Item Description" placeholder="Fresh basil, ripe tomatoes, mozzarella..." />
          <div className="space-y-4 pt-2">
            <Checkbox label="Item is Available" description="Show in public menu browser" defaultChecked />
            <Checkbox label="Mark as Chef Special" description="Highlight on restaurant dashboard" />
          </div>
        </Card>
      </section>

      {/* 5. SaaS Data Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">5. Professional SaaS Data Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold text-slate-900 dark:text-slate-100">Margherita Pizza</TableCell>
              <TableCell><Badge variant="info">Mains</Badge></TableCell>
              <TableCell className="font-extrabold text-primary-600">$14.99</TableCell>
              <TableCell><Badge variant="success">Available</Badge></TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="ghost" leftIcon={Edit2}>Edit</Button>
                <Button size="sm" variant="danger" leftIcon={Trash2}>Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold text-slate-900 dark:text-slate-100">Tiramisu Dessert</TableCell>
              <TableCell><Badge variant="neutral">Desserts</Badge></TableCell>
              <TableCell className="font-extrabold text-primary-600">$8.50</TableCell>
              <TableCell><Badge variant="warning">Limited</Badge></TableCell>
              <TableCell className="text-right space-x-2">
                <Button size="sm" variant="ghost" leftIcon={Edit2}>Edit</Button>
                <Button size="sm" variant="danger" leftIcon={Trash2}>Delete</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>
    </div>
  );
};

export default DesignSystemShowcase;
