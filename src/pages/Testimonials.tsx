
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  content: string;
  rating: number;
  is_featured: boolean;
  projects: {
    title: string;
  };
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

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
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Client Testimonials</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in">
              Hear what our satisfied clients have to say about our work
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg">Loading testimonials...</div>
            </div>
          ) : (
            <>
              {/* Featured Section */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Reviews</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {testimonials.filter(t => t.is_featured).map((testimonial) => (
                    <Card key={testimonial.id} className="hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-blue-50 to-orange-50 border-2 border-orange-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl">{testimonial.client_name}</CardTitle>
                            <CardDescription>{testimonial.client_role}</CardDescription>
                          </div>
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                            Featured
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="relative">
                          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-orange-300" />
                          <p className="text-gray-700 text-lg italic pl-6">{testimonial.content}</p>
                        </div>
                        {testimonial.projects && (
                          <p className="text-sm text-gray-500 mt-4">
                            Project: {testimonial.projects.title}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Testimonials */}
              <div>
                <h2 className="text-3xl font-bold text-center mb-12">All Reviews</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {testimonials.filter(t => !t.is_featured).map((testimonial, index) => (
                    <Card key={testimonial.id} className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                      <CardHeader>
                        <CardTitle className="text-lg">{testimonial.client_name}</CardTitle>
                        <CardDescription>{testimonial.client_role}</CardDescription>
                        <div className="flex items-center space-x-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{testimonial.content}</p>
                        {testimonial.projects && (
                          <p className="text-sm text-gray-500 mt-4">
                            Project: {testimonial.projects.title}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our satisfied clients and experience professional construction services
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
