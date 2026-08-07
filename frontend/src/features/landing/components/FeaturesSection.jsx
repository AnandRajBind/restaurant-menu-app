import React from 'react';
import { motion } from 'framer-motion';
import {
  KeyRound,
  ShieldAlert,
  UtensilsCrossed,
  Search,
  Grid,
  Layers,
  Moon,
  Smartphone,
  FileCode,
  Image,
  Lock,
  BarChart3,
} from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      title: 'JWT Authentication',
      desc: 'Secure Bearer token authentication with automated refresh token rotation.',
      icon: KeyRound,
      color: 'text-primary-600 bg-primary-50 dark:bg-primary-950/60',
    },
    {
      title: 'Role-Based Access (RBAC)',
      desc: 'Granular permissions differentiating Restaurant Managers (Admin) and Staff (User).',
      icon: ShieldAlert,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      title: 'Fast Menu CRUD',
      desc: 'Blazing fast item creation, price updates, descriptions, and stock availability toggles.',
      icon: UtensilsCrossed,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60',
    },
    {
      title: 'Live Debounced Search',
      desc: 'Instant query filtering with 300ms debouncing to minimize unnecessary API calls.',
      icon: Search,
      color: 'text-primary-600 bg-primary-50 dark:bg-primary-950/60',
    },
    {
      title: 'Category Management',
      desc: 'Classify items into Pizza, Burger, Chinese, Indian, Italian, Beverages, and Desserts.',
      icon: Grid,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      title: 'Smart Pagination',
      desc: 'Optimized pagination for large menus with configurable page limit parameters.',
      icon: Layers,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60',
    },
    {
      title: 'Light & Dark Mode',
      desc: 'Automatic theme preference detection with smooth CSS token transition.',
      icon: Moon,
      color: 'text-primary-600 bg-primary-50 dark:bg-primary-950/60',
    },
    {
      title: 'Mobile First Design',
      desc: 'Seamless UX across smartphones, tablets, laptops, and desktop displays.',
      icon: Smartphone,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      title: 'Swagger OpenAPI Specs',
      desc: 'Interactive REST API documentation and live endpoint testing portal.',
      icon: FileCode,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60',
    },
    {
      title: 'Multer Image Uploads',
      desc: 'Secure image file upload handling with automatic static file serving.',
      icon: Image,
      color: 'text-primary-600 bg-primary-50 dark:bg-primary-950/60',
    },
    {
      title: 'Protected Dashboard',
      desc: 'Route protection middleware preventing unauthorized access to inventory data.',
      icon: Lock,
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      title: 'Live Stock Analytics',
      desc: 'Real-time stats tracking total items, stock availability, and sold out alerts.',
      icon: BarChart3,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60',
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-xs font-bold text-primary-600 dark:text-primary-400">
            <span>Enterprise Suite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-slate-100">
            Engineered For Modern Restaurant Operations
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Everything your restaurant team needs to manage inventory, catalog pricing, and staff permissions in one unified dashboard.
          </p>
        </div>

        {/* Features 12 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-primary-500/30 transition-all duration-300 space-y-4"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
