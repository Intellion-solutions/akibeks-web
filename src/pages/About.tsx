
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Award, Target, Phone, Mail, MapPin } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
      title: "Quality Excellence",
      description: "We maintain the highest standards in every project we undertake"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Client Focus",
      description: "Your satisfaction is our top priority and drives everything we do"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: "Professional Integrity",
      description: "Honest communication and transparent business practices"
    },
    {
      icon: <Target className="w-8 h-8 text-orange-500" />,
      title: "Innovation",
      description: "Embracing modern engineering techniques and sustainable practices"
    }
  ];

  const certifications = [
    "National Construction Authority (NCA) Certified",
    "ISO 9001:2015 Quality Management",
    "OSHA Safety Standards Compliant",
    "Kenya Association of Building and Civil Engineering Contractors Member"
  ];

  const teamMembers = [
    {
      name: "Eng. Samuel Akibeki",
      role: "Chief Executive Officer",
      description: "15+ years in civil and structural engineering"
    },
    {
      name: "Eng. Mary Wanjiku",
      role: "Project Manager",
      description: "Specialist in project coordination and quality control"
    },
    {
      name: "John Mwangi",
      role: "Site Supervisor",
      description: "Expert in construction supervision and safety management"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About AKIBEKS</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Building Kenya's future with excellence, integrity, and innovation for over 15 years
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2008, AKIBEKS Engineering Solutions has grown from a small local contractor 
                to one of Kenya's most trusted engineering and construction companies. We specialize in 
                residential, commercial, and infrastructure projects across the country.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our commitment to quality, timely delivery, and customer satisfaction has earned us 
                recognition from clients and industry peers alike. We take pride in transforming 
                visions into reality through innovative engineering solutions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">500+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">15+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-orange-100 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl font-bold text-orange-500 mb-4">AKIBEKS</div>
                <div className="text-xl text-gray-600">Engineering Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  To deliver exceptional engineering and construction services that exceed client 
                  expectations while contributing to Kenya's infrastructural development through 
                  innovation, quality, and sustainable practices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  To be the leading engineering solutions company in East Africa, known for 
                  transforming communities through world-class infrastructure and creating 
                  lasting value for all stakeholders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals driving our success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications & Compliance</h2>
            <p className="text-xl">We maintain the highest industry standards</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <span className="text-lg">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Ready to discuss your project?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+254 710 245 118</p>
            </div>
            <div className="text-center">
              <Mail className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600">info@akibeks.co.ke</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600">Nairobi, Kenya</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
