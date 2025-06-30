
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Target, CheckCircle, ArrowRight, Building, Lightbulb, BarChart3 } from "lucide-react";

const Consulting = () => {
  const consultingServices = [
    {
      title: "Project Feasibility Studies",
      description: "Comprehensive analysis of project viability, cost-benefit analysis, and risk assessment",
      features: ["Market Analysis", "Financial Modeling", "Risk Assessment", "ROI Calculations"]
    },
    {
      title: "Strategic Planning",
      description: "Long-term strategic planning for construction and engineering projects",
      features: ["Goal Setting", "Resource Planning", "Timeline Development", "Milestone Tracking"]
    },
    {
      title: "Technical Advisory",
      description: "Expert technical guidance and recommendations for complex engineering challenges",
      features: ["Technical Reviews", "Design Optimization", "Code Compliance", "Best Practices"]
    },
    {
      title: "Project Management",
      description: "End-to-end project management services from conception to completion",
      features: ["Project Planning", "Team Coordination", "Quality Control", "Progress Monitoring"]
    }
  ];

  const benefits = [
    "Reduced project risks and uncertainties",
    "Optimized resource allocation and cost management",
    "Improved project timelines and delivery",
    "Enhanced quality and compliance standards",
    "Strategic insights and market intelligence",
    "Professional expertise and industry knowledge"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Lightbulb className="w-16 h-16 mx-auto mb-6 text-orange-400" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Engineering <span className="text-orange-400">Consulting</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
              Strategic consulting services to optimize your construction and engineering projects
            </p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Get Expert Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Consulting Services</h2>
            <p className="text-xl text-gray-600">Comprehensive consulting solutions for your engineering needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {consultingServices.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Consulting?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <Target className="w-6 h-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">50+</h3>
                  <p className="text-gray-600">Projects Consulted</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">95%</h3>
                  <p className="text-gray-600">Success Rate</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Building className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">15+</h3>
                  <p className="text-gray-600">Years Experience</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <BarChart3 className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">30%</h3>
                  <p className="text-gray-600">Cost Savings</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consulting;
