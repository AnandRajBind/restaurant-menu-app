import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { menuService } from '../../services/menuService';
import { MENU_CATEGORIES } from '../../utils/constants';
import { Grid, ArrowRight } from 'lucide-react';

export const CategoriesPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await menuService.getAll({ limit: 100 });
        if (res.success && res.data) {
          setItems(res.data.items || []);
        }
      } catch (err) {
        // Silently handle error
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const categoriesWithCounts = MENU_CATEGORIES.filter((c) => c !== 'All').map((cat) => {
    const count = items.filter((item) => item.category === cat).length;
    return { name: cat, count };
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            Category Breakdown
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Organize and review menu item distribution across culinary categories.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoriesWithCounts.map((cat) => (
          <Card key={cat.name} className="hover:border-primary-500 transition-colors">
            <CardHeader
              title={cat.name}
              subtitle={`${cat.count} menu item${cat.count === 1 ? '' : 's'}`}
              action={<Grid className="w-5 h-5 text-primary-600" />}
            />
            <div className="pt-2 flex justify-between items-center">
              <Badge variant={cat.count > 0 ? 'success' : 'neutral'}>
                {cat.count > 0 ? 'Active Category' : 'Empty'}
              </Badge>
              <Link to="/menu">
                <Button size="sm" variant="ghost" rightIcon={ArrowRight}>
                  View Items
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CategoriesPage;
