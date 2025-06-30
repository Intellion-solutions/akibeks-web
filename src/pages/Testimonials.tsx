
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Quote, Search, Filter, Users, Award, ThumbsUp, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  content: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
  projects: {
    title: string;
  } | null;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select(`
          *,
          projects (
            title
          )
        `)
        .eq('is_approved', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Filter and sort testimonials
  const filteredTestimonials = testimonials
    .filter(testimonial => {
      const matchesSearch = testimonial.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           testimonial.client_role.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRating = filterRating === "all" || testimonial.rating.toString() === filterRating;
      
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "highest-rating":
          return b.rating - a.rating;
        case "lowest-rating":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  const featuredTestimonials = filteredTestimonials.filter(t => t.is_featured);
  const regularTestimonials = filteredTestimonials.filter(t => !t.is_featured);

  // Calculate statistics
  const averageRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : "0";
  
  const fiveStarCount = testimonials.filter(t => t.rating === 5).length;
  const totalTestimonials = testimonials.length;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
              Client <span className="text-orange-400">Testimonials</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-12 opacity-90 animate-fade-in">
              Discover what our satisfied clients have to say about our exceptional construction 
              and engineering services across Kenya
            </p>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-orange-400" />
                </div>
                <div className="text-3xl font-bold">{totalTestimonials}</div>
                <div className="text-sm opacity-80">Happy Clients</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Star className="w-8 h-8 text-yellow-400 fill-current" />
                </div>
                <div className="text-3xl font-bold">{averageRating}</div>
                <div className="text-sm opacity-80">Average Rating</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <Award className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-3xl font-bold">{fiveStarCount}</div>
                <div className="text-sm opacity-80">5-Star Reviews</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-3xl font-bold">{Math.round((fiveStarCount / totalTestimonials) * 100)}%</div>
                <div className="text-sm opacity-80">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search testimonials, clients, or projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest-rating">Highest Rating</SelectItem>
                  <SelectItem value="lowest-rating">Lowest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {filteredTestimonials.length} of {totalTestimonials} testimonials
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      {featuredTestimonials.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Reviews</h2>
              <p className="text-xl text-gray-600">Our most outstanding client experiences</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredTestimonials.map((testimonial, index) => (
                <Card key={testimonial.id} className="hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-blue-50 to-orange-50 border-2 border-orange-200 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-gray-900">{testimonial.client_name}</CardTitle>
                        <CardDescription className="text-gray-600">{testimonial.client_role}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800 font-semibold">
                        Featured
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                      {renderStars(testimonial.rating)}
                      <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-orange-300" />
                      <p className="text-gray-700 text-lg italic pl-6 leading-relaxed">{testimonial.content}</p>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                      {testimonial.projects && (
                        <p className="text-sm text-gray-500 flex items-center">
                          <span className="font-medium">Project:</span>
                          <span className="ml-1">{testimonial.projects.title}</span>
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        {new Date(testimonial.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              All Client Reviews
            </h2>
            <p className="text-xl text-gray-600">Every voice matters to us</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-lg text-gray-600">Loading testimonials...</div>
            </div>
          ) : regularTestimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularTestimonials.map((testimonial, index) => (
                <Card key={testimonial.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg text-gray-900">{testimonial.client_name}</CardTitle>
                        <CardDescription className="text-gray-600">{testimonial.client_role}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mt-2">
                      {renderStars(testimonial.rating)}
                      <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-6 h-6 text-gray-300" />
                      <p className="text-gray-700 pl-4 leading-relaxed">{testimonial.content}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      {testimonial.projects && (
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Project:</span> {testimonial.projects.title}
                        </p>
                      )}
                      <p className="text-xs text-gray-400">
                        {new Date(testimonial.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="max-w-md mx-auto">
              <CardContent className="p-12 text-center">
                <ThumbsUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials found</h3>
                <p className="text-gray-600">
                  {searchTerm || filterRating !== "all" 
                    ? "Try adjusting your search criteria or filters"
                    : "No testimonials available at the moment"
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join Our Success Stories?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Experience the same exceptional service that our clients rave about. 
            Let's build your dream project together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300">
              Get Your Free Quote
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300">
              View Our Projects
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
