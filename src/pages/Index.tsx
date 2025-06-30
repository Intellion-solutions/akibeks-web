
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import ScrollToTop from "@/components/ScrollToTop";
import ProjectSlideshow from "@/components/ProjectSlideshow";
import SEOHead from "@/components/SEOHead";
import AnimatedCounter from "@/components/AnimatedCounter";
import ServicesCarousel from "@/components/ServicesCarousel";
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
  HeartHandshake,
  PlayCircle,
  Quote,
  ThumbsUp,
  Zap
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
      <SEOHead />
      <Navbar />
      <ScrollToTop />
      
      {/* Enhanced Hero Section with Bigger Logo */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 animate-fade-in">
            {/* Enhanced Logo Section */}
            <div className="mb-12">
              <div className="flex justify-center mb-8">
                <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 flex-shrink-0 transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="/lovable-uploads/36449ecf-a66d-4784-8ffb-6eb18390ec8f.png" 
                    alt="AKIBEKS Engineering Solutions"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent leading-tight">
                  AKIBEKS
                </h1>
                <div className="text-2xl md:text-4xl font-semibold text-orange-400 tracking-widest">
                  ENGINEERING SOLUTIONS
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Building Excellence,<br />
                <span className="text-orange-400 animate-pulse">Engineering Dreams</span>
              </h2>
              <p className="text-xl md:text-2xl mb-12 max-w-5xl mx-auto leading-relaxed opacity-90">
                Kenya's premier construction and engineering company with 15+ years of experience in 
                residential, commercial, and infrastructure projects. Licensed by NCA.
              </p>
              
              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-12 py-6 text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl rounded-full" asChild>
                  <Link to="/request-quote">
                    Get Free Quote <ArrowRight className="w-6 h-6 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-12 py-6 text-xl transform hover:scale-105 transition-all duration-300 rounded-full backdrop-blur-sm" asChild>
                  <Link to="/book-visit">
                    <Calendar className="w-6 h-6 mr-2" />
                    Book Site Visit
                  </Link>
                </Button>
              </div>
              
              {/* Enhanced Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <Phone className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">Call Us</div>
                      <div className="text-orange-200">+254 710 245 118</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <Mail className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">Email Us</div>
                      <div className="text-orange-200">info@akibeks.co.ke</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg">Visit Us</div>
                      <div className="text-orange-200">Nairobi, Kenya</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video CTA */}
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <Button variant="ghost" className="text-white hover:text-orange-300 flex items-center gap-2 text-lg">
                  <PlayCircle className="w-8 h-8" />
                  Watch Our Story
                </Button>
                <div className="hidden sm:block w-px h-8 bg-white/30"></div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-lg font-medium">4.9/5 Customer Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Slideshow Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our latest construction achievements across Kenya
            </p>
          </div>
          <ProjectSlideshow />
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Achievements</h2>
            <p className="text-xl opacity-90">Building Kenya's future, one project at a time</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group transform hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <Target className="w-16 h-16 mx-auto text-orange-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <AnimatedCounter end={500} suffix="+" />
              <div className="text-xl mt-2">Projects Completed</div>
            </div>
            <div className="group transform hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <Award className="w-16 h-16 mx-auto text-orange-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <AnimatedCounter end={15} suffix="+" />
              <div className="text-xl mt-2">Years Experience</div>
            </div>
            <div className="group transform hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <Users className="w-16 h-16 mx-auto text-orange-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <AnimatedCounter end={50} suffix="+" />
              <div className="text-xl mt-2">Expert Team</div>
            </div>
            <div className="group transform hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <ThumbsUp className="w-16 h-16 mx-auto text-orange-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <AnimatedCounter end={100} suffix="%" />
              <div className="text-xl mt-2">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive construction and engineering solutions tailored to your needs
            </p>
          </div>
          <ServicesCarousel />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose AKIBEKS?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in construction and engineering excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-all duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-orange-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach to deliver exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((process, index) => (
              <div key={index} className="relative group animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-start p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                      {process.step}
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">{process.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{process.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real experiences from satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 group animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-12 h-12 text-orange-500 mb-4 opacity-20" />
                  <p className="text-gray-600 mb-6 italic text-lg leading-relaxed">"{testimonial.content}"</p>
                  <div className="border-t pt-6">
                    <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-500">{testimonial.role}</div>
                    <div className="text-gray-500">{testimonial.company}</div>
                    <Badge variant="secondary" className="mt-3 bg-orange-100 text-orange-800">
                      {testimonial.project}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group" asChild>
              <Link to="/testimonials">
                View All Testimonials 
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 animate-fade-in">
            <Logo variant="white" size="md" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Get a free consultation and quote for your construction project today. 
            Join hundreds of satisfied clients who trust AKIBEKS Engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" variant="secondary" className="font-semibold px-12 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl" asChild>
              <Link to="/request-quote">
                Request Free Quote <ArrowRight className="w-6 h-6 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-500 font-semibold px-12 py-4 text-lg transform hover:scale-105 transition-all duration-300" asChild>
              <Link to="/contact">
                <Phone className="w-6 h-6 mr-2" />
                Contact Us Now
              </Link>
            </Button>
          </div>
          
          {/* Enhanced Contact Info */}
          <div className="mt-16 pt-8 border-t border-orange-400/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="font-medium">+254 710 245 118</span>
                <span className="text-sm opacity-80">24/7 Support</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="font-medium">info@akibeks.co.ke</span>
                <span className="text-sm opacity-80">Quick Response</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="font-medium">Nairobi, Kenya</span>
                <span className="text-sm opacity-80">Multiple Locations</span>
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
