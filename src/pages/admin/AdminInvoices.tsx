import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, FileText, DollarSign, Calendar, Download, Send, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";
import InvoiceViewer from "@/components/InvoiceViewer";

interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  total_amount: number;
  paid_amount: number;
  status: string;
  due_date: string;
  created_at: string;
  notes?: string;
  payment_terms?: string;
  clients?: {
    full_name: string;
    company_name?: string;
    phone: string;
    email?: string;
  };
}

const AdminInvoices = () => {
  const { toast } = useToast();
  const { isAuthenticated, companySettings } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [showInvoiceViewer, setShowInvoiceViewer] = useState(false);

  const [newInvoice, setNewInvoice] = useState({
    clientName: "",
    projectName: "",
    amount: "",
    dueDate: "",
    description: "",
    items: [{ description: "", quantity: 1, rate: 0, amount: 0 }]
  });

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          clients (
            full_name,
            company_name,
            phone,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvoices(data || []);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast({
        title: "Error",
        description: "Failed to load invoices",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const clientName = invoice.clients?.company_name || invoice.clients?.full_name || '';
    const matchesSearch = clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "default";
      case "pending": return "secondary";
      case "overdue": return "destructive";
      case "draft": return "outline";
      default: return "secondary";
    }
  };

  const handleViewInvoice = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setShowInvoiceViewer(true);
  };

  const handleCreateInvoice = () => {
    console.log("Creating new invoice:", newInvoice);
    toast({
      title: "Invoice Created",
      description: "New invoice has been generated successfully.",
    });
    setShowCreateInvoice(false);
    setNewInvoice({
      clientName: "",
      projectName: "",
      amount: "",
      dueDate: "",
      description: "",
      items: [{ description: "", quantity: 1, rate: 0, amount: 0 }]
    });
  };

  const addInvoiceItem = () => {
    setNewInvoice(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const updateInvoiceItem = (index: number, field: string, value: any) => {
    setNewInvoice(prev => ({
      ...prev,
      items: prev.items.map((item, i) => {
        if (i === index) {
          const updatedItem = { ...item, [field]: value };
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const getTotalAmount = () => {
    return newInvoice.items.reduce((total, item) => total + item.amount, 0);
  };

  const currencySymbol = companySettings.currency_symbol || 'KSh';

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="w-8 h-8 mr-3" />
            Invoice Management
          </h1>
          <p className="text-gray-600 mt-2">Create and manage project invoices</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Invoices</p>
                  <p className="text-2xl font-bold">{invoices.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Paid</p>
                  <p className="text-2xl font-bold text-green-600">
                    {invoices.filter(inv => inv.status === "paid").length}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {invoices.filter(inv => inv.status === "pending").length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {currencySymbol} {invoices.reduce((sum, inv) => sum + parseFloat(inv.total_amount.toString()), 0).toLocaleString()}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Invoice Button */}
        <div className="mb-6">
          <Dialog open={showCreateInvoice} onOpenChange={setShowCreateInvoice}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>
                  Generate a new invoice for your client
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={newInvoice.clientName}
                      onChange={(e) => setNewInvoice(prev => ({ ...prev, clientName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      value={newInvoice.projectName}
                      onChange={(e) => setNewInvoice(prev => ({ ...prev, projectName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-base font-medium">Invoice Items</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addInvoiceItem}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {newInvoice.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-3 items-end">
                        <div className="col-span-5">
                          <Label htmlFor={`item-desc-${index}`}>Description</Label>
                          <Input
                            id={`item-desc-${index}`}
                            value={item.description}
                            onChange={(e) => updateInvoiceItem(index, "description", e.target.value)}
                            placeholder="Item description"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor={`item-qty-${index}`}>Quantity</Label>
                          <Input
                            id={`item-qty-${index}`}
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateInvoiceItem(index, "quantity", parseInt(e.target.value))}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor={`item-rate-${index}`}>Rate (KSh)</Label>
                          <Input
                            id={`item-rate-${index}`}
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateInvoiceItem(index, "rate", parseFloat(e.target.value))}
                          />
                        </div>
                        <div className="col-span-3">
                          <Label>Amount (KSh)</Label>
                          <Input value={item.amount.toLocaleString()} readOnly className="bg-gray-50" />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-end">
                      <div className="text-lg font-semibold">
                        Total: KSh {getTotalAmount().toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Notes/Description</Label>
                  <Textarea
                    id="description"
                    value={newInvoice.description}
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Additional notes or payment terms..."
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowCreateInvoice(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateInvoice}>
                    Create Invoice
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search invoices by client, project, or invoice number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Invoices List */}
        <div className="grid gap-6">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{invoice.invoice_number}</h3>
                      <Badge variant={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Client:</span> {invoice.clients?.company_name || invoice.clients?.full_name}
                      </div>
                      <div>
                        <span className="font-medium">Amount:</span> {currencySymbol} {parseFloat(invoice.total_amount.toString()).toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Due:</span> {new Date(invoice.due_date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span> {new Date(invoice.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {invoice.notes && (
                      <p className="text-gray-600 mt-2">{invoice.notes}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewInvoice(invoice.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    {invoice.status !== "paid" && (
                      <Button size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInvoices.length === 0 && !loading && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
              <p className="text-gray-600">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "No invoices have been created yet"
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Invoice Viewer */}
        <InvoiceViewer
          invoiceId={selectedInvoiceId || ''}
          open={showInvoiceViewer}
          onOpenChange={setShowInvoiceViewer}
        />
      </div>
    </div>
  );
};

export default AdminInvoices;
