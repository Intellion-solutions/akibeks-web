
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, FileText, Copy, Edit, Trash2, Eye, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import AdminLogin from "@/components/AdminLogin";
import AdminHeader from "@/components/AdminHeader";

const AdminTemplates = () => {
  const { toast } = useToast();
  const { isAuthenticated, companySettings } = useAdmin();
  const [templates, setTemplates] = useState([]);
  const [templateItems, setTemplateItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newTemplate, setNewTemplate] = useState({
    template_name: "",
    template_id: "",
    material_cost: 0,
    labor_charge: 0,
    tax_amount: 0,
    grand_total: 0,
    terms_conditions: "",
    notes: "",
    items: [
      { item_number: 1, description: "", unit: "Units", quantity: 1, unit_price: 0, amount: 0 }
    ]
  });

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data: settingsData, error: settingsError } = await supabase
        .from('template_settings')
        .select('*')
        .order('created_at', { ascending: false });

      if (settingsError) throw settingsError;

      const { data: itemsData, error: itemsError } = await supabase
        .from('template_items')
        .select('*')
        .order('item_number');

      if (itemsError) throw itemsError;

      setTemplates(settingsData || []);
      setTemplateItems(itemsData || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive"
      });
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.template_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.template_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateTemplateId = () => {
    return 'TPL' + Date.now().toString().slice(-6);
  };

  const calculateTotals = (items, materialCost = 0, laborCharge = 0) => {
    const itemsTotal = items.reduce((sum, item) => sum + item.amount, 0);
    const subtotal = itemsTotal + materialCost + laborCharge;
    const taxAmount = subtotal * 0.16; // 16% tax
    const grandTotal = subtotal + taxAmount;
    
    return {
      subtotal,
      taxAmount,
      grandTotal
    };
  };

  const updateTemplateItem = (index, field, value) => {
    setNewTemplate(prev => {
      const updatedItems = [...prev.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      
      if (field === 'quantity' || field === 'unit_price') {
        updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].unit_price;
      }
      
      const { taxAmount, grandTotal } = calculateTotals(
        updatedItems, 
        prev.material_cost, 
        prev.labor_charge
      );
      
      return {
        ...prev,
        items: updatedItems,
        tax_amount: taxAmount,
        grand_total: grandTotal
      };
    });
  };

  const addTemplateItem = () => {
    setNewTemplate(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          item_number: prev.items.length + 1,
          description: "",
          unit: "Units",
          quantity: 1,
          unit_price: 0,
          amount: 0
        }
      ]
    }));
  };

  const removeTemplateItem = (index) => {
    setNewTemplate(prev => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      // Renumber items
      const renumberedItems = updatedItems.map((item, i) => ({
        ...item,
        item_number: i + 1
      }));
      
      const { taxAmount, grandTotal } = calculateTotals(
        renumberedItems, 
        prev.material_cost, 
        prev.labor_charge
      );
      
      return {
        ...prev,
        items: renumberedItems,
        tax_amount: taxAmount,
        grand_total: grandTotal
      };
    });
  };

  const updateCostField = (field, value) => {
    setNewTemplate(prev => {
      const updatedTemplate = { ...prev, [field]: parseFloat(value) || 0 };
      const { taxAmount, grandTotal } = calculateTotals(
        updatedTemplate.items,
        updatedTemplate.material_cost,
        updatedTemplate.labor_charge
      );
      
      return {
        ...updatedTemplate,
        tax_amount: taxAmount,
        grand_total: grandTotal
      };
    });
  };

  const handleCreateTemplate = async () => {
    if (!newTemplate.template_name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a template name",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const templateId = generateTemplateId();
      
      // Create template settings
      const { error: settingsError } = await supabase
        .from('template_settings')
        .insert([{
          template_id: templateId,
          template_name: newTemplate.template_name,
          material_cost: newTemplate.material_cost,
          labor_charge: newTemplate.labor_charge,
          tax_amount: newTemplate.tax_amount,
          grand_total: newTemplate.grand_total,
          terms_conditions: newTemplate.terms_conditions,
          notes: newTemplate.notes
        }]);

      if (settingsError) throw settingsError;

      // Create template items
      const itemsToInsert = newTemplate.items.map(item => ({
        template_id: templateId,
        item_number: item.item_number,
        description: item.description,
        unit: item.unit,
        quantity: item.quantity,
        unit_price: item.unit_price,
        amount: item.amount
      }));

      const { error: itemsError } = await supabase
        .from('template_items')
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      toast({
        title: "Template Created",
        description: "New template has been created successfully.",
      });
      
      setShowCreateTemplate(false);
      resetNewTemplate();
      fetchTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Error",
        description: "Failed to create template",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetNewTemplate = () => {
    setNewTemplate({
      template_name: "",
      template_id: "",
      material_cost: 0,
      labor_charge: 0,
      tax_amount: 0,
      grand_total: 0,
      terms_conditions: "",
      notes: "",
      items: [
        { item_number: 1, description: "", unit: "Units", quantity: 1, unit_price: 0, amount: 0 }
      ]
    });
  };

  const deleteTemplate = async (templateId) => {
    if (!confirm("Are you sure you want to delete this template? This action cannot be undone.")) {
      return;
    }

    try {
      // Delete template items first
      const { error: itemsError } = await supabase
        .from('template_items')
        .delete()
        .eq('template_id', templateId);

      if (itemsError) throw itemsError;

      // Delete template settings
      const { error: settingsError } = await supabase
        .from('template_settings')
        .delete()
        .eq('template_id', templateId);

      if (settingsError) throw settingsError;

      toast({
        title: "Template Deleted",
        description: "Template has been deleted successfully.",
      });
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive"
      });
    }
  };

  const duplicateTemplate = async (template) => {
    try {
      const newTemplateId = generateTemplateId();
      const items = templateItems.filter(item => item.template_id === template.template_id);
      
      // Create duplicate template settings
      const { error: settingsError } = await supabase
        .from('template_settings')
        .insert([{
          template_id: newTemplateId,
          template_name: `${template.template_name} (Copy)`,
          material_cost: template.material_cost,
          labor_charge: template.labor_charge,
          tax_amount: template.tax_amount,
          grand_total: template.grand_total,
          terms_conditions: template.terms_conditions,
          notes: template.notes
        }]);

      if (settingsError) throw settingsError;

      // Create duplicate template items
      if (items.length > 0) {
        const itemsToInsert = items.map(item => ({
          template_id: newTemplateId,
          item_number: item.item_number,
          description: item.description,
          unit: item.unit,
          quantity: item.quantity,
          unit_price: item.unit_price,
          amount: item.amount
        }));

        const { error: itemsError } = await supabase
          .from('template_items')
          .insert(itemsToInsert);

        if (itemsError) throw itemsError;
      }

      toast({
        title: "Template Duplicated",
        description: "Template has been duplicated successfully.",
      });
      fetchTemplates();
    } catch (error) {
      console.error('Error duplicating template:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate template",
        variant: "destructive"
      });
    }
  };

  const getTemplateItems = (templateId) => {
    return templateItems.filter(item => item.template_id === templateId);
  };

  const currencySymbol = companySettings.currency_symbol || 'KSh';

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="w-8 h-8 mr-3" />
            Template Management
          </h1>
          <p className="text-gray-600 mt-2">Create and manage document templates for quotes and invoices</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Templates</p>
                  <p className="text-2xl font-bold">{templates.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold">{templateItems.length}</p>
                </div>
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Template Value</p>
                  <p className="text-2xl font-bold">
                    {currencySymbol} {templates.length > 0 ? Math.round(templates.reduce((sum, t) => sum + (parseFloat(t.grand_total.toString()) || 0), 0) / templates.length).toLocaleString() : 0}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Template Button */}
        <div className="mb-6">
          <Dialog open={showCreateTemplate} onOpenChange={setShowCreateTemplate}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
                <DialogDescription>
                  Design a professional template for quotes and invoices
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Template Details</TabsTrigger>
                  <TabsTrigger value="items">Items & Pricing</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <Label htmlFor="templateName">Template Name</Label>
                    <Input
                      id="templateName"
                      value={newTemplate.template_name}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, template_name: e.target.value }))}
                      placeholder="Enter template name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="materialCost">Material Cost ({currencySymbol})</Label>
                      <Input
                        id="materialCost"
                        type="number"
                        value={newTemplate.material_cost}
                        onChange={(e) => updateCostField('material_cost', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="laborCharge">Labor Charge ({currencySymbol})</Label>
                      <Input
                        id="laborCharge"
                        type="number"
                        value={newTemplate.labor_charge}
                        onChange={(e) => updateCostField('labor_charge', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="termsConditions">Terms & Conditions</Label>
                    <Textarea
                      id="termsConditions"
                      value={newTemplate.terms_conditions}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, terms_conditions: e.target.value }))}
                      placeholder="Enter terms and conditions..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newTemplate.notes}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Enter additional notes..."
                      rows={3}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="items" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Template Items</h3>
                    <Button type="button" variant="outline" size="sm" onClick={addTemplateItem}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-3 text-sm font-medium">No.</th>
                          <th className="text-left p-3 text-sm font-medium">Item Description</th>
                          <th className="text-left p-3 text-sm font-medium">Unit</th>
                          <th className="text-left p-3 text-sm font-medium">Qty</th>
                          <th className="text-left p-3 text-sm font-medium">Unit Price</th>
                          <th className="text-left p-3 text-sm font-medium">Amount</th>
                          <th className="text-left p-3 text-sm font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newTemplate.items.map((item, index) => (
                          <tr key={index} className="border-t">
                            <td className="p-3">
                              <Input
                                type="number"
                                value={item.item_number}
                                onChange={(e) => updateTemplateItem(index, 'item_number', parseInt(e.target.value))}
                                className="w-16"
                              />
                            </td>
                            <td className="p-3">
                              <Input
                                value={item.description}
                                onChange={(e) => updateTemplateItem(index, 'description', e.target.value)}
                                placeholder="Item description"
                              />
                            </td>
                            <td className="p-3">
                              <Input
                                value={item.unit}
                                onChange={(e) => updateTemplateItem(index, 'unit', e.target.value)}
                                placeholder="Units"
                                className="w-20"
                              />
                            </td>
                            <td className="p-3">
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateTemplateItem(index, 'quantity', parseFloat(e.target.value))}
                                className="w-20"
                              />
                            </td>
                            <td className="p-3">
                              <Input
                                type="number"
                                value={item.unit_price}
                                onChange={(e) => updateTemplateItem(index, 'unit_price', parseFloat(e.target.value))}
                                className="w-24"
                              />
                            </td>
                            <td className="p-3">
                              <span className="font-medium">{currencySymbol} {item.amount.toLocaleString()}</span>
                            </td>
                            <td className="p-3">
                              {newTemplate.items.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeTemplateItem(index)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Cost Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Items Subtotal:</span>
                        <span>{currencySymbol} {newTemplate.items.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Material Cost:</span>
                        <span>{currencySymbol} {newTemplate.material_cost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Labor Charge:</span>
                        <span>{currencySymbol} {newTemplate.labor_charge.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (16%):</span>
                        <span>{currencySymbol} {newTemplate.tax_amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t">
                        <span>Grand Total:</span>
                        <span>{currencySymbol} {newTemplate.grand_total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <div className="bg-white border rounded-lg p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold">{companySettings.company_name || 'AKIBEKS Engineering'}</h2>
                      <p className="text-gray-600">{newTemplate.template_name}</p>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Items</h3>
                      <table className="w-full border">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="border p-2 text-left">No.</th>
                            <th className="border p-2 text-left">Description</th>
                            <th className="border p-2 text-left">Unit</th>
                            <th className="border p-2 text-right">Qty</th>
                            <th className="border p-2 text-right">Unit Price</th>
                            <th className="border p-2 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newTemplate.items.map((item, index) => (
                            <tr key={index}>
                              <td className="border p-2">{item.item_number}</td>
                              <td className="border p-2">{item.description}</td>
                              <td className="border p-2">{item.unit}</td>
                              <td className="border p-2 text-right">{item.quantity}</td>
                              <td className="border p-2 text-right">{currencySymbol} {item.unit_price.toLocaleString()}</td>
                              <td className="border p-2 text-right">{currencySymbol} {item.amount.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        {newTemplate.terms_conditions && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Terms & Conditions:</h4>
                            <p className="text-sm text-gray-600">{newTemplate.terms_conditions}</p>
                          </div>
                        )}
                        {newTemplate.notes && (
                          <div>
                            <h4 className="font-semibold mb-2">Notes:</h4>
                            <p className="text-sm text-gray-600">{newTemplate.notes}</p>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>Material Cost:</span>
                            <span>{currencySymbol} {newTemplate.material_cost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Labor Charge:</span>
                            <span>{currencySymbol} {newTemplate.labor_charge.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax (16%):</span>
                            <span>{currencySymbol} {newTemplate.tax_amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg pt-2 border-t">
                            <span>Grand Total:</span>
                            <span>{currencySymbol} {newTemplate.grand_total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 pt-6">
                <Button variant="outline" onClick={() => { setShowCreateTemplate(false); resetNewTemplate(); }}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate} disabled={loading}>
                  {loading ? "Creating..." : "Create Template"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search templates by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid gap-6">
          {filteredTemplates.map((template) => {
            const items = getTemplateItems(template.template_id);
            return (
              <Card key={template.template_id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{template.template_name}</h3>
                        <span className="text-sm text-gray-500">({template.template_id})</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Items:</span> {items.length}
                        </div>
                        <div>
                          <span className="font-medium">Material Cost:</span> {currencySymbol} {parseFloat(template.material_cost.toString()).toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Labor Charge:</span> {currencySymbol} {parseFloat(template.labor_charge.toString()).toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Grand Total:</span> {currencySymbol} {parseFloat(template.grand_total.toString()).toLocaleString()}
                        </div>
                      </div>

                      {items.length > 0 && (
                        <div className="mb-3">
                          <span className="font-medium text-sm">Sample Items:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {items.slice(0, 3).map((item, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                {item.description || `Item ${item.item_number}`}
                              </span>
                            ))}
                            {items.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                                +{items.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-gray-500">
                        Created: {new Date(template.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Template Preview - {template.template_name}</DialogTitle>
                          </DialogHeader>
                          <div className="bg-white border rounded-lg p-8">
                            <div className="text-center mb-6">
                              <h2 className="text-2xl font-bold">{companySettings.company_name || 'AKIBEKS Engineering'}</h2>
                              <p className="text-gray-600">{template.template_name}</p>
                            </div>

                            {items.length > 0 && (
                              <div className="mb-6">
                                <h3 className="font-semibold mb-3">Items</h3>
                                <table className="w-full border">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="border p-2 text-left">No.</th>
                                      <th className="border p-2 text-left">Description</th>
                                      <th className="border p-2 text-left">Unit</th>
                                      <th className="border p-2 text-right">Qty</th>
                                      <th className="border p-2 text-right">Unit Price</th>
                                      <th className="border p-2 text-right">Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {items.map((item, index) => (
                                      <tr key={index}>
                                        <td className="border p-2">{item.item_number}</td>
                                        <td className="border p-2">{item.description}</td>
                                        <td className="border p-2">{item.unit}</td>
                                        <td className="border p-2 text-right">{parseFloat(item.quantity.toString())}</td>
                                        <td className="border p-2 text-right">{currencySymbol} {parseFloat(item.unit_price.toString()).toLocaleString()}</td>
                                        <td className="border p-2 text-right">{currencySymbol} {parseFloat(item.amount.toString()).toLocaleString()}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-8">
                              <div>
                                {template.terms_conditions && (
                                  <div className="mb-4">
                                    <h4 className="font-semibold mb-2">Terms & Conditions:</h4>
                                    <p className="text-sm text-gray-600">{template.terms_conditions}</p>
                                  </div>
                                )}
                                {template.notes && (
                                  <div>
                                    <h4 className="font-semibold mb-2">Notes:</h4>
                                    <p className="text-sm text-gray-600">{template.notes}</p>
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span>Material Cost:</span>
                                    <span>{currencySymbol} {parseFloat(template.material_cost.toString()).toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Labor Charge:</span>
                                    <span>{currencySymbol} {parseFloat(template.labor_charge.toString()).toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Tax (16%):</span>
                                    <span>{currencySymbol} {parseFloat(template.tax_amount.toString()).toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                    <span>Grand Total:</span>
                                    <span>{currencySymbol} {parseFloat(template.grand_total.toString()).toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="outline" size="sm" onClick={() => duplicateTemplate(template)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      
                      <Button variant="destructive" size="sm" onClick={() => deleteTemplate(template.template_id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? "Try adjusting your search criteria"
                  : "Create your first template to get started"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminTemplates;
