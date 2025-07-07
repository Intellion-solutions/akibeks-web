import { Helmet } from 'react-helmet-async';
import ModernHero from "@/components/ModernHero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Award, TrendingUp, ArrowRight, CheckCircle, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const services = [
    {
      title: "Structural Engineering",
      description: "Comprehensive structural analysis and design for buildings, bridges, and infrastructure projects.",
      icon: Building2,
      features: ["Seismic Analysis", "Load Calculations", "Foundation Design", "Steel & Concrete Structures"],
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Project Management",
      description: "End-to-end project management ensuring timely delivery and quality execution.",
      icon: Users,
      features: ["Timeline Management", "Resource Planning", "Quality Control", "Risk Assessment"],
      color: "from-green-500 to-green-700"
    },
    {
      title: "Construction Services",
      description: "Full-scale construction services from groundbreaking to final handover.",
      icon: Award,
      features: ["Site Preparation", "Building Construction", "Infrastructure Development", "Renovation"],
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Engineering Consulting",
      description: "Expert technical consulting and advisory services for complex engineering challenges.",
      icon: TrendingUp,
      features: ["Feasibility Studies", "Technical Reviews", "Code Compliance", "Optimization"],
      color: "from-orange-500 to-orange-700"
    }
  ];

  const testimonials = [
    {
      name: "John Kimani",
      role: "Project Director, Kenya Railways",
      content: "AKIBEKS delivered exceptional results on our railway infrastructure project. Their technical expertise and project management skills are unmatched.",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "Sarah Mwangi",
      role: "CEO, Nairobi Housing Corp",
      content: "The structural engineering solutions provided by AKIBEKS exceeded our expectations. Professional, reliable, and innovative.",
      rating: 5,
      image: "/api/placeholder/64/64"
    },
    {
      name: "David Ochieng",
      role: "Municipal Engineer",
      content: "Outstanding engineering consulting services. AKIBEKS helped us navigate complex regulatory requirements with ease.",
      rating: 5,
      image: "/api/placeholder/64/64"
    }
  ];

  const projects = [
    {
      title: "Nairobi Convention Center",
      category: "Commercial",
      description: "State-of-the-art convention facility with advanced structural engineering solutions.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop",
      status: "Completed",
      year: "2023"
    },
    {
      title: "Riverside Residential Complex",
      category: "Residential",
      description: "Modern residential complex with sustainable design and innovative construction methods.",
      image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?w=500&h=300&fit=crop",
      status: "In Progress",
      year: "2024"
    },
    {
      title: "Mombasa Bridge Infrastructure",
      category: "Infrastructure",
      description: "Critical bridge infrastructure project enhancing transportation connectivity.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&h=300&fit=crop",
      status: "Planning",
      year: "2024"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>AKIBEKS Engineering Solutions - Leading Construction & Engineering Company in Kenya</title>
        <meta name="description" content="Professional engineering and construction services in Kenya. Structural engineering, project management, and construction solutions by AKIBEKS Engineering Solutions." />
      </Helmet>
      
      <Navbar />
      <ModernHero />
      
      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">Our Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Engineering Excellence in Every Project
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive engineering and construction services tailored to meet your specific needs and exceed expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 px-4 py-2">Our Work</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover some of our most impactful engineering and construction projects across Kenya.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/70 text-white">{project.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90 text-gray-800">{project.status}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                    View Project
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 px-4 py-2">Client Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say about our work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-gray-300 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
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
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl">
              <Link to="/testimonials">
                Read More Testimonials
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Get in touch with our expert team today and discover how we can bring your engineering vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg" asChild>
              <Link to="/request-quote">
                Request a Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold rounded-xl" asChild>
              <Link to="/contact">
                Contact Us
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
