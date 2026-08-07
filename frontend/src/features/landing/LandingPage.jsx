import React from 'react';
import { LandingNavbar } from './components/LandingNavbar';
import { HeroSection } from './components/HeroSection';
import { TrustedBySection } from './components/TrustedBySection';
import { FeaturesSection } from './components/FeaturesSection';
import { ProductPreviewSection } from './components/ProductPreviewSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { CategoriesShowcase } from './components/CategoriesShowcase';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { LandingFooter } from './components/LandingFooter';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-primary-500 selection:text-white transition-colors duration-200">
      {/* 1. Sticky Glass Navbar */}
      <LandingNavbar />

      {/* 2. Hero Section with Typewriter Effect */}
      <HeroSection />

      {/* 3. Trusted By & Proof Metrics */}
      <TrustedBySection />

      {/* 4. Features Section (12 Enterprise Icon Cards) */}
      <FeaturesSection />

      {/* 5. Interactive Product Preview */}
      <ProductPreviewSection />

      {/* 6. Why Choose GourmetBite Timeline */}
      <WhyChooseSection />

      {/* 7. Restaurant Categories Showcase */}
      <CategoriesShowcase />

      {/* 8. Testimonials Section */}
      <TestimonialsSection />

      {/* 9. FAQ Accordion Section */}
      <FaqSection />

      {/* 10. Final Call To Action Banner */}
      <FinalCtaSection />

      {/* 11. Premium SaaS Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
