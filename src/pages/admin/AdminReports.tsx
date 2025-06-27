
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Calendar, Download, TrendingUp, DollarSign, FileText, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminReports = () => {
  const [dateRange, setDateRange] = useState("30");
  const [reportType, setReportType] = useState("overview");
  const [reportsData, setReportsData] = useState({
    overview: {
      totalProjects: 0,
      totalRevenue: 0,
      activeQuotes: 0,
      newClients: 0
    },
    projectsData: [],
    revenueData: [],
    servicesData: []
  });

  useEffect(() => {
    fetchReportsData();
  }, [dateRange]);

  const fetchReportsData = async () => {
    try {
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - parseInt(dateRange));

      // Fetch projects
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .gte('created_at', startDate.toISOString());

      // Fetch quotes
      const { data: quotes } = await supabase
        .from('quotes')
        .select('*')
        .gte('created_at', startDate.toISOString());

      // Fetch clients
      const { data: clients } = await supabase
        .from('clients')
        .select('*')
        .gte('created_at', startDate.toISOString());

      // Fetch services
      const { data: services } = await supabase
        .from('services')
        .select('*');

      // Process data for charts
      const projectsByStatus = projects?.reduce((acc: any, project: any) => {
        acc[project.status] = (acc[project.status] || 0) + 1;
        return acc;
      }, {}) || {};

      const projectsData = Object.entries(projectsByStatus).map(([status, count]) => ({
        name: status.replace('_', ' '),
        value: count
      }));

      const revenueByMonth = projects?.reduce((acc: any, project: any) => {
        const month = new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + (project.budget || 0);
        return acc;
      }, {}) || {};

      const revenueData = Object.entries(revenueByMonth).map(([month, revenue]) => ({
        month,
        revenue: revenue as number
      }));

      const servicesByCategory = services?.reduce((acc: any, service: any) => {
        acc[service.category] = (acc[service.category] || 0) + 1;
        return acc;
      }, {}) || {};

      const servicesData = Object.entries(servicesByCategory).map(([category, count]) => ({
        category: category.replace('_', ' '),
        count: count as number
      }));

      setReportsData({
        overview: {
          totalProjects: projects?.length || 0,
          totalRevenue: projects?.reduce((sum: number, p: any) => sum + (p.budget || 0), 0) || 0,
          activeQuotes: quotes?.filter((q: any) => q.status === 'pending').length || 0,
          newClients: clients?.length || 0
        },
        projectsData,
        revenueData,
        servicesData
      });
    } catch (error) {
      console.error('Error fetching reports data:', error);
    }
  };

  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const exportReport = () => {
    // Simple CSV export implementation
    const csvData = [
      ['Metric', 'Value'],
      ['Total Projects', reportsData.overview.totalProjects],
      ['Total Revenue', `KSh ${reportsData.overview.totalRevenue.toLocaleString()}`],
      ['Active Quotes', reportsData.overview.activeQuotes],
      ['New Clients', reportsData.overview.newClients]
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `akibeks-report-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Reports & Analytics
              </h1>
              <p className="text-gray-600">Business insights and performance metrics</p>
            </div>
            <div className="flex space-x-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={exportReport}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold">{reportsData.overview.totalProjects}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">KSh {reportsData.overview.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Quotes</p>
                  <p className="text-2xl font-bold">{reportsData.overview.activeQuotes}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New Clients</p>
                  <p className="text-2xl font-bold">{reportsData.overview.newClients}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Projects by Status */}
          <Card>
            <CardHeader>
              <CardTitle>Projects by Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportsData.projectsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {reportsData.projectsData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={reportsData.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`KSh ${Number(value).toLocaleString()}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Services Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Services Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={reportsData.servicesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminReports;
