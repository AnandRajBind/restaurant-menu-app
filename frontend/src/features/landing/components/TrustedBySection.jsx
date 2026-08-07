import React from 'react';
import { motion } from 'framer-motion';
import { Star, UtensilsCrossed, Award, Users, MenuSquare } from 'lucide-react';

export const TrustedBySection = () => {
  const stats = [
    { label: 'Active Restaurants', value: '500+', icon: UtensilsCrossed, color: 'text-primary-600' },
    { label: 'Menu Catalog Items', value: '10K+', icon: MenuSquare, color: 'text-amber-500' },
    { label: 'Daily Diners Served', value: '50K+', icon: Users, color: 'text-emerald-600' },
    { label: 'Overall SaaS Rating', value: '4.9/5', icon: Award, color: 'text-primary-500' },
  ];

  const partners = [
    'The Gourmet House',
    'BiteCraft Diner',
    'Urban Spice Kitchen',
    'Saffron Bistro',
    'Flame & Grill Bar',
    'Palace Sweets & Eats',
  ];

  return (
    <section className="py-16 bg-slate-50/80 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Rating Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center space-x-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Trusted by over 500+ Top Enterprise Restaurants & Food Brands Worldwide
          </p>
        </div>

        {/* Animated Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow text-center space-y-2"
              >
                <div className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 mx-auto flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-3xl font-extrabold font-heading text-slate-900 dark:text-slate-100">
                  {stat.value}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Partner Logos Pill Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 opacity-70">
          {partners.map((partner) => (
            <span
              key={partner}
              className="text-xs font-bold font-heading uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              &bull; {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
