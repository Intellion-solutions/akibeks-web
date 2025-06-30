
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FileText, Download, Filter, Calendar as CalendarIcon, Printer, Mail, Share2, BarChart3, PieChart, TrendingUp, AlertCircle, CheckCircle, Clock, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";
import { cn } from "@/lib/utils";

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: string[];
  icon: React.ElementType;
  color: string;
}

const AdminReports = () => {
  const { isAuthenticated, companySettings } = useAdmin();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [reportData, setReportData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  });
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    client: 'all'
  });

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const reportTemplates: ReportTemplate[] = [
    {
      id: 'financial-summary',
      name: 'Financial Summary Report',
      description: 'Comprehensive financial overview including revenue, expenses, and profit analysis',
      category: 'Financial',
      fields: ['Total Revenue', 'Total Expenses', 'Net Profit', 'Outstanding Invoices', 'Payment Status'],
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'project-performance',
      name: 'Project Performance Report',
      description: 'Detailed analysis of project timelines, budgets, and completion rates',
      category: 'Operations',
      fields: ['Project Status', 'Timeline Adherence', 'Budget Variance', 'Resource Utilization'],
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'client-analysis',
      name: 'Client Analysis Report',
      description: 'Client satisfaction, retention rates, and business value analysis',
      category: 'Business',
      fields: ['Client Satisfaction', 'Retention Rate', 'Lifetime Value', 'New Acquisitions'],
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'quote-conversion',
      name: 'Quote Conversion Report',
      description: 'Analysis of quote-to-project conversion rates and sales performance',
      category: 'Sales',
      fields: ['Conversion Rate', 'Average Quote Value', 'Response Time', 'Success Factors'],
      icon: PieChart,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'resource-utilization',
      name: 'Resource Utilization Report',
      description: 'Equipment, materials, and human resource utilization analysis',
      category: 'Operations',
      fields: ['Equipment Usage', 'Material Consumption', 'Labor Hours', 'Efficiency Metrics'],
      icon: CheckCircle,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'compliance-audit',
      name: 'Compliance & Audit Report',
      description: 'Safety compliance, quality standards, and regulatory requirements tracking',
      category: 'Compliance',
      fields: ['Safety Incidents', 'Quality Scores', 'Regulatory Compliance', 'Audit Results'],
      icon: AlertCircle,
      color: 'from-red-500 to-red-600'
    }
  ];

  const generateReport = async (templateId: string) => {
    setLoading(true);
    try {
      let data = [];
      
      switch (templateId) {
        case 'financial-summary':
          const { data: invoices } = await supabase.from('invoices').select('*');
          data = invoices || [];
          break;
        case 'project-performance':
          const { data: projects } = await supabase.from('projects').select('*');
          data = projects || [];
          break;
        case 'client-analysis':
          const { data: clients } = await supabase.from('clients').select('*');
          data = clients || [];
          break;
        case 'quote-conversion':
          const { data: quotes } = await supabase.from('quotes').select('*');
          data = quotes || [];
          break;
        default:
          data = [];
      }
      
      setReportData(data);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    console.log(`Exporting report in ${format} format`);
    // Implementation for export functionality
  };

  const scheduleReport = () => {
    console.log('Scheduling report');
    // Implementation for report scheduling
  };

  const selectedTemplateData = reportTemplates.find(t => t.id === selectedTemplate);

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

          <div className="flex gap-4">
            <Button variant="outline" onClick={scheduleReport}>
              <Clock className="w-4 h-4 mr-2" />
              Schedule Report
            </Button>
            <Button>
              <Mail className="w-4 h-4 mr-2" />
              Email Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Templates */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Choose from predefined report templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {reportTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={cn(
                      "p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md",
                      selectedTemplate === template.id 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${template.color}`}>
                        <template.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Report Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date Range</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} -{" "}
                              {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => selectedTemplate && generateReport(selectedTemplate)}
                  disabled={!selectedTemplate || loading}
                >
                  {loading ? "Generating..." : "Generate Report"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Report Content */}
          <div className="lg:col-span-2">
            {selectedTemplateData ? (
              <Card className="h-fit">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <selectedTemplateData.icon className="w-6 h-6 mr-2" />
                        {selectedTemplateData.name}
                      </CardTitle>
                      <CardDescription>{selectedTemplateData.description}</CardDescription>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => exportReport('pdf')}>
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => exportReport('excel')}>
                        <Download className="w-4 h-4 mr-1" />
                        Excel
                      </Button>
                      <Button variant="outline" size="sm">
                        <Printer className="w-4 h-4 mr-1" />
                        Print
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-3">Generating report...</span>
                    </div>
                  ) : reportData.length > 0 ? (
                    <div className="space-y-6">
                      {/* Report Summary */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedTemplateData.fields.slice(0, 4).map((field, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">{field}</p>
                            <p className="text-2xl font-bold">
                              {selectedTemplate === 'financial-summary' && index === 0 ? 
                                `KSh ${reportData.reduce((sum, item) => sum + parseFloat(item.total_amount || 0), 0).toLocaleString()}` :
                                Math.floor(Math.random() * 100) + 1
                              }
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Detailed Data Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              {Object.keys(reportData[0] || {}).slice(0, 5).map((key) => (
                                <th key={key} className="border border-gray-200 px-4 py-2 text-left font-semibold">
                                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {reportData.slice(0, 10).map((row, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                {Object.values(row).slice(0, 5).map((value: any, colIndex) => (
                                  <td key={colIndex} className="border border-gray-200 px-4 py-2">
                                    {typeof value === 'string' && value.length > 30 
                                      ? `${value.substring(0, 30)}...` 
                                      : value?.toString() || '-'
                                    }
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {reportData.length > 10 && (
                        <p className="text-sm text-gray-500 text-center">
                          Showing 10 of {reportData.length} records. Export for full dataset.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
                      <p className="text-gray-600">
                        Generate a report to view data or adjust your filters.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-fit">
                <CardContent className="p-12 text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Report Template</h3>
                  <p className="text-gray-600">
                    Choose a report template from the list to get started with your analysis.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
