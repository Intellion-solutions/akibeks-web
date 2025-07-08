
-- Add labor charge fields to invoice_items table
ALTER TABLE public.invoice_items 
ADD COLUMN material_cost DECIMAL(15,2) DEFAULT 0,
ADD COLUMN labor_percentage DECIMAL(5,2) DEFAULT 36.5,
ADD COLUMN labor_charge DECIMAL(15,2) DEFAULT 0,
ADD COLUMN section VARCHAR(100);

-- Add template and design fields to invoices table
ALTER TABLE public.invoices 
ADD COLUMN template_type VARCHAR(50) DEFAULT 'standard',
ADD COLUMN letterhead_enabled BOOLEAN DEFAULT true,
ADD COLUMN tax_rate DECIMAL(5,2) DEFAULT 16,
ADD COLUMN tax_amount DECIMAL(15,2) DEFAULT 0,
ADD COLUMN subtotal DECIMAL(15,2) DEFAULT 0,
ADD COLUMN discount_amount DECIMAL(15,2) DEFAULT 0;

-- Create invoice_templates table for storing different template designs
CREATE TABLE IF NOT EXISTS public.invoice_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_name VARCHAR(100) NOT NULL UNIQUE,
  template_type VARCHAR(50) NOT NULL DEFAULT 'standard',
  is_default BOOLEAN DEFAULT false,
  letterhead_config JSONB,
  color_scheme JSONB,
  layout_config JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for invoice_templates
ALTER TABLE public.invoice_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage invoice templates" 
  ON public.invoice_templates 
  FOR ALL 
  USING (true);

-- Insert default invoice templates
INSERT INTO public.invoice_templates (template_name, template_type, is_default, letterhead_config, color_scheme, layout_config) VALUES
('Professional Blue', 'standard', true, 
 '{"showLogo": true, "showAddress": true, "showContact": true}',
 '{"primary": "#2563eb", "secondary": "#1e40af", "accent": "#3b82f6"}',
 '{"sections": true, "itemBorders": true, "compactMode": false}'
),
('Modern Green', 'modern', false,
 '{"showLogo": true, "showAddress": true, "showContact": true}',
 '{"primary": "#059669", "secondary": "#047857", "accent": "#10b981"}',
 '{"sections": true, "itemBorders": false, "compactMode": false}'
),
('Classic Red', 'classic', false,
 '{"showLogo": true, "showAddress": true, "showContact": true}',
 '{"primary": "#dc2626", "secondary": "#b91c1c", "accent": "#ef4444"}',
 '{"sections": false, "itemBorders": true, "compactMode": true}'
);

-- Create function to automatically calculate labor charges
CREATE OR REPLACE FUNCTION calculate_labor_charge()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate labor charge as percentage of material cost
  NEW.labor_charge := NEW.material_cost * (NEW.labor_percentage / 100);
  
  -- Update total_price to include material cost + labor charge
  NEW.total_price := (NEW.material_cost + NEW.labor_charge) * NEW.quantity;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic labor charge calculation
CREATE TRIGGER trigger_calculate_labor_charge
  BEFORE INSERT OR UPDATE ON public.invoice_items
  FOR EACH ROW
  EXECUTE FUNCTION calculate_labor_charge();

-- Create function to update invoice totals
CREATE OR REPLACE FUNCTION update_invoice_totals()
RETURNS TRIGGER AS $$
DECLARE
  invoice_subtotal DECIMAL(15,2);
  invoice_tax_amount DECIMAL(15,2);
  invoice_total DECIMAL(15,2);
  current_tax_rate DECIMAL(5,2);
BEGIN
  -- Get the current tax rate for the invoice
  SELECT COALESCE(tax_rate, 16) INTO current_tax_rate
  FROM public.invoices 
  WHERE id = COALESCE(NEW.invoice_id, OLD.invoice_id);
  
  -- Calculate subtotal from all items
  SELECT COALESCE(SUM(total_price), 0) INTO invoice_subtotal
  FROM public.invoice_items 
  WHERE invoice_id = COALESCE(NEW.invoice_id, OLD.invoice_id);
  
  -- Calculate tax amount
  invoice_tax_amount := invoice_subtotal * (current_tax_rate / 100);
  
  -- Calculate total including tax
  invoice_total := invoice_subtotal + invoice_tax_amount;
  
  -- Update the invoice totals
  UPDATE public.invoices 
  SET 
    subtotal = invoice_subtotal,
    tax_amount = invoice_tax_amount,
    total_amount = invoice_total - COALESCE(discount_amount, 0)
  WHERE id = COALESCE(NEW.invoice_id, OLD.invoice_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update invoice totals when items change
CREATE TRIGGER trigger_update_invoice_totals
  AFTER INSERT OR UPDATE OR DELETE ON public.invoice_items
  FOR EACH ROW
  EXECUTE FUNCTION update_invoice_totals();
