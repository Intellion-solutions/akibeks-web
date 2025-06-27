
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Calendar, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  created_at: string;
  progress_percentage: number;
}

const Gallery = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateImageUrl = (index: number) => {
    const images = [
      "https://images.unsplash.com/photo-1541976590-713941681591?w=800",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    ];
    return images[index % images.length];
  };

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Project Gallery</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in">
              Explore our portfolio of successful construction and engineering projects
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {["all", "completed", "in_progress", "planning"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                onClick={() => setFilter(status)}
                className="capitalize hover:scale-105 transition-transform"
              >
                {status === "all" ? "All Projects" : status.replace('_', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg">Loading gallery...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Dialog key={project.id}>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img
                          src={generateImageUrl(index)}
                          alt={project.title}
                          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <Badge className={`absolute top-4 right-4 ${getStatusColor(project.status)}`}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {project.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(project.created_at).getFullYear()}
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full transition-all duration-1000" 
                              style={{ width: `${project.progress_percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{project.progress_percentage}% Complete</p>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={generateImageUrl(index)}
                          alt={project.title}
                          className="w-full h-80 object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                            <span>{new Date(project.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status.replace('_', ' ')}
                          </Badge>
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-orange-500 h-3 rounded-full" 
                                style={{ width: `${project.progress_percentage}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{project.progress_percentage}% Complete</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
