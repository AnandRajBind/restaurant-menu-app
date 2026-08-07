import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does GourmetBite handle Role-Based Access Control (RBAC)?',
      a: 'GourmetBite enforces strict role separation between Admin (Restaurant Manager) and User (Regular Staff). Admins have complete CRUD control to add, update, and delete menu items, while Staff members have secure read-only access for stock checking and customer ordering.',
    },
    {
      q: 'Is authentication secured with JWT and refresh tokens?',
      a: 'Yes! GourmetBite implements industry-standard JWT authentication with bearer tokens, automated refresh token rotation, and salted bcrypt password encryption.',
    },
    {
      q: 'Can I upload food images for custom menu items?',
      a: 'Absolutely. GourmetBite features built-in Multer image upload handling on the Node.js/Express backend with automated static file hosting and default fallback food imagery.',
    },
    {
      q: 'Is Swagger API documentation available?',
      a: 'Yes, interactive Swagger OpenAPI documentation is embedded directly into the backend server at http://localhost:5000/api-docs for instant endpoint inspection and testing.',
    },
    {
      q: 'Is Dark Mode supported across all pages?',
      a: 'Yes, GourmetBite comes with a built-in Dark Mode theme system featuring smooth CSS token transitions tailored for kitchen and manager low-light environments.',
    },
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50/80 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-slate-100">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Everything you need to know about the GourmetBite SaaS platform architecture.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold font-heading text-slate-900 dark:text-slate-100">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-primary-50 dark:bg-primary-950 text-primary-600' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-900 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
