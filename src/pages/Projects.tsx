
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Luxury Villa - Karen",
      location: "Karen, Nairobi",
      type: "Residential",
      status: "Completed",
      budget: "KSh 12M",
      completionDate: "Dec 2023",
      description: "Modern 4-bedroom villa with swimming pool and landscaped gardens",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Commercial Complex - Westlands",
      location: "Westlands, Nairobi",
      type: "Commercial",
      status: "Ongoing",
      budget: "KSh 45M",
      completionDate: "Jun 2024",
      description: "5-story office complex with retail spaces on ground floor",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Residential Estate - Kiambu",
      location: "Kiambu County",
      type: "Residential",
      status: "Completed",
      budget: "KSh 80M",
      completionDate: "Sep 2023",
      description: "50-unit gated community with modern amenities",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "School Infrastructure - Machakos",
      location: "Machakos County",
      type: "Infrastructure",
      status: "Completed",
      budget: "KSh 25M",
      completionDate: "Mar 2023",
      description: "Primary school with 12 classrooms, library, and laboratory",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Industrial Warehouse - Mombasa",
      location: "Mombasa",
      type: "Industrial",
      status: "Ongoing",
      budget: "KSh 35M",
      completionDate: "Aug 2024",
      description: "Large-scale warehouse facility with loading docks",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Hospital Extension - Kisumu",
      location: "Kisumu County",
      type: "Healthcare",
      status: "Planning",
      budget: "KSh 60M",
      completionDate: "Dec 2024",
      description: "Additional wing with 100 beds and modern medical equipment",
      image: "/placeholder.svg"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Ongoing":
        return "bg-blue-100 text-blue-800";
      case "Planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Explore our portfolio of successful construction projects across Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="nairobi">Nairobi</SelectItem>
                <SelectItem value="kiambu">Kiambu</SelectItem>
                <SelectItem value="mombasa">Mombasa</SelectItem>
                <SelectItem value="kisumu">Kisumu</SelectItem>
                <SelectItem value="machakos">Machakos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="w-full h-48 bg-gray-200"></div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {project.completionDate}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-semibold text-orange-600">{project.budget}</span>
                      <Badge variant="outline">{project.type}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Statistics</h2>
            <p className="text-xl">Our impact in numbers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
              <div className="text-xl">Total Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">15</div>
              <div className="text-xl">Counties Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">2.5B+</div>
              <div className="text-xl">Total Value (KSh)</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
              <div className="text-xl">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Next Project</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our growing list of satisfied clients and let us bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/request-quote">
                Get Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-500" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
