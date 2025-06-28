import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Logo variant="white" size="md" />
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Leading construction and engineering company in Kenya, delivering excellence in residential, 
              commercial, and infrastructure projects with over 15 years of experience. Licensed by NCA.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>+254 710 245 118</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-orange-400" />
                <span>info@akibeks.co.ke</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Our Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">Residential Construction</li>
              <li className="text-gray-300">Commercial Projects</li>
              <li className="text-gray-300">Civil Engineering</li>
              <li className="text-gray-300">Project Management</li>
              <li className="text-gray-300">Renovation & Remodeling</li>
              <li className="text-gray-300">Site Planning</li>
              <li className="text-gray-300">Quality Assurance</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 AKIBEKS Engineering Solutions. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0 text-sm text-gray-300">
              <span>NCA Registered</span>
              <span>•</span>
              <span>KRA Compliant</span>
              <span>•</span>
              <span>ISO Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
