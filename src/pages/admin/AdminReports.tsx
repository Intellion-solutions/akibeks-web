
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { FileBarChart, Download, Calendar, TrendingUp, Users, DollarSign, Building, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";

const AdminReports = () => {
  const { isAuthenticated, companySettings } = useAdmin();
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1),
    to: new Date()
  });
  const [reportType, setReportType] = useState("overview");
  const [reportData, setReportData] = useState({
    overview: {
      totalRevenue: 0,
      totalProjects: 0,
      totalClients: 0,
      completedProjects: 0,
      avgProjectValue: 0,
      monthlyRevenue: [],
      projectsByStatus: [],
      clientAcquisition: []
    },
    financial: {
      revenue: 0,
      expenses: 0,
      profit: 0,
      outstandingInvoices: 0,
      paidInvoices: 0,
      monthlyFinancials: [],
      revenueByService: []
    },
    projects: {
      totalProjects: 0,
      onTime: 0,
      delayed: 0,
      budgetCompliance: 0,
      projectTimeline: [],
      budgetAnalysis: []
    },
    clients: {
      totalClients: 0,
      activeClients: 0,
      newClients: 0,
      clientValue: [],
      retentionRate: 85
    }
  });

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  useEffect(() => {
    loadReportData();
  }, [dateRange, reportType]);

  const loadReportData = async () => {
    try {
      // Load data based on selected report type and date range
      switch (reportType) {
        case "overview":
          await loadOverviewData();
          break;
        case "financial":
          await loadFinancialData();
          break;
        case "projects":
          await loadProjectsData();
          break;
        case "clients":
          await loadClientsData();
          break;
      }
    } catch (error) {
      console.error('Error loading report data:', error);
    }
  };

  const loadOverviewData = async () => {
    // Mock data for demonstration
    setReportData(prev => ({
      ...prev,
      overview: {
        totalRevenue: 15600000,
        totalProjects: 48,
        totalClients: 32,
        completedProjects: 28,
        avgProjectValue: 325000,
        monthlyRevenue: [
          { month: 'Jan', revenue: 1200000 },
          { month: 'Feb', revenue: 1800000 },
          { month: 'Mar', revenue: 1500000 },
          { month: 'Apr', revenue: 2200000 },
          { month: 'May', revenue: 1900000 },
          { month: 'Jun', revenue: 2500000 }
        ],
        projectsByStatus: [
          { name: 'Completed', value: 28, color: '#10b981' },
          { name: 'In Progress', value: 12, color: '#f59e0b' },
          { name: 'Planning', value: 8, color: '#3b82f6' }
        ],
        clientAcquisition: [
          { month: 'Jan', clients: 2 },
          { month: 'Feb', clients: 4 },
          { month: 'Mar', clients: 3 },
          { month: 'Apr', clients: 5 },
          { month: 'May', clients: 3 },
          { month: 'Jun', clients: 6 }
        ]
      }
    }));
  };

  const loadFinancialData = async () => {
    setReportData(prev => ({
      ...prev,
      financial: {
        revenue: 15600000,
        expenses: 8200000,
        profit: 7400000,
        outstandingInvoices: 2400000,
        paidInvoices: 13200000,
        monthlyFinancials: [
          { month: 'Jan', revenue: 1200000, expenses: 650000, profit: 550000 },
          { month: 'Feb', revenue: 1800000, expenses: 920000, profit: 880000 },
          { month: 'Mar', revenue: 1500000, expenses: 780000, profit: 720000 },
          { month: 'Apr', revenue: 2200000, expenses: 1100000, profit: 1100000 },
          { month: 'May', revenue: 1900000, expenses: 950000, profit: 950000 },
          { month: 'Jun', revenue: 2500000, expenses: 1200000, profit: 1300000 }
        ],
        revenueByService: [
          { service: 'Residential', revenue: 6200000, color: '#3b82f6' },
          { service: 'Commercial', revenue: 5800000, color: '#10b981' },
          { service: 'Renovation', revenue: 2100000, color: '#f59e0b' },
          { service: 'Civil Works', revenue: 1500000, color: '#ef4444' }
        ]
      }
    }));
  };

  const loadProjectsData = async () => {
    setReportData(prev => ({
      ...prev,
      projects: {
        totalProjects: 48,
        onTime: 38,
        delayed: 10,
        budgetCompliance: 82,
        projectTimeline: [
          { month: 'Jan', started: 3, completed: 5 },
          { month: 'Feb', started: 5, completed: 4 },
          { month: 'Mar', started: 4, completed: 6 },
          { month: 'Apr', started: 6, completed: 3 },
          { month: 'May', started: 4, completed: 5 },
          { month: 'Jun', started: 7, completed: 5 }
        ],
        budgetAnalysis: [
          { project: 'Westlands Complex', budgeted: 4500000, actual: 4200000, variance: -300000 },
          { project: 'Kilimani Tower', budgeted: 8500000, actual: 9100000, variance: 600000 },
          { project: 'Karen Villa', budgeted: 1800000, actual: 1750000, variance: -50000 },
          { project: 'Kiambu Roads', budgeted: 15000000, actual: 14500000, variance: -500000 }
        ]
      }
    }));
  };

  const loadClientsData = async () => {
    setReportData(prev => ({
      ...prev,
      clients: {
        totalClients: 32,
        activeClients: 28,
        newClients: 12,
        clientValue: [
          { client: 'ABC Construction', value: 2800000 },
          { client: 'Kenya Railways', value: 5200000 },
          { client: 'Riverside Developers', value: 1900000 },
          { client: 'Urban Properties', value: 3400000 },
          { client: 'Green Homes Ltd', value: 1600000 }
        ],
        retentionRate: 87
      }
    }));
  };

  const exportReport = () => {
    // Mock export functionality
    const reportName = `${reportType}_report_${new Date().toISOString().split('T')[0]}.pdf`;
    console.log(`Exporting ${reportName}`);
    // In a real app, this would generate and download a PDF
  };

  const currencySymbol = companySettings.currency_symbol || 'KSh';

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currencySymbol} {reportData.overview.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{reportData.overview.completedProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-teal-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Project Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currencySymbol} {reportData.overview.avgProjectValue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData.overview.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${currencySymbol} ${value.toLocaleString()}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects by Status</CardTitle>
            <CardDescription>Distribution of project statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData.overview.projectsByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {reportData.overview.projectsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Acquisition</CardTitle>
          <CardDescription>New clients acquired each month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.overview.clientAcquisition}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="clients" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">
                {currencySymbol} {reportData.financial.revenue.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-red-600">
                {currencySymbol} {reportData.financial.expenses.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-blue-600">
                {currencySymbol} {reportData.financial.profit.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Outstanding</p>
              <p className="text-2xl font-bold text-orange-600">
                {currencySymbol} {reportData.financial.outstandingInvoices.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Paid Invoices</p>
              <p className="text-2xl font-bold text-green-600">
                {currencySymbol} {reportData.financial.paidInvoices.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Performance</CardTitle>
            <CardDescription>Revenue, expenses, and profit trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reportData.financial.monthlyFinancials}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${currencySymbol} ${value.toLocaleString()}`]} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Service Type</CardTitle>
            <CardDescription>Revenue distribution across services</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={reportData.financial.revenueByService}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ service, percent }) => `${service} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {reportData.financial.revenueByService.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${currencySymbol} ${value.toLocaleString()}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProjectsReport = () => (
    <div className="space-y-6">
      {/* Project Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-blue-600">{reportData.projects.totalProjects}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">On Time</p>
              <p className="text-2xl font-bold text-green-600">{reportData.projects.onTime}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Delayed</p>
              <p className="text-2xl font-bold text-red-600">{reportData.projects.delayed}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Budget Compliance</p>
              <p className="text-2xl font-bold text-purple-600">{reportData.projects.budgetCompliance}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>Projects started vs completed each month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData.projects.projectTimeline}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="started" fill="#3b82f6" name="Started" />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Budget Analysis Table */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Analysis</CardTitle>
          <CardDescription>Project budget vs actual costs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Project</th>
                  <th className="text-right p-3">Budgeted</th>
                  <th className="text-right p-3">Actual</th>
                  <th className="text-right p-3">Variance</th>
                  <th className="text-right p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.projects.budgetAnalysis.map((project, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 font-medium">{project.project}</td>
                    <td className="p-3 text-right">{currencySymbol} {project.budgeted.toLocaleString()}</td>
                    <td className="p-3 text-right">{currencySymbol} {project.actual.toLocaleString()}</td>
                    <td className={`p-3 text-right font-medium ${project.variance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {currencySymbol} {project.variance.toLocaleString()}
                    </td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.variance < 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {project.variance < 0 ? 'Under Budget' : 'Over Budget'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderClientsReport = () => (
    <div className="space-y-6">
      {/* Client Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-blue-600">{reportData.clients.totalClients}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Active Clients</p>
              <p className="text-2xl font-bold text-green-600">{reportData.clients.activeClients}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">New Clients</p>
              <p className="text-2xl font-bold text-purple-600">{reportData.clients.newClients}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Retention Rate</p>
              <p className="text-2xl font-bold text-orange-600">{reportData.clients.retentionRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Clients by Value</CardTitle>
          <CardDescription>Highest value clients and their project worth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Client</th>
                  <th className="text-right p-3">Total Value</th>
                  <th className="text-right p-3">Projects</th>
                  <th className="text-right p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.clients.clientValue.map((client, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 font-medium">{client.client}</td>
                    <td className="p-3 text-right font-semibold">{currencySymbol} {client.value.toLocaleString()}</td>
                    <td className="p-3 text-right">{Math.floor(Math.random() * 5) + 1}</td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileBarChart className="w-8 h-8 mr-3" />
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-2">Generate detailed business reports and insights</p>
        </div>

        {/* Report Controls */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label className="text-sm font-medium mb-2 block">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Business Overview</SelectItem>
                    <SelectItem value="financial">Financial Analysis</SelectItem>
                    <SelectItem value="projects">Project Performance</SelectItem>
                    <SelectItem value="clients">Client Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <Label className="text-sm font-medium mb-2 block">Date Range</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {dateRange.from?.toLocaleDateString()} - {dateRange.to?.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-end">
                <Button onClick={exportReport} className="bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Content */}
        {reportType === "overview" && renderOverviewReport()}
        {reportType === "financial" && renderFinancialReport()}
        {reportType === "projects" && renderProjectsReport()}
        {reportType === "clients" && renderClientsReport()}
      </div>
    </div>
  );
};

export default AdminReports;
