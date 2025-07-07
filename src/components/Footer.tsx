
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Logo from "./Logo";
import { useAdmin } from "@/contexts/AdminContext";

const Footer = () => {
  const { companySettings } = useAdmin();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info - Compact */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-3">
              <Logo variant="white" size="sm" />
            </div>
            <p className="text-gray-300 text-sm mb-4 max-w-md leading-relaxed">
              Leading construction and engineering company in Kenya, delivering excellence with over 15 years of experience.
            </p>
            
            {/* Contact Info - Compact */}
            <div className="space-y-1 mb-4">
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone className="w-3 h-3 text-orange-400" />
                <span>{companySettings.phone || '+254 710 245 118'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail className="w-3 h-3 text-orange-400" />
                <span>{companySettings.email || 'info@akibeks.co.ke'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 text-sm">
                <MapPin className="w-3 h-3 text-orange-400" />
                <span>{companySettings.address || 'Nairobi, Kenya'}</span>
              </div>
            </div>

            {/* Social Media - Compact */}
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links - Compact */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-orange-400">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-orange-400 transition-colors">Services</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-orange-400 transition-colors">Projects</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-orange-400 transition-colors">Gallery</Link></li>
              <li><Link to="/testimonials" className="text-gray-300 hover:text-orange-400 transition-colors">Testimonials</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services - Compact */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-orange-400">Services</h3>
            <ul className="space-y-1 text-sm">
              <li className="text-gray-300">Residential Construction</li>
              <li className="text-gray-300">Commercial Projects</li>
              <li className="text-gray-300">Civil Engineering</li>
              <li className="text-gray-300">Project Management</li>
              <li className="text-gray-300">Renovation Services</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-300">
              © 2024 {companySettings.company_name || 'AKIBEKS Engineering Solutions'}. All rights reserved.
            </p>
            <div className="flex items-center space-x-3 mt-2 md:mt-0 text-gray-300">
              <span>NCA Registered</span>
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
