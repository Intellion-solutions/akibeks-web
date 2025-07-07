
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import { 
  Building2, 
  Wrench, 
  Zap, 
  Droplets, 
  HardHat, 
  ClipboardCheck,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

const Services = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);

  const services = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Construction Services",
      description: "Complete building construction from foundation to finishing, including residential, commercial, and industrial projects.",
      features: ["New Construction", "Foundation Work", "Structural Work", "Finishing"],
      price: "From KSh 25,000/sqm",
      popular: true
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Renovation & Remodeling",
      description: "Transform existing spaces with modern designs and improved functionality.",
      features: ["Interior Renovation", "Exterior Upgrades", "Kitchen & Bathroom", "Space Optimization"],
      price: "From KSh 15,000/sqm",
      popular: false
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Electrical Services",
      description: "Professional electrical installation, maintenance, and safety inspections.",
      features: ["Wiring Installation", "Panel Upgrades", "Safety Inspections", "Smart Home Setup"],
      price: "From KSh 5,000",
      popular: false
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Plumbing Services",
      description: "Complete plumbing solutions for residential and commercial properties.",
      features: ["Pipe Installation", "Water Systems", "Drainage Solutions", "Emergency Repairs"],
      price: "From KSh 3,000",
      popular: false
    },
    {
      icon: <HardHat className="w-8 h-8" />,
      title: "Civil Engineering",
      description: "Structural design, site surveys, and engineering consultations.",
      features: ["Structural Design", "Site Surveys", "Soil Testing", "Engineering Reports"],
      price: "From KSh 50,000",
      popular: false
    },
    {
      icon: <ClipboardCheck className="w-8 h-8" />,
      title: "Project Management",
      description: "End-to-end project management ensuring timely completion within budget.",
      features: ["Project Planning", "Timeline Management", "Quality Control", "Budget Management"],
      price: "5-10% of project cost",
      popular: true
    }
  ];

  const benefits = [
    "Licensed and Insured Professionals",
    "Quality Materials and Workmanship",
    "Transparent Pricing",
    "Timely Project Completion",
    "24/7 Customer Support",
    "Warranty on All Work"
  ];

  return (
    <>
      <SEOHead 
        title="Professional Construction Services | AKIBEKS Engineering"
        description="Comprehensive construction, renovation, electrical, plumbing, and civil engineering services. Licensed professionals delivering quality results on time and within budget."
        keywords="construction services, renovation, electrical, plumbing, civil engineering, project management, Kenya construction"
      />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Professional Construction Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                From concept to completion, we deliver exceptional construction solutions 
                tailored to your needs and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-900 hover:bg-blue-50"
                  onClick={() => setShowRequestForm(true)}
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive construction solutions delivered by experienced professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="relative hover:shadow-xl transition-shadow duration-300">
                  {service.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-orange-500">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-lg text-blue-600">
                            {service.price}
                          </span>
                          <Button 
                            onClick={() => setShowRequestForm(true)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Get Quote
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose AKIBEKS?
              </h2>
              <p className="text-xl text-gray-600">
                We're committed to delivering exceptional results that exceed expectations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Request Form */}
        {showRequestForm && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Request Our Services
                </h2>
                <p className="text-xl text-gray-600">
                  Get a personalized quote for your project
                </p>
              </div>
              
              <ServiceRequestForm />
              
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setShowRequestForm(false)}
                >
                  Hide Form
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contact us today for a free consultation and detailed quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => setShowRequestForm(true)}
              >
                Get Free Quote
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Call +254 700 000 000
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Services;
