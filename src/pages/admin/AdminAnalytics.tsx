
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, DollarSign, Users, FileText, Calendar, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";

const AdminAnalytics = () => {
  const { isAuthenticated, companySettings } = useAdmin();
  const [analytics, setAnalytics] = useState({
    totalProjects: 0,
    totalClients: 0,
    totalQuotes: 0,
    totalRevenue: 0,
    projectsByStatus: [],
    quotesByStatus: [],
    monthlyRevenue: []
  });

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      // Load basic counts
      const [projects, clients, quotes, invoices] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact' }),
        supabase.from('clients').select('*', { count: 'exact' }),
        supabase.from('quotes').select('*', { count: 'exact' }),
        supabase.from('invoices').select('total_amount')
      ]);

      const totalRevenue = invoices.data?.reduce((sum, inv) => sum + (parseFloat(inv.total_amount.toString()) || 0), 0) || 0;

      setAnalytics({
        totalProjects: projects.count || 0,
        totalClients: clients.count || 0,
        totalQuotes: quotes.count || 0,
        totalRevenue,
        projectsByStatus: [
          { name: 'Planning', value: 12, color: '#3b82f6' },
          { name: 'In Progress', value: 8, color: '#f59e0b' },
          { name: 'Completed', value: 25, color: '#10b981' },
          { name: 'On Hold', value: 3, color: '#ef4444' }
        ],
        quotesByStatus: [
          { name: 'Pending', value: 15, color: '#6b7280' },
          { name: 'Approved', value: 8, color: '#10b981' },
          { name: 'Rejected', value: 4, color: '#ef4444' }
        ],
        monthlyRevenue: [
          { month: 'Jan', revenue: 1200000 },
          { month: 'Feb', revenue: 1800000 },
          { month: 'Mar', revenue: 1500000 },
          { month: 'Apr', revenue: 2200000 },
          { month: 'May', revenue: 1900000 },
          { month: 'Jun', revenue: 2500000 }
        ]
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const currencySymbol = companySettings.currency_symbol || 'KSh';

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="w-8 h-8 mr-3" />
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Business insights and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalProjects}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Quotes</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalQuotes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{currencySymbol} {analytics.totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Projects by Status</CardTitle>
              <CardDescription>Distribution of project statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.projectsByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.projectsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quotes by Status</CardTitle>
              <CardDescription>Quote approval rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.quotesByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={analytics.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${currencySymbol} ${value.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
