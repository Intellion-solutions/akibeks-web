
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Eye, Plus, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdminTemplates = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [previewData, setPreviewData] = useState({
    clientName: "John Doe",
    projectName: "Residential Construction",
    amount: "KSh 2,500,000",
    date: new Date().toLocaleDateString(),
    items: [
      { description: "Foundation Work", quantity: 100, rate: 5000, total: 500000 },
      { description: "Structural Work", quantity: 200, rate: 8000, total: 1600000 },
      { description: "Finishing Work", quantity: 150, rate: 2600, total: 390000 }
    ]
  });

  const templates = [
    {
      id: "quote_template",
      name: "Quote Template",
      description: "Standard template for project quotes",
      type: "quote",
      content: `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
  <header style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 20px; margin-bottom: 30px;">
    <h1 style="color: #f97316; margin-bottom: 10px;">AKIBEKS Engineering Solutions</h1>
    <p style="color: #666; margin: 5px 0;">Professional Construction & Engineering Services</p>
    <p style="color: #666; margin: 5px 0;">Phone: +254 710 245 118 | Email: info@akibeks.co.ke</p>
  </header>
  
  <div style="margin-bottom: 30px;">
    <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">PROJECT QUOTE</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
      <div>
        <p><strong>Client:</strong> {{clientName}}</p>
        <p><strong>Project:</strong> {{projectName}}</p>
        <p><strong>Date:</strong> {{date}}</p>
      </div>
      <div>
        <p><strong>Quote Number:</strong> Q000001</p>
        <p><strong>Valid Until:</strong> {{validUntil}}</p>
        <p><strong>Status:</strong> Draft</p>
      </div>
    </div>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
    <thead>
      <tr style="background-color: #f8f9fa;">
        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Description</th>
        <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">Qty</th>
        <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Rate</th>
        <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>
      {{#items}}
      <tr>
        <td style="border: 1px solid #ddd; padding: 12px;">{{description}}</td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">{{quantity}}</td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">KSh {{rate}}</td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">KSh {{total}}</td>
      </tr>
      {{/items}}
    </tbody>
    <tfoot>
      <tr style="background-color: #f8f9fa; font-weight: bold;">
        <td colspan="3" style="border: 1px solid #ddd; padding: 12px; text-align: right;">TOTAL:</td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: right; color: #f97316;">{{amount}}</td>
      </tr>
    </tfoot>
  </table>

  <div style="margin-top: 30px;">
    <h3 style="color: #333;">Terms & Conditions</h3>
    <ul style="color: #666; line-height: 1.6;">
      <li>50% deposit required to commence work</li>
      <li>All materials will be of the highest quality</li>
      <li>Work will be completed as per agreed timeline</li>
      <li>Quote valid for 30 days from date of issue</li>
    </ul>
  </div>

  <footer style="margin-top: 40px; text-align: center; color: #666; font-size: 14px;">
    <p>Thank you for choosing AKIBEKS Engineering Solutions</p>
  </footer>
</div>
      `
    },
    {
      id: "invoice_template",
      name: "Invoice Template",
      description: "Standard template for project invoices",
      type: "invoice",
      content: `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
  <header style="text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 20px; margin-bottom: 30px;">
    <h1 style="color: #f97316; margin-bottom: 10px;">AKIBEKS Engineering Solutions</h1>
    <p style="color: #666; margin: 5px 0;">Professional Construction & Engineering Services</p>
    <p style="color: #666; margin: 5px 0;">Phone: +254 710 245 118 | Email: info@akibeks.co.ke</p>
  </header>
  
  <div style="margin-bottom: 30px;">
    <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">INVOICE</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
      <div>
        <p><strong>Bill To:</strong></p>
        <p>{{clientName}}</p>
        <p>{{clientAddress}}</p>
      </div>
      <div>
        <p><strong>Invoice Number:</strong> INV000001</p>
        <p><strong>Date:</strong> {{date}}</p>
        <p><strong>Due Date:</strong> {{dueDate}}</p>
        <p><strong>Project:</strong> {{projectName}}</p>
      </div>
    </div>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
    <thead>
      <tr style="background-color: #f8f9fa;">
        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Description</th>
        <th style="border: 1px solid #ddd; padding: 12px; text-align: center;">Qty</th>
        <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Rate</th>
        <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>
      {{#items}}
      <tr>
        <td style="border: 1px solid #ddd; padding: 12px;">{{description}}</td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">{{quantity}}</td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">KSh {{rate}}</td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">KSh {{total}}</td>
      </tr>
      {{/items}}
    </tbody>
    <tfoot>
      <tr style="background-color: #f8f9fa; font-weight: bold;">
        <td colspan="3" style="border: 1px solid #ddd; padding: 12px; text-align: right;">TOTAL:</td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: right; color: #f97316;">{{amount}}</td>
      </tr>
    </tfoot>
  </table>

  <div style="margin-top: 30px;">
    <h3 style="color: #333;">Payment Information</h3>
    <p style="color: #666; line-height: 1.6;">
      Please make payment within 30 days of invoice date.<br/>
      Bank: ABC Bank Kenya<br/>
      Account: 1234567890<br/>
      Reference: {{invoiceNumber}}
    </p>
  </div>

  <footer style="margin-top: 40px; text-align: center; color: #666; font-size: 14px;">
    <p>Thank you for your business!</p>
  </footer>
</div>
      `
    }
  ];

  const generatePreview = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return "";

    let content = template.content;
    
    // Replace placeholders with preview data
    content = content.replace(/{{clientName}}/g, previewData.clientName);
    content = content.replace(/{{projectName}}/g, previewData.projectName);
    content = content.replace(/{{amount}}/g, previewData.amount);
    content = content.replace(/{{date}}/g, previewData.date);
    content = content.replace(/{{validUntil}}/g, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString());
    content = content.replace(/{{dueDate}}/g, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString());
    content = content.replace(/{{invoiceNumber}}/g, "INV000001");

    // Replace items array
    const itemsHtml = previewData.items.map(item => 
      `<tr>
        <td style="border: 1px solid #ddd; padding: 12px;">${item.description}</td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: center;">${item.quantity}</td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">KSh ${item.rate.toLocaleString()}</td>
        <td style="border: 1px solid #ddd; padding: 12px; text-align: right;">KSh ${item.total.toLocaleString()}</td>
      </tr>`
    ).join('');

    content = content.replace(/{{#items}}[\s\S]*?{{\/items}}/g, itemsHtml);

    return content;
  };

  const downloadTemplate = () => {
    const content = generatePreview();
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate}_${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Template Downloaded",
      description: "Template has been downloaded successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Template Management
              </h1>
              <p className="text-gray-600">Create and manage document templates</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Template Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Templates</CardTitle>
                <CardDescription>Select a template to customize or preview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTemplate === template.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preview Data */}
            <Card>
              <CardHeader>
                <CardTitle>Preview Data</CardTitle>
                <CardDescription>Sample data for template preview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={previewData.clientName}
                      onChange={(e) => setPreviewData(prev => ({ ...prev, clientName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      value={previewData.projectName}
                      onChange={(e) => setPreviewData(prev => ({ ...prev, projectName: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="amount">Total Amount</Label>
                  <Input
                    id="amount"
                    value={previewData.amount}
                    onChange={(e) => setPreviewData(prev => ({ ...prev, amount: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Template Preview */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Template Preview</CardTitle>
                    <CardDescription>Live preview of the selected template</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" disabled={!selectedTemplate}>
                          <Eye className="w-4 h-4 mr-2" />
                          Full Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Template Preview</DialogTitle>
                          <DialogDescription>Full size template preview</DialogDescription>
                        </DialogHeader>
                        <div 
                          className="border rounded-lg p-4 bg-white"
                          dangerouslySetInnerHTML={{ __html: generatePreview() }}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" onClick={downloadTemplate} disabled={!selectedTemplate}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedTemplate ? (
                  <div 
                    className="border rounded-lg p-4 bg-white min-h-96 overflow-auto text-xs"
                    style={{ transform: 'scale(0.7)', transformOrigin: 'top left', width: '142.86%', height: '142.86%' }}
                    dangerouslySetInnerHTML={{ __html: generatePreview() }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-96 text-gray-500">
                    <div className="text-center">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a template to preview</p>
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

export default AdminTemplates;
