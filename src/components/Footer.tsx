
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">BC</span>
              </div>
              <span className="text-xl font-bold">BuildCorp</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Leading construction company in Kenya, delivering excellence in residential, 
              commercial, and infrastructure projects with over 15 years of experience.
            </p>
            <div className="flex items-center space-x-2 text-gray-300 mb-2">
              <Phone className="w-4 h-4" />
              <span>+254 710 245 118</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300 mb-2">
              <Mail className="w-4 h-4" />
              <span>info@buildcorp.co.ke</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="w-4 h-4" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">House Construction</li>
              <li className="text-gray-300">Civil Works</li>
              <li className="text-gray-300">Renovation</li>
              <li className="text-gray-300">Project Management</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 BuildCorp. All rights reserved. | NCA Registered | KRA Compliant
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
