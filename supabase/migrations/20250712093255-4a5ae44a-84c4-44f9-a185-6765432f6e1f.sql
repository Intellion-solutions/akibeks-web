
-- Insert demo services data
INSERT INTO public.services (name, description, category, base_price, unit, is_active) VALUES
('Foundation Works', 'Excavation, concrete pouring, and foundation construction', 'construction', 150000, 'sq_m', true),
('Structural Engineering', 'Design and construction of building structures', 'engineering', 200000, 'sq_m', true),
('Electrical Installation', 'Complete electrical wiring and installation', 'electrical', 50000, 'unit', true),
('Plumbing Services', 'Water supply and drainage systems', 'plumbing', 40000, 'unit', true),
('Architectural Design', 'Building design and architectural planning', 'design', 100000, 'sq_m', true),
('Project Management', 'Complete project oversight and management', 'management', 80000, 'month', true),
('Mechanical Systems', 'HVAC and mechanical installations', 'mechanical', 60000, 'unit', true),
('Site Preparation', 'Land clearing and site preparation', 'construction', 30000, 'sq_m', true),
('Interior Design', 'Interior space planning and design', 'design', 45000, 'sq_m', true),
('Quality Assurance', 'Construction quality control and testing', 'consulting', 25000, 'inspection', true);

-- Create demo admin user
INSERT INTO public.users (email, full_name, role, is_active, phone) VALUES
('admin@akibeks.com', 'Admin User', 'admin', true, '+254700000000');

-- Create milestone sharing tokens table
CREATE TABLE public.milestone_share_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  milestone_id UUID NOT NULL REFERENCES public.project_milestones(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_by_id UUID REFERENCES public.users(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for milestone share tokens
ALTER TABLE public.milestone_share_tokens ENABLE ROW LEVEL SECURITY;

-- Create policy for milestone share tokens
CREATE POLICY "Admins can manage milestone share tokens" 
  ON public.milestone_share_tokens 
  FOR ALL 
  USING (true);

-- Create policy for public access to shared milestones
CREATE POLICY "Anyone can view shared milestones with valid token" 
  ON public.project_milestones 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.milestone_share_tokens 
      WHERE milestone_id = project_milestones.id 
      AND is_active = true 
      AND expires_at > now()
    )
  );

-- Add trigger to update milestone share tokens
CREATE OR REPLACE FUNCTION update_milestone_share_tokens_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create more demo data for testing
INSERT INTO public.clients (full_name, email, phone, address, company_name) VALUES
('John Doe', 'john@example.com', '+254701234567', '123 Main St, Nairobi', 'ABC Construction Ltd'),
('Jane Smith', 'jane@example.com', '+254702345678', '456 Oak Ave, Nairobi', 'XYZ Developers'),
('Mike Johnson', 'mike@example.com', '+254703456789', '789 Pine Rd, Nairobi', 'Johnson Enterprises');

-- Insert sample projects
INSERT INTO public.projects (title, description, location, status, start_date, end_date, budget, client_id) 
SELECT 
  'Sample Project ' || generate_series,
  'Description for sample project ' || generate_series,
  'Location ' || generate_series,
  'in_progress',
  CURRENT_DATE - INTERVAL '30 days',
  CURRENT_DATE + INTERVAL '60 days',
  1000000 + (generate_series * 500000),
  (SELECT id FROM public.clients LIMIT 1 OFFSET (generate_series % 3))
FROM generate_series(1, 5);
