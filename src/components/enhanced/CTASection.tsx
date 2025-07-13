
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="40" cy="40" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Get in touch with our expert team today and let's discuss how we can bring your vision to life. 
            Free consultation and project estimates available.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Phone className="w-5 h-5 mr-2" />
              Call Us Now
            </Button>
            
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl transition-all duration-300">
              <Mail className="w-5 h-5 mr-2" />
              Get Free Quote
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Emergency Support</div>
            </div>
            
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">Free</div>
              <div className="text-blue-200">Consultation & Estimates</div>
            </div>
            
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">Licensed</div>
              <div className="text-blue-200">& Fully Insured</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
