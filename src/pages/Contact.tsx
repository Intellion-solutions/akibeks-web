
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              Ready to start your construction project? Let's discuss your vision and bring it to life.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Phone className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">+254 710 245 118</p>
                  <p className="text-gray-600">+254 722 123 456</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Mail className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">info@akibeks.co.ke</p>
                  <p className="text-gray-600">projects@akibeks.co.ke</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Location</h3>
                  <p className="text-gray-600">Nairobi, Kenya</p>
                  <p className="text-gray-600">Serving Nationwide</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                  <p className="text-gray-600">Mon - Fri: 8AM - 6PM</p>
                  <p className="text-gray-600">Sat: 9AM - 4PM</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-6 h-6 mr-2 text-orange-600" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardHeader>
                  <CardTitle>Find Us</CardTitle>
                  <CardDescription>
                    Our office location and service areas across Kenya.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">Interactive Map Coming Soon</p>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="font-semibold">Head Office</h4>
                      <p className="text-gray-600">Nairobi CBD, Kenya</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Service Areas</h4>
                      <p className="text-gray-600">Nairobi, Kiambu, Machakos, Kajiado, and surrounding counties</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
