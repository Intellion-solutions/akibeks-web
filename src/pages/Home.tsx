
import React from 'react';
import SEOHead from "@/components/SEOHead";
import ModernHero from "@/components/ModernHero";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <SEOHead
        title="AKIBEKS Engineering - Professional Construction & Engineering Services"
        description="Leading engineering and construction company providing innovative solutions for residential, commercial, and industrial projects."
        keywords="engineering, construction, residential, commercial, industrial, building, infrastructure"
      />

      <ModernHero />

      <Footer />
    </>
  );
};

export default Home;
