
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Pricing = () => {
  const pricingPlans = [
    {
      name: "Basic Consultation",
      price: "KSh 15,000",
      period: "per visit",
      description: "Perfect for initial project assessment and basic consultation needs",
      features: [
        "Site visit and assessment",
        "Basic project consultation",
        "Preliminary cost estimation",
        "Written recommendations",
        "Follow-up meeting"
      ],
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Design & Planning",
      price: "KSh 150,000",
      period: "starting from",
      description: "Comprehensive design and planning services for your construction project",
      features: [
        "Architectural drawings",
        "Structural design",
        "MEP planning",
        "3D visualization",
        "Permit assistance",
        "Material specifications",
        "Timeline planning"
      ],
      popular: true,
      color: "border-orange-500 ring-2 ring-orange-200"
    },
    {
      name: "Full Construction",
      price: "Custom Quote",
      period: "project-based",
      description: "Complete construction services from foundation to finishing",
      features: [
        "Complete project management",
        "Material procurement",
        "Quality construction",
        "Regular progress updates",
        "Quality assurance",
        "Warranty coverage",
        "Post-completion support"
      ],
      popular: false,
      color: "border-gray-200"
    }
  ];

  const additionalServices = [
    { service: "Project Management", price: "8-12% of project value" },
    { service: "Structural Engineering", price: "KSh 80,000 - 200,000" },
    { service: "MEP Design", price: "KSh 120,000 - 300,000" },
    { service: "Interior Design", price: "KSh 50,000 - 150,000" },
    { service: "Landscaping Design", price: "KSh 30,000 - 100,000" },
    { service: "CCTV & Security Systems", price: "KSh 100,000 - 500,000" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Transparent Pricing</h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              Quality construction services with clear, competitive pricing. No hidden costs, just honest value.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.color} ${plan.popular ? 'transform scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-600 text-white px-4 py-1">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-orange-600">{plan.price}</span>
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    </div>
                    <CardDescription className="mt-4">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-800 hover:bg-gray-900'}`}
                      asChild
                    >
                      <a href="/request-quote">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive construction services tailored to your specific needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">{item.service}</h3>
                      <span className="text-orange-600 font-medium">{item.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing FAQ</h2>
              <p className="text-xl text-gray-600">Common questions about our pricing structure</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">How do you calculate construction costs?</h3>
                  <p className="text-gray-600">
                    Our construction costs are calculated based on materials, labor, project complexity, timeline, and location. 
                    We provide detailed breakdowns and transparent pricing with no hidden fees.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Are there any hidden costs?</h3>
                  <p className="text-gray-600">
                    No, we believe in transparent pricing. All potential costs are discussed upfront, and any changes 
                    during the project are communicated and approved before implementation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">What payment terms do you offer?</h3>
                  <p className="text-gray-600">
                    We typically require a 30% deposit to start, with progress payments tied to project milestones. 
                    Final payment is due upon project completion and your satisfaction.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">Do you provide warranties?</h3>
                  <p className="text-gray-600">
                    Yes, we provide comprehensive warranties on our work. Structural work comes with a 5-year warranty, 
                    while finishing work is covered for 2 years.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-orange-100 mb-8">
              Get a personalized quote for your construction project today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="/request-quote">Get Free Quote</a>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-orange-600" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
