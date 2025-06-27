
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">BC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BuildCorp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-orange-500 transition-colors">
              Services
            </Link>
            <Link to="/projects" className="text-gray-700 hover:text-orange-500 transition-colors">
              Projects
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-orange-500 transition-colors">
              Contact
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/request-quote">Get Quote</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/book-visit">Book Visit</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/services"
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors"
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link
                to="/projects"
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors"
                onClick={toggleMenu}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-orange-500 transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/request-quote" onClick={toggleMenu}>Get Quote</Link>
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <Link to="/book-visit" onClick={toggleMenu}>Book Visit</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
