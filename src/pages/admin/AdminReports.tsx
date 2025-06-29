
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, TrendingUp, Users, DollarSign, Calendar, BarChart3, PieChart, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell, Pie } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";

const AdminReports = () => {
  const { toast } = useToast();
  const { isAuthenticated, companySettings } = useAdmin();
  const [reportType, setReportType] = useState("revenue");
  const [reportFilters, setReportFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'all',
  });
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  useEffect(() => {
    fetchReportData();
  }, [reportType, reportFilters]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      // Use invoices table instead of non-existent payments table
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .gte('created_at', reportFilters.startDate || '2020-01-01')
        .lte('created_at', reportFilters.endDate || '2030-12-31');

      if (error) throw error;
      setReportData(data || []);
    } catch (error) {
      console.error('Error fetching report data:', error);
      toast({
        title: "Error",
        description: "Failed to load report data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    // Implement CSV or PDF download logic here
    toast({
      title: "Download Started",
      description: "Report download will begin shortly.",
    });
  };

  // Dummy data for charts
  const barChartData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 2000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 1890 },
    { name: 'Jun', revenue: 2390 },
    { name: 'Jul', revenue: 3490 },
  ];

  const lineChartData = [
    { name: 'Week 1', users: 40 },
    { name: 'Week 2', users: 30 },
    { name: 'Week 3', users: 20 },
    { name: 'Week 4', users: 27 },
  ];

  const pieChartData = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 300 },
    { name: 'Category D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="w-8 h-8 mr-3" />
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-2">Analyze system data and generate reports</p>
        </div>

        {/* Report Type Selection */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Select Report Type</h2>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="userGrowth">User Growth</SelectItem>
                  <SelectItem value="categoryAnalysis">Category Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-4">Filters</h2>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <DatePicker 
                  date={reportFilters.startDate ? new Date(reportFilters.startDate) : undefined}
                  onDateChange={(date) => setReportFilters(prev => ({ 
                    ...prev, 
                    startDate: date ? date.toISOString().split('T')[0] : '' 
                  }))}
                  placeholder="Select start date"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <DatePicker 
                  date={reportFilters.endDate ? new Date(reportFilters.endDate) : undefined}
                  onDateChange={(date) => setReportFilters(prev => ({ 
                    ...prev, 
                    endDate: date ? date.toISOString().split('T')[0] : '' 
                  }))}
                  placeholder="Select end date"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={reportFilters.category} onValueChange={(value) => setReportFilters(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="A">Category A</SelectItem>
                    <SelectItem value="B">Category B</SelectItem>
                    <SelectItem value="C">Category C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button onClick={fetchReportData} disabled={loading}>
                  {loading ? "Loading..." : "Apply Filters"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Revenue Report */}
          {reportType === "revenue" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Revenue Report</CardTitle>
                <CardDescription>Total revenue generated over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* User Growth Report */}
          {reportType === "userGrowth" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">User Growth Report</CardTitle>
                <CardDescription>New users added over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Analysis Report */}
          {reportType === "categoryAnalysis" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Category Analysis</CardTitle>
                <CardDescription>Distribution of data across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie 
                        dataKey="value" 
                        data={pieChartData} 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80} 
                        fill="#8884d8" 
                        label
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Button onClick={downloadReport} className="mt-6">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default AdminReports;
