
-- Add logo and additional settings to company_settings table
INSERT INTO company_settings (setting_key, setting_value, description) VALUES
('company_logo', '', 'Company logo URL or file path'),
('company_tagline', 'Building Excellence Since 2009', 'Company tagline or motto'),
('company_website', 'www.akibeks.co.ke', 'Company website URL'),
('tax_rate', '16', 'Default tax rate percentage (VAT)'),
('labor_charge_rate', '36.5', 'Labor charge as percentage of material cost'),
('currency_symbol', 'KSh', 'Default currency symbol'),
('company_registration', 'NCA/REG/2009/001', 'Company registration number'),
('company_license', 'NCA License No. 12345', 'Professional license information'),
('bank_name', 'Equity Bank Kenya', 'Primary bank name'),
('bank_account', '0123456789', 'Bank account number'),
('bank_branch', 'Nairobi Branch', 'Bank branch information'),
('swift_code', 'EQBLKENA', 'Bank SWIFT code'),
('footer_text', 'Thank you for choosing AKIBEKS Engineering Solutions', 'Default footer text for documents'),
('signature_name', 'John Kiprotich', 'Default signature name'),
('signature_title', 'Project Manager', 'Default signature title')
ON CONFLICT (setting_key) DO UPDATE SET
setting_value = EXCLUDED.setting_value,
description = EXCLUDED.description;

-- Create template_items table for storing template line items
CREATE TABLE IF NOT EXISTS template_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id VARCHAR(100) NOT NULL,
  item_number INTEGER NOT NULL,
  description TEXT NOT NULL,
  unit VARCHAR(50) DEFAULT 'Units',
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(15,2) NOT NULL DEFAULT 0,
  amount DECIMAL(15,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create template_settings table for storing template configurations
CREATE TABLE IF NOT EXISTS template_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id VARCHAR(100) NOT NULL UNIQUE,
  template_name VARCHAR(200) NOT NULL,
  material_cost DECIMAL(15,2) DEFAULT 0,
  labor_charge DECIMAL(15,2) DEFAULT 0,
  tax_amount DECIMAL(15,2) DEFAULT 0,
  grand_total DECIMAL(15,2) DEFAULT 0,
  notes TEXT,
  terms_conditions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default template items for demonstration
INSERT INTO template_items (template_id, item_number, description, unit, quantity, unit_price, amount) VALUES
('quote_template', 1, 'Foundation Work', 'Sq M', 100, 5000, 500000),
('quote_template', 2, 'Structural Work', 'Sq M', 200, 8000, 1600000),
('quote_template', 3, 'Finishing Work', 'Sq M', 150, 2600, 390000),
('invoice_template', 1, 'Construction Phase 1', 'Lump Sum', 1, 1200000, 1200000),
('invoice_template', 2, 'Material Supply', 'Lump Sum', 1, 800000, 800000),
('delivery_note_template', 1, 'Cement Bags', 'Bags', 50, 850, 42500),
('delivery_note_template', 2, 'Steel Bars', 'Tonnes', 5, 85000, 425000);

-- Insert default template settings
INSERT INTO template_settings (template_id, template_name, material_cost, labor_charge, tax_amount, grand_total, terms_conditions) VALUES
('quote_template', 'Project Quote Template', 2490000, 908850, 543736, 3942586, 'Quote valid for 30 days. All prices include materials and labor.'),
('invoice_template', 'Professional Invoice', 2000000, 730000, 436800, 3166800, 'Payment due within 30 days of invoice date.'),
('delivery_note_template', 'Delivery Note', 467500, 170637.5, 102022, 740159.5, 'All items delivered in good condition.');
