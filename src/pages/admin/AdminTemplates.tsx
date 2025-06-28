
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Eye, Plus, Edit, Receipt, FileCheck, Truck, Save, Trash2, Calculator } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TemplateItem {
  id?: string;
  item_number: number;
  description: string;
  unit: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

interface TemplateSettings {
  template_id: string;
  template_name: string;
  material_cost: number;
  labor_charge: number;
  tax_amount: number;
  grand_total: number;
  notes?: string;
  terms_conditions?: string;
}

const AdminTemplates = () => {
  const { toast } = useToast();
  const { isAuthenticated, companySettings } = useAdmin();
  const [selectedTemplate, setSelectedTemplate] = useState("quote_template");
  const [templateItems, setTemplateItems] = useState<TemplateItem[]>([]);
  const [templateSettings, setTemplateSettings] = useState<TemplateSettings | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const templates = [
    {
      id: "quote_template",
      name: "Project Quote Template",
      description: "Professional template for project quotations",
      type: "quote",
      icon: FileText,
    },
    {
      id: "invoice_template", 
      name: "Professional Invoice",
      description: "Comprehensive invoice template with payment details",
      type: "invoice",
      icon: Receipt,
    },
    {
      id: "receipt_template",
      name: "Payment Receipt", 
      description: "Professional receipt for payments received",
      type: "receipt",
      icon: FileCheck,
    },
    {
      id: "delivery_note_template",
      name: "Delivery Note",
      description: "Professional delivery note for materials and supplies", 
      type: "delivery",
      icon: Truck,
    }
  ];

  // Load template data when selected template changes
  useEffect(() => {
    loadTemplateData();
  }, [selectedTemplate]);

  const loadTemplateData = async () => {
    try {
      // Load template items
      const { data: items, error: itemsError } = await supabase
        .from('template_items')
        .select('*')
        .eq('template_id', selectedTemplate)
        .order('item_number');

      if (itemsError) throw itemsError;

      // Load template settings
      const { data: settings, error: settingsError } = await supabase
        .from('template_settings')
        .select('*')
        .eq('template_id', selectedTemplate)
        .single();

      if (settingsError && settingsError.code !== 'PGRST116') throw settingsError;

      setTemplateItems(items || []);
      setTemplateSettings(settings || {
        template_id: selectedTemplate,
        template_name: templates.find(t => t.id === selectedTemplate)?.name || '',
        material_cost: 0,
        labor_charge: 0,
        tax_amount: 0,
        grand_total: 0
      });
    } catch (error) {
      console.error('Error loading template data:', error);
      toast({
        title: "Error",
        description: "Failed to load template data",
        variant: "destructive"
      });
    }
  };

  const calculateTotals = (items: TemplateItem[]) => {
    const materialCost = items.reduce((sum, item) => sum + item.amount, 0);
    const laborChargeRate = parseFloat(companySettings.labor_charge_rate || '36.5') / 100;
    const laborCharge = materialCost * laborChargeRate;
    const taxRate = parseFloat(companySettings.tax_rate || '16') / 100;
    const taxAmount = (materialCost + laborCharge) * taxRate;
    const grandTotal = materialCost + laborCharge + taxAmount;

    return {
      materialCost,
      laborCharge,
      taxAmount,
      grandTotal
    };
  };

  const addNewItem = () => {
    const newItem: TemplateItem = {
      item_number: templateItems.length + 1,
      description: '',
      unit: 'Units',
      quantity: 1,
      unit_price: 0,
      amount: 0
    };
    setTemplateItems([...templateItems, newItem]);
  };

  const updateItem = (index: number, field: keyof TemplateItem, value: string | number) => {
    const updatedItems = [...templateItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Auto-calculate amount when quantity or unit_price changes
    if (field === 'quantity' || field === 'unit_price') {
      const qty = field === 'quantity' ? Number(value) : updatedItems[index].quantity;
      const price = field === 'unit_price' ? Number(value) : updatedItems[index].unit_price;
      updatedItems[index].amount = qty * price;
    }

    setTemplateItems(updatedItems);

    // Update template settings with new totals
    if (templateSettings) {
      const totals = calculateTotals(updatedItems);
      setTemplateSettings({
        ...templateSettings,
        material_cost: totals.materialCost,
        labor_charge: totals.laborCharge,
        tax_amount: totals.taxAmount,
        grand_total: totals.grandTotal
      });
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = templateItems.filter((_, i) => i !== index);
    // Re-number items
    const renumberedItems = updatedItems.map((item, i) => ({
      ...item,
      item_number: i + 1
    }));
    setTemplateItems(renumberedItems);

    // Update totals
    if (templateSettings) {
      const totals = calculateTotals(renumberedItems);
      setTemplateSettings({
        ...templateSettings,
        material_cost: totals.materialCost,
        labor_charge: totals.laborCharge,
        tax_amount: totals.taxAmount,
        grand_total: totals.grandTotal
      });
    }
  };

  const saveTemplate = async () => {
    setLoading(true);
    try {
      // Save template settings
      if (templateSettings) {
        const { error: settingsError } = await supabase
          .from('template_settings')
          .upsert(templateSettings);

        if (settingsError) throw settingsError;
      }

      // Delete existing items and insert new ones
      const { error: deleteError } = await supabase
        .from('template_items')
        .delete()
        .eq('template_id', selectedTemplate);

      if (deleteError) throw deleteError;

      // Insert new items
      const itemsToInsert = templateItems.map(item => ({
        template_id: selectedTemplate,
        item_number: item.item_number,
        description: item.description,
        unit: item.unit,
        quantity: item.quantity,
        unit_price: item.unit_price,
        amount: item.amount
      }));

      if (itemsToInsert.length > 0) {
        const { error: insertError } = await supabase
          .from('template_items')
          .insert(itemsToInsert);

        if (insertError) throw insertError;
      }

      toast({
        title: "Template Saved",
        description: "Template has been saved successfully",
      });
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: "Error",
        description: "Failed to save template",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generatePreview = () => {
    const currencySymbol = companySettings.currency_symbol || 'KSh';
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return "";

    const itemsHtml = templateItems.map(item => 
      `<tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; color: #374151;">${item.item_number}</td>
        <td style="padding: 12px; color: #374151;">${item.description}</td>
        <td style="padding: 12px; text-align: center; color: #374151;">${item.unit}</td>
        <td style="padding: 12px; text-align: center; color: #374151;">${item.quantity}</td>
        <td style="padding: 12px; text-align: right; color: #374151;">${currencySymbol} ${item.unit_price.toLocaleString()}</td>
        <td style="padding: 12px; text-align: right; color: #374151; font-weight: bold;">${currencySymbol} ${item.amount.toLocaleString()}</td>
      </tr>`
    ).join('');

    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: white;">
        <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; border-radius: 8px;">
          <h1 style="margin: 0; font-size: 28px;">${companySettings.company_name}</h1>
          <p style="margin: 10px 0 0 0;">${companySettings.company_tagline}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1e40af; margin-bottom: 20px;">${template.name.toUpperCase()}</h2>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background: #f97316; color: white;">
              <th style="padding: 12px; text-align: left;">No.</th>
              <th style="padding: 12px; text-align: left;">Item</th>
              <th style="padding: 12px; text-align: center;">Unit</th>
              <th style="padding: 12px; text-align: center;">Qty</th>
              <th style="padding: 12px; text-align: right;">Price</th>
              <th style="padding: 12px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-weight: bold;">Material Cost:</span>
            <span>${currencySymbol} ${templateSettings?.material_cost.toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-weight: bold;">Labor Charge (${companySettings.labor_charge_rate}%):</span>
            <span>${currencySymbol} ${templateSettings?.labor_charge.toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="font-weight: bold;">Tax (${companySettings.tax_rate}%):</span>
            <span>${currencySymbol} ${templateSettings?.tax_amount.toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #f97316; border-top: 2px solid #f97316; padding-top: 10px;">
            <span>GRAND TOTAL:</span>
            <span>${currencySymbol} ${templateSettings?.grand_total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    `;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="w-8 h-8 mr-3" />
            Template Management
          </h1>
          <p className="text-gray-600 mt-2">Create and manage professional document templates with automatic calculations</p>
        </div>

        <Tabs value={selectedTemplate} onValueChange={setSelectedTemplate} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            {templates.map((template) => (
              <TabsTrigger key={template.id} value={template.id} className="flex items-center gap-2">
                <template.icon className="w-4 h-4" />
                {template.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {templates.map((template) => (
            <TabsContent key={template.id} value={template.id} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Template Editor */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={addNewItem} size="sm" className="bg-orange-500 hover:bg-orange-600">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Item
                          </Button>
                          <Button onClick={saveTemplate} disabled={loading} size="sm">
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? "Saving..." : "Save"}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {templateItems.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-12">No.</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="w-20">Unit</TableHead>
                                <TableHead className="w-20">Qty</TableHead>
                                <TableHead className="w-24">Price</TableHead>
                                <TableHead className="w-24">Amount</TableHead>
                                <TableHead className="w-12"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {templateItems.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.item_number}</TableCell>
                                  <TableCell>
                                    <Input
                                      value={item.description}
                                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                                      placeholder="Item description"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      value={item.unit}
                                      onChange={(e) => updateItem(index, 'unit', e.target.value)}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={item.quantity}
                                      onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={item.unit_price}
                                      onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                                    />
                                  </TableCell>
                                  <TableCell className="font-semibold">
                                    {(companySettings.currency_symbol || 'KSh')} {item.amount.toLocaleString()}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem(index)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            No items added yet. Click "Add Item" to start building your template.
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Totals Card */}
                  {templateSettings && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calculator className="w-5 h-5 mr-2" />
                          Automatic Calculations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Material Cost:</span>
                            <span className="font-semibold">{companySettings.currency_symbol} {templateSettings.material_cost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor Charge ({companySettings.labor_charge_rate}%):</span>
                            <span className="font-semibold">{companySettings.currency_symbol} {templateSettings.labor_charge.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax ({companySettings.tax_rate}%):</span>
                            <span className="font-semibold">{companySettings.currency_symbol} {templateSettings.tax_amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold text-orange-600 border-t pt-2">
                            <span>GRAND TOTAL:</span>
                            <span>{companySettings.currency_symbol} {templateSettings.grand_total.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Template Preview */}
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Live Preview</CardTitle>
                          <CardDescription>Real-time preview of your template</CardDescription>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Full Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Template Preview</DialogTitle>
                            </DialogHeader>
                            <div 
                              className="border rounded-lg p-4 bg-white"
                              dangerouslySetInnerHTML={{ __html: generatePreview() }}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="border rounded-lg p-4 bg-white min-h-96 overflow-auto text-xs"
                        style={{ transform: 'scale(0.7)', transformOrigin: 'top left', width: '142.86%', height: '142.86%' }}
                        dangerouslySetInnerHTML={{ __html: generatePreview() }}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AdminTemplates;
