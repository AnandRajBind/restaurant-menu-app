import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Github, FileText, Code2, Heart } from 'lucide-react';

export const LandingFooter = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-500 text-white flex items-center justify-center shadow-md">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white">
                Gourmet<span className="text-primary-500">Bite</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Enterprise Restaurant Menu Management System built with React 19, Node.js, Express, MongoDB, and JWT RBAC security.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="http://localhost:5000/api-docs"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors flex items-center space-x-1.5"
                title="Swagger API Documentation"
              >
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-bold">Swagger Docs</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">Product Navigation</p>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-primary-400 transition-colors">Features</a></li>
              <li><a href="#preview" className="hover:text-primary-400 transition-colors">Product Preview</a></li>
              <li><a href="#why-us" className="hover:text-primary-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#categories" className="hover:text-primary-400 transition-colors">Categories</a></li>
              <li><a href="#faq" className="hover:text-primary-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* SaaS Stack & API */}
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">Technology Stack</p>
            <ul className="space-y-2">
              <li><span className="text-slate-400">React 19 & Tailwind CSS</span></li>
              <li><span className="text-slate-400">Node.js & Express REST</span></li>
              <li><span className="text-slate-400">MongoDB Mongoose Schemas</span></li>
              <li><span className="text-slate-400">JWT & Refresh Token Security</span></li>
              <li><span className="text-slate-400">Multer File Upload Engine</span></li>
            </ul>
          </div>

          {/* Account Portal */}
          <div className="space-y-3">
            <p className="font-bold uppercase tracking-wider text-slate-200 text-[11px]">Portal Links</p>
            <ul className="space-y-2">
              <li><Link to="/login" className="hover:text-primary-400 transition-colors">Sign In Portal</Link></li>
              <li><Link to="/register" className="hover:text-primary-400 transition-colors">Register Account</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-400 transition-colors">Admin & Staff Dashboard</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} GourmetBite SaaS. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-0.5" />
            <span>for Modern Restaurant Management.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
