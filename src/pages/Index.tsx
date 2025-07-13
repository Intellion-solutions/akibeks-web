
import React from 'react';
import SEOHead from '@/components/SEOHead';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/enhanced/HeroSection';
import ServicesSection from '@/components/enhanced/ServicesSection';
import TestimonialsSection from '@/components/enhanced/TestimonialsSection';
import CTASection from '@/components/enhanced/CTASection';

const Index = () => {
  return (
    <>
      <SEOHead 
        title="AKIBEKS Engineering Solutions - Professional Construction & Engineering Services"
        description="Leading engineering and construction company in Kenya. Specializing in residential, commercial, and industrial projects with over 15 years of excellence."
        keywords="construction, engineering, Kenya, building, architecture, contractor"
      />
      
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main>
          <HeroSection />
          <ServicesSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
