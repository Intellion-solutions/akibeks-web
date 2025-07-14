
-- Insert demo admin user credentials
INSERT INTO public.users (
  id,
  email,
  full_name,
  role,
  is_active,
  phone,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'admin@akibeks.com',
  'Admin User',
  'admin',
  true,
  '+1-555-0123',
  now(),
  now()
) ON CONFLICT (email) DO NOTHING;

-- Insert some sample data for better demo experience
INSERT INTO public.clients (
  full_name,
  email,
  phone,
  address,
  company_name
) VALUES 
  ('John Smith', 'john.smith@example.com', '+1-555-0101', '123 Main St, Anytown, USA 12345', 'Smith Construction LLC'),
  ('Sarah Johnson', 'sarah.j@techcorp.com', '+1-555-0102', '456 Oak Ave, Business City, USA 67890', 'TechCorp Industries'),
  ('Michael Brown', 'mike@brownbuilders.com', '+1-555-0103', '789 Pine Rd, Builder Town, USA 54321', 'Brown Builders Inc')
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO public.projects (
  title,
  description,
  client_id,
  status,
  start_date,
  end_date,
  budget,
  progress_percentage,
  location
) VALUES 
  (
    'Residential Kitchen Renovation',
    'Complete kitchen remodel including cabinets, countertops, and appliances',
    (SELECT id FROM public.clients WHERE email = 'john.smith@example.com' LIMIT 1),
    'in_progress',
    '2024-01-15',
    '2024-03-15',
    25000.00,
    65,
    '123 Main St, Anytown, USA'
  ),
  (
    'Office Building Electrical Upgrade',
    'Upgrade electrical systems for modern office building',
    (SELECT id FROM public.clients WHERE email = 'sarah.j@techcorp.com' LIMIT 1),
    'planning',
    '2024-02-01',
    '2024-04-30',
    75000.00,
    15,
    '456 Oak Ave, Business City, USA'
  ),
  (
    'Commercial Plumbing Installation',
    'New plumbing system for commercial building',
    (SELECT id FROM public.clients WHERE email = 'mike@brownbuilders.com' LIMIT 1),
    'completed',
    '2023-11-01',
    '2024-01-15',
    45000.00,
    100,
    '789 Pine Rd, Builder Town, USA'
  )
ON CONFLICT DO NOTHING;

-- Insert sample services
INSERT INTO public.services (
  name,
  description,
  category,
  base_price,
  unit,
  is_active
) VALUES 
  ('Kitchen Renovation', 'Complete kitchen remodeling service', 'renovation', 15000.00, 'project', true),
  ('Electrical Wiring', 'Professional electrical installation and repair', 'electrical', 125.00, 'hour', true),
  ('Plumbing Installation', 'Complete plumbing system installation', 'plumbing', 100.00, 'hour', true),
  ('Civil Engineering', 'Structural design and civil engineering services', 'civil_works', 200.00, 'hour', true),
  ('Project Management', 'Professional project management and coordination', 'project_management', 150.00, 'hour', true),
  ('Home Construction', 'New home construction services', 'construction', 200000.00, 'project', true)
ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO public.testimonials (
  client_name,
  client_role,
  content,
  rating,
  is_approved,
  is_featured,
  project_id
) VALUES 
  (
    'John Smith',
    'Homeowner',
    'Outstanding work on our kitchen renovation! The team was professional, timely, and the quality exceeded our expectations. Highly recommend Akibeks for any construction needs.',
    5,
    true,
    true,
    (SELECT id FROM public.projects WHERE title = 'Residential Kitchen Renovation' LIMIT 1)
  ),
  (
    'Sarah Johnson',
    'Facilities Manager, TechCorp Industries',
    'Akibeks handled our office electrical upgrade with exceptional professionalism. The project was completed on time and within budget. Great communication throughout the process.',
    5,
    true,
    true,
    (SELECT id FROM public.projects WHERE title = 'Office Building Electrical Upgrade' LIMIT 1)
  ),
  (
    'Michael Brown',
    'General Contractor',
    'I have worked with Akibeks on multiple commercial projects. Their plumbing work is top-notch and their team is reliable. They are my go-to subcontractor for plumbing installations.',
    5,
    true,
    false,
    (SELECT id FROM public.projects WHERE title = 'Commercial Plumbing Installation' LIMIT 1)
  )
ON CONFLICT DO NOTHING;
