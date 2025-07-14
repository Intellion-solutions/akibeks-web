
-- Create inventory table for admin inventory management
CREATE TABLE public.inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  unit VARCHAR NOT NULL DEFAULT 'units',
  min_stock INTEGER NOT NULL DEFAULT 0,
  cost_per_unit NUMERIC NOT NULL DEFAULT 0,
  status VARCHAR NOT NULL DEFAULT 'in_stock' CHECK (status IN ('in_stock', 'low_stock', 'out_of_stock')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tasks table for admin task management
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  priority VARCHAR NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  assigned_to_id UUID REFERENCES public.users(id),
  project_id UUID REFERENCES public.projects(id),
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create documents table for admin document management
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_name VARCHAR NOT NULL,
  file_size INTEGER,
  file_type VARCHAR,
  category VARCHAR NOT NULL DEFAULT 'general',
  project_id UUID REFERENCES public.projects(id),
  uploaded_by_id UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for inventory
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage inventory" 
  ON public.inventory 
  FOR ALL 
  USING (true);

-- Add RLS policies for tasks
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage tasks" 
  ON public.tasks 
  FOR ALL 
  USING (true);

-- Add RLS policies for documents
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage documents" 
  ON public.documents 
  FOR ALL 
  USING (true);

-- Add triggers for updated_at columns
CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON public.inventory
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
