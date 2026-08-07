import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Play, CheckCircle2, Utensils, ShieldCheck, TrendingUp, Grid, Check } from 'lucide-react';

const HEADLINES = [
  'Restaurant Menu Management',
  'Manage Menus Easily',
  'One Dashboard For Every Restaurant',
  'Restaurant Operations Simplified',
  'Premium Menu Experience',
];

export const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Natural Typewriter Effect Timer
  useEffect(() => {
    if (subIndex === HEADLINES[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 2200);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % HEADLINES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Glow Gradient Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-primary-500/20 via-amber-500/15 to-emerald-500/20 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Top Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-ping" />
              <span className="text-primary-600 dark:text-primary-400 font-bold">New Version 2.0</span>
              <span className="text-slate-300 dark:text-slate-700">&bull;</span>
              <span>Next-Gen Restaurant OS</span>
            </motion.div>

            {/* Main Headline with Typewriter */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15]">
                Empower Your Business With{' '}
                <span className="block min-h-[1.2em] bg-gradient-to-r from-primary-600 via-amber-500 to-emerald-500 bg-clip-text text-transparent">
                  {`${HEADLINES[index].substring(0, subIndex)}`}
                  <span className="animate-pulse text-primary-600 dark:text-primary-400">|</span>
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Streamline menu availability, instant price updates, category inventory, and team RBAC permissions with a production-grade restaurant engine built for speed.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-xl shadow-primary-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#preview"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              >
                <Play className="w-4 h-4 text-primary-600 fill-primary-600" />
                <span>Explore Interactive Demo</span>
              </a>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>JWT & Swagger OpenAPI Included</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Production Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Glassmorphism Hero Graphic */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Main Card Graphic */}
              <div className="saas-card p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl space-y-6">
                {/* Header Mockup */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-100 dark:bg-primary-950 text-primary-600 flex items-center justify-center font-bold">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        GourmetBite SaaS
                      </h4>
                      <p className="text-[11px] text-slate-500">Live Restaurant Dashboard</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                    Active Catalog
                  </span>
                </div>

                {/* Sample Food Item Row 1 */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 text-xl flex items-center justify-center">
                        🍕
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          Truffle Mushroom Pizza
                        </p>
                        <p className="text-[10px] text-slate-500">Italian &bull; $24.99</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600">
                      In Stock
                    </span>
                  </div>

                  {/* Sample Food Item Row 2 */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-xl flex items-center justify-center">
                        🍔
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                          Wagyu Beef Smash Burger
                        </p>
                        <p className="text-[10px] text-slate-500">Burger &bull; $18.50</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600">
                      In Stock
                    </span>
                  </div>
                </div>

                {/* Stat Micro Indicator */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-primary-500/5 border border-primary-500/20 text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Daily Orders</span>
                    <p className="text-lg font-extrabold text-primary-600">1,482</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Availability</span>
                    <p className="text-lg font-extrabold text-emerald-600">99.4%</p>
                  </div>
                </div>
              </div>

              {/* Floating Glass Pill Top Right */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 hidden sm:flex items-center space-x-3 p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Menu Sales Growth</p>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">+28.4% this month</p>
                </div>
              </motion.div>

              {/* Floating Glass Pill Bottom Left */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-6 hidden sm:flex items-center space-x-3 p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-500/10 text-primary-600 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">RBAC Protection</p>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100">Admin & Staff Access</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
