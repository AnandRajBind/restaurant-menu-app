import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CategoriesShowcase = () => {
  const categories = [
    { name: 'Pizza', emoji: '🍕', items: '24 Items', popular: 'Truffle Mushroom' },
    { name: 'Burger', emoji: '🍔', items: '18 Items', popular: 'Wagyu Smash Burger' },
    { name: 'Chinese', emoji: '🥢', items: '32 Items', popular: 'Dim Sum & Hakka' },
    { name: 'Indian', emoji: '🍛', items: '45 Items', popular: 'Butter Chicken Special' },
    { name: 'Italian', emoji: '🍝', items: '20 Items', popular: 'Pesto Fettuccine' },
    { name: 'Beverages', emoji: '🍹', items: '15 Items', popular: 'Artisanal Mocktails' },
    { name: 'Desserts', emoji: '🍰', items: '12 Items', popular: 'Lava Molten Cake' },
  ];

  return (
    <section id="categories" className="py-24 bg-slate-50/80 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-xs font-bold text-amber-600 dark:text-amber-400">
            <span>Menu Classifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-slate-100">
            Organize Every Culinary Category
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Classify and filter dishes across multiple cuisine categories seamlessly.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="group p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 space-y-3 cursor-pointer"
            >
              <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
                {cat.emoji}
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500">{cat.items}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Top seller: {cat.popular}</span>
              </div>
            </motion.div>
          ))}

          {/* Quick CTA Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-500 text-white flex flex-col justify-between space-y-4 shadow-lg shadow-primary-600/20">
            <div>
              <h3 className="text-lg font-bold font-heading">Add Custom Categories</h3>
              <p className="text-xs text-primary-100 mt-1">Create custom food classifications for your restaurant.</p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center space-x-2 text-xs font-bold text-slate-900 bg-white px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors w-fit"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;
