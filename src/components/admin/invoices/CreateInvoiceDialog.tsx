
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Palette } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InvoiceSectionManager from "./InvoiceSectionManager";
import LetterheadManager from "./LetterheadManager";

interface Template {
  id: string;
  template_name: string;
  template_type: string;
}

interface Client {
  id: string;
  company_name?: string;
  full_name: string;
}

interface CreateInvoiceDialogProps {
  showCreateInvoice: boolean;
  setShowCreateInvoice: (show: boolean) => void;
  newInvoice: any;
  setNewInvoice: (invoice: any) => void;
  clients: Client[];
  templates: Template[];
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
  const [currentTab, setCurrentTab] = useState<'basic' | 'items' | 'letterhead'>('basic');

  const defaultLetterheadConfig = {
    enabled: newInvoice.letterheadEnabled || false,
    companyName: 'AKIBEKS Engineering Solutions',
    address: 'Nairobi, Kenya',
    phone: '+254 123 456 789',
    email: 'info@akibeks.com',
    website: 'www.akibeks.com',
    headerColor: '#1e40af',
    template: 'professional' as const
  };

  const [letterheadConfig, setLetterheadConfig] = useState(defaultLetterheadConfig);

  const handleLetterheadConfigUpdate = (config: typeof defaultLetterheadConfig) => {
    setLetterheadConfig(config);
    setNewInvoice(prev => ({ ...prev, letterheadEnabled: config.enabled, letterheadConfig: config }));
  };

  return (
    <Dialog open={showCreateInvoice} onOpenChange={setShowCreateInvoice}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Create Professional Invoice
          </DialogTitle>
          <DialogDescription>
            Generate a beautifully designed invoice with section-based labor charges
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${currentTab === 'basic' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setCurrentTab('basic')}
          >
            Basic Info
          </button>
          <button
            className={`px-4 py-2 font-medium ${currentTab === 'items' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setCurrentTab('items')}
          >
            Items & Sections
          </button>
          <button
            className={`px-4 py-2 font-medium ${currentTab === 'letterhead' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setCurrentTab('letterhead')}
          >
            Letterhead
          </button>
        </div>

        <div className="space-y-6">
          {currentTab === 'basic' && (
            <>
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
            </>
          )}

          {currentTab === 'items' && (
            <>
              {/* Enhanced Invoice Items with Section Grouping */}
              <InvoiceSectionManager
                items={newInvoice.items}
                updateInvoiceItem={updateInvoiceItem}
                addInvoiceItem={addInvoiceItem}
                removeInvoiceItem={removeInvoiceItem}
                getSectionSubtotal={getSectionSubtotal}
                getSectionLaborCharge={getSectionLaborCharge}
                currencySymbol={currencySymbol}
              />
              
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
            </>
          )}

          {currentTab === 'letterhead' && (
            <LetterheadManager
              letterheadConfig={letterheadConfig}
              updateLetterheadConfig={handleLetterheadConfigUpdate}
            />
          )}

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
