
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Calendar, 
  FileText,
  Award,
  Shield,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Wrench,
  Building,
  Hammer,
  Lightbulb,
  Target,
  Globe,
  HeartHandshake
} from "lucide-react";

const services = [
  {
    title: "Residential Construction",
    description: "Complete home construction from foundation to finishing with modern designs",
    image: "/placeholder.svg",
    icon: Building,
    features: ["Custom Design", "Quality Materials", "Timely Delivery"]
  },
  {
    title: "Commercial Projects",
    description: "Office buildings, retail spaces, and commercial infrastructure development",
    image: "/placeholder.svg",
    icon: Building,
    features: ["Professional Standards", "Code Compliance", "Project Management"]
  },
  {
    title: "Civil Engineering",
    description: "Infrastructure development and civil engineering solutions",
    image: "/placeholder.svg",
    icon: Wrench,
    features: ["Site Planning", "Structural Design", "Environmental Compliance"]
  },
  {
    title: "Renovation & Remodeling",
    description: "Transform existing spaces with modern upgrades and improvements",
    image: "/placeholder.svg",
    icon: Hammer,
    features: ["Space Optimization", "Modern Upgrades", "Cost Effective"]
  }
];

const testimonials = [
  {
    name: "John Kimani",
    role: "Homeowner",
    company: "Private Client",
    content: "AKIBEKS delivered our dream home on time and within budget. The attention to detail and quality of work exceeded our expectations. Highly professional team!",
    rating: 5,
    project: "3-Bedroom Villa"
  },
  {
    name: "Sarah Mwangi",
    role: "Operations Manager",
    company: "Tech Innovations Ltd",
    content: "Outstanding work on our office complex. The team maintained excellent communication throughout the project and delivered exceptional results.",
    rating: 5,
    project: "Office Complex"
  },
  {
    name: "David Ochieng",
    role: "Property Developer",
    company: "Ochieng Properties",
    content: "Reliable partner for all our construction projects. Their expertise in both residential and commercial construction is unmatched in Kenya.",
    rating: 5,
    project: "Mixed Development"
  },
  {
    name: "Grace Wanjiku",
    role: "Business Owner",
    company: "Wanjiku Enterprises",
    content: "The renovation of our retail space was completed perfectly. AKIBEKS understood our vision and brought it to life while staying within our budget.",
    rating: 5,
    project: "Retail Space Renovation"
  }
];

const achievements = [
  { number: "500+", label: "Projects Completed", icon: Target },
  { number: "15+", label: "Years Experience", icon: Award },
  { number: "50+", label: "Expert Team", icon: Users },
  { number: "100%", label: "Client Satisfaction", icon: Star }
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed by NCA and insured for your peace of mind"
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for excellence in construction and engineering"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Committed to delivering projects on schedule, every time"
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description: "Your satisfaction is our top priority in everything we do"
  },
  {
    icon: Globe,
    title: "Sustainable Building",
    description: "Eco-friendly construction practices for a better future"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Latest construction technologies and innovative solutions"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "Initial meeting to understand your vision and requirements"
  },
  {
    step: "02",
    title: "Design & Planning",
    description: "Detailed architectural plans and project timeline development"
  },
  {
    step: "03",
    title: "Approval & Permits",
    description: "Handling all necessary permits and regulatory approvals"
  },
  {
    step: "04",
    title: "Construction",
    description: "Professional construction with regular progress updates"
  },
  {
    step: "05",
    title: "Quality Check",
    description: "Thorough inspection and quality assurance testing"
  },
  {
    step: "06",
    title: "Handover",
    description: "Final walkthrough and project completion handover"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Logo variant="white" size="lg" />
            <div className="mt-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Building Excellence,<br />
                <span className="text-orange-400">Engineering Dreams</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
                Kenya's premier construction and engineering company with 15+ years of experience in 
                residential, commercial, and infrastructure projects. Licensed by NCA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8" asChild>
                  <Link to="/request-quote">
                    Get Free Quote <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8" asChild>
                  <Link to="/book-visit">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Site Visit
                  </Link>
                </Button>
              </div>
              
              {/* Quick Contact Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+254 710 245 118</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@akibeks.co.ke</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose AKIBEKS?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in construction and engineering excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-colors">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive construction and engineering solutions tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group">
                <CardHeader className="text-center">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center group-hover:from-orange-50 group-hover:to-orange-100 transition-all duration-300">
                    <service.icon className="w-16 h-16 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-center">{service.description}</CardDescription>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="font-semibold" asChild>
              <Link to="/services">
                View All Services <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to deliver exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((process, index) => (
              <div key={index} className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {process.step}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{process.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{process.description}</p>
                  </div>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-orange-200 transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl opacity-90">Building Kenya's future, one project at a time</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {achievements.map((stat, index) => (
              <div key={index} className="group">
                <div className="mb-4">
                  <stat.icon className="w-12 h-12 mx-auto text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-4xl font-bold text-orange-400 mb-2">{stat.number}</div>
                <div className="text-xl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real experiences from satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                    <Badge variant="secondary" className="mt-2">
                      {testimonial.project}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/testimonials">
                View All Testimonials <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Logo variant="white" size="md" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get a free consultation and quote for your construction project today. 
            Join hundreds of satisfied clients who trust AKIBEKS Engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-semibold px-8" asChild>
              <Link to="/request-quote">
                Request Free Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500 font-semibold px-8" asChild>
              <Link to="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Contact Us Now
              </Link>
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-orange-400/30">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+254 710 245 118</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@akibeks.co.ke</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
