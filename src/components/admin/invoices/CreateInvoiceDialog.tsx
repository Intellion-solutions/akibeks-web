
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Client {
  id: string;
  full_name: string;
  company_name?: string;
  email?: string;
  phone: string;
  address?: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  material_cost: number;
  labor_percentage: number;
  labor_charge: number;
  total_price: number;
  section?: string;
}

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const CreateInvoiceDialog: React.FC<CreateInvoiceDialogProps> = ({
  open,
  onOpenChange,
  onSuccess
}) => {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  // Invoice form data
  const [selectedClientId, setSelectedClientId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('Net 30 days');
  const [notes, setNotes] = useState('');
  const [taxRate, setTaxRate] = useState(16);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [letterheadEnabled, setLetterheadEnabled] = useState(true);
  const [templateType, setTemplateType] = useState('standard');

  // Invoice items
  const [items, setItems] = useState<Omit<InvoiceItem, 'id'>[]>([
    {
      description: '',
      quantity: 1,
      unit_price: 0,
      material_cost: 0,
      labor_percentage: 36.5,
      labor_charge: 0,
      total_price: 0,
      section: 'General'
    }
  ]);

  // Available sections
  const [sections, setSections] = useState(['General', 'Materials', 'Labor', 'Equipment']);

  useEffect(() => {
    if (open) {
      fetchClients();
      generateInvoiceNumber();
    }
  }, [open]);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('full_name');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Error",
        description: "Failed to fetch clients",
        variant: "destructive"
      });
    }
  };

  const generateInvoiceNumber = async () => {
    try {
      const { data, error } = await supabase.rpc('generate_invoice_number');
      
      if (error) throw error;
      setInvoiceNumber(data);
    } catch (error) {
      console.error('Error generating invoice number:', error);
      // Fallback to manual generation
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = 'AB';
      for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setInvoiceNumber(result);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        description: '',
        quantity: 1,
        unit_price: 0,
        material_cost: 0,
        labor_percentage: 36.5,
        labor_charge: 0,
        total_price: 0,
        section: 'General'
      }
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof Omit<InvoiceItem, 'id'>, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // Recalculate totals for this item
    const item = newItems[index];
    if (field === 'material_cost' || field === 'labor_percentage' || field === 'quantity') {
      item.labor_charge = item.material_cost * (item.labor_percentage / 100);
      item.total_price = (item.material_cost + item.labor_charge) * item.quantity;
    }

    setItems(newItems);
  };

  const addSection = () => {
    const sectionName = prompt('Enter section name:');
    if (sectionName && !sections.includes(sectionName)) {
      setSections([...sections, sectionName]);
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total_price, 0);
  };

  const calculateTaxAmount = () => {
    return calculateSubtotal() * (taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTaxAmount() - discountAmount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClientId) {
      toast({
        title: "Error",
        description: "Please select a client",
        variant: "destructive"
      });
      return;
    }

    if (items.some(item => !item.description.trim())) {
      toast({
        title: "Error",
        description: "Please fill in all item descriptions",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert([
          {
            invoice_number: invoiceNumber,
            client_id: selectedClientId,
            due_date: dueDate,
            payment_terms: paymentTerms,
            notes,
            tax_rate: taxRate,
            tax_amount: calculateTaxAmount(),
            subtotal: calculateSubtotal(),
            discount_amount: discountAmount,
            total_amount: calculateTotal(),
            letterhead_enabled: letterheadEnabled,
            template_type: templateType,
            status: 'draft'
          }
        ])
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // Create invoice items
      const invoiceItems = items.map(item => ({
        invoice_id: invoice.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        material_cost: item.material_cost,
        labor_percentage: item.labor_percentage,
        labor_charge: item.labor_charge,
        total_price: item.total_price,
        section: item.section
      }));

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(invoiceItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Success",
        description: `Invoice ${invoiceNumber} created successfully`
      });

      onSuccess();
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to create invoice",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedClientId('');
    setDueDate('');
    setPaymentTerms('Net 30 days');
    setNotes('');
    setTaxRate(16);
    setDiscountAmount(0);
    setLetterheadEnabled(true);
    setTemplateType('standard');
    setItems([
      {
        description: '',
        quantity: 1,
        unit_price: 0,
        material_cost: 0,
        labor_percentage: 36.5,
        labor_charge: 0,
        total_price: 0,
        section: 'General'
      }
    ]);
    setInvoiceNumber('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="w-5 h-5" />
            Create New Invoice
            {invoiceNumber && (
              <Badge variant="outline" className="ml-2">
                {invoiceNumber}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Invoice Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Client *</label>
              <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.company_name || client.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Due Date</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Template Type</label>
              <Select value={templateType} onValueChange={setTemplateType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Payment Terms</label>
              <Input
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                placeholder="e.g., Net 30 days"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={letterheadEnabled}
                  onCheckedChange={setLetterheadEnabled}
                />
                <label className="text-sm font-medium">Enable Letterhead</label>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Invoice Items</CardTitle>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={addSection}>
                    Add Section
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={addItem}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    {items.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Description *</label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        rows={2}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Section</label>
                      <Select
                        value={item.section}
                        onValueChange={(value) => updateItem(index, 'section', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sections.map((section) => (
                            <SelectItem key={section} value={section}>
                              {section}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Quantity</label>
                      <Input
                        type="number"
                        min="1"
                        step="0.01"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 1)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Material Cost</label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.material_cost}
                        onChange={(e) => updateItem(index, 'material_cost', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Labor %</label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={item.labor_percentage}
                        onChange={(e) => updateItem(index, 'labor_percentage', parseFloat(e.target.value) || 36.5)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Labor Charge</label>
                      <Input
                        type="number"
                        value={item.labor_charge.toFixed(2)}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Total</label>
                      <Input
                        type="number"
                        value={item.total_price.toFixed(2)}
                        disabled
                        className="bg-gray-50 font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Invoice Totals */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Tax Rate (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 16)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Discount Amount</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-2 text-right">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>KSh {calculateSubtotal().toLocaleString('en-KE', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({taxRate}%):</span>
                    <span>KSh {calculateTaxAmount().toLocaleString('en-KE', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-KSh {discountAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>KSh {calculateTotal().toLocaleString('en-KE', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium mb-2 block">Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Additional notes or terms..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Invoice'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
