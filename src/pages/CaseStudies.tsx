
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, DollarSign, Users, Clock, Award, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const CaseStudies = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const caseStudies = [
    {
      id: 1,
      title: "Westlands Corporate Tower",
      category: "Commercial",
      client: "Kenya Commercial Bank",
      location: "Westlands, Nairobi",
      duration: "18 months",
      budget: "KSh 2.5 Billion",
      completion: "2024",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
      description: "35-story modern office complex with smart building technology and sustainable design features.",
      challenges: [
        "Complex foundation work in urban environment",
        "Integration of smart building systems",
        "Coordination with multiple stakeholders"
      ],
      solutions: [
        "Advanced pile foundation technique",
        "Phased construction approach",
        "Digital project management platform"
      ],
      results: [
        "Completed 2 months ahead of schedule",
        "15% energy efficiency improvement",
        "LEED Gold certification achieved"
      ],
      awards: ["Best Commercial Building 2024", "Sustainable Design Award"]
    },
    {
      id: 2,
      title: "Kileleshwa Luxury Residences",
      category: "Residential",
      client: "Suraya Property Group",
      location: "Kileleshwa, Nairobi",
      duration: "14 months",
      budget: "KSh 800 Million",
      completion: "2023",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
      description: "High-end residential complex with 120 apartments featuring modern amenities and green spaces.",
      challenges: [
        "Limited site access",
        "Maintaining luxury standards",
        "Environmental regulations compliance"
      ],
      solutions: [
        "Innovative construction sequencing",
        "Quality control protocols",
        "Environmental impact mitigation"
      ],
      results: [
        "100% occupancy within 6 months",
        "Client satisfaction rating: 98%",
        "Zero safety incidents"
      ],
      awards: ["Residential Excellence Award"]
    },
    {
      id: 3,
      title: "Mombasa Industrial Complex",
      category: "Industrial",
      client: "East Africa Cement Ltd",
      location: "Mombasa, Kenya",
      duration: "20 months",
      budget: "KSh 1.8 Billion",
      completion: "2024",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
      description: "State-of-the-art cement manufacturing facility with automated systems and environmental controls.",
      challenges: [
        "Heavy machinery installation",
        "Dust control and environmental protection",
        "Complex utility infrastructure"
      ],
      solutions: [
        "Specialized equipment handling",
        "Advanced dust suppression systems",
        "Integrated utility planning"
      ],
      results: [
        "Production capacity: 2M tons/year",
        "40% reduction in emissions",
        "Created 200+ permanent jobs"
      ],
      awards: ["Industrial Innovation Award", "Environmental Excellence"]
    },
    {
      id: 4,
      title: "Nakuru Highway Bridge",
      category: "Infrastructure",
      client: "Kenya National Highways Authority",
      location: "Nakuru, Kenya",
      duration: "16 months",
      budget: "KSh 600 Million",
      completion: "2023",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop",
      description: "Modern cable-stayed bridge improving traffic flow and regional connectivity.",
      challenges: [
        "Complex foundation in river environment",
        "Minimal traffic disruption",
        "Weather-dependent construction"
      ],
      solutions: [
        "Innovative foundation design",
        "Phased construction methodology",
        "Weather monitoring systems"
      ],
      results: [
        "Reduced travel time by 30%",
        "Enhanced regional connectivity",
        "Minimal environmental impact"
      ],
      awards: ["Engineering Excellence Award"]
    }
  ];

  const categories = ["All", "Commercial", "Residential", "Industrial", "Infrastructure"];

  const filteredStudies = selectedCategory === "All" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <SEOHead 
        title="Case Studies - AKIBEKS Engineering Solutions"
        description="Explore our successful construction and engineering projects. Detailed case studies showcasing our expertise and achievements."
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Case Studies
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Discover how we've delivered exceptional results for our clients through innovative solutions and expert execution
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-2"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredStudies.map((study) => (
              <Card key={study.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white">{study.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">{study.completion}</Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors">
                    {study.title}
                  </CardTitle>
                  <p className="text-gray-600">{study.description}</p>
                  
                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {study.client}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {study.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {study.duration}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {study.budget}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="challenges">Challenges</TabsTrigger>
                      <TabsTrigger value="solutions">Solutions</TabsTrigger>
                      <TabsTrigger value="results">Results</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="mt-4">
                      <p className="text-gray-600 mb-4">{study.description}</p>
                      {study.awards.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center">
                            <Award className="w-4 h-4 mr-2 text-yellow-500" />
                            Awards & Recognition
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {study.awards.map((award, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {award}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="challenges" className="mt-4">
                      <ul className="space-y-2">
                        {study.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="solutions" className="mt-4">
                      <ul className="space-y-2">
                        {study.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="results" className="mt-4">
                      <ul className="space-y-2">
                        {study.results.map((result, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 pt-4 border-t">
                    <Button className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors" asChild>
                      <Link to={`/case-studies/${study.id}`}>
                        View Full Case Study
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let us help you achieve similar success with your construction and engineering needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" asChild>
              <Link to="/request-quote">Get a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" asChild>
              <Link to="/contact">Discuss Your Project</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudies;
