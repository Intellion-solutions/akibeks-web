import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, Eye, Plus, Edit, Receipt, FileCheck, Truck } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdminTemplates = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [previewData, setPreviewData] = useState({
    clientName: "John Doe",
    clientAddress: "123 Main Street, Nairobi, Kenya",
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
      name: "Project Quote Template",
      description: "Professional template for project quotations",
      type: "quote",
      icon: FileText,
      content: `
<div style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; background: #fff;">
  <!-- Header -->
  <header style="text-align: center; border-bottom: 3px solid #f97316; padding-bottom: 30px; margin-bottom: 40px; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 40px 20px; margin: -40px -20px 40px -20px; border-radius: 0;">
    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
      <div style="width: 60px; height: 60px; background: #f97316; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
        <span style="color: white; font-size: 28px; font-weight: bold;">🏗️</span>
      </div>
      <div>
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">AKIBEKS Engineering Solutions</h1>
        <p style="color: #e2e8f0; margin: 5px 0 0 0; font-size: 16px;">Professional Construction & Engineering Services</p>
      </div>
    </div>
    <div style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; margin-top: 20px;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="color: #f97316;">📞</span>
        <span style="color: #e2e8f0;">+254 710 245 118</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="color: #f97316;">✉️</span>
        <span style="color: #e2e8f0;">info@akibeks.co.ke</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="color: #f97316;">📍</span>
        <span style="color: #e2e8f0;">Nairobi, Kenya</span>
      </div>
    </div>
  </header>
  
  <!-- Quote Details -->
  <div style="margin-bottom: 40px; background: #f8fafc; padding: 30px; border-radius: 12px; border-left: 4px solid #f97316;">
    <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 28px; display: flex; align-items: center; gap: 10px;">
      <span style="color: #f97316;">📋</span>
      PROJECT QUOTATION
    </h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px;">
      <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3 style="color: #f97316; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">CLIENT INFORMATION</h3>
        <p style="margin: 8px 0; color: #374151;"><strong>Client:</strong> {{clientName}}</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Project:</strong> {{projectName}}</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Date:</strong> {{date}}</p>
      </div>
      <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3 style="color: #f97316; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">QUOTE DETAILS</h3>
        <p style="margin: 8px 0; color: #374151;"><strong>Quote Number:</strong> Q{{date}}-001</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Valid Until:</strong> {{validUntil}}</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Status:</strong> <span style="background: #fef3c7; color: #d97706; padding: 4px 8px; border-radius: 4px; font-size: 12px;">DRAFT</span></p>
      </div>
    </div>
  </div>

  <!-- Items Table -->
  <div style="margin-bottom: 40px;">
    <h3 style="color: #1e293b; margin-bottom: 20px; font-size: 20px;">PROJECT BREAKDOWN</h3>
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <thead>
        <tr style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white;">
          <th style="padding: 15px; text-align: left; font-weight: bold;">DESCRIPTION</th>
          <th style="padding: 15px; text-align: center; font-weight: bold;">QTY</th>
          <th style="padding: 15px; text-align: right; font-weight: bold;">RATE</th>
          <th style="padding: 15px; text-align: right; font-weight: bold;">TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {{#items}}
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 15px; color: #374151;">{{description}}</td>
          <td style="padding: 15px; text-align: center; color: #374151;">{{quantity}}</td>
          <td style="padding: 15px; text-align: right; color: #374151;">KSh {{rate}}</td>
          <td style="padding: 15px; text-align: right; color: #374151; font-weight: bold;">KSh {{total}}</td>
        </tr>
        {{/items}}
      </tbody>
      <tfoot>
        <tr style="background: #f8fafc; border-top: 2px solid #f97316;">
          <td colspan="3" style="padding: 20px; text-align: right; font-weight: bold; color: #1e293b; font-size: 18px;">TOTAL AMOUNT:</td>
          <td style="padding: 20px; text-align: right; color: #f97316; font-weight: bold; font-size: 24px;">{{amount}}</td>
        </tr>
      </tfoot>
    </table>
  </div>

  <!-- Terms & Conditions -->
  <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin-bottom: 40px;">
    <h3 style="color: #1e293b; margin-bottom: 20px; font-size: 20px; display: flex; align-items: center; gap: 10px;">
      <span style="color: #f97316;">📜</span>
      Terms & Conditions
    </h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <ul style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li>50% deposit required to commence work</li>
        <li>All materials will be of the highest quality</li>
        <li>Work will be completed as per agreed timeline</li>
        <li>Quote valid for 30 days from date of issue</li>
      </ul>
      <ul style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px;">
        <li>NCA certified and fully licensed</li>
        <li>All work covered by comprehensive insurance</li>
        <li>Regular progress updates provided</li>
        <li>Quality assurance at every stage</li>
      </ul>
    </div>
  </div>

  <!-- Footer -->
  <footer style="text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 30px;">
    <div style="background: #1e40af; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <p style="margin: 0; font-size: 18px; font-weight: bold;">Thank you for choosing AKIBEKS Engineering Solutions</p>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Building Kenya's future, one project at a time</p>
    </div>
    <p style="margin: 0;">This quotation is valid for 30 days from the date of issue | NCA Registered | ISO Certified</p>
  </footer>
</div>
      `
    },
    {
      id: "invoice_template", 
      name: "Professional Invoice",
      description: "Comprehensive invoice template with payment details",
      type: "invoice",
      icon: Receipt,
      content: `
<div style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; background: #fff;">
  <!-- Header -->
  <header style="text-align: center; border-bottom: 3px solid #10b981; padding-bottom: 30px; margin-bottom: 40px; background: linear-gradient(135deg, #065f46 0%, #10b981 100%); color: white; padding: 40px 20px; margin: -40px -20px 40px -20px;">
    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
      <div style="width: 60px; height: 60px; background: #f97316; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 20px;">
        <span style="color: white; font-size: 28px; font-weight: bold;">🏗️</span>
      </div>
      <div>
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold;">AKIBEKS Engineering Solutions</h1>
        <p style="color: #d1fae5; margin: 5px 0 0 0; font-size: 16px;">Professional Construction & Engineering Services</p>
      </div>
    </div>
  </header>
  
  <!-- Invoice Header -->
  <div style="text-align: center; margin-bottom: 40px;">
    <h2 style="color: #065f46; font-size: 36px; margin: 0; display: flex; align-items: center; justify-content: center; gap: 15px;">
      <span style="color: #10b981;">🧾</span>
      INVOICE
    </h2>
  </div>

  <!-- Invoice Details -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px;">
    <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border-left: 4px solid #10b981;">
      <h3 style="color: #10b981; margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">BILL TO:</h3>
      <div style="color: #374151; line-height: 1.6;">
        <p style="margin: 0; font-weight: bold; font-size: 16px;">{{clientName}}</p>
        <p style="margin: 5px 0;">{{clientAddress}}</p>
      </div>
    </div>
    <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border-left: 4px solid #10b981;">
      <h3 style="color: #10b981; margin: 0 0 15px 0; font-size: 18px; font-weight: bold;">INVOICE DETAILS:</h3>
      <div style="color: #374151; line-height: 1.6;">
        <p style="margin: 5px 0;"><strong>Invoice #:</strong> INV{{date}}-001</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> {{date}}</p>
        <p style="margin: 5px 0;"><strong>Due Date:</strong> {{dueDate}}</p>
        <p style="margin: 5px 0;"><strong>Project:</strong> {{projectName}}</p>
      </div>
    </div>
  </div>

  <!-- Items Table -->
  <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 40px;">
    <thead>
      <tr style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white;">
        <th style="padding: 18px; text-align: left; font-weight: bold; font-size: 14px;">DESCRIPTION</th>
        <th style="padding: 18px; text-align: center; font-weight: bold; font-size: 14px;">QTY</th>
        <th style="padding: 18px; text-align: right; font-weight: bold; font-size: 14px;">RATE</th>
        <th style="padding: 18px; text-align: right; font-weight: bold; font-size: 14px;">TOTAL</th>
      </tr>
    </thead>
    <tbody>
      {{#items}}
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 18px; color: #374151;">{{description}}</td>
        <td style="padding: 18px; text-align: center; color: #374151;">{{quantity}}</td>
        <td style="padding: 18px; text-align: right; color: #374151;">KSh {{rate}}</td>
        <td style="padding: 18px; text-align: right; color: #374151; font-weight: bold;">KSh {{total}}</td>
      </tr>
      {{/items}}
    </tbody>
    <tfoot>
      <tr style="background: #f0fdf4; border-top: 3px solid #10b981;">
        <td colspan="3" style="padding: 25px; text-align: right; font-weight: bold; color: #065f46; font-size: 20px;">TOTAL AMOUNT DUE:</td>
        <td style="padding: 25px; text-align: right; color: #10b981; font-weight: bold; font-size: 28px;">{{amount}}</td>
      </tr>
    </tfoot>
  </table>

  <!-- Payment Information -->
  <div style="background: #f0fdf4; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
    <h3 style="color: #065f46; margin-bottom: 20px; font-size: 20px; display: flex; align-items: center; gap: 10px;">
      <span style="color: #10b981;">💳</span>
      Payment Information
    </h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px;">
      <div>
        <p style="color: #374151; line-height: 1.6; margin: 0;">
          <strong>Payment Terms:</strong> Net 30 days<br/>
          <strong>Late Fee:</strong> 2% per month on overdue amounts<br/>
          <strong>Payment Methods:</strong> Bank Transfer, Cheque
        </p>
      </div>
      <div>
        <p style="color: #374151; line-height: 1.6; margin: 0;">
          <strong>Bank:</strong> Equity Bank Kenya<br/>
          <strong>Account:</strong> 0123456789<br/>
          <strong>Reference:</strong> {{invoiceNumber}}
        </p>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer style="text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 30px;">
    <div style="background: #065f46; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <p style="margin: 0; font-size: 18px; font-weight: bold;">Thank you for your business!</p>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">AKIBEKS Engineering Solutions - Building Excellence Since 2009</p>
    </div>
    <p style="margin: 0;">Questions? Contact us at +254 710 245 118 or info@akibeks.co.ke</p>
  </footer>
</div>
      `
    },
    {
      id: "receipt_template",
      name: "Payment Receipt", 
      description: "Professional receipt for payments received",
      type: "receipt",
      icon: FileCheck,
      content: `
<div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 30px 20px; background: #fff;">
  <!-- Header -->
  <header style="text-align: center; border-bottom: 3px solid #8b5cf6; padding-bottom: 25px; margin-bottom: 30px; background: linear-gradient(135deg, #6d28d9 0%, #8b5cf6 100%); color: white; padding: 30px 20px; margin: -30px -20px 30px -20px; border-radius: 8px;">
    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
      <div style="width: 50px; height: 50px; background: #f97316; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
        <span style="color: white; font-size: 24px; font-weight: bold;">🏗️</span>
      </div>
      <div>
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">AKIBEKS Engineering</h1>
        <p style="color: #e9d5ff; margin: 5px 0 0 0; font-size: 14px;">Payment Receipt</p>
      </div>
    </div>
  </header>
  
  <!-- Receipt Title -->
  <div style="text-align: center; margin-bottom: 30px;">
    <h2 style="color: #6d28d9; font-size: 32px; margin: 0; display: flex; align-items: center; justify-content: center; gap: 12px;">
      <span>🧾</span>
      RECEIPT
    </h2>
    <p style="color: #6b7280; margin: 10px 0 0 0;">Payment Confirmation</p>
  </div>

  <!-- Receipt Details -->
  <div style="background: #f3f4f6; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      <div>
        <p style="margin: 8px 0; color: #374151;"><strong>Receipt #:</strong> RCP{{date}}-001</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Date:</strong> {{date}}</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Received From:</strong> {{clientName}}</p>
      </div>
      <div>
        <p style="margin: 8px 0; color: #374151;"><strong>Project:</strong> {{projectName}}</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Payment Method:</strong> Bank Transfer</p>
        <p style="margin: 8px 0; color: #374151;"><strong>Status:</strong> <span style="background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 4px; font-size: 12px;">RECEIVED</span></p>
      </div>
    </div>
  </div>

  <!-- Amount -->
  <div style="text-align: center; background: #faf5ff; padding: 30px; border-radius: 10px; border: 2px solid #8b5cf6; margin-bottom: 25px;">
    <p style="color: #6d28d9; font-size: 16px; margin: 0 0 10px 0; font-weight: bold;">AMOUNT RECEIVED</p>
    <p style="color: #6d28d9; font-size: 48px; font-weight: bold; margin: 0;">{{amount}}</p>
  </div>

  <!-- Payment Details -->
  <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
    <h3 style="color: #374151; margin-bottom: 15px; font-size: 16px;">Payment Details:</h3>
    <p style="color: #6b7280; line-height: 1.6; margin: 0;">
      Payment received for construction services as per invoice INV{{date}}-001. 
      This receipt serves as confirmation of payment received.
    </p>
  </div>

  <!-- Footer -->
  <footer style="text-align: center; color: #6b7280; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
    <p style="margin: 0 0 15px 0; font-weight: bold;">Thank you for your payment!</p>
    <p style="margin: 0;">AKIBEKS Engineering Solutions | +254 710 245 118 | info@akibeks.co.ke</p>
  </footer>
</div>
      `
    },
    {
      id: "delivery_note_template",
      name: "Delivery Note",
      description: "Professional delivery note for materials and supplies", 
      type: "delivery",
      icon: Truck,
      content: `
<div style="font-family: 'Arial', sans-serif; max-width: 700px; margin: 0 auto; padding: 30px 20px; background: #fff;">
  <!-- Header -->
  <header style="text-align: center; border-bottom: 3px solid #06b6d4; padding-bottom: 25px; margin-bottom: 30px; background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); color: white; padding: 30px 20px; margin: -30px -20px 30px -20px; border-radius: 8px;">
    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
      <div style="width: 50px; height: 50px; background: #f97316; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
        <span style="color: white; font-size: 24px; font-weight: bold;">🏗️</span>
      </div>
      <div>
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">AKIBEKS Engineering</h1>
        <p style="color: #cffafe; margin: 5px 0 0 0; font-size: 14px;">Materials & Supplies</p>
      </div>
    </div>
  </header>
  
  <!-- Delivery Note Title -->
  <div style="text-align: center; margin-bottom: 30px;">
    <h2 style="color: #0891b2; font-size: 28px; margin: 0; display: flex; align-items: center; justify-content: center; gap: 12px;">
      <span>🚚</span>
      DELIVERY NOTE
    </h2>
  </div>

  <!-- Delivery Details -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 30px;">
    <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
      <h3 style="color: #0891b2; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">DELIVERY TO:</h3>
      <div style="color: #374151; line-height: 1.6;">
        <p style="margin: 0; font-weight: bold;">{{clientName}}</p>
        <p style="margin: 5px 0;">{{clientAddress}}</p>
        <p style="margin: 5px 0;"><strong>Project:</strong> {{projectName}}</p>
      </div>
    </div>
    <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #06b6d4;">
      <h3 style="color: #0891b2; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">DELIVERY INFO:</h3>
      <div style="color: #374151; line-height: 1.6;">
        <p style="margin: 5px 0;"><strong>Delivery #:</strong> DEL{{date}}-001</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> {{date}}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> 09:00 AM</p>
        <p style="margin: 5px 0;"><strong>Driver:</strong> John Mwangi</p>
      </div>
    </div>
  </div>

  <!-- Items Table -->
  <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 30px;">
    <thead>
      <tr style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white;">
        <th style="padding: 15px; text-align: left; font-weight: bold;">ITEM DESCRIPTION</th>
        <th style="padding: 15px; text-align: center; font-weight: bold;">QUANTITY</th>
        <th style="padding: 15px; text-align: center; font-weight: bold;">UNIT</th>
        <th style="padding: 15px; text-align: center; font-weight: bold;">CONDITION</th>
      </tr>
    </thead>
    <tbody>
      {{#items}}
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 15px; color: #374151;">{{description}}</td>
        <td style="padding: 15px; text-align: center; color: #374151; font-weight: bold;">{{quantity}}</td>
        <td style="padding: 15px; text-align: center; color: #374151;">Units</td>
        <td style="padding: 15px; text-align: center;">
          <span style="background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 4px; font-size: 12px;">GOOD</span>
        </td>
      </tr>
      {{/items}}
    </tbody>
  </table>

  <!-- Signatures -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 20px;">
    <div style="border: 1px solid #d1d5db; padding: 20px; border-radius: 8px; text-align: center;">
      <p style="color: #374151; margin: 0 0 40px 0; font-weight: bold;">DELIVERED BY</p>
      <div style="border-bottom: 1px solid #9ca3af; margin-bottom: 10px; height: 40px;"></div>
      <p style="color: #6b7280; margin: 0; font-size: 14px;">Signature & Date</p>
    </div>
    <div style="border: 1px solid #d1d5db; padding: 20px; border-radius: 8px; text-align: center;">
      <p style="color: #374151; margin: 0 0 40px 0; font-weight: bold;">RECEIVED BY</p>
      <div style="border-bottom: 1px solid #9ca3af; margin-bottom: 10px; height: 40px;"></div>
      <p style="color: #6b7280; margin: 0; font-size: 14px;">Signature & Date</p>
    </div>
  </div>

  <!-- Footer -->
  <footer style="text-align: center; color: #6b7280; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
    <p style="margin: 0;">This delivery note must be signed and returned within 24 hours</p>
    <p style="margin: 10px 0 0 0;">AKIBEKS Engineering Solutions | +254 710 245 118 | info@akibeks.co.ke</p>
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
    content = content.replace(/{{clientAddress}}/g, previewData.clientAddress);
    content = content.replace(/{{projectName}}/g, previewData.projectName);
    content = content.replace(/{{amount}}/g, previewData.amount);
    content = content.replace(/{{date}}/g, previewData.date);
    content = content.replace(/{{validUntil}}/g, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString());
    content = content.replace(/{{dueDate}}/g, new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString());
    content = content.replace(/{{invoiceNumber}}/g, "INV000001");

    // Replace items array
    const itemsHtml = previewData.items.map(item => 
      selectedTemplate === 'delivery_note_template' 
        ? `<tr>
            <td style="padding: 15px; color: #374151;">${item.description}</td>
            <td style="padding: 15px; text-align: center; color: #374151; font-weight: bold;">${item.quantity}</td>
            <td style="padding: 15px; text-align: center; color: #374151;">Units</td>
            <td style="padding: 15px; text-align: center;">
              <span style="background: #d1fae5; color: #065f46; padding: 4px 8px; border-radius: 4px; font-size: 12px;">GOOD</span>
            </td>
          </tr>`
        : `<tr>
            <td style="padding: 15px; color: #374151;">${item.description}</td>
            <td style="padding: 15px; text-align: center; color: #374151;">${item.quantity}</td>
            <td style="padding: 15px; text-align: right; color: #374151;">KSh ${item.rate.toLocaleString()}</td>
            <td style="padding: 15px; text-align: right; color: #374151; font-weight: bold;">KSh ${item.total.toLocaleString()}</td>
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
                Document Templates
              </h1>
              <p className="text-gray-600">Create and manage professional document templates</p>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
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
                <div className="grid grid-cols-1 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTemplate === template.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <template.icon className={`w-6 h-6 ${selectedTemplate === template.id ? 'text-orange-500' : 'text-gray-400'}`} />
                          <div>
                            <h3 className="font-medium">{template.name}</h3>
                            <p className="text-sm text-gray-600">{template.description}</p>
                          </div>
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
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={previewData.clientName}
                      onChange={(e) => setPreviewData(prev => ({ ...prev, clientName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientAddress">Client Address</Label>
                    <Textarea
                      id="clientAddress"
                      value={previewData.clientAddress}
                      onChange={(e) => setPreviewData(prev => ({ ...prev, clientAddress: e.target.value }))}
                      rows={2}
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
                  <div>
                    <Label htmlFor="amount">Total Amount</Label>
                    <Input
                      id="amount"
                      value={previewData.amount}
                      onChange={(e) => setPreviewData(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
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
                    <Button size="sm" onClick={downloadTemplate} disabled={!selectedTemplate} className="bg-orange-500 hover:bg-orange-600">
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
                    style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166.67%', height: '166.67%' }}
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
