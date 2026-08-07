import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Utensils,
  Search,
  Plus,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Grid,
  Info,
  Sparkles,
} from 'lucide-react';

export const ProductPreviewSection = () => {
  const [activeHotspot, setActiveHotspot] = useState(0);

  const hotspots = [
    {
      id: 0,
      title: 'Real-Time Inventory Metrics',
      desc: 'Track total items, in-stock availability, and sold out alerts dynamically.',
      position: 'top-8 left-8',
    },
    {
      id: 1,
      title: 'Live Debounced Search & Category Pills',
      desc: 'Instant 300ms query filter with category quick-switch pills.',
      position: 'top-32 left-1/3',
    },
    {
      id: 2,
      title: 'Role-Based Action Controls',
      desc: 'Admin permissions enable "+ Add Menu Item", inline editing, and deletion modal.',
      position: 'top-8 right-12',
    },
    {
      id: 3,
      title: 'Catalog Data Table & Grid Views',
      desc: 'Switch between card grid and table list views with price formatting.',
      position: 'bottom-16 left-1/2',
    },
  ];

  return (
    <section id="preview" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary-600/15 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-primary-950/80 text-primary-400 border border-primary-800/60 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Product Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-white">
            Inside The GourmetBite Dashboard
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Hover over the interactive hotspots below to inspect how GourmetBite simplifies restaurant operations.
          </p>
        </div>

        {/* Hotspot Switchers */}
        <div className="flex flex-wrap justify-center gap-3">
          {hotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setActiveHotspot(spot.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeHotspot === spot.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {spot.title}
            </button>
          ))}
        </div>

        {/* Mockup Frame Container */}
        <div className="relative mx-auto max-w-5xl rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl p-4 sm:p-6 space-y-6">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-slate-500 ml-2 font-mono">gourmetbite-dashboard.app</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Role Active</span>
            </div>
          </div>

          {/* Active Hotspot Info Card Box */}
          <div className="p-4 rounded-2xl bg-primary-950/60 border border-primary-800/60 space-y-1">
            <div className="flex items-center space-x-2 text-primary-400 font-bold text-xs">
              <Info className="w-4 h-4" />
              <span>{hotspots[activeHotspot].title}</span>
            </div>
            <p className="text-xs text-slate-300">
              {hotspots[activeHotspot].desc}
            </p>
          </div>

          {/* Dashboard Preview Graphic */}
          <div className="space-y-6 pt-2">
            {/* Stat Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Total Items</span>
                <p className="text-2xl font-extrabold text-white">48</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Available</span>
                <p className="text-2xl font-extrabold text-emerald-400">42</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Sold Out</span>
                <p className="text-2xl font-extrabold text-red-400">6</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Categories</span>
                <p className="text-2xl font-extrabold text-amber-400">7</p>
              </div>
            </div>

            {/* Menu Items Table Mockup */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden divide-y divide-slate-800 text-xs">
              <div className="p-3.5 bg-slate-950 font-bold text-slate-400 flex items-center justify-between">
                <span>ITEM DETAILS</span>
                <span>CATEGORY</span>
                <span>PRICE</span>
                <span>STATUS</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="font-bold text-white">🍕 Truffle Mushroom Pizza</span>
                <span className="text-slate-400">Italian</span>
                <span className="font-extrabold text-primary-400">$24.99</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 font-bold">In Stock</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="font-bold text-white">🍔 Double Cheeseburger</span>
                <span className="text-slate-400">Burger</span>
                <span className="font-extrabold text-primary-400">$16.50</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 font-bold">In Stock</span>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <span className="font-bold text-white">🍰 Lava Molten Cake</span>
                <span className="text-slate-400">Dessert</span>
                <span className="font-extrabold text-primary-400">$9.99</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-red-950 text-red-400 font-bold">Sold Out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreviewSection;
