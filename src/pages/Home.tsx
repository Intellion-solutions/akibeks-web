
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import ModernHero from "@/components/ModernHero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Award, TrendingUp, ArrowRight, CheckCircle, Star, Quote, Shield, Clock, Zap, Phone, Mail, MapPin, Sparkles, Target, Layers } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const services = [
    {
      title: "Structural Engineering",
      description: "Advanced structural analysis and design with cutting-edge technology and precision.",
      icon: Building2,
      features: ["Seismic Analysis", "3D Modeling", "Foundation Design", "Steel & Concrete"],
      color: "from-blue-400 to-blue-600",
      stats: "500+ Structures"
    },
    {
      title: "Project Management",
      description: "Comprehensive project oversight ensuring quality, timeline, and budget excellence.",
      icon: Users,
      features: ["Digital Planning", "Resource Optimization", "Quality Assurance", "Risk Management"],
      color: "from-sky-400 to-sky-600",
      stats: "98% On-Time"
    },
    {
      title: "Smart Construction",
      description: "Modern construction techniques with IoT integration and sustainable practices.",
      icon: Award,
      features: ["Smart Building Systems", "Green Technology", "Automated Monitoring", "Energy Efficiency"],
      color: "from-cyan-400 to-cyan-600",
      stats: "LEED Certified"
    },
    {
      title: "Engineering Consulting",
      description: "Expert consultation services for complex engineering challenges and optimization.",
      icon: TrendingUp,
      features: ["Feasibility Studies", "Technical Innovation", "Code Compliance", "Performance Optimization"],
      color: "from-indigo-400 to-indigo-600",
      stats: "15+ Years Experience"
    }
  ];

  const testimonials = [
    {
      name: "John Kimani",
      role: "Project Director, Kenya Railways",
      content: "AKIBEKS transformed our vision into reality with exceptional technical expertise and unwavering commitment to excellence. Their innovative approach to railway infrastructure has set new industry standards.",
      rating: 5,
      image: "/api/placeholder/64/64",
      project: "Nairobi Railway Hub"
    },
    {
      name: "Sarah Mwangi",
      role: "CEO, Nairobi Housing Corp",
      content: "The structural engineering solutions provided by AKIBEKS exceeded our expectations. Their use of advanced technology and sustainable practices makes them the go-to partner for modern construction.",
      rating: 5,
      image: "/api/placeholder/64/64",
      project: "Green Valley Residential"
    },
    {
      name: "David Ochieng",
      role: "Municipal Engineer",
      content: "Outstanding engineering consulting services with innovative solutions. AKIBEKS helped streamline our municipal projects while ensuring full regulatory compliance and community satisfaction.",
      rating: 5,
      image: "/api/placeholder/64/64",
      project: "Kisumu Smart City"
    }
  ];

  const projects = [
    {
      title: "Nairobi Innovation Center",
      category: "Commercial",
      description: "State-of-the-art tech hub with smart building systems and sustainable design features.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=300&fit=crop",
      status: "Completed",
      year: "2024",
      value: "KSh 2.5B",
      features: ["Smart Building", "Solar Power", "LEED Gold"]
    },
    {
      title: "Westlands Luxury Residences",
      category: "Residential",
      description: "Premium residential complex with modern amenities and eco-friendly construction.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop",
      status: "In Progress",
      year: "2024",
      value: "KSh 1.8B",
      features: ["Smart Homes", "Green Spaces", "Security Systems"]
    },
    {
      title: "Mombasa Port Expansion",
      category: "Infrastructure",
      description: "Major port infrastructure development enhancing East Africa's trade capabilities.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
      status: "Planning",
      year: "2025",
      value: "KSh 5.2B",
      features: ["Deep Water Berths", "Automated Systems", "Eco-Friendly"]
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Certified Excellence",
      description: "NCA registered, ISO certified, and LEED accredited for guaranteed quality."
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "98% of our projects are delivered on time or ahead of schedule."
    },
    {
      icon: Zap,
      title: "Innovative Solutions",
      description: "Cutting-edge technology and sustainable practices in every project."
    }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Smart Engineering",
      description: "AI-powered design optimization and predictive analytics for superior results."
    },
    {
      icon: Target,
      title: "Precision Delivery",
      description: "Meticulous attention to detail ensuring every project meets exact specifications."
    },
    {
      icon: Layers,
      title: "Integrated Solutions",
      description: "End-to-end services from conceptual design to final construction delivery."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-sky-50/30">
      <Helmet>
        <title>AKIBEKS Engineering Solutions - Leading Construction & Engineering Company in Kenya</title>
        <meta name="description" content="Transform your vision into reality with AKIBEKS Engineering Solutions. Premier construction, structural engineering, and project management services across Kenya with 15+ years of excellence." />
        <meta name="keywords" content="construction Kenya, engineering services, structural design, project management, AKIBEKS, building construction, civil engineering" />
      </Helmet>
      
      <Navbar />
      <ModernHero />
      
      {/* Enhanced Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-blue-50 text-blue-700 px-4 py-2 text-sm font-medium border-blue-200">Innovation First</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Engineering the <span className="text-blue-600">Future</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Combining decades of expertise with cutting-edge technology to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group p-6 rounded-2xl hover:bg-blue-50/50 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-sky-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced with light blue theme */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-50 via-sky-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 px-6 py-2 text-sm font-medium">Why Choose AKIBEKS</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Excellence in Every Detail
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering world-class engineering solutions with unmatched expertise and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group p-6 rounded-2xl hover:bg-white/70 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-sky-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Mobile optimized */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <Badge className="mb-4 bg-sky-100 text-sky-700 px-6 py-2 text-sm font-medium">Our Expertise</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8">
              Engineering Excellence <span className="text-blue-600">Redefined</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Transforming Kenya's infrastructure with innovative engineering solutions, smart technology, and sustainable practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 border-0 bg-white overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="pb-4 relative z-10 p-4 md:p-6">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-base md:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {service.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 hidden sm:block">{service.stats}</Badge>
                  </div>
                  <CardDescription className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative z-10 p-4 md:p-6 pt-0">
                  <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs md:text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-500 mr-2 md:mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm border-blue-200 text-blue-700 text-sm md:text-base"
                    asChild
                  >
                    <Link to="/services">
                      Learn More
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Mobile optimized */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <Badge className="mb-4 bg-blue-200 text-blue-800 px-6 py-2 text-sm font-medium">Get In Touch</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your next project? Contact our team of experts today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <Card className="text-center p-4 md:p-8 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
              <Phone className="w-8 h-8 md:w-12 md:h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-600">+254 123 456 789</p>
            </Card>
            <Card className="text-center p-4 md:p-8 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
              <Mail className="w-8 h-8 md:w-12 md:h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-600">info@akibeks.com</p>
            </Card>
            <Card className="text-center p-4 md:p-8 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-lg transition-shadow">
              <MapPin className="w-8 h-8 md:w-12 md:h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-gray-600">Nairobi, Kenya</p>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/contact">
                Start Your Project Today
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects - Mobile optimized */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <Badge className="mb-4 bg-cyan-100 text-cyan-700 px-6 py-2 text-sm font-medium">Portfolio Showcase</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8">
              Transforming <span className="text-blue-600">Visions</span> into Reality
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Explore our most impactful projects that are reshaping Kenya's landscape with innovation and excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 overflow-hidden border-0 bg-white">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600/90 text-white backdrop-blur-sm">{project.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/95 text-gray-800 backdrop-blur-sm border-white">{project.status}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-2">
                      {project.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-white/95 text-gray-800 backdrop-blur-sm">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <span>{project.year}</span>
                        <span>•</span>
                        <span className="font-semibold">{project.value}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 leading-relaxed">{project.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 border-blue-200 text-blue-700 text-sm md:text-base"
                    asChild
                  >
                    <Link to="/portfolio">
                      View Details
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 md:mt-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/portfolio">
                Explore All Projects
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials - Mobile optimized */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <Badge className="mb-4 bg-blue-200 text-blue-800 px-6 py-2 text-sm font-medium">Client Stories</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8">
              Trusted by <span className="text-blue-600">Industry Leaders</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Hear from our satisfied clients who have experienced the AKIBEKS difference in their projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-4 border-0 bg-white overflow-hidden">
                <CardContent className="p-4 md:p-8">
                  <div className="flex items-center mb-4 md:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 md:w-10 md:h-10 text-blue-200 mb-4 md:mb-6" />
                  <p className="text-sm md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover mr-3 md:mr-4 border-2 border-blue-100"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm md:text-lg">{testimonial.name}</h4>
                        <p className="text-xs md:text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200 hidden sm:block">{testimonial.project}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile optimized */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8">
            Ready to Build the <span className="text-blue-200">Future?</span>
          </h2>
          <p className="text-lg md:text-xl mb-8 md:mb-12 opacity-95 leading-relaxed max-w-3xl mx-auto">
            Join hundreds of satisfied clients who have transformed their visions into reality with AKIBEKS Engineering Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
              asChild
            >
              <Link to="/request-quote">
                Start Your Project
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl transition-all duration-300" 
              asChild
            >
              <Link to="/contact">
                Get Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
