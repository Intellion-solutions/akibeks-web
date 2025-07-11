
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2, Users, Award, CheckCircle, Star, Phone, Mail, MapPin, Clock, Shield, Zap, Target, TrendingUp, Construction, Home as HomeIcon, Factory, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedHero from "@/components/AnimatedHero";
import ServicesCarousel from "@/components/ServicesCarousel";
import SEOHead from "@/components/SEOHead";

const Home = () => {
  const stats = [
    { number: "500+", label: "Projects Completed", icon: Building2 },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "50+", label: "Expert Team", icon: Users },
    { number: "98%", label: "Client Satisfaction", icon: Star }
  ];

  const services = [
    {
      icon: Construction,
      title: "Construction Services",
      description: "Full-scale construction from groundbreaking to final handover with quality craftsmanship.",
      features: ["Residential Building", "Commercial Construction", "Industrial Projects"]
    },
    {
      icon: Wrench,
      title: "Engineering Solutions",
      description: "Advanced engineering solutions for structural, civil, and mechanical projects.",
      features: ["Structural Engineering", "Civil Engineering", "MEP Systems"]
    },
    {
      icon: Users,
      title: "Project Management",
      description: "Comprehensive project oversight ensuring timely delivery and budget control.",
      features: ["Planning & Scheduling", "Quality Control", "Risk Management"]
    },
    {
      icon: Target,
      title: "Consulting Services",
      description: "Expert technical consulting and advisory services for complex challenges.",
      features: ["Feasibility Studies", "Technical Due Diligence", "Value Engineering"]
    }
  ];

  const testimonials = [
    {
      name: "John Kariuki",
      role: "Property Developer",
      content: "AKIBEKS delivered our commercial complex on time and within budget. Their attention to detail and professional approach exceeded our expectations.",
      rating: 5
    },
    {
      name: "Mary Wanjiku",
      role: "Homeowner",
      content: "Building our dream home with AKIBEKS was a smooth experience. They guided us through every step and delivered exceptional quality.",
      rating: 5
    },
    {
      name: "David Mutua",
      role: "Industrial Client",
      content: "Their industrial construction expertise is unmatched. The factory was completed ahead of schedule with superior build quality.",
      rating: 5
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Licensed & Certified",
      description: "Fully licensed by NCA with ISO certifications ensuring compliance and quality."
    },
    {
      icon: Zap,
      title: "Advanced Technology",
      description: "Utilizing cutting-edge construction technology and sustainable building practices."
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Proven track record of delivering projects on time without compromising quality."
    },
    {
      icon: Award,
      title: "Award-Winning Team",
      description: "Industry-recognized professionals with extensive experience and expertise."
    }
  ];

  const industries = [
    { name: "Residential", icon: HomeIcon, projects: "200+" },
    { name: "Commercial", icon: Building2, projects: "150+" },
    { name: "Industrial", icon: Factory, projects: "50+" },
    { name: "Infrastructure", icon: Construction, projects: "100+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <SEOHead />
      <Navbar />
      
      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">About AKIBEKS</Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Building Kenya's Future Since 2008
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 15 years of excellence in construction and engineering, AKIBEKS has established itself as Kenya's premier construction company. We combine traditional craftsmanship with modern technology to deliver exceptional results.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "NCA Licensed and ISO Certified",
                  "500+ Successfully Completed Projects",
                  "Serving clients across East Africa",
                  "Award-winning engineering solutions"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" asChild>
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-blue-100 mb-6">
                  To transform Kenya's landscape through innovative construction solutions, sustainable practices, and unwavering commitment to quality and excellence.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">98%</div>
                    <div className="text-blue-200 text-sm">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">24/7</div>
                    <div className="text-blue-200 text-sm">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-800">Our Services</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Construction Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From residential homes to industrial complexes, we provide end-to-end construction and engineering services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/services">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">Industries</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sectors We Serve
            </h2>
            <p className="text-xl text-gray-600">
              Diverse expertise across multiple construction sectors
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <industry.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                <p className="text-gray-600">{industry.projects} Projects</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800">Why Choose AKIBEKS</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Excellence in Every Project
            </h2>
            <p className="text-xl text-gray-600">
              What sets us apart in the construction industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-white/20 text-white">Client Testimonials</Badge>
            <h2 className="text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-blue-100">
              Trusted by hundreds of satisfied clients across Kenya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/90 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-blue-200 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get in touch with our expert team and let's bring your vision to life with professional construction services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" asChild>
              <Link to="/request-quote">
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" asChild>
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
          
          {/* Quick Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center">
              <Phone className="w-6 h-6 mr-3" />
              <div>
                <div className="font-semibold">Call Us</div>
                <div className="text-orange-100">+254 710 245 118</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="w-6 h-6 mr-3" />
              <div>
                <div className="font-semibold">Email Us</div>
                <div className="text-orange-100">info@akibeks.co.ke</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="w-6 h-6 mr-3" />
              <div>
                <div className="font-semibold">Visit Us</div>
                <div className="text-orange-100">Nairobi, Kenya</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
