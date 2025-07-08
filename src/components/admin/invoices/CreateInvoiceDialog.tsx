
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Palette } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface CreateInvoiceDialogProps {
  showCreateInvoice: boolean;
  setShowCreateInvoice: (show: boolean) => void;
  newInvoice: any;
  setNewInvoice: (invoice: any) => void;
  clients: any[];
  templates: any[];
  handleCreateInvoice: () => void;
  addInvoiceItem: () => void;
  removeInvoiceItem: (index: number) => void;
  updateInvoiceItem: (index: number, field: string, value: any) => void;
  getSubtotal: () => number;
  getSectionSubtotal: (section: string) => number;
  getSectionLaborCharge: (section: string, laborPercentage?: number) => number;
  getTotalLaborCharges: () => number;
  getTotalAmount: () => number;
  currencySymbol: string;
}

const CreateInvoiceDialog = ({
  showCreateInvoice,
  setShowCreateInvoice,
  newInvoice,
  setNewInvoice,
  clients,
  templates,
  handleCreateInvoice,
  addInvoiceItem,
  removeInvoiceItem,
  updateInvoiceItem,
  getSubtotal,
  getSectionSubtotal,
  getSectionLaborCharge,
  getTotalLaborCharges,
  getTotalAmount,
  currencySymbol
}: CreateInvoiceDialogProps) => {
  return (
    <Dialog open={showCreateInvoice} onOpenChange={setShowCreateInvoice}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Create Professional Invoice
          </DialogTitle>
          <DialogDescription>
            Generate a beautifully designed invoice with section-based labor charges
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientId">Client *</Label>
              <Select value={newInvoice.clientId} onValueChange={(value) => setNewInvoice(prev => ({ ...prev, clientId: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.company_name || client.full_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          </div>

          {/* Template and Design */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="templateType">Template Design</Label>
              <Select value={newInvoice.templateType} onValueChange={(value) => setNewInvoice(prev => ({ ...prev, templateType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map(template => (
                    <SelectItem key={template.id} value={template.template_type}>
                      {template.template_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Select value={newInvoice.paymentTerms} onValueChange={(value) => setNewInvoice(prev => ({ ...prev, paymentTerms: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Net 15">Net 15</SelectItem>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 45">Net 45</SelectItem>
                  <SelectItem value="Net 60">Net 60</SelectItem>
                  <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={newInvoice.taxRate}
                onChange={(e) => setNewInvoice(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                step="0.1"
                min="0"
              />
            </div>
          </div>

          {/* Enhanced Invoice Items with Section Grouping */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <Label className="text-base font-medium">Invoice Items by Section *</Label>
              <Button type="button" variant="outline" size="sm" onClick={addInvoiceItem}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Group items by section */}
              {[...new Set(newInvoice.items.map(item => item.section))].map((sectionName) => {
                const sectionItems = newInvoice.items.filter(item => item.section === sectionName);
                const sectionSubtotal = getSectionSubtotal(sectionName);
                const sectionLaborCharge = getSectionLaborCharge(sectionName);
                
                return (
                  <Card key={sectionName} className="p-4 border-2 border-blue-200">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-blue-800 flex items-center">
                        <span className="mr-2">📋</span>
                        {sectionName}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {sectionItems.map((item, globalIndex) => {
                        const itemIndex = newInvoice.items.findIndex(i => i === item);
                        return (
                          <div key={itemIndex} className="grid grid-cols-12 gap-3 items-end bg-gray-50 p-3 rounded">
                            <div className="col-span-4">
                              <Label htmlFor={`item-desc-${itemIndex}`}>Description</Label>
                              <Input
                                id={`item-desc-${itemIndex}`}
                                value={item.description}
                                onChange={(e) => updateInvoiceItem(itemIndex, "description", e.target.value)}
                                placeholder="Item description"
                              />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor={`item-qty-${itemIndex}`}>Quantity</Label>
                              <Input
                                id={`item-qty-${itemIndex}`}
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateInvoiceItem(itemIndex, "quantity", parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                              />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor={`item-material-${itemIndex}`}>Unit Price ({currencySymbol})</Label>
                              <Input
                                id={`item-material-${itemIndex}`}
                                type="number"
                                value={item.material_cost}
                                onChange={(e) => updateInvoiceItem(itemIndex, "material_cost", parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                              />
                            </div>
                            <div className="col-span-2">
                              <Label>Amount ({currencySymbol})</Label>
                              <Input 
                                value={(item.material_cost * item.quantity).toFixed(2)} 
                                readOnly 
                                className="bg-gray-100 font-medium"
                              />
                            </div>
                            <div className="col-span-1">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeInvoiceItem(itemIndex)}
                                disabled={newInvoice.items.length === 1}
                              >
                                ×
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Section Summary */}
                    <div className="mt-4 pt-4 border-t bg-blue-50 p-3 rounded">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Section Subtotal:</span>
                          <p className="font-bold text-lg">{currencySymbol} {sectionSubtotal.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="font-medium">Labor Charge (36%):</span>
                          <p className="font-bold text-lg text-blue-600">{currencySymbol} {sectionLaborCharge.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="font-medium">Section Total:</span>
                          <p className="font-bold text-xl text-blue-800">{currencySymbol} {(sectionSubtotal + sectionLaborCharge).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            {/* Invoice Totals */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-end">
                <div className="w-80 space-y-2">
                  <div className="flex justify-between">
                    <span>Material Subtotal:</span>
                    <span className="font-medium">{currencySymbol} {getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Labor Charges:</span>
                    <span className="font-medium text-blue-600">{currencySymbol} {getTotalLaborCharges().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax ({newInvoice.taxRate}%):</span>
                    <span className="font-medium">{currencySymbol} {((getSubtotal() + getTotalLaborCharges()) * newInvoice.taxRate / 100).toFixed(2)}</span>
                  </div>
                  {newInvoice.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span className="font-medium">-{currencySymbol} {newInvoice.discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>{currencySymbol} {getTotalAmount().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Discount */}
          <div>
            <Label htmlFor="discountAmount">Discount Amount ({currencySymbol})</Label>
            <Input
              id="discountAmount"
              type="number"
              value={newInvoice.discountAmount}
              onChange={(e) => setNewInvoice(prev => ({ ...prev, discountAmount: parseFloat(e.target.value) || 0 }))}
              min="0"
              step="0.01"
            />
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes/Terms</Label>
            <Textarea
              id="notes"
              value={newInvoice.notes}
              onChange={(e) => setNewInvoice(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes, payment instructions, or terms..."
              rows={3}
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
  );
};

export default CreateInvoiceDialog;
