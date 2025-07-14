
-- Create enum types for better data consistency
CREATE TYPE project_status AS ENUM ('planning', 'in_progress', 'on_hold', 'completed', 'cancelled');
CREATE TYPE quote_status AS ENUM ('pending', 'approved', 'rejected', 'sent');
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'engineer', 'supervisor');
CREATE TYPE service_category AS ENUM ('construction', 'renovation', 'plumbing', 'electrical', 'civil_works', 'project_management');

-- Users/Staff table
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role user_role DEFAULT 'engineer',
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Clients table
CREATE TABLE public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    company_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category service_category NOT NULL,
    base_price DECIMAL(12,2),
    unit VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    project_manager_id UUID REFERENCES public.users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location TEXT,
    status project_status DEFAULT 'planning',
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15,2),
    actual_cost DECIMAL(15,2),
    progress_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Quote requests table
CREATE TABLE public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    service_type VARCHAR(255),
    project_description TEXT,
    location TEXT,
    preferred_start_date DATE,
    budget_range VARCHAR(100),
    attachments JSONB,
    status quote_status DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Quotes table
CREATE TABLE public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_request_id UUID REFERENCES public.quote_requests(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    prepared_by_id UUID REFERENCES public.users(id),
    quote_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    valid_until DATE,
    terms TEXT,
    status quote_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Quote items table
CREATE TABLE public.quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id),
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Invoices table
CREATE TABLE public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    paid_amount DECIMAL(15,2) DEFAULT 0,
    due_date DATE,
    status invoice_status DEFAULT 'draft',
    payment_terms TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Invoice items table
