import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, Layers, Rocket } from 'lucide-react';

export const WhyChooseSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Effortless Menu Inventory Control',
      desc: 'Update prices, description notes, food categories, and stock availability instantly without reloading the browser.',
      icon: Zap,
      color: 'border-l-primary-600',
    },
    {
      number: '02',
      title: 'Enterprise JWT Security & RBAC',
      desc: 'State-of-the-art authentication with access token rotation, bcrypt password hashing, and role-scoped permissions.',
      icon: ShieldCheck,
      color: 'border-l-emerald-600',
    },
    {
      number: '03',
      title: 'State-of-the-Art SaaS Dashboard',
      desc: 'Designed following an 8px grid system, sleek glassmorphism, dark mode toggle, and micro-interactions.',
      icon: Layers,
      color: 'border-l-amber-500',
    },
    {
      number: '04',
      title: 'Scalable & Clean Architecture',
      desc: 'Modular React 19 codebase structured by domain feature folders, reusable hooks, and clean REST services.',
      icon: Rocket,
      color: 'border-l-primary-600',
    },
    {
      number: '05',
      title: '100% Production-Ready Engine',
      desc: 'Full OpenAPI Swagger documentation, Multer image upload handling, and zero dead code footprint.',
      icon: CheckCircle2,
      color: 'border-l-emerald-600',
    },
  ];

  return (
    <section id="why-us" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span>Why GourmetBite</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-slate-100">
            Built For Speed, Reliability & Precision
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Designed to empower restaurant managers and staff with a frictionless menu management system.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-lg transition-all border-l-4 ${step.color} space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-heading text-slate-300 dark:text-slate-700">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-slate-100">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
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

export default WhyChooseSection;
