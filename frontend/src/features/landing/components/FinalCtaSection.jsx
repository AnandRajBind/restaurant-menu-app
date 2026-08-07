import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, LogIn, Sparkles, ShieldCheck } from 'lucide-react';

export const FinalCtaSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-gradient-to-r from-primary-600 via-primary-500 to-amber-600 p-10 md:p-16 text-white text-center space-y-8 shadow-2xl overflow-hidden"
        >
          {/* Subtle Graphic Overlay */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Ready for Production</span>
          </div>

          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight leading-tight">
              Start Managing Your Restaurant Today
            </h2>
            <p className="text-sm sm:text-base text-primary-100 max-w-xl mx-auto leading-relaxed">
              Join top restaurants using GourmetBite for real-time menu availability, instant pricing updates, and enterprise role-based permissions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
            <Link
              to="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-sm font-bold text-primary-600 bg-white hover:bg-slate-100 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Dashboard</span>
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center space-x-2 text-xs text-primary-200 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>100% Secure &bull; OpenAPI Swagger &bull; JWT Protection</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
