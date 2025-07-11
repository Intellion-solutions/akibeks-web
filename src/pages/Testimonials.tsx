
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Kariuki",
      role: "Property Developer",
      company: "Kariuki Properties Ltd",
      content: "AKIBEKS delivered our commercial complex on time and within budget. Their attention to detail and professional approach exceeded our expectations. The quality of workmanship is exceptional, and their project management skills are top-notch.",
      rating: 5,
      project: "Westlands Commercial Complex",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Mary Wanjiku",
      role: "Homeowner",
      company: "Private Client",
      content: "Building our dream home with AKIBEKS was a smooth experience. They guided us through every step and delivered exceptional quality. The team was professional, communicative, and always available to address our concerns.",
      rating: 5,
      project: "Karen Residential Home",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "David Mutua",
      role: "Industrial Client",
      company: "Mutua Manufacturing",
      content: "Their industrial construction expertise is unmatched. The factory was completed ahead of schedule with superior build quality. AKIBEKS understood our specific industrial requirements and delivered beyond expectations.",
      rating: 5,
      project: "Thika Industrial Plant",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Sarah Njeri",
      role: "School Principal",
      company: "Njeri Academy",
      content: "AKIBEKS constructed our new school block with amazing efficiency. The learning environment they created is modern, safe, and conducive to education. Their commitment to quality and safety standards is exemplary.",
      rating: 5,
      project: "Njeri Academy School Block",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Peter Kamau",
      role: "Hospital Administrator",
      company: "Kamau Medical Center",
      content: "The medical facility AKIBEKS built for us meets all healthcare standards and regulations. Their understanding of specialized construction requirements for medical facilities is impressive. Excellent work throughout.",
      rating: 5,
      project: "Kamau Medical Center",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Grace Muthoni",
      role: "Hotel Owner",
      company: "Muthoni Hospitality Group",
      content: "Our boutique hotel renovation was handled with professionalism and creativity. AKIBEKS transformed our vision into reality while maintaining operations during construction. Outstanding project management and execution.",
      rating: 5,
      project: "Nairobi Boutique Hotel",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b169?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 7,
      name: "James Omondi",
      role: "Church Pastor",
      company: "New Life Church",
      content: "AKIBEKS built our new church sanctuary with dedication and respect for our vision. The acoustics, lighting, and overall design create a perfect worship environment. Their team worked around our schedule seamlessly.",
      rating: 5,
      project: "New Life Church Sanctuary",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 8,
      name: "Ann Wambui",
      role: "Shopping Mall Manager",
      company: "Wambui Enterprises",
      content: "The shopping mall extension project was complex, but AKIBEKS handled it with expertise. They minimized disruption to ongoing business while delivering high-quality construction. Professional and reliable team.",
      rating: 5,
      project: "Nakuru Shopping Mall Extension",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b169?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const stats = [
    { number: "500+", label: "Happy Clients" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "4.9/5", label: "Average Rating" },
    { number: "15+", label: "Years Trusted" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <SEOHead 
        title="Client Testimonials - AKIBEKS Engineering Solutions"
        description="Read what our satisfied clients say about AKIBEKS construction and engineering services. Over 500 happy clients across Kenya."
      />
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-600 to-sky-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Client Testimonials
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Hear from our satisfied clients about their experience working with AKIBEKS Engineering Solutions
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-800">What Our Clients Say</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              Real feedback from real clients who have experienced the AKIBEKS difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-blue-200 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-100"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-blue-600">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      Project: {testimonial.project}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-sky-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Happy Clients?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Experience the AKIBEKS difference for yourself. Let's discuss your next construction project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/request-quote">
                Get Your Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link to="/submit-testimonial">Share Your Experience</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
