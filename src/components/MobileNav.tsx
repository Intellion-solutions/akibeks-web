
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, X, Home, Building2, Users, FileText, Settings, BarChart3 } from "lucide-react";
import Logo from "./Logo";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Building2 },
    { href: "/services", label: "Services", icon: Users },
    { href: "/portfolio", label: "Portfolio", icon: FileText },
    { href: "/contact", label: "Contact", icon: Settings },
  ];

  const adminItems = [
    { href: "/admin", label: "Dashboard", icon: BarChart3 },
    { href: "/admin/clients", label: "Clients", icon: Users },
    { href: "/admin/invoices", label: "Invoices", icon: FileText },
    { href: "/admin/inventory", label: "Inventory", icon: Building2 },
  ];

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          </div>
        </SheetHeader>
        
        <div className="py-6">
          {isAdminRoute ? (
            <div className="space-y-1 px-3">
              <div className="px-3 py-2 mb-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Admin Panel
                </h3>
              </div>
              {adminItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t my-4"></div>
              <div className="px-3 py-2">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Main Site
                </h4>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-1 px-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              
              <div className="border-t my-4"></div>
              <div className="px-3">
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <BarChart3 className="mr-3 h-5 w-5" />
                  Admin Panel
                </Link>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
