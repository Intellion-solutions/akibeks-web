import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Settings,
  BarChart3,
  FileImage,
  ClipboardList,
  Receipt,
  UserCog,
  Building
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 from last month",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Total Clients",
      value: "48",
      change: "+5 new this month",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Revenue (This Month)",
      value: "KSh 2.4M",
      change: "+12% from last month",
      icon: DollarSign,
      color: "text-orange-600"
    },
    {
      title: "Pending Quotes",
      value: "8",
      change: "3 expiring soon",
      icon: ClipboardList,
      color: "text-purple-600"
    }
  ];

  const adminModules = [
    {
      title: "Project Management",
      description: "Manage construction projects, milestones, and progress tracking",
      icon: Building,
      path: "/admin/projects",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      title: "Quote Management",
      description: "Handle quote requests, generate quotes, and track approvals",
      icon: ClipboardList,
      path: "/admin/quotes",
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100"
    },
    {
      title: "Invoice Management",
      description: "Create invoices, track payments, and manage billing",
      icon: Receipt,
      path: "/admin/invoices",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      title: "Client Management",
      description: "Manage client database, contacts, and communication history",
      icon: Users,
      path: "/admin/clients",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    },
    {
      title: "User Management",
      description: "Manage system users, roles, and permissions",
      icon: UserCog,
      path: "/admin/users",
      color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
    },
    {
      title: "Template Management",
      description: "Create and manage document templates for quotes and invoices",
      icon: FileImage,
      path: "/admin/templates",
      color: "bg-pink-50 border-pink-200 hover:bg-pink-100"
    },
    {
      title: "Reports & Analytics",
      description: "View business insights, charts, and performance metrics",
      icon: BarChart3,
      path: "/admin/reports",
      color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
    },
    {
      title: "Company Settings",
      description: "Configure company information, preferences, and system settings",
      icon: Settings,
      path: "/admin/settings",
      color: "bg-gray-50 border-gray-200 hover:bg-gray-100"
    }
  ];

  const recentActivities = [
    { action: "New quote request", client: "John Doe", time: "2 hours ago", status: "pending" },
    { action: "Project milestone completed", project: "Westlands Complex", time: "4 hours ago", status: "completed" },
    { action: "Invoice payment received", client: "ABC Corp", time: "1 day ago", status: "paid" },
    { action: "New client registered", client: "Jane Smith", time: "2 days ago", status: "new" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <LayoutDashboard className="w-6 h-6 mr-2" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your business.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {adminModules.map((module, index) => (
            <a key={index} href={module.path}>
              <Card className={`cursor-pointer transition-all duration-200 ${module.color}`}>
                <CardContent className="p-6">
                  <div className="text-center">
                    <module.icon className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                    <h3 className="font-semibold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{module.description}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest updates from your business operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.client || activity.project}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <Badge variant={
                      activity.status === 'completed' ? 'default' :
                      activity.status === 'paid' ? 'default' :
                      activity.status === 'new' ? 'secondary' : 'outline'
                    }>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700" asChild>
                <a href="/admin/quotes">
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Review Pending Quotes
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/admin/projects">
                  <Building className="w-4 h-4 mr-2" />
                  Update Project Status
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/admin/invoices">
                  <Receipt className="w-4 h-4 mr-2" />
                  Generate New Invoice
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/admin/reports">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics Report
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
