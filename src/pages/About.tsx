
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Award, Target } from "lucide-react";

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
      description: "Embracing modern construction techniques and sustainable practices"
    }
  ];

  const certifications = [
    "NCA (National Construction Authority) Certified",
    "ISO 9001:2015 Quality Management",
    "OSHA Safety Standards Compliant",
    "Green Building Council Member"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About BuildCorp</h1>
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
                Founded in 2008, BuildCorp has grown from a small local contractor to one of Kenya's 
                most trusted construction companies. We specialize in residential, commercial, and 
                infrastructure projects across the country.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our commitment to quality, timely delivery, and customer satisfaction has earned us 
                recognition from clients and industry peers alike. We take pride in transforming 
                visions into reality.
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
            <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
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
                  To deliver exceptional construction services that exceed client expectations 
                  while contributing to Kenya's infrastructural development through innovation, 
                  quality, and sustainable practices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  To be the leading construction company in East Africa, known for transforming 
                  communities through world-class infrastructure and creating lasting value for 
                  all stakeholders.
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

      <Footer />
    </div>
  );
};

export default About;
