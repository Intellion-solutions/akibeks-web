
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Building, Home, Wrench } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    service: "",
    location: "",
    budget: "",
    timeline: "",
    message: "",
    newsletter: false,
    urgent: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First create or find client
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .upsert({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company_name: formData.company,
          address: formData.location
        })
        .select()
        .single();

      if (clientError) throw clientError;

      // Create quote request
      const { error: quoteError } = await supabase
        .from('quote_requests')
        .insert({
          client_id: clientData.id,
          service_type: formData.service,
          project_description: formData.message,
          location: formData.location,
          budget_range: formData.budget,
          notes: `Subject: ${formData.subject}\nTimeline: ${formData.timeline}\nUrgent: ${formData.urgent ? 'Yes' : 'No'}`
        });

      if (quoteError) throw quoteError;

      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        service: "",
        location: "",
        budget: "",
        timeline: "",
        message: "",
        newsletter: false,
        urgent: false
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-orange-500" />,
      title: "Visit Our Office",
      details: ["Nairobi, Kenya", "GPS: -1.2921, 36.8219"]
    },
    {
      icon: <Phone className="w-6 h-6 text-orange-500" />,
      title: "Call Us",
      details: ["+254 710 245 118", "Emergency: +254 700 000 000"]
    },
    {
      icon: <Mail className="w-6 h-6 text-orange-500" />,
      title: "Email Us",
      details: ["info@akibeks.co.ke", "projects@akibeks.co.ke"]
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM"]
    }
  ];

  const services = [
    "House Construction",
    "Commercial Building",
    "Kitchen Renovation",
    "Bathroom Renovation",
    "Plumbing Services",
    "Electrical Services",
    "Civil Works",
    "Project Management",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with 3D Animation */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Building className="absolute top-10 left-10 w-20 h-20 animate-bounce" />
          <Home className="absolute top-32 right-20 w-16 h-16 animate-pulse" />
          <Wrench className="absolute bottom-20 left-1/3 w-12 h-12 animate-spin" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Contact AKIBEKS</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto animate-fade-in">
              Ready to discuss your construction project? Get in touch with our expert team today
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">{detail}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Enhanced Contact Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2 text-orange-500" />
                  Send us a Detailed Message
                </CardTitle>
                <CardDescription>
                  Fill out this comprehensive form and we'll provide you with a detailed response
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        required
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div>
                      <Label htmlFor="service">Service Type</Label>
                      <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                        <SelectTrigger className="transition-all duration-300 focus:scale-105">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Project Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City, County"
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                        <SelectTrigger className="transition-all duration-300 focus:scale-105">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-500k">Under KSh 500,000</SelectItem>
                          <SelectItem value="500k-1m">KSh 500,000 - 1,000,000</SelectItem>
                          <SelectItem value="1m-5m">KSh 1,000,000 - 5,000,000</SelectItem>
                          <SelectItem value="5m-10m">KSh 5,000,000 - 10,000,000</SelectItem>
                          <SelectItem value="over-10m">Over KSh 10,000,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                      <SelectTrigger className="transition-all duration-300 focus:scale-105">
                        <SelectValue placeholder="When do you want to start?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediately">Immediately</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="3-months">Within 3 months</SelectItem>
                        <SelectItem value="6-months">Within 6 months</SelectItem>
                        <SelectItem value="planning">Still planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Project Description *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Describe your project in detail, including requirements, preferences, and any specific challenges..."
                      rows={5}
                      required
                      className="transition-all duration-300 focus:scale-105"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="urgent"
                        checked={formData.urgent}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, urgent: checked as boolean }))}
                      />
                      <Label htmlFor="urgent" className="text-sm">This is an urgent request</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletter: checked as boolean }))}
                      />
                      <Label htmlFor="newsletter" className="text-sm">Subscribe to our newsletter for updates and tips</Label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Detailed Message"}
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and Quick Actions */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Our Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.05"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                    <div className="text-center z-10">
                      <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-2 animate-bounce" />
                      <p className="text-gray-700 font-semibold">Interactive Map Coming Soon</p>
                      <p className="text-sm text-gray-500">Nairobi, Kenya</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Our office is conveniently located in Nairobi with easy access 
                    to major highways and public transportation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full animate-pulse" variant="outline" asChild>
                    <a href="tel:+254710245118">
                      <Phone className="w-4 h-4 mr-2" />
                      Call +254 710 245 118
                    </a>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="https://wa.me/254710245118" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Chat
                    </a>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <a href="mailto:info@akibeks.co.ke">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Us
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: "How long does a typical project take?",
                a: "Project timelines vary based on scope and complexity. Residential projects typically take 3-6 months, while commercial projects can take 6-18 months."
              },
              {
                q: "Do you provide free estimates?",
                a: "Yes, we provide free initial consultations and estimates for all projects. Detailed quotes are provided after site visits and requirement analysis."
              },
              {
                q: "Are you licensed and insured?",
                a: "Absolutely! We are fully licensed by the National Construction Authority (NCA) and carry comprehensive insurance coverage for all our projects."
              },
              {
                q: "What areas do you serve?",
                a: "We serve clients across Kenya, with primary focus on Nairobi, Central Kenya, and Coast regions. Contact us to confirm service availability in your area."
              }
            ].map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
