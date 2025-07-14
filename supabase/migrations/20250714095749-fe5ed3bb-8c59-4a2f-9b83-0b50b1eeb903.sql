
-- Create services table for website content management
CREATE TABLE IF NOT EXISTS public.services_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  icon VARCHAR, -- Icon name from lucide-react
  category VARCHAR NOT NULL DEFAULT 'general',
  features JSONB, -- Array of features/benefits
  base_price NUMERIC,
  price_unit VARCHAR DEFAULT 'project',
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  seo_title VARCHAR,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create projects showcase table for website portfolio
CREATE TABLE IF NOT EXISTS public.projects_showcase (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  short_description VARCHAR(200),
  category VARCHAR NOT NULL,
  client_name VARCHAR,
  location TEXT,
  project_value NUMERIC,
  completion_date DATE,
  duration_months INTEGER,
  images JSONB, -- Array of image URLs
  features JSONB, -- Array of key features
  technologies JSONB, -- Array of technologies used
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  seo_title VARCHAR,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies for services_content
ALTER TABLE public.services_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage services content" 
  ON public.services_content 
  FOR ALL 
  USING (true);

CREATE POLICY "Services content is viewable by everyone" 
  ON public.services_content 
  FOR SELECT 
  USING (is_active = true);

-- Add RLS policies for projects_showcase
ALTER TABLE public.projects_showcase ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage projects showcase" 
  ON public.projects_showcase 
  FOR ALL 
  USING (true);

CREATE POLICY "Projects showcase is viewable by everyone" 
  ON public.projects_showcase 
  FOR SELECT 
  USING (is_active = true);

-- Add triggers for updated_at
CREATE TRIGGER update_services_content_updated_at
  BEFORE UPDATE ON public.services_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_showcase_updated_at
  BEFORE UPDATE ON public.projects_showcase
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update invoice number generation to use AB prefix with 7 alphanumeric characters
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS text
LANGUAGE plpgsql
AS $function$
DECLARE
    chars TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result TEXT := 'AB';
    i INTEGER;
BEGIN
    -- Generate 5 more random alphanumeric characters (AB + 5 = 7 total)
    FOR i IN 1..5 LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    
    -- Ensure uniqueness by checking if invoice number already exists
    WHILE EXISTS (SELECT 1 FROM public.invoices WHERE invoice_number = result) LOOP
        result := 'AB';
        FOR i IN 1..5 LOOP
            result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
        END LOOP;
    END LOOP;
    
    RETURN result;
END;
$function$;