CREATE TABLE public.invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(12,2) NOT NULL,
    total_price DECIMAL(15,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Site visits table
CREATE TABLE public.site_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    assigned_to_id UUID REFERENCES public.users(id),
    visit_date DATE NOT NULL,
    visit_time TIME NOT NULL,
    location TEXT NOT NULL,
    purpose TEXT,
    status VARCHAR(50) DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Project milestones table
CREATE TABLE public.project_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_date DATE,
    completion_date DATE,
    is_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Project files table
CREATE TABLE public.project_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_type VARCHAR(100),
    file_size INTEGER,
    uploaded_by_id UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    author_id UUID REFERENCES public.users(id),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Testimonials table
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name VARCHAR(255) NOT NULL,
    client_role VARCHAR(255),
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    project_id UUID REFERENCES public.projects(id),
    is_featured BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Company settings table
CREATE TABLE public.company_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default services
INSERT INTO public.services (name, description, category, base_price, unit) VALUES
('House Construction', 'Complete residential construction from foundation to finishing', 'construction', 25000.00, 'sqm'),
('Commercial Building', 'Office complexes, retail spaces, and commercial developments', 'construction', 35000.00, 'sqm'),
('Foundation Work', 'Concrete foundation and structural work', 'construction', 8000.00, 'sqm'),
('Roofing Services', 'Complete roofing installation and repairs', 'construction', 2500.00, 'sqm'),
('Kitchen Renovation', 'Complete kitchen remodeling and upgrades', 'renovation', 150000.00, 'unit'),
('Bathroom Renovation', 'Full bathroom renovation and fitting', 'renovation', 80000.00, 'unit'),
('Interior Renovation', 'Complete interior renovation and finishing', 'renovation', 15000.00, 'sqm'),
('Exterior Renovation', 'Building exterior renovation and painting', 'renovation', 3000.00, 'sqm'),
('Water Supply Installation', 'Complete water supply system installation', 'plumbing', 2000.00, 'point'),
('Drainage System', 'Drainage and sewerage system installation', 'plumbing', 2500.00, 'point'),
('Plumbing Repairs', 'General plumbing repairs and maintenance', 'plumbing', 1500.00, 'hour'),
('Bathroom Fitting', 'Complete bathroom plumbing and fitting', 'plumbing', 25000.00, 'unit'),
('Electrical Wiring', 'Complete electrical wiring installation', 'electrical', 1500.00, 'point'),
('Power Distribution', 'Electrical panel and distribution setup', 'electrical', 15000.00, 'unit'),
('Security Systems', 'CCTV and security system installation', 'electrical', 25000.00, 'unit'),
('Solar Installation', 'Solar panel system installation', 'electrical', 80000.00, 'unit'),
('Road Construction', 'Road construction and paving', 'civil_works', 5000.00, 'sqm'),
('Site Preparation', 'Land clearing and site preparation', 'civil_works', 500.00, 'sqm'),
('Drainage Construction', 'Construction of drainage systems', 'civil_works', 3000.00, 'meter'),
('Landscaping', 'Garden design and landscaping services', 'civil_works', 2000.00, 'sqm'),
('Project Planning', 'Comprehensive project planning and design', 'project_management', 50000.00, 'project'),
('Site Supervision', 'Professional site supervision and quality control', 'project_management', 25000.00, 'month'),
('Quantity Surveying', 'Cost estimation and quantity surveying', 'project_management', 100000.00, 'project'),
('Project Coordination', 'End-to-end project coordination', 'project_management', 35000.00, 'month');

-- Insert default company settings
INSERT INTO public.company_settings (setting_key, setting_value, description) VALUES
('company_name', 'AKIBEKS Engineering Solutions', 'Company name'),
('company_email', 'info@akibeks.co.ke', 'Primary company email'),
('company_phone', '+254 710 245 118', 'Primary company phone'),
('company_address', 'Nairobi, Kenya', 'Company address'),
('whatsapp_number', '+254710245118', 'WhatsApp contact number');

-- Create RLS policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for services, blog posts, and testimonials
CREATE POLICY "Services are viewable by everyone" ON public.services FOR SELECT USING (true);
CREATE POLICY "Published blog posts are viewable by everyone" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Approved testimonials are viewable by everyone" ON public.testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Company settings are viewable by everyone" ON public.company_settings FOR SELECT USING (true);

-- Admin access policies (will be updated when authentication is implemented)
CREATE POLICY "Admins can do everything" ON public.users FOR ALL USING (true);
CREATE POLICY "Admins can manage clients" ON public.clients FOR ALL USING (true);
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (true);
CREATE POLICY "Admins can manage projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Admins can manage quotes" ON public.quote_requests FOR ALL USING (true);
CREATE POLICY "Admins can manage quotes table" ON public.quotes FOR ALL USING (true);
CREATE POLICY "Admins can manage quote items" ON public.quote_items FOR ALL USING (true);
CREATE POLICY "Admins can manage invoices" ON public.invoices FOR ALL USING (true);
CREATE POLICY "Admins can manage invoice items" ON public.invoice_items FOR ALL USING (true);
CREATE POLICY "Admins can manage site visits" ON public.site_visits FOR ALL USING (true);
CREATE POLICY "Admins can manage milestones" ON public.project_milestones FOR ALL USING (true);
CREATE POLICY "Admins can manage files" ON public.project_files FOR ALL USING (true);
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts FOR ALL USING (true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (true);
CREATE POLICY "Admins can manage settings" ON public.company_settings FOR ALL USING (true);

-- Allow anonymous users to insert quote requests and clients
CREATE POLICY "Anyone can submit quote requests" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create client records" ON public.clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create site visit requests" ON public.site_visits FOR INSERT WITH CHECK (true);

-- Create functions for auto-generating numbers
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    quote_num TEXT;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(quote_number FROM 3) AS INTEGER)), 0) + 1
    INTO next_num
    FROM public.quotes
    WHERE quote_number ~ '^Q[0-9]+$';
    
    quote_num := 'Q' || LPAD(next_num::TEXT, 6, '0');
    RETURN quote_num;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
    next_num INTEGER;
    invoice_num TEXT;
BEGIN
    SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 4) AS INTEGER)), 0) + 1
    INTO next_num
    FROM public.invoices
    WHERE invoice_number ~ '^INV[0-9]+$';
    
    invoice_num := 'INV' || LPAD(next_num::TEXT, 6, '0');
    RETURN invoice_num;
END;
$$ LANGUAGE plpgsql;

-- Triggers for auto-generating numbers
CREATE OR REPLACE FUNCTION set_quote_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quote_number IS NULL OR NEW.quote_number = '' THEN
        NEW.quote_number := generate_quote_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.invoice_number IS NULL OR NEW.invoice_number = '' THEN
        NEW.invoice_number := generate_invoice_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER quotes_set_number
    BEFORE INSERT ON public.quotes
    FOR EACH ROW
    EXECUTE FUNCTION set_quote_number();

CREATE TRIGGER invoices_set_number
    BEFORE INSERT ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION set_invoice_number();

-- Update triggers for updated_at fields
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quote_requests_updated_at BEFORE UPDATE ON public.quote_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_visits_updated_at BEFORE UPDATE ON public.site_visits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_company_settings_updated_at BEFORE UPDATE ON public.company_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
