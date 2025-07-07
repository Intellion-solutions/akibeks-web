
import { Helmet } from 'react-helmet-async';
import ModernHero from "@/components/ModernHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Award, TrendingUp, ArrowRight, CheckCircle, Star, Quote, Shield, Clock, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const services = [
    {
      title: "Structural Engineering",
      description: "Advanced structural analysis and design with cutting-edge technology and precision.",
      icon: Building2,
      features: ["Seismic Analysis", "3D Modeling", "Foundation Design", "Steel & Concrete"],
      color: "from-blue-500 to-cyan-500",
      stats: "500+ Structures"
    },
    {
      title: "Project Management",
      description: "Comprehensive project oversight ensuring quality, timeline, and budget excellence.",
      icon: Users,
      features: ["Digital Planning", "Resource Optimization", "Quality Assurance", "Risk Management"],
      color: "from-green-500 to-emerald-500",
      stats: "98% On-Time"
    },
    {
      title: "Smart Construction",
      description: "Modern construction techniques with IoT integration and sustainable practices.",
      icon: Award,
      features: ["Smart Building Systems", "Green Technology", "Automated Monitoring", "Energy Efficiency"],
      color: "from-purple-500 to-indigo-500",
      stats: "LEED Certified"
    },
    {
      title: "Engineering Consulting",
      description: "Expert consultation services for complex engineering challenges and optimization.",
      icon: TrendingUp,
      features: ["Feasibility Studies", "Technical Innovation", "Code Compliance", "Performance Optimization"],
      color: "from-orange-500 to-red-500",
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

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>AKIBEKS Engineering Solutions - Leading Construction & Engineering Company in Kenya</title>
        <meta name="description" content="Transform your vision into reality with AKIBEKS Engineering Solutions. Premier construction, structural engineering, and project management services across Kenya with 15+ years of excellence." />
        <meta name="keywords" content="construction Kenya, engineering services, structural design, project management, AKIBEKS, building construction, civil engineering" />
      </Helmet>
      
      <Navbar />
      <ModernHero />
      
      {/* Why Choose Us - New Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">Why Choose AKIBEKS</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Excellence in Every Detail
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 px-4 py-2">Our Expertise</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Engineering Excellence Redefined
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming Kenya's infrastructure with innovative engineering solutions, smart technology, and sustainable practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-white overflow-hidden">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  <CardHeader className="pb-4 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">{service.stats}</Badge>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 px-4 py-2">Portfolio Showcase</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transforming Visions into Reality
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our most impactful projects that are reshaping Kenya's landscape with innovation and excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border-0 bg-white">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/70 text-white backdrop-blur-sm">{project.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90 text-gray-800 backdrop-blur-sm">{project.status}</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      {project.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-white/90 text-gray-800">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{project.year}</span>
                        <span>•</span>
                        <span>{project.value}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/projects">
                Explore All Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-800 px-4 py-2">Client Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied clients who have experienced the AKIBEKS difference in their projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">{testimonial.project}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build the Future?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their visions into reality with AKIBEKS Engineering Solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <Link to="/create-project">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300" asChild>
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

export default Index;
