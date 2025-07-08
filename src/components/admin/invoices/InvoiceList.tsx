
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Send } from "lucide-react";

interface InvoiceListProps {
  invoices: any[];
  currencySymbol: string;
  handleViewInvoice: (invoiceId: string) => void;
  getStatusColor: (status: string) => "default" | "destructive" | "outline" | "secondary";
}

const InvoiceList = ({ invoices, currencySymbol, handleViewInvoice, getStatusColor }: InvoiceListProps) => {
  if (invoices.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-12 h-12 text-gray-400 mx-auto mb-4">📄</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
          <p className="text-gray-600">No invoices have been created yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      {invoices.map((invoice) => (
        <Card key={invoice.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{invoice.invoice_number}</h3>
                  <Badge variant={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                  {invoice.template_type && (
                    <Badge variant="outline">{invoice.template_type}</Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Client:</span> {invoice.clients?.company_name || invoice.clients?.full_name}
                  </div>
                  <div>
                    <span className="font-medium">Amount:</span> {currencySymbol} {parseFloat(invoice.total_amount.toString()).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Due:</span> {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'Not set'}
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
  );
};

export default InvoiceList;
