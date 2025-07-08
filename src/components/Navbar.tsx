import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Logo from './Logo';
import { Button } from './ui/button';
import { useAdmin } from '@/contexts/AdminContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAdmin();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Industries', href: '/industries' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo size="sm" variant="default" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {isAuthenticated ? (
              <Link to="/admin">
                <Button size="sm">Admin Dashboard</Button>
              </Link>
            ) : (
              <Link to="/request-quote">
                <Button size="sm">Request a Quote</Button>
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <SheetHeader className="pl-6 pr-8 pt-6 pb-4">
                  <SheetTitle>AKIBEKS Engineering</SheetTitle>
                  <SheetDescription>
                    Navigate the site and explore our services.
                  </SheetDescription>
                </SheetHeader>
                <div className="divide-y divide-gray-200">
                  <div className="px-2 space-y-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="bg-gray-50 text-gray-700 hover:bg-gray-200 group flex items-center w-full px-4 py-2 text-sm font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-4 px-6">
                    {isAuthenticated ? (
                      <Link to="/admin" className="w-full">
                        <Button size="sm" className="w-full" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Button>
                      </Link>
                    ) : (
                      <Link to="/request-quote" className="w-full">
                        <Button size="sm" className="w-full" onClick={() => setIsMenuOpen(false)}>Request a Quote</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
