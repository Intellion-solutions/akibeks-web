
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Logo from './Logo';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  section?: string;
}

interface InvoiceData {
  id: string;
  invoice_number: string;
  client_name: string;
  client_address: string;
  client_phone?: string;
  client_email?: string;
  issue_date: string;
  due_date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount_amount?: number;
  total_amount: number;
  notes?: string;
  payment_terms?: string;
}

interface CompanyInfo {
  company_name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  tax_id?: string;
}

interface InvoicePDFProps {
  invoice: InvoiceData;
  company: CompanyInfo;
}

const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice, company }) => {
  // Group items by section
  const groupedItems = invoice.items.reduce((acc, item) => {
    const section = item.section || 'General';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {} as Record<string, InvoiceItem[]>);

  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 print:p-6 print:shadow-none shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <Logo size="lg" variant="default" />
          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p className="font-medium text-gray-900">{company.company_name}</p>
            <p>{company.address}</p>
            <p>{company.phone}</p>
            <p>{company.email}</p>
            {company.website && <p>{company.website}</p>}
            {company.tax_id && <p>Tax ID: {company.tax_id}</p>}
          </div>
        </div>
        
        <div className="text-right">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">INVOICE</h1>
          <p className="text-lg text-gray-600 mb-4">{formatDate(invoice.issue_date)}</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Invoice Number</p>
            <p className="text-xl font-bold text-blue-600">{invoice.invoice_number}</p>
          </div>
        </div>
      </div>

      {/* Client Information */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Bill To:</h3>
          <div className="space-y-1 text-gray-700">
            <p className="font-medium">{invoice.client_name}</p>
            <p>{invoice.client_address}</p>
            {invoice.client_phone && <p>{invoice.client_phone}</p>}
            {invoice.client_email && <p>{invoice.client_email}</p>}
          </div>
        </div>
        
        <div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Issue Date:</span>
              <span className="font-medium">{formatDate(invoice.issue_date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Due Date:</span>
              <span className="font-medium text-red-600">{formatDate(invoice.due_date)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        {Object.entries(groupedItems).map(([sectionName, sectionItems], sectionIndex) => (
          <div key={sectionName} className={`${sectionIndex > 0 ? 'mt-8 print:break-before-page' : ''}`}>
            {Object.keys(groupedItems).length > 1 && (
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-t-lg">
                <h3 className="font-bold text-lg">{sectionName}</h3>
              </div>
            )}
            
            <div className={`border ${Object.keys(groupedItems).length > 1 ? 'border-t-0 rounded-b-lg' : 'rounded-lg'} overflow-hidden`}>
              {/* Table Header */}
              <div className="bg-blue-600 text-white p-4">
                <div className="grid grid-cols-12 gap-4 font-medium">
                  <div className="col-span-5">Items Description</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-3 text-right">Total</div>
                </div>
              </div>
              
              {/* Table Body */}
              <div className="bg-white">
                {sectionItems.map((item, index) => (
                  <div key={item.id} className={`grid grid-cols-12 gap-4 p-4 ${index < sectionItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="col-span-5">
                      <p className="font-medium text-gray-900">{item.description}</p>
                    </div>
                    <div className="col-span-2 text-center text-gray-700">
                      {formatCurrency(item.unit_price)}
                    </div>
                    <div className="col-span-2 text-center text-gray-700">
                      {item.quantity}
                    </div>
                    <div className="col-span-3 text-right font-medium text-gray-900">
                      {formatCurrency(item.total_price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-80">
          <div className="space-y-2 text-right">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">SUBTOTAL:</span>
              <span className="font-medium">{formatCurrency(invoice.subtotal)}</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tax VAT {invoice.tax_rate}%:</span>
              <span className="font-medium">{formatCurrency(invoice.tax_amount)}</span>
            </div>
            
            {invoice.discount_amount && invoice.discount_amount > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">DISCOUNT:</span>
                <span className="font-medium text-green-600">-{formatCurrency(invoice.discount_amount)}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="bg-blue-600 text-white p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">TOTAL DUE:</span>
                <span className="text-2xl font-bold">{formatCurrency(invoice.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-2">Note:</h4>
          <p className="text-gray-700 leading-relaxed">{invoice.notes}</p>
        </div>
      )}

      {/* Thank You Message */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-blue-600">Thank you for your Business</h3>
        <div className="w-32 h-0.5 bg-blue-600 mx-auto mt-2"></div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-3 gap-8 text-sm text-gray-600 border-t pt-6">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Questions?</h4>
          <p>Email us: {company.email}</p>
          <p>Call us: {company.phone}</p>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Payment Info:</h4>
          <div className="space-y-1">
            <p>Account: 123 567 890</p>
            <p>A/C Name: {company.company_name}</p>
            <p>Bank Details: Equity Bank Kenya</p>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Terms & Conditions/Note:</h4>
          <p className="text-xs leading-relaxed">
            {invoice.payment_terms || "Payment is due within 30 days of invoice date. Late payments may incur additional charges."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePDF;
