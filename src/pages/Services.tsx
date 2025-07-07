
import { useState } from "react";
import { Helmet } from 'react-helmet-async';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, TrendingUp, Wrench, CheckCircle, ArrowRight, Award, Shield, Zap, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceRequestForm from "@/components/ServiceRequestForm";

const Services = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);

  const services = [
    {
      id: "structural",
      title: "Structural Engineering",
      description: "Advanced structural analysis and design solutions for all types of construction projects.",
      icon: Building2,
      features: [
        "Seismic Analysis & Design",
        "3D Structural Modeling",
        "Foundation Engineering",
        "Steel & Concrete Design",
        "Structural Health Monitoring",
        "Retrofit & Strengthening"
      ],
      benefits: [
        "Earthquake-resistant structures",
        "Optimized material usage",
        "Cost-effective solutions",
        "Compliance with building codes"
      ],
      price: "From KSh 50,000",
      duration: "2-8 weeks",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "project-management",
      title: "Project Management",
      description: "Comprehensive project oversight ensuring timely delivery and quality execution.",
      icon: Users,
      features: [
        "Project Planning & Scheduling",
        "Resource Management",
        "Quality Control Systems",
        "Risk Assessment & Mitigation",
        "Progress Monitoring",
        "Stakeholder Communication"
      ],
      benefits: [
        "On-time project delivery",
        "Budget optimization",
        "Quality assurance",
        "Reduced project risks"
      ],
      price: "From KSh 100,000",
      duration: "Project duration",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "construction",
      title: "Construction Services",
      description: "Full-scale construction services from groundbreaking to final handover.",
      icon: Wrench,
      features: [
        "Site Preparation & Excavation",
        "Foundation Construction",
        "Structural Construction",
        "MEP Installation",
        "Finishing Works",
        "Landscaping & External Works"
      ],
      benefits: [
        "Turnkey solutions",
        "Quality craftsmanship",
        "Timely completion",
        "Warranty coverage"
      ],
      price: "From KSh 25,000/m²",
      duration: "3-18 months",
      color: "from-orange-500 to-red-500"
    },
    {
      id: "consulting",
      title: "Engineering Consulting",
      description: "Expert technical consulting and advisory services for complex engineering challenges.",
      icon: TrendingUp,
      features: [
        "Feasibility Studies",
        "Technical Due Diligence",
        "Code Compliance Review",
        "Value Engineering",
        "Sustainability Consulting",
        "Expert Witness Services"
      ],
      benefits: [
        "Informed decision making",
        "Risk mitigation",
        "Cost optimization",
        "Regulatory compliance"
      ],
      price: "From KSh 30,000",
      duration: "1-4 weeks",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We discuss your project requirements, goals, and constraints to understand your vision."
    },
    {
      step: "02",
      title: "Proposal & Planning",
      description: "We develop a comprehensive proposal with detailed scope, timeline, and budget."
    },
    {
      step: "03",
      title: "Design & Engineering",
      description: "Our expert team creates detailed designs and engineering solutions for your project."
    },
    {
      step: "04",
      title: "Construction & Delivery",
      description: "We execute the project with precision, maintaining quality and timeline commitments."
    }
  ];

  const whyChooseUs = [
    {
      icon: Award,
      title: "Certified Excellence",
      description: "NCA registered, ISO certified, and LEED accredited professionals."
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous quality control processes and comprehensive warranties."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge technology and sustainable construction practices."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Engineering & Construction Services - AKIBEKS Engineering Solutions</title>
        <meta name="description" content="Comprehensive engineering and construction services in Kenya. Structural engineering, project management, construction, and consulting services with 15+ years of experience." />
        <meta name="keywords" content="engineering services Kenya, construction services, structural engineering, project management, building construction" />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                Comprehensive engineering and construction solutions tailored to your needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
                  <Link to="/create-project">
                    <Plus className="w-5 h-5 mr-2" />
                    Start Your Project
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                  <Link to="/request-quote">Get Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-2">Our Expertise</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Professional Engineering Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From concept to completion, we deliver excellence in every aspect of construction and engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <Card key={service.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Starting from</div>
                          <div className="text-lg font-bold text-gray-900">{service.price}</div>
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <Tabs defaultValue="features" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="features">Features</TabsTrigger>
                          <TabsTrigger value="benefits">Benefits</TabsTrigger>
                        </TabsList>
                        <TabsContent value="features" className="mt-4">
                          <ul className="space-y-2">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                        <TabsContent value="benefits" className="mt-4">
                          <ul className="space-y-2">
                            {service.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                      </Tabs>
                      
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Typical Duration:</span>
                          <span className="font-medium">{service.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-6">
                        <Button className="flex-1 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="outline" onClick={() => setShowRequestForm(true)}>
                          Request Quote
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-100 text-purple-800 px-4 py-2">Our Process</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How We Work
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our proven process ensures successful project delivery from start to finish.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-green-100 text-green-800 px-4 py-2">Why Choose AKIBEKS</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Excellence You Can Trust
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChooseUs.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get in touch with our expert team and let's bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100" asChild>
                <Link to="/create-project">
                  Start Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      {/* Service Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Request Service Quote</h2>
                <Button variant="ghost" onClick={() => setShowRequestForm(false)}>
                  ×
                </Button>
              </div>
              <ServiceRequestForm onSuccess={() => setShowRequestForm(false)} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Services;
