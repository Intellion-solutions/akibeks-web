
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Users, 
  FileText, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Building,
  Clock,
  CheckCircle,
  Settings,
  BarChart3,
  FileTemplate
} from "lucide-react";

const AdminDashboard = () => {
  const [stats] = useState({
    totalProjects: 45,
    activeProjects: 12,
    completedProjects: 33,
    totalRevenue: 2500000,
    pendingQuotes: 8,
    monthlyRevenue: 450000,
    clientsCount: 87,
    teamMembers: 24
  });

  const recentQuotes = [
    { id: 1, client: "John Doe", project: "3-Bedroom House", amount: 3500000, status: "pending" },
    { id: 2, client: "Jane Smith", project: "Office Complex", amount: 8500000, status: "approved" },
    { id: 3, client: "Mike Wilson", project: "Renovation", amount: 1200000, status: "under_review" },
  ];

  const activeProjects = [
    { id: 1, name: "Westlands Residential", progress: 75, deadline: "2024-03-15", status: "on_track" },
    { id: 2, name: "Kilimani Office Tower", progress: 45, deadline: "2024-04-20", status: "on_track" },
    { id: 3, name: "Karen Villa", progress: 30, deadline: "2024-02-28", status: "delayed" },
  ];

  const adminModules = [
    {
      title: "Projects",
      description: "Manage all construction projects",
      icon: Building,
      link: "/admin/projects",
      color: "bg-blue-500"
    },
    {
      title: "Quotes",
      description: "Review and manage quote requests",
      icon: FileText,
      link: "/admin/quotes",
      color: "bg-green-500"
    },
    {
      title: "Invoices",
      description: "Generate and manage invoices",
      icon: DollarSign,
      link: "/admin/invoices",
      color: "bg-yellow-500"
    },
    {
      title: "Reports",
      description: "Analytics and business insights",
      icon: BarChart3,
      link: "/admin/reports",
      color: "bg-purple-500"
    },
    {
      title: "Templates",
      description: "Manage document templates",
      icon: FileTemplate,
      link: "/admin/templates",
      color: "bg-orange-500"
    },
    {
      title: "Settings",
      description: "System and company settings",
      icon: Settings,
      link: "/admin/settings",
      color: "bg-gray-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AKIBEKS Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" asChild>
                <Link to="/">View Site</Link>
              </Button>
              <Button asChild>
                <Link to="/admin/projects">Manage Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeProjects}</div>
              <p className="text-xs text-muted-foreground">
                Currently in progress
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh {stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Quotes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingQuotes}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting approval
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Modules Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Administration Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((module) => (
              <Card key={module.title} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <Link to={module.link} className="block">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${module.color}`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{module.title}</h4>
                        <p className="text-gray-600 text-sm">{module.description}</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Quotes */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Quote Requests</CardTitle>
              <CardDescription>Latest requests from potential clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuotes.map((quote) => (
                  <div key={quote.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="font-medium">{quote.client}</div>
                      <div className="text-sm text-gray-600">{quote.project}</div>
                      <div className="text-sm font-medium">KSh {quote.amount.toLocaleString()}</div>
                    </div>
                    <Badge 
                      variant={
                        quote.status === "approved" ? "default" : 
                        quote.status === "pending" ? "secondary" : "outline"
                      }
                    >
                      {quote.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/admin/quotes">View All Quotes</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
              <CardDescription>Current projects and their progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeProjects.map((project) => (
                  <div key={project.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{project.name}</div>
                      <Badge 
                        variant={project.status === "on_track" ? "default" : "destructive"}
                      >
                        {project.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{project.progress}% complete</span>
                      <span>Due: {project.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/admin/projects">Manage Projects</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
