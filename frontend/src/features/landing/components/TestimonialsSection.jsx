import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Marco Rossi',
      role: 'Executive Chef & Owner',
      restaurant: 'La Trattoria Italia',
      comment:
        'GourmetBite saved our staff hours every week. Updating dish prices and marking sold-out items is done in 2 clicks without confusing our floor team.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Ananya Sharma',
      role: 'General Manager',
      restaurant: 'Royal Saffron Bistro',
      comment:
        'The RBAC permission system is brilliant! Kitchen staff can check live item availability while only managers have permission to create dishes or edit pricing.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'David Chen',
      role: 'Operations Director',
      restaurant: 'Urban Wok Chain',
      comment:
        'Fast, elegant, and 100% production-ready. The Swagger OpenAPI specification and JWT authentication made full stack integration effortless.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-xs font-bold text-primary-600 dark:text-primary-400">
            <span>Verified Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-slate-100">
            Loved By Restaurant Owners & Managers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            See how top food enterprises streamline daily menu operations with GourmetBite.
          </p>
        </div>

        {/* Testimonials 3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-primary-500/20" />
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-primary-500/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center">
                    <span>{item.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 ml-1" />
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {item.role} &bull; <span className="font-semibold text-slate-700 dark:text-slate-300">{item.restaurant}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
