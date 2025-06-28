
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  DollarSign, 
  Settings, 
  BarChart3, 
  Calendar,
  Building,
  Receipt,
  Database,
  TrendingUp,
  Shield,
  Wrench
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";

const AdminDashboard = () => {
  const { isAuthenticated, companySettings } = useAdmin();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const adminFeatures = [
    {
      title: "Projects",
      description: "Manage construction projects and track progress",
      icon: Building,
      link: "/admin/projects",
      color: "bg-blue-500"
    },
    {
      title: "Clients",
      description: "Manage client information and relationships",
      icon: Users,
      link: "/admin/clients",
      color: "bg-green-500"
    },
    {
      title: "Quotes",
      description: "Create and manage project quotations",
      icon: FileText,
      link: "/admin/quotes",
      color: "bg-orange-500"
    },
    {
      title: "Invoices",
      description: "Generate and track invoices",
      icon: Receipt,
      link: "/admin/invoices",
      color: "bg-purple-500"
    },
    {
      title: "Templates",
      description: "Design professional document templates",
      icon: Wrench,
      link: "/admin/templates",
      color: "bg-red-500"
    },
    {
      title: "Analytics",
      description: "Business insights and performance metrics",
      icon: TrendingUp,
      link: "/admin/analytics",
      color: "bg-indigo-500"
    },
    {
      title: "Reports",
      description: "Generate detailed business reports",
      icon: BarChart3,
      link: "/admin/reports",
      color: "bg-teal-500"
    },
    {
      title: "Users",
      description: "Manage system users and permissions",
      icon: Shield,
      link: "/admin/users",
      color: "bg-gray-500"
    },
    {
      title: "Settings",
      description: "Configure company settings and preferences",
      icon: Settings,
      link: "/admin/settings",
      color: "bg-yellow-500"
    },
    {
      title: "Backup",
      description: "Database backup and restore operations",
      icon: Database,
      link: "/admin/backup",
      color: "bg-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Manage your business operations from here.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold text-gray-900">48</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Quotes</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{companySettings.currency_symbol || 'KSh'} 2.5M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Features Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Management Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {adminFeatures.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-3`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and system activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New quote request from ABC Construction</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Project "Riverside Complex" updated to 75% completion</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Invoice INV-2024-001 payment received</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New client registration: Kenya Railways</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
