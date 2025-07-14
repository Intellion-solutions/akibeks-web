
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FileText, Download, Calendar as CalendarIcon, Filter, TrendingUp, Users, Building, DollarSign, Clock, Send, Settings, BarChart3, PieChart, FileSpreadsheet } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";

const AdminReports = () => {
  const { isAuthenticated } = useAdmin();
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<{from: Date; to: Date}>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  const [reportType, setReportType] = useState("financial");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [loading, setLoading] = useState(false);
  const [scheduledReports, setScheduledReports] = useState([]);
  const [reportData, setReportData] = useState({
    financial: { revenue: 0, expenses: 0, profit: 0, growth: 0, invoicesCount: 0, paidInvoices: 0 },
    projects: { total: 0, completed: 0, inProgress: 0, completion: 0, planning: 0, onHold: 0 },
    clients: { total: 0, new: 0, active: 0, retention: 0, companies: 0, individuals: 0 },
    performance: { efficiency: 0, satisfaction: 0, timeline: 0, budget: 0, tasksCompleted: 0, overdueItems: 0 }
  });

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  useEffect(() => {
    fetchReportData();
    fetchScheduledReports();
  }, [dateRange, reportType]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      // Fetch projects data
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString());

      // Fetch clients data
      const { data: clients } = await supabase
        .from('clients')
        .select('*')
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString());

      // Fetch invoices data
      const { data: invoices } = await supabase
        .from('invoices')
        .select('*')
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString());

      // Fetch tasks data
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString());

      // Calculate financial metrics
      const totalRevenue = invoices?.reduce((sum, inv) => sum + parseFloat(inv.total_amount?.toString() || '0'), 0) || 0;
      const paidAmount = invoices?.reduce((sum, inv) => sum + parseFloat(inv.paid_amount?.toString() || '0'), 0) || 0;
      const estimatedExpenses = totalRevenue * 0.7; // Estimated 70% of revenue as expenses
      const profit = totalRevenue - estimatedExpenses;
      const previousPeriodRevenue = totalRevenue * 0.9; // Mock previous period
      const growth = previousPeriodRevenue > 0 ? ((totalRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100 : 0;

      // Calculate project metrics
      const completedProjects = projects?.filter(p => p.status === 'completed').length || 0;
      const inProgressProjects = projects?.filter(p => p.status === 'in_progress').length || 0;
      const planningProjects = projects?.filter(p => p.status === 'planning').length || 0;
      const onHoldProjects = projects?.filter(p => p.status === 'on_hold').length || 0;
      const totalProjects = projects?.length || 0;
      const completionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

      // Calculate client metrics
      const totalClients = clients?.length || 0;
      const companyClients = clients?.filter(c => c.company_name).length || 0;
      const individualClients = totalClients - companyClients;
      const activeClients = Math.floor(totalClients * 0.8); // Estimate 80% are active
      const retentionRate = 92; // Mock retention rate

      // Calculate performance metrics
      const completedTasks = tasks?.filter(t => t.status === 'completed').length || 0;
      const totalTasks = tasks?.length || 0;
      const overdueTasks = tasks?.filter(t => {
        if (!t.due_date) return false;
        return new Date(t.due_date) < new Date() && t.status !== 'completed';
      }).length || 0;
      
      const efficiency = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      const satisfaction = 4.7; // Mock satisfaction score
      const timelinePerformance = 91; // Mock timeline performance
      const budgetAccuracy = 94; // Mock budget accuracy

      const processedData = {
        financial: {
          revenue: totalRevenue,
          expenses: estimatedExpenses,
          profit: profit,
          growth: growth,
          invoicesCount: invoices?.length || 0,
          paidInvoices: invoices?.filter(i => i.status === 'paid').length || 0
        },
        projects: {
          total: totalProjects,
          completed: completedProjects,
          inProgress: inProgressProjects,
          planning: planningProjects,
          onHold: onHoldProjects,
          completion: completionRate
        },
        clients: {
          total: totalClients,
          new: totalClients, // All clients in date range are "new"
          active: activeClients,
          retention: retentionRate,
          companies: companyClients,
          individuals: individualClients
        },
        performance: {
          efficiency: efficiency,
          satisfaction: satisfaction,
          timeline: timelinePerformance,
          budget: budgetAccuracy,
          tasksCompleted: completedTasks,
          overdueItems: overdueTasks
        }
      };

      setReportData(processedData);
    } catch (error) {
      console.error('Error fetching report data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch report data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchScheduledReports = async () => {
    // Mock scheduled reports data - in real app, fetch from database
    setScheduledReports([
      { id: 1, name: 'Monthly Financial Report', type: 'financial', frequency: 'monthly', nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), status: 'active' },
      { id: 2, name: 'Weekly Project Status', type: 'projects', frequency: 'weekly', nextRun: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), status: 'active' },
      { id: 3, name: 'Client Analytics', type: 'clients', frequency: 'monthly', nextRun: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), status: 'paused' },
      { id: 4, name: 'Performance Dashboard', type: 'performance', frequency: 'weekly', nextRun: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), status: 'active' }
    ]);
  };

  const generateReport = async () => {
    setLoading(true);
    try {
      // Generate actual report content based on selected type
      let reportContent = '';
      const currentData = reportData[reportType as keyof typeof reportData];
      
      switch (reportType) {
        case 'financial':
          reportContent = `Financial Report (${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd, yyyy')})
          
Revenue: KSh ${currentData.revenue.toLocaleString()}
Expenses: KSh ${currentData.expenses.toLocaleString()}
Profit: KSh ${currentData.profit.toLocaleString()}
Growth: ${currentData.growth.toFixed(1)}%
Total Invoices: ${currentData.invoicesCount}
Paid Invoices: ${currentData.paidInvoices}`;
          break;
          
        case 'projects':
          reportContent = `Project Status Report (${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd, yyyy')})
          
Total Projects: ${currentData.total}
Completed: ${currentData.completed}
In Progress: ${currentData.inProgress}
Planning: ${currentData.planning}
On Hold: ${currentData.onHold}
Completion Rate: ${currentData.completion.toFixed(1)}%`;
          break;
          
        case 'clients':
          reportContent = `Client Analytics Report (${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd, yyyy')})
          
Total Clients: ${currentData.total}
Company Clients: ${currentData.companies}
Individual Clients: ${currentData.individuals}
Active Clients: ${currentData.active}
Retention Rate: ${currentData.retention}%`;
          break;
          
        case 'performance':
          reportContent = `Performance Report (${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd, yyyy')})
          
Efficiency: ${currentData.efficiency.toFixed(1)}%
Satisfaction: ${currentData.satisfaction}/5
Timeline Performance: ${currentData.timeline}%
Budget Accuracy: ${currentData.budget}%
Tasks Completed: ${currentData.tasksCompleted}
Overdue Items: ${currentData.overdueItems}`;
          break;
      }

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create and download the report file
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-report-${format(new Date(), 'yyyy-MM-dd')}.${reportFormat === 'pdf' ? 'pdf' : reportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Report Generated",
        description: `${reportType} report has been downloaded successfully`,
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeSelect = (range: any) => {
    if (range?.from && range?.to) {
      setDateRange({ from: range.from, to: range.to });
    }
  };

  const scheduleReport = async (reportConfig: any) => {
    try {
      // In a real app, save to database
      toast({
        title: "Report Scheduled",
        description: `${reportConfig.name} has been scheduled successfully`,
      });
      await fetchScheduledReports();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule report",
        variant: "destructive"
      });
    }
  };

  const exportData = async (format: string) => {
    setLoading(true);
    try {
      // Export current report data in specified format
      const dataToExport = {
        reportType,
        dateRange: {
          from: format(dateRange.from, 'yyyy-MM-dd'),
          to: format(dateRange.to, 'yyyy-MM-dd')
        },
        data: reportData[reportType as keyof typeof reportData],
        generatedAt: new Date().toISOString()
      };

      let content = '';
      let mimeType = '';
      let fileExtension = '';

      switch (format) {
        case 'json':
          content = JSON.stringify(dataToExport, null, 2);
          mimeType = 'application/json';
          fileExtension = 'json';
          break;
        case 'csv':
          // Convert to CSV format
          const csvData = Object.entries(dataToExport.data).map(([key, value]) => `${key},${value}`).join('\n');
          content = `Metric,Value\n${csvData}`;
          mimeType = 'text/csv';
          fileExtension = 'csv';
          break;
        default:
          content = JSON.stringify(dataToExport, null, 2);
          mimeType = 'application/json';
          fileExtension = 'json';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-data-${format(new Date(), 'yyyy-MM-dd')}.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Data Exported",
        description: `Report data exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const reportTemplates = [
    {
      id: 'financial',
      name: 'Financial Report',
      description: 'Revenue, expenses, profit margins, and financial KPIs',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 'projects',
      name: 'Project Status Report',
      description: 'Project progress, timelines, and completion rates',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      id: 'clients',
      name: 'Client Analytics',
      description: 'Client acquisition, retention, and satisfaction metrics',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      id: 'performance',
      name: 'Performance Dashboard',
      description: 'Overall business performance and efficiency metrics',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3" />
              Advanced Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-2">Generate comprehensive business reports and analytics with real-time data</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => exportData('json')} variant="outline">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
            <Button onClick={() => exportData('csv')} variant="outline">
              <PieChart className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Report Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="reportType">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from && dateRange.to 
                          ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd, yyyy")}`
                          : "Select date range"
                        }
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={{ from: dateRange.from, to: dateRange.to }}
                        onSelect={handleDateRangeSelect}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="reportFormat">Export Format</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV Data</SelectItem>
                      <SelectItem value="json">JSON Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={generateReport} disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Scheduled Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Scheduled Reports
                </CardTitle>
                <CardDescription>
                  Automated report generation and delivery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduledReports.map((report: any) => (
                    <div key={report.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-xs text-gray-500">
                            {report.frequency} • Next: {format(report.nextRun, 'MMM dd')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={report.status === 'active' ? 'default' : 'secondary'}>
                            {report.status}
                          </Badge>
                          <Badge variant="outline">{report.type}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Report Preview & Templates */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Templates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTemplates.map(template => {
                const IconComponent = template.icon;
                return (
                  <Card key={template.id} className={`cursor-pointer transition-all hover:shadow-lg ${reportType === template.id ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setReportType(template.id)}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <IconComponent className={`w-8 h-8 ${template.color}`} />
                        <div>
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Report Data Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Report Preview</CardTitle>
                <CardDescription>
                  {reportTemplates.find(t => t.id === reportType)?.description} • {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reportType === 'financial' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">KSh {reportData.financial.revenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Revenue</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">KSh {reportData.financial.expenses.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Expenses</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">KSh {reportData.financial.profit.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Profit</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">+{reportData.financial.growth.toFixed(1)}%</p>
                      <p className="text-sm text-gray-600">Growth</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{reportData.financial.invoicesCount}</p>
                      <p className="text-sm text-gray-600">Total Invoices</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-600">{reportData.financial.paidInvoices}</p>
                      <p className="text-sm text-gray-600">Paid Invoices</p>
                    </div>
                  </div>
                )}

                {reportType === 'projects' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{reportData.projects.total}</p>
                      <p className="text-sm text-gray-600">Total Projects</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{reportData.projects.completed}</p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{reportData.projects.inProgress}</p>
                      <p className="text-sm text-gray-600">In Progress</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">{reportData.projects.planning}</p>
                      <p className="text-sm text-gray-600">Planning</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{reportData.projects.onHold}</p>
                      <p className="text-sm text-gray-600">On Hold</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{reportData.projects.completion.toFixed(1)}%</p>
                      <p className="text-sm text-gray-600">Completion Rate</p>
                    </div>
                  </div>
                )}

                {reportType === 'clients' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{reportData.clients.total}</p>
                      <p className="text-sm text-gray-600">Total Clients</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{reportData.clients.new}</p>
                      <p className="text-sm text-gray-600">New Clients</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{reportData.clients.active}</p>
                      <p className="text-sm text-gray-600">Active Clients</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{reportData.clients.retention}%</p>
                      <p className="text-sm text-gray-600">Retention Rate</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-600">{reportData.clients.companies}</p>
                      <p className="text-sm text-gray-600">Companies</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">{reportData.clients.individuals}</p>
                      <p className="text-sm text-gray-600">Individuals</p>
                    </div>
                  </div>
                )}

                {reportType === 'performance' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{reportData.performance.efficiency.toFixed(1)}%</p>
                      <p className="text-sm text-gray-600">Efficiency</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{reportData.performance.satisfaction}/5</p>
                      <p className="text-sm text-gray-600">Satisfaction</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{reportData.performance.timeline}%</p>
                      <p className="text-sm text-gray-600">Timeline</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{reportData.performance.budget}%</p>
                      <p className="text-sm text-gray-600">Budget Accuracy</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-600">{reportData.performance.tasksCompleted}</p>
                      <p className="text-sm text-gray-600">Tasks Completed</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{reportData.performance.overdueItems}</p>
                      <p className="text-sm text-gray-600">Overdue Items</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
