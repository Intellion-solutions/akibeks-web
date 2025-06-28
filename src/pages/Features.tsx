
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Award, 
  Clock, 
  HeartHandshake, 
  Globe, 
  Lightbulb,
  Users,
  Building,
  Wrench,
  Calculator,
  FileText,
  Calendar,
  Phone,
  Mail,
  Camera,
  Star,
  TrendingUp,
  CheckCircle,
  Target,
  Zap,
  Settings,
  Database,
  BarChart,
  Smartphone,
  Wifi,
  Lock
} from "lucide-react";

const features = [
  {
    category: "Core Services",
    items: [
      {
        icon: Building,
        title: "Residential Construction",
        description: "Complete home construction from foundation to finishing with modern architectural designs.",
        highlights: ["Custom Design", "Quality Materials", "Timely Delivery", "NCA Certified"]
      },
      {
        icon: Building,
        title: "Commercial Projects", 
        description: "Office buildings, retail spaces, and commercial infrastructure development.",
        highlights: ["Professional Standards", "Code Compliance", "Project Management", "Licensed"]
      },
      {
        icon: Wrench,
        title: "Civil Engineering",
        description: "Infrastructure development and comprehensive civil engineering solutions.",
        highlights: ["Site Planning", "Structural Design", "Environmental Compliance", "Expert Team"]
      }
    ]
  },
  {
    category: "Technology & Innovation",
    items: [
      {
        icon: Smartphone,
        title: "Mobile-First Design",
        description: "Fully responsive website that works perfectly on all devices and screen sizes.",
        highlights: ["Responsive Design", "Touch Optimized", "Fast Loading", "Cross-Platform"]
      },
      {
        icon: Database,
        title: "Advanced Admin Panel",
        description: "Comprehensive management system for projects, clients, quotes, and invoices.",
        highlights: ["Project Tracking", "Client Management", "Financial Reports", "User Roles"]
      },
      {
        icon: FileText,
        title: "Document Templates",
        description: "Professional templates for quotes, invoices, receipts, and delivery notes.",
        highlights: ["Professional Design", "Customizable", "PDF Export", "Brand Consistent"]
      }
    ]
  },
  {
    category: "Client Experience",
    items: [
      {
        icon: Calculator,
        title: "Online Quote Request",
        description: "Easy-to-use form for clients to request detailed project quotations.",
        highlights: ["Instant Submission", "Detailed Forms", "File Uploads", "Quick Response"]
      },
      {
        icon: Calendar,
        title: "Site Visit Booking",
        description: "Convenient online booking system for site visits and consultations.",
        highlights: ["Calendar Integration", "Time Slots", "Confirmation Emails", "Reminders"]
      },
      {
        icon: Phone,
        title: "Multi-Channel Contact",
        description: "Multiple ways to reach us including phone, email, and contact forms.",
        highlights: ["24/7 Support", "Quick Response", "Professional Service", "Local Presence"]
      }
    ]
  },
  {
    category: "Quality Assurance",
    items: [
      {
        icon: Shield,
        title: "Licensed & Insured",
        description: "Fully licensed by NCA and comprehensively insured for your peace of mind.",
        highlights: ["NCA Registered", "Full Insurance", "Legal Compliance", "Professional Standards"]
      },
      {
        icon: Award,
        title: "ISO Certified",
        description: "International quality standards certification ensuring excellence in all projects.",
        highlights: ["Quality Management", "Process Excellence", "Continuous Improvement", "Global Standards"]
      },
      {
        icon: CheckCircle,
        title: "Quality Control",
        description: "Rigorous quality checks at every stage of construction and project delivery.",
        highlights: ["Stage Inspections", "Material Testing", "Progress Monitoring", "Final Validation"]
      }
    ]
  },
  {
    category: "Sustainability",
    items: [
      {
        icon: Globe,
        title: "Eco-Friendly Practices",
        description: "Sustainable construction methods and environmentally responsible building practices.",
        highlights: ["Green Materials", "Energy Efficient", "Waste Reduction", "Environmental Care"]
      },
      {
        icon: Lightbulb,
        title: "Innovation Focus",
        description: "Latest construction technologies and innovative building solutions.",
        highlights: ["Modern Techniques", "Smart Building", "Technology Integration", "Future-Ready"]
      },
      {
        icon: Target,
        title: "Precision Engineering",
        description: "Accurate measurements, precise planning, and exact implementation.",
        highlights: ["Detailed Planning", "Accurate Estimates", "Precise Execution", "Perfect Results"]
      }
    ]
  },
  {
    category: "Customer Service",
    items: [
      {
        icon: HeartHandshake,
        title: "Customer-Centric",
        description: "Your satisfaction is our top priority with personalized service approach.",
        highlights: ["Personal Attention", "Custom Solutions", "Regular Updates", "100% Satisfaction"]
      },
      {
        icon: Clock,
        title: "On-Time Delivery",
        description: "Committed to delivering all projects on schedule with transparent timelines.",
        highlights: ["Timeline Adherence", "Progress Tracking", "Milestone Updates", "Reliable Delivery"]
      },
      {
        icon: TrendingUp,
        title: "Continuous Improvement",
        description: "Always striving to improve our services and exceed client expectations.",
        highlights: ["Feedback Integration", "Service Enhancement", "Skill Development", "Best Practices"]
      }
    ]
  }
];

const stats = [
  { number: "500+", label: "Projects Completed", icon: Target },
  { number: "15+", label: "Years Experience", icon: Award },
  { number: "50+", label: "Expert Team", icon: Users },
  { number: "100%", label: "Client Satisfaction", icon: Star }
];

const Features = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Logo variant="white" size="lg" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-8">
            Comprehensive Features & <span className="text-orange-400">Capabilities</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Discover all the advanced features and services that make AKIBEKS Engineering 
            your ideal partner for construction and engineering projects
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-orange-400" />
                <div className="text-2xl md:text-3xl font-bold text-orange-400">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {features.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {category.category}
                </h2>
                <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((feature, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-colors">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center mb-6 text-gray-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                      
                      {/* Feature Highlights */}
                      <div className="space-y-2">
                        {feature.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Technology Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge tools and systems that enhance our service delivery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Wifi,
                title: "Real-time Updates",
                description: "Live project progress tracking and instant notifications"
              },
              {
                icon: Lock,
                title: "Secure Platform",
                description: "Enterprise-grade security for all client data and documents"
              },
              {
                icon: BarChart,
                title: "Analytics Dashboard",
                description: "Comprehensive reporting and business intelligence tools"
              },
              {
                icon: Zap,
                title: "Fast Performance",
                description: "Optimized for speed with lightning-fast loading times"
              },
              {
                icon: Settings,
                title: "Customizable",
                description: "Tailored solutions to meet specific client requirements"
              },
              {
                icon: Database,
                title: "Data Management",
                description: "Robust database systems for reliable data storage"
              },
              {
                icon: FileText,
                title: "Document Control",
                description: "Version control and document management systems"
              },
              {
                icon: Users,
                title: "Collaborative Tools",
                description: "Team collaboration features for better project coordination"
              }
            ].map((tech, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                  <tech.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{tech.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Logo variant="white" size="md" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-6">
            Experience All These Features Today
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join hundreds of satisfied clients who have experienced the excellence of 
            AKIBEKS Engineering Solutions. Start your project with us today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-semibold px-8" asChild>
              <Link to="/request-quote">
                Get Free Quote
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500 font-semibold px-8" asChild>
              <Link to="/contact">
                Contact Us Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
