import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, TrendingDown, DollarSign, Users, Building, Target, BarChart3, PieChart, LineChart, Filter, Download, RefreshCw } from "lucide-react";
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie } from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";

const AdminAnalytics = () => {
  const { isAuthenticated } = useAdmin();
  const [timeRange, setTimeRange] = useState("30d");
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    revenue: { total: 0, growth: 0, trend: [] },
    projects: { total: 0, active: 0, completed: 0, trend: [] },
    clients: { total: 0, new: 0, retention: 0, trend: [] },
    quotes: { total: 0, accepted: 0, pending: 0, conversion: 0 }
  });

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Fetch projects data
      const { data: projects } = await supabase
        .from('projects')
        .select('*');

      // Fetch clients data
      const { data: clients } = await supabase
        .from('clients')
        .select('*');

      // Fetch quotes data
      const { data: quotes } = await supabase
        .from('quotes')
        .select('*');

      // Fetch invoices data
      const { data: invoices } = await supabase
        .from('invoices')
        .select('*');

      // Process analytics data
      const processedAnalytics = {
        revenue: {
          total: invoices?.reduce((sum, inv) => sum + parseFloat(inv.total_amount?.toString() || '0'), 0) || 0,
          growth: 12.5,
          trend: generateTrendData('revenue')
        },
        projects: {
          total: projects?.length || 0,
          active: projects?.filter(p => p.status === 'in_progress').length || 0,
          completed: projects?.filter(p => p.status === 'completed').length || 0,
          trend: generateTrendData('projects')
        },
        clients: {
          total: clients?.length || 0,
          new: clients?.filter(c => {
            const created = new Date(c.created_at);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return created >= thirtyDaysAgo;
          }).length || 0,
          retention: 85.2,
          trend: generateTrendData('clients')
        },
        quotes: {
          total: quotes?.length || 0,
          accepted: quotes?.filter(q => q.status === 'approved').length || 0,
          pending: quotes?.filter(q => q.status === 'pending').length || 0,
          conversion: quotes?.length > 0 ? (quotes.filter(q => q.status === 'approved').length / quotes.length * 100) : 0
        }
      };

      setAnalytics(processedAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateTrendData = (type: string) => {
    const data = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < 12; i++) {
      data.push({
        month: months[i],
        value: Math.floor(Math.random() * 100) + 20,
        target: Math.floor(Math.random() * 80) + 40
      });
    }
    return data;
  };

  const pieData = [
    { name: 'Residential', value: 45, color: '#3b82f6' },
    { name: 'Commercial', value: 30, color: '#10b981' },
    { name: 'Infrastructure', value: 15, color: '#f59e0b' },
    { name: 'Renovation', value: 10, color: '#ef4444' }
  ];

  const performanceData = [
    { metric: 'Project Completion Rate', value: 94, target: 95, status: 'warning' },
    { metric: 'Client Satisfaction', value: 4.8, target: 4.5, status: 'success' },
    { metric: 'Budget Accuracy', value: 92, target: 90, status: 'success' },
    { metric: 'Timeline Adherence', value: 87, target: 90, status: 'danger' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3" />
              Advanced Analytics
            </h1>
            <p className="text-gray-600 mt-2">Comprehensive business intelligence and performance metrics</p>
          </div>
          
          <div className="flex gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={fetchAnalytics} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">KSh {analytics.revenue.total.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+{analytics.revenue.growth}%</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold">{analytics.projects.active}</p>
                  <p className="text-sm text-gray-500">{analytics.projects.total} total</p>
                </div>
                <Building className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold">{analytics.clients.total}</p>
                  <p className="text-sm text-green-600">+{analytics.clients.new} new</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Quote Conversion</p>
                  <p className="text-2xl font-bold">{analytics.quotes.conversion.toFixed(1)}%</p>
                  <p className="text-sm text-gray-500">{analytics.quotes.accepted}/{analytics.quotes.total}</p>
                </div>
                <Target className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={analytics.revenue.trend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Distribution</CardTitle>
                  <CardDescription>Projects by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceData.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{item.metric}</h3>
                      <Badge variant={item.status === 'success' ? 'default' : item.status === 'warning' ? 'secondary' : 'destructive'}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{item.value}{item.metric.includes('Rate') || item.metric.includes('Accuracy') || item.metric.includes('Adherence') ? '%' : ''}</span>
                      <span className="text-sm text-gray-500">Target: {item.target}{item.metric.includes('Rate') || item.metric.includes('Accuracy') || item.metric.includes('Adherence') ? '%' : ''}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div 
                        className={`h-2 rounded-full ${item.status === 'success' ? 'bg-green-500' : item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min((item.value / item.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>Revenue vs. expenses analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={analytics.revenue.trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="value" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="target" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline Analysis</CardTitle>
                <CardDescription>Project completion trends and forecasts</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={analytics.projects.trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" name="Completed Projects" />
                    <Bar dataKey="target" fill="#10b981" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Next Quarter Revenue</h3>
                  <p className="text-3xl font-bold text-green-600">KSh 2.4M</p>
                  <p className="text-sm text-gray-500 mt-2">+18% projected growth</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Building className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upcoming Projects</h3>
                  <p className="text-3xl font-bold text-blue-600">12</p>
                  <p className="text-sm text-gray-500 mt-2">Expected to start</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Client Growth</h3>
                  <p className="text-3xl font-bold text-purple-600">+25%</p>
                  <p className="text-sm text-gray-500 mt-2">Projected increase</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminAnalytics;
