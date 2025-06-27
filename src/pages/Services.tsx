
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Building, Wrench, Zap, Droplets, Calculator, Users } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Home className="w-12 h-12 text-orange-500" />,
      title: "House Construction",
      description: "Complete residential construction from foundation to finishing",
      features: ["Foundation & Structure", "Roofing & Walling", "Interior Finishing", "Landscaping"],
      priceRange: "From KSh 25,000/sqm"
    },
    {
      icon: <Building className="w-12 h-12 text-orange-500" />,
      title: "Commercial Buildings",
      description: "Office complexes, retail spaces, and commercial developments",
      features: ["Office Buildings", "Retail Centers", "Warehouses", "Mixed-Use Developments"],
      priceRange: "From KSh 35,000/sqm"
    },
    {
      icon: <Wrench className="w-12 h-12 text-orange-500" />,
      title: "Civil Works",
      description: "Infrastructure development and civil engineering projects",
      features: ["Road Construction", "Drainage Systems", "Water Supply", "Site Preparation"],
      priceRange: "Custom Pricing"
    },
    {
      icon: <Zap className="w-12 h-12 text-orange-500" />,
      title: "Electrical Works",
      description: "Complete electrical installation and maintenance services",
      features: ["Wiring Installation", "Power Distribution", "Security Systems", "Solar Installation"],
      priceRange: "From KSh 1,500/point"
    },
    {
      icon: <Droplets className="w-12 h-12 text-orange-500" />,
      title: "Plumbing Services",
      description: "Professional plumbing installation and repair services",
      features: ["Water Supply Systems", "Drainage Installation", "Bathroom Fitting", "Pipe Repairs"],
      priceRange: "From KSh 2,000/point"
    },
    {
      icon: <Calculator className="w-12 h-12 text-orange-500" />,
      title: "Quantity Surveying",
      description: "Accurate cost estimation and project financial management",
      features: ["Cost Estimation", "Bill of Quantities", "Value Engineering", "Project Monitoring"],
      priceRange: "From KSh 50,000"
    },
    {
      icon: <Users className="w-12 h-12 text-orange-500" />,
      title: "Project Management",
      description: "End-to-end project coordination and supervision",
      features: ["Project Planning", "Site Supervision", "Quality Control", "Timeline Management"],
      priceRange: "5-10% of project value"
    },
    {
      icon: <Wrench className="w-12 h-12 text-orange-500" />,
      title: "Renovation & Remodeling",
      description: "Transform existing spaces with modern upgrades",
      features: ["Kitchen Renovation", "Bathroom Remodeling", "Extension Works", "Interior Upgrades"],
      priceRange: "From KSh 15,000/sqm"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Comprehensive construction solutions tailored to your specific needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-center">{service.title}</CardTitle>
                  <CardDescription className="text-center">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-3">What's Included:</h4>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <Badge variant="secondary" className="mb-4">{service.priceRange}</Badge>
                    <Button className="w-full" variant="outline" asChild>
                      <Link to="/request-quote">
                        Get Quote <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose BuildCorp?</h2>
            <p className="text-xl text-gray-600">Experience the difference of working with professionals</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">15+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Years of Experience</h3>
              <p className="text-gray-600">Proven track record in delivering quality construction projects</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">500+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Projects Completed</h3>
              <p className="text-gray-600">Successfully delivered projects across Kenya</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">24/7</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
              <p className="text-gray-600">Round-the-clock support for all your construction needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a free consultation and detailed quote for your construction project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/request-quote">
                Request Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
