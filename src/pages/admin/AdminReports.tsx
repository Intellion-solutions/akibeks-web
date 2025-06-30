
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
import { FileText, Download, Calendar as CalendarIcon, Filter, TrendingUp, Users, Building, DollarSign, Clock, Send, Settings } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";

const AdminReports = () => {
  const { isAuthenticated } = useAdmin();
  const [dateRange, setDateRange] = useState<{from: Date; to: Date}>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  const [reportType, setReportType] = useState("financial");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [loading, setLoading] = useState(false);
  const [scheduledReports, setScheduledReports] = useState([]);
  const [reportData, setReportData] = useState({
    financial: { revenue: 0, expenses: 0, profit: 0, growth: 0 },
    projects: { total: 0, completed: 0, inProgress: 0, completion: 0 },
    clients: { total: 0, new: 0, active: 0, retention: 0 },
    performance: { efficiency: 0, satisfaction: 0, timeline: 0, budget: 0 }
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
      // Fetch data based on date range and report type
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString());

      const { data: clients } = await supabase
        .from('clients')
        .select('*')
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString());

      const { data: invoices } = await supabase
        .from('invoices')
        .select('*')
        .gte('created_at', dateRange.from.toISOString())
        .lte('created_at', dateRange.to.toISOString());

      // Process data for reports
      const processedData = {
        financial: {
          revenue: invoices?.reduce((sum, inv) => sum + parseFloat(inv.total_amount?.toString() || '0'), 0) || 0,
          expenses: Math.random() * 500000, // Mock data
          profit: 0,
          growth: 12.5
        },
        projects: {
          total: projects?.length || 0,
          completed: projects?.filter(p => p.status === 'completed').length || 0,
          inProgress: projects?.filter(p => p.status === 'in_progress').length || 0,
          completion: 85
        },
        clients: {
          total: clients?.length || 0,
          new: clients?.length || 0,
          active: Math.floor((clients?.length || 0) * 0.8),
          retention: 92
        },
        performance: {
          efficiency: 88,
          satisfaction: 4.7,
          timeline: 91,
          budget: 94
        }
      };

      processedData.financial.profit = processedData.financial.revenue - processedData.financial.expenses;
      setReportData(processedData);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchScheduledReports = async () => {
    // Mock scheduled reports data
    setScheduledReports([
      { id: 1, name: 'Monthly Financial Report', type: 'financial', frequency: 'monthly', nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
      { id: 2, name: 'Weekly Project Status', type: 'projects', frequency: 'weekly', nextRun: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
      { id: 3, name: 'Client Analytics', type: 'clients', frequency: 'monthly', nextRun: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) }
    ]);
  };

  const generateReport = async () => {
    setLoading(true);
    try {
      // Mock report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would generate and download the actual report
      console.log('Generating report:', { reportType, reportFormat, dateRange });
      
      // Simulate file download
      const blob = new Blob(['Report content would be here'], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-report-${format(new Date(), 'yyyy-MM-dd')}.${reportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeSelect = (range: any) => {
    if (range?.from && range?.to) {
      setDateRange({ from: range.from, to: range.to });
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
              <FileText className="w-8 h-8 mr-3" />
              Advanced Reports
            </h1>
            <p className="text-gray-600 mt-2">Generate comprehensive business reports and analytics</p>
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
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
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
                        <Badge variant="outline">{report.type}</Badge>
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
                  {reportTemplates.find(t => t.id === reportType)?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reportType === 'financial' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                      <p className="text-2xl font-bold text-orange-600">+{reportData.financial.growth}%</p>
                      <p className="text-sm text-gray-600">Growth</p>
                    </div>
                  </div>
                )}

                {reportType === 'projects' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{reportData.projects.completion}%</p>
                      <p className="text-sm text-gray-600">Completion Rate</p>
                    </div>
                  </div>
                )}

                {reportType === 'clients' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                  </div>
                )}

                {reportType === 'performance' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{reportData.performance.efficiency}%</p>
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
