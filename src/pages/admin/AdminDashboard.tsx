
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  FileText, 
  Users, 
  DollarSign, 
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";
import AdminDashboardActions from "@/components/admin/AdminDashboardActions";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { toast } = useToast();
  const { isAuthenticated, companySettings } = useAdmin();
  const [stats, setStats] = useState({
    totalClients: 0,
    totalProjects: 0,
    totalInvoices: 0,
    totalRevenue: 0,
    draftInvoices: 0,
    activeProjects: 0,
    overdueInvoices: 0,
    completedProjects: 0
  });
  const [loading, setLoading] = useState(true);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch clients count
      const { count: clientsCount } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true });

      // Fetch projects count and active projects
      const { data: projects, count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact' });

      const activeProjects = projects?.filter(p => p.status === 'in_progress').length || 0;
      const completedProjects = projects?.filter(p => p.status === 'completed').length || 0;

      // Fetch invoices data
      const { data: invoices, count: invoicesCount } = await supabase
        .from('invoices')
        .select('*', { count: 'exact' });

      const totalRevenue = invoices?.reduce((sum, inv) => sum + (inv.paid_amount || 0), 0) || 0;
      const draftInvoices = invoices?.filter(inv => inv.status === 'draft').length || 0;
      const overdueInvoices = invoices?.filter(inv => inv.status === 'overdue').length || 0;

      setStats({
        totalClients: clientsCount || 0,
        totalProjects: projectsCount || 0,
        totalInvoices: invoicesCount || 0,
        totalRevenue,
        draftInvoices,
        activeProjects,
        overdueInvoices,
        completedProjects
      });

    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const currencySymbol = companySettings?.currency_symbol || 'KSh';

  const statCards = [
    {
      title: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+12%",
      trend: "up"
    },
    {
      title: "Active Projects", 
      value: stats.activeProjects,
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+8%",
      trend: "up"
    },
    {
      title: "Total Revenue",
      value: `${currencySymbol} ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+23%",
      trend: "up"
    },
    {
      title: "Draft Invoices",
      value: stats.draftInvoices,
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "-5%",
      trend: "down"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {loading ? "..." : stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className={`w-4 h-4 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button className="h-16 bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center gap-2" asChild>
            <Link to="/admin/clients">
              <Users className="w-6 h-6" />
              <span>Manage Clients</span>
            </Link>
          </Button>
          <Button className="h-16 bg-green-600 hover:bg-green-700 text-white flex flex-col items-center justify-center gap-2" asChild>
            <Link to="/admin/invoices">
              <FileText className="w-6 h-6" />
              <span>Create Invoice</span>
            </Link>
          </Button>
          <Button className="h-16 bg-purple-600 hover:bg-purple-700 text-white flex flex-col items-center justify-center gap-2" asChild>
            <Link to="/admin/inventory">
              <BarChart3 className="w-6 h-6" />
              <span>Inventory</span>
            </Link>
          </Button>
          <Button className="h-16 bg-orange-600 hover:bg-orange-700 text-white flex flex-col items-center justify-center gap-2" asChild>
            <Link to="/admin/templates">
              <Plus className="w-6 h-6" />
              <span>Templates</span>
            </Link>
          </Button>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Urgent Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Overdue Invoices</span>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">{stats.overdueInvoices}</Badge>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/admin/invoices?filter=overdue">View</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Draft Invoices</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{stats.draftInvoices}</Badge>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/admin/invoices?filter=draft">View</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Projects</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{stats.activeProjects}</Badge>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/admin/projects?filter=active">View</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sent Invoices</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {stats.totalInvoices - stats.draftInvoices - stats.overdueInvoices}
                  </Badge>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/admin/invoices?filter=sent">View</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Completed Projects</span>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{stats.completedProjects}</Badge>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/admin/projects?filter=completed">View</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Clients</span>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{stats.totalClients}</Badge>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/admin/clients">View</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Functional Actions Component */}
        <AdminDashboardActions />
      </div>
    </div>
  );
};

export default AdminDashboard;
